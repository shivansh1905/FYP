import React from "react";
import {StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import LoginDialog from "../components/loginDialog";
import { PropTypes } from "prop-types";
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  usernameChange = function(text) {
    this.setState({ ...this.state, username: text });
  };

  passwordChange = function(text) {
    this.setState({ ...this.state, password: text });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.loginForm}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <LoginDialog
            usernameChange={this.usernameChange.bind(this)}
            passwordChange={this.passwordChange.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  loginForm: {
    width: "75%"
  }
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Login;
