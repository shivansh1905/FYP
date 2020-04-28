import React, { Component } from 'react';
import InputFields from './InputFields';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class POI extends Component {

    constructor(props) {
        super(props);
        this.state = {
          poi: [{type:"", value: ""}],
          poiCount: 1
        }
      }
    
    addPOI = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
          poi: [...prevState.poi, {type: "", value: ""}],
          poiCount: prevState.poiCount + 1
        }));
      }
    
    handleChange = (e) => {
        if(["type", "value"].includes(e.target.className.split(" ")[0])){
          let poi = [...this.state.poi]
          poi[e.target.dataset.id][e.target.className.split(" ")[0]] = e.target.value
          this.setState({poi}, () => console.log(this.state.poi))
        } else {
          this.setState({[e.target.name]: e.target.value})
        }
      }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData(document.getElementById('form1'));
        console.log(formData.entries());
        let jsonObject = {};
        
        for(const [key, value] of formData.entries()){
          if(key === "identity" || key === "idPurpose")
            jsonObject[key] = value;
        }
    
        jsonObject["POI"] = [];
        jsonObject["CountPOI"] = this.state.poiCount;
        jsonObject["UserPublicKey"] = this.props.publicKey;
    
        for(var i = 0; i < this.state.poiCount; i++){
          jsonObject["POI"].push(this.state.poi[i]);
        }
    
        console.log(jsonObject);
    
        fetch('http://localhost:8002/authenticate',{
          method:"post",
          body: JSON.stringify({jsonObject}),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(async (res) => {
          return new Promise((resolve, reject)=> {
            if(res.status === 400){
              reject('No Matching Id in the system')
            }
            else resolve(res.json());
          });
        }).then(async (res) =>{
          this.props.addIPFS(res);
        }).catch((err) => {window.alert(err)}); 
    }


    render() {
        return(
            <div id="generate">
                <h1>Create Proof Of Identity (POI)</h1>
                <Form id = "form1" onChange= {this.handleChange}>

                    <Form.Group>
                    <Form.Label>Unique Identity Number</Form.Label>
                    <Form.Control name = "identity" type = "text" placeholder = "Enter Identity Number" required/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Field Purpose</Form.Label>
                    <Form.Control name = "idPurpose" type = "text" placeholder = "Enter Purpose of POI" required/>
                    </Form.Group>

                    <InputFields poi = {this.state.poi} />

                    <Button className="btn btn-primary" style ={{marginBottom: 20}} onClick = {this.addPOI}>Add New Field</Button>

                    <br></br>

                    <Button className="btn btn-primary" style ={{marginRight: 20}} onClick = {this.handleSubmit}>GENERATE</Button>
                </Form>
        </div>
        )
    }
}

export default POI;