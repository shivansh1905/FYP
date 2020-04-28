import React, { Component } from 'react';
import history from './History';
import Nav from 'react-bootstrap/Nav';
import './App.css';
class Navbar extends Component {

  callRetrieve(){
    history.push({
      pathname: "/RetrieveID"
    });
  }

  render() {
    return (

      <Nav fill variant="tabs" defaultActiveKey="/" style={{backgroundColor: "white"}}>
        <Nav.Item id = "nav1">
          <Nav.Link href="/">VeriMyId</Nav.Link>
        </Nav.Item>
        <Nav.Item id = "nav1">
          <Nav.Link eventKey="/RetrieveID" onSelect = {this.callRetrieve}>Retrieve Identity</Nav.Link>
        </Nav.Item>
        <Nav.Item id = "nav2">
          <Nav.Link eventKey="disabled" disabled>
            Ethereum Address: {this.props.account}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navbar;