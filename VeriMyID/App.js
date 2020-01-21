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
import QR from './screens/qr';
import Scanner from './screens/scanner';
import POI from './screens/poi';

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
  },

  QR: {
    screen: QR,
    navigationOptions: props => {
      return {
        title: "QR"
      };
    }
  },

  Scanner: {
    screen: Scanner,
    navigationOptions: props => {
      return {
        title: "Scanner"
      };
    }
  },
  POI: {
    screen: POI,
    navigationOptions: props => {
      return {
        title: "POI"
      };
    }
  },
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
