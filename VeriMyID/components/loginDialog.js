/*global require*/
import React, { Component } from "react";
import { StyleSheet, Text} from "react-native";
import { Form } from "native-base";
import { TextInput, Button } from "react-native-paper";
import {withNavigation} from 'react-navigation';
import * as LocalAuthentication from 'expo-local-authentication';

class LoginDialog extends Component {
  state = {
    email: "",
    pwd: "",
    compatible: false,
    fingerprints: false,
    result: '',
  };

  componentDidMount() {
    console.log("mount")
    // this.checkDeviceForHardware();
    this.scanFingerprint();
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    if(result.success === true){
      this.props.navigation.navigate("Home")
    }
        
  };

  render() {
    return (
      <Form>
        <TextInput
          theme={{
            colors: {
              primary: "#000"
            }
          }}
          label={"Username"}
          onChangeText={text => {
            this.setState({
              email: text
            });
            this.props.usernameChange(text);
          }}
          value={this.state.email}
          placeholder={"Type the Username here"}
          mode="outlined"
        />
        <TextInput
          theme={{
            colors: {
              primary: "#000"
            }
          }}
          label={"Password"}
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({
              pwd: text
            });
            this.props.passwordChange(text);
          }}
          value={this.state.pwd}
          placeholder={"Type the Password here"}
          mode="outlined"
        />

        <Button
          theme={{
            colors: {
              primary: "#FFFFFF"
            }
          }}
          mode="contained"
          onPress={() => {
            this.setState({
              email: "",
              pwd: ""
            });
            this.props.navigation.navigate("Home");
          }}
          compact={true}
          contentStyle={styles.buttonInner}
          style={styles.button}
        >
          <Text> Login </Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  buttonInner: {
    height: 50
  },
  formLabels: {
    paddingBottom: 4
  }
});


export default withNavigation(LoginDialog);
