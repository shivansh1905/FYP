import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {withNavigation} from 'react-navigation';
// import QRCode from 'react-native-qrcode-image';

class POI extends React.PureComponent {

    constructor(props){
        super(props)
    }

  render() {
    return (
        <View
            style = {{flex:1, flexDirection:"column", alignItems: "center", justifyContent:"center"}}
        >
            <Text>
                The person is of valid drinking age.
            </Text>
        </View>
    );
  }
}


export default withNavigation(POI);
