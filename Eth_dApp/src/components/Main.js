import React, { Component } from 'react';
import history from '../routes/History';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poi: [{type:"", value: ""}],
      poiCount: 1
    }
  }

  render() {
    return (
      <div id="content">
        <div id="add">
          <h1>Add Proof Of Identity (POI)</h1>
          <Form id = "form" onSubmit = { async (event) => {
            event.preventDefault();
            var formData = new FormData(document.getElementById('form'));
            let jsonObject = {};
            for(const [key, value] of formData.entries()){
              jsonObject[key] = value;
            }
            fetch('http://localhost:8002/checkID',{
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
            }).then((res) =>{
              console.log(res);
              // window.alert(JSON.stringify(res));

              history.push({
                pathname: "/POI",
                idNum: jsonObject['identity'],
                addIPFS: this.props.addIPFS,
                publicKey: this.props.publicKey
              });

            }).catch((err) => {
              window.alert(err);
            });  
          }}>
            <Form.Group controlId = "formCHeckId">
              <Form.Label>Unique Identity Number:</Form.Label>
              <Form.Control name = "identity" type = "text" placeholder = "Enter Identity Number" required></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              CHECK
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Main;
