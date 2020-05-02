import React from "react";
import {withNavigation} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import { View } from "react-native";

class QR extends React.PureComponent {


    
    //Simple usage, defaults for all but the value
    render() {
      return (
        <View style={{flexDirection: "column", height: "100%", width:"100%", justifyContent: "center", alignItems: "center"}}>
          <QRCode
            size={300}
            value="http://awesome.link.qr"
          />
        </View>
      );
    };


}

export default withNavigation(QR);
