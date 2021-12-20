import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Image, Platform, KeyboardAvoidingView, } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    // Displays the user’s name in the navigation bar at the top of the chat screen.
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
    // Sets the state with a static message so that you’ll be able to see 
    // each element of the UI displayed on screen right away
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hey!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Dwight",
            avatar: "https://m.media-amazon.com/images/I/714oQu1QKIL._AC_SL1500_.jpg",
          },
        },
        // Below is a system message
        {
          _id: 2,
          text: `${name ? name : "Anonymous"} entered the room 👋`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  // It will be called when a user sends a message.
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // Create a function to establish bubble color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2f2f2fb8",
          },
          left: {
            backgroundColor: "#ffffffd9",
          },
        }}
      />
    );
  }

  render() {
    const { bgColor, bgImage } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: bgColor ? bgColor : "#fff" }} >
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          {/* This, prevents the keyboard to hide the message input field, so that you can’t see what you’re typing: */}
          {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </ImageBackground>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
});