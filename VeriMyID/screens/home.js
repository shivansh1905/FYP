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
                    title: "Age",
                    description: "Age ID Proof",
                    comments: "Comments",
                    id: "Age"
                },
                {
                    title: "Passport",
                    description: "Passport ID Proof",
                    comments: "Comments",
                    id: "ID"
                },
                {
                    title: "XYZ",
                    description: "Description",
                    comments: "Comments",
                    id: "XYZ"
                }
            ]
        }

    }

  render() {
    return (
        <View>
            <View>
                <Button
                    onPress={
                        ()=>{
                            this.props.navigation.navigate("Scanner")
                        }
                    }
                    >

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
                                title={obj.title}
                                subtitle={obj.description}
                            />
                            <Card.Content>
                                <Text>{`${obj.comments} threads`}</Text>
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </View>



      
    // <View>
    //     <QRCode
    //       value="MKBC"
    //       size={200}
    //       bgColor='#FFFFFF'
    //       fgColor='#000000'/>
    // </View>
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
});

export default withNavigation(Home);
