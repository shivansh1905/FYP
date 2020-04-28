import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Digital_Identity from '../abis/Digital_Identity.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

const CryptoJS = require("crypto-js");


class RetrieveID extends Component {

    constructor(props) {
        super(props);
        this.state = {
          account: '',
          identityCount: 0,
          loading: true
        }
    
        this.retrieveIdentity = this.retrieveIdentity.bind(this);
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.ethereum.autoRefreshOnNetworkChange = false;
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    
    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts(); 
        this.setState({ account: accounts[0] });
        window.ethereum.on('accountsChanged', (accounts) => {
            this.setState({ account: accounts[0] });
        });
        const networkId = await web3.eth.net.getId();
        const networkData = Digital_Identity.networks[networkId];
        if(networkData) {
            const identity = web3.eth.Contract(Digital_Identity.abi, networkData.address);
            this.setState({ identity });
            this.setState({ loading: false });
        } else {
          window.alert('Digital Identity contract not deployed to detect network.');
        }
    }

    verify(res) {
        let verify = window.web3.eth.accounts.recover(res);
        let auth = this.state.account.toUpperCase();
    
        console.log(verify);
    
        if(auth !== verify.toUpperCase()) {
          window.alert("Authentication Failed!\nPlease Try Again...");
          return false;
        }
        return true;
    }


    async retrieveIdentity(publicKey) {
        //this.setState({loading: true});
        try {
          const did = await this.state.identity.methods.identities(publicKey).call();
          this.setState({loading: false});
          let data = await ipfs.get(did.contentAddress);
    
          console.log(data[0].content.toString());
    
          var bytes = CryptoJS.AES.decrypt(data[0].content.toString(), 'ChudiPadiHai');
          var d = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          console.log(d);
    
          // let d = JSON.parse(data[0].content.toString());
    
          let verify = window.web3.eth.accounts.recover(d);
    
          console.log(data, d);
    
          if(verify.toUpperCase() !== this.state.account.toUpperCase()){
            window.alert(data[0].content.toString());
          }
          else{
            if(this.verify(d)) {
              let data = JSON.parse(d.message);
              let str = "DID: " + data.UserPublicKey + "\n";
              for(let key in data.data) {
                str += key +": " + data.data[key] + "\n";
              }
              window.alert("Identity Retrieved and Verified Successfully...\n" + str);
            }
          }
        } catch(err) {
          this.setState({loading: false});
          console.log(err);
          window.alert("Invalid Digital Identity");
        }
      }

    render() {
        return(
            <div>
                <Navbar account={this.state.account} />
                <Container fluid style = {{marginTop: 45, marginLeft: 20, float: "center"}}>
                    <Row>
                        <div id="retrieve-user">
                            <h1>Retrieve Identity (User)</h1>
                            <Form onSubmit={async (event) => {
                                event.preventDefault();
                                let inp = document.getElementById("did")

                                if(inp.value !== '')
                                    await this.retrieveIdentity(inp.value);
                                else
                                    await this.retrieveIdentity(this.props.location.publicKey);
                            }}>

                                <Form.Group>
                                    <Form.Label>Ethereum Address:</Form.Label>
                                    <Form.Control name="DID" type="text" placeholder="Enter Ethereum Address" id="did" required></Form.Control>
                                </Form.Group>

                                <Button type="submit" variant="primary">
                                    RETRIEVE
                                </Button>
                            </Form>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default RetrieveID;