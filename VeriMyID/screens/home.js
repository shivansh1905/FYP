import React from "react";
import { Card, Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import {withNavigation} from 'react-navigation';
// import QRCode from 'react-native-qrcode-image';

class Home extends React.PureComponent {

    constructor(props){
        super(props)
        this.state={
            arr: [
                {
                    title: "eu7ncH536a5QwULE",
                    description: "Proof of Drinking Age",
                    comments: "",
                    id: "Age"
                },
                {
                    title: "QSy6Xtb53SuLxPGP",
                    description: "Proof of Graduation",
                    comments: "",
                    id: "ID"
                }
            ]
        }

    }

  render() {
    return (
        <View>
            <View>
                <Button
                theme={{
                    colors: {
                      primary: "#FFFFFF"
                    }
                  }}
                  mode="contained"
                    onPress={
                        ()=>{
                            this.props.navigation.navigate("Scanner")
                        }
                    }
                    compact={true}
                    contentStyle={styles.buttonInner}
                    style={styles.button}
                    >
                    <Text>Scan</Text>
                </Button>
            </View>
            {
                this.state.arr.map((obj)=>{
                    return(
                        <Card
                            key={obj.id}
                            style={styles.card}
                            onPress={()=>{
                                this.props.navigation.navigate("QR")
                            }}
                        >
                            <Card.Title
                                title={`DID: ${obj.title}`}
                                // subtitle={`Purpose: ${obj.description}`}
                            />
                            <Card.Content>
                                <Text>{`Purpose: ${obj.description}`}</Text>
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },
  button: {
    marginTop: 10
  },
  buttonInner: {
    height: 50
  }
});

export default withNavigation(Home);
