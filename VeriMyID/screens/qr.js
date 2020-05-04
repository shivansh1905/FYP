import React from "react";
import {withNavigation} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import { View } from "react-native";

class QR extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
       //states
    };
  }

  componentDidMount(){
    console.log(this.props);
    console.log(this.props.navigation.state.params.value);
  }
  
  //Simple usage, defaults for all but the value
  render() {
    return (
      <View style={{flexDirection: "column", height: "100%", width:"100%", justifyContent: "center", alignItems: "center"}}>
        <QRCode
          size={300}
          value={this.props.navigation.state.params.value}
        />
      </View>
    );
  };
}

export default withNavigation(QR);
