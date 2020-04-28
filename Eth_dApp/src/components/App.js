import React, { Component } from 'react';
import Web3 from 'web3';
import '../Assets/skins/App.css';
import Digital_Identity from '../abis/Digital_Identity.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Main from './Main';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

const CryptoJS = require("crypto-js");

class App extends Component {
  
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

  async addIPFS(res){
    if(this.verify(res)) {

      var cipherText = CryptoJS.AES.encrypt(JSON.stringify(res), 'ChudiPadiHai').toString();
      console.log(cipherText);

      var buf = Buffer.from(cipherText);

      ipfs.add(buf, async (error,result) => {
        if(error) {
          return;
        }

        console.log(result[0]);

        this.state.identity.methods.createIdentity(result[0].hash).send({ from: this.state.account });
        console.log(this.state.identity.methods);
        window.alert("Digital Identity Created Successfully...\nDID: " + this.state.account);
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      identityCount: 0,
      loading: true
    }
    this.addIPFS = this.addIPFS.bind(this);
  }
  
  render() {
    return (
        <div>
          <Navbar account={this.state.account} />
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex">
                {
                  this.state.loading 
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                  : <Main
                    did={this.state.did}
                    publicKey = {this.state.account}
                    addIPFS = {this.addIPFS}
                    />
                }
              </main>
            </div>
          </div>
        </div>
    );
  }
}


export default App;
