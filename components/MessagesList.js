import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('http://192.168.1.125:3000/messages')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {}
        );
      })
      .then(console.log("componentDidMount"))
      
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {console.log(this.state)}
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Text>{item.user_name}: {item.message_text}</Text>
          )}
          //keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

