import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

import {
  BarCodeScanner
} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {withNavigation} from 'react-navigation';

class Scanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      lastScannedUrl: null,
      scanned: false
    };
  }

  async componentDidMount() {
    await this._requestCameraPermission();
    console.log("here");
    console.log(this.state.hasCameraPermission);
    // setTimeout(()=>{
    //     this.props.navigation.navigate("POI")
    // }, 3000);
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    if(this.state.scanned == false){
      this.setState({
        scanned: true
      });
      this.props.navigation.navigate("POI", {
        value: JSON.parse(data)
      })
    }
  };

  render() {
    console.log("EXPO MC2")
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}
                  style={StyleSheet.absoluteFillObject}
                />
          }

        <StatusBar  hidden/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});


export default withNavigation(Scanner);