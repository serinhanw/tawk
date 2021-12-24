import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Image, Platform, KeyboardAvoidingView, LogBox, Alert } from 'react-native';
import { Bubble, GiftedChat, SystemMessage, Day, InputToolbar, } from "react-native-gifted-chat";

const firebase = require('firebase');
require('firebase/firestore');

// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import NetInfo
import NetInfo from '@react-native-community/netinfo';

//  Configures the Firestore app
const firebaseConfig = {
  apiKey: "AIzaSyDyEL3danw_xLLfbJrAztGzVsarJLYIoxY",
  authDomain: "tawk-67029.firebaseapp.com",
  projectId: "tawk-67029",
  storageBucket: "tawk-67029.appspot.com",
  messagingSenderId: "885680906398",
  appId: "1:885680906398:web:d94a2af3f227648bfbdb8f",
  measurementId: "G-KQ0BB0TR7S"
};




export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
    };
    // Initializes firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Creates a reference to your Firestore collection
    this.refMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;
    // This ignores the warnings related to:
    // LogBox.ignoreLogs([
    //   "Setting a timer",
    //   "Warning: ...",
    //   "undefined",
    //   "Animated.event now requires a second argument for options",
    // ]);
  }

  // Retrieves the messages from asyncStorage.
  async getMessages() {
    let messages = "";
    try {
      messages = await AsyncStorage.getItem("messages") || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (err) {
      console.error(err);
    }
  };

  // It only renders the default InputToolbar when the user is online.
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }


  componentDidMount() {
    const { name } = this.props.route.params;
    // Displays the user’s name in the navigation bar at the top of the chat screen.
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });

    // Check if device is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        // This function “listens” for updates in the collection
        this.unsubscribe = this.refMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
        // User authentication
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          // Updates user state with the currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
            },
          });
          // References messages of current user
          this.refMsgsUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
        // This saves its current state messages locally to asyncStorage
        this.saveMessages();
      } else {
        this.setState({ isConnected: false });
        //  Loads the messages from asyncStorage:
        this.getMessages();
        // Inform user about offline mode
        Alert.alert("You are offline and not able to send or receive new messages.");
      }
    });

    // Sets up system message with name of the user when they enter room
    const systemMsg = {
      _id: `sys-${Math.floor(Math.random() * 100000)}`,
      text: `${name ? name : "Anonymous"} entered the room 👋`,
      createdAt: new Date(),
      system: true,
    };
    this.refMessages.add(systemMsg);
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.authUnsubscribe();
    // Stops receiving updates about a collection
    this.unsubscribe();
  }

  // This function retrieves the current data in your “messages” collection 
  // and stores it in the state "messages".
  onCollectionUpdate = (snapshot) => {
    const messages = [];
    // goes through each document
    snapshot.forEach((doc) => {
      // get the snapshots's data
      let data = { ...doc.data() };
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text || "",
        system: data.system,
        user: data.user,
      });
    });
    this.setState({ messages });
  };


  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  // This function stores messages in the collection
  uploadMessage = () => {
    const msg = this.state.messages[0];
    this.refMessages.add({
      uid: this.state.uid,
      _id: msg._id,
      text: msg.text,
      createdAt: msg.createdAt,
      user: this.state.user,
    });
  };

  // It will be called when a user sends a message.
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // onSend adds new messages to the database and updates the messages state
        this.uploadMessage();
        // Once the state object is updated, 
        // it saves its current state into asyncStorage by calling the custom function saveMessages():
        this.saveMessages();
      }
    );
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

  renderSystemMessage(props) {
    return <SystemMessage {...props}
      wrapperStyle={{ backgroundColor: "#BC5EEBb8", borderRadius: 4, height: 17 }}
      textStyle={{ color: "#fff" }} />;
  }

  renderDay(props) {
    return <Day {...props} textStyle={{ color: "#fff" }} />;
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
            renderSystemMessage={this.renderSystemMessage}
            renderDay={this.renderDay}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: this.state.user._id,
              name: this.state.name,
              avatar: this.state.user.avatar,
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