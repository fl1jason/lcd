import React, { Component } from "react";
import {
     StyleSheet,
     View,
     TextInput,
     Button,
} from "react-native";

export default class NewMessageForn extends Component {
  constructor(props) {
  super(props);

 this.state = {
    user_name: "",
    time_stamp: "2020-03-06 18:35:14",
    message_text: ""
    };
  }

async onPostNewMessage() {
  var data = {
    user_name: this.state.user_name,
    time_stamp: this.state.time_stamp,
    message_text: this.state.message_text
  };

  try {
    console.log(data);
    let response = await fetch(
    "http://192.168.1.125:3000/messages",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
    if (response.status >= 200 && response.status < 300) {
      alert("Message Sent Successfully");
    }
  } catch (errors) {

    alert(errors);
  } 
}

  onPressSubmitButton() {
     this.onPostNewMessage();
    }
    
    render() {
       return (
         <View style={loginStyles.container}>
          <TextInput
           ref="txtUserName"
           style={loginStyles.textInput}
           placeholder="User Name"
           keyboardType="default"
           returnKeyType="next"
           onSubmitEditing={event => {
           this.refs.txtTimeStamp.focus();
           }}
           onChangeText={text => this.setState({ user_name: text })}
         />
         <TextInput
           ref="txtTimeStamp"
           style={loginStyles.textInput}
           placeholder="2020-03-06 18:35:14"
           keyboardType="default"
           returnKeyType="next"
           onSubmitEditing={event => {
           this.refs.txtMessageText.focus();
           }}
           onChangeText={text => this.setState({ time_stamp: text })}
         />
         <TextInput
           ref="txtMessageText"
           style={loginStyles.textInput}
           placeholder="Message Text"
           returnKeyType="done"
           onChangeText={text => this.setState({ message_text: text })}
         />
          <Button
           title="Submit"
           style={loginStyles.buttonSubmit}
           onPress={this.onPressSubmitButton.bind(this)}
         />
        </View>
       );
    }
}

const loginStyles = StyleSheet.create({
  container: {
   alignItems: "center",
   justifyContent: "center",
   flex: 1,
   flexDirection: "column",
   backgroundColor: "#F5FCFF",
   width: 250,
  },
  textInput: {
   height: 40,
   textAlign: "center",
   borderWidth: 0,
   width: 250,
   
   },
   buttonSubmit: {
   width: 200,
   color: "#9AE446",
  }
});