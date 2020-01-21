import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  createStackNavigator
} from "react-navigation-stack";
import Login from './screens/login';
import Home from './screens/home';

const StackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: props => {
      return {
        title: "Login"
      };
    }
  },

  Home: {
    screen: Home,
    navigationOptions: props => {
      return {
        title: "Home"
      };
    }
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: "Login"
      })
    },
    App: StackNavigator
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default function App() {
  return (
      <AppContainer/>
  );
}
