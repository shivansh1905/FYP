import React from "react";
import { Image, Text, View } from "react-native";
import {withNavigation} from 'react-navigation';
// import QRCode from 'react-native-qrcode-image';

class POI extends React.PureComponent {

    constructor(props){
        super(props)
    }

  render() {
    return (
        <View
            style = {{alignItems: "center", justifyContent:"center"}}
        >
            <Text
                style = {{fontSize: 18, marginTop: 40}}
            >
                Verification Complete
            </Text>

            <Image
                source = {require("../assets/green.png")}
                style = {{width: 200, resizeMode: "contain"}}
            ></Image>

            <Text
                style = {{fontSize: 18, marginBottom: 20}}
            >
                The person is of valid drinking age.
            </Text>

            <Text
                style = {{fontSize: 18, marginBottom: 20}}
            >
                Age: 21
            </Text>

            <Text
                style = {{fontSize: 18}}
            >
                Valid In: Hong Kong
            </Text>
        </View>
    );
  }
}


export default withNavigation(POI);
