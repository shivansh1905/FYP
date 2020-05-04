import React from "react";
import { Image, Text, View, FlatList} from "react-native";
import {withNavigation} from 'react-navigation';
// import QRCode from 'react-native-qrcode-image';

class POI extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
           v: ""
        };
        this.renderF = this.renderF.bind(this);
    }
    
    componentDidMount(){
        console.log("POIMC:" + Object.keys(this.props.navigation.state.params.value));
    }

    renderF(item){
        return(
            <View>
                <Text
                    style = {{fontSize: 18, marginBottom: 20}}
                >
                    {`${item}: ${this.props.navigation.state.params.value[item]}`}
                </Text>
            </View>
        )
    }
        

    render() {
        return (
            <View
                style = {{alignItems: "center", justifyContent:"center"}}
            >
                <Text
                    style = {{fontSize: 20, marginTop: 40, marginBottom: 50}}
                >
                    Verification Complete
                </Text>

                <Image
                    source = {require("../assets/green.png")}
                    style = {{width: 200, height: 200, marginBottom: 50}}
                ></Image>

                <FlatList
                    data = {Object.keys(this.props.navigation.state.params.value)}
                    keyExtractor={item => item}
                    renderItem={({item}) => this.renderF(item)}
                >
                </FlatList>
            </View>
        );
    }
}


export default withNavigation(POI);
