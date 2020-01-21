import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import {withNavigation} from 'react-navigation';

class Home extends React.PureComponent {
  state = {
    title: "Title",
    description: "Description",
    comments: "Comments",
    id: "ID" 
     };

  render() {
    return (
      <Card
        key={this.state.id}
        style={styles.card}
        // onPress={() => {
        //   this.props.navigateToClub(this.state.club_id);
        // }}
      >
        <Card.Title
          title={this.state.title}
          subtitle={this.state.description}
        />
        <Card.Content>
          <Text>{`${this.state.comments} threads`}</Text>
        </Card.Content>
      </Card>
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
