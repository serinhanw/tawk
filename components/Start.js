import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Image, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

import bgImage from "../assets/bg-img.png";
import black from "../assets/black-white.png";
import blue from "../assets/blue-yellow.png";
import pink from "../assets/pink-orange.png";
import rainbow from "../assets/rainbow.png";
import abstract from "../assets/abstract.png";


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: "#fff",
      bgImage: bgImage,
    };
  }

  setBgImage = (img) => {
    this.setState({ bgImage: img });
  };

  render() {
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={bgImage}
          resizeMode="cover"
        // source={require('../assets/bg-img.png')}
        >
          <View style={styles.titleView}>
            <Text style={styles.title}>tawk</Text>
          </View>

          <View style={styles.box}>
            <View style={styles.nameInputField}>
              <Icon
                style={styles.iconStyle}
                name="user"
                size={30}
                color="#888"
              />
              <TextInput
                accessible={true}
                accessibilityLabel="Your Name"
                accessibilityHint="Type the name you want to use in the chat session"
                style={styles.textInput}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>


            <View style={styles.bgSelection}>
              <Text style={styles.bgSelectionText}>Choose Background:</Text>
              <View style={styles.bgSelectionSwatches}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select black background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(black)}
                >
                  {/* <View style={styles.blackSwatch}></View> */}
                  <View><Image style={styles.blackSwatch} source={black}></Image></View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select blue background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(blue)}
                >
                  <View><Image style={styles.blueSwatch} source={blue}></Image></View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select pink background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(pink)}
                >
                  <View><Image style={styles.pinkSwatch} source={pink}></Image></View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select rainbow background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(rainbow)}
                >
                  <View><Image style={styles.rainbowSwatch} source={rainbow}></Image></View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select abstract background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(abstract)}
                >
                  <View><Image style={styles.abstractSwatch} source={abstract}></Image></View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Select default background"
                  accessibilityHint="Lets you choose a background for the chat screen"
                  accessibilityRole="button"
                  onPress={() => this.setBgImage(bgImage)}
                >
                  <View><Image style={styles.defaultSwatch} source={bgImage}></Image></View>
                  <Text style={styles.defaultBgText}>Default</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={styles.btn}
              accessible={true}
              accessibilityLabel="Start texting"
              accessibilityHint="Lets you start a new chat session"
              accessibilityRole="button"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                  bgImage: this.state.bgImage,
                })
              }
            >
              <Text style={styles.btnText}>Start Tawking</Text>
            </Pressable>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                  bgImage: this.state.bgImage,
                })
              }
            >
              <Text style={styles.buttonText}>Start Tawking</Text>
            </TouchableOpacity> */}

          </View>

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  titleView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 75,
    fontWeight: 'bold',
    color: '#FFFFFF',
    // height: 60,
  },
  box: {
    backgroundColor: "#ffffff",
    flexGrow: 1,
    flexShrink: 0,
    width: "88%",
    marginBottom: 30,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    height: 260,
    minHeight: 260,
    maxHeight: 290,
    borderRadius: 20,
  },
  nameInputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 0,
  },
  iconStyle: {
    //padding: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 25,
    width: 25,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: "#888",
  },
  btn: {
    flex: 1,
    backgroundColor: "#BC5EEB",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 32,
    marginTop: 10,
    width: "90%",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  bgSelection: {
    flex: 1,
    padding: 20,
  },
  bgSelectionText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "center",
    opacity: 1,
    marginBottom: 10,
  },
  bgSelectionSwatches: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  blackSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 20,
    marginRight: 15,
  },
  blueSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 20,
    marginRight: 15,
  },
  pinkSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "pink",
    borderRadius: 20,
    marginRight: 15,
  },
  rainbowSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "orange",
    borderRadius: 20,
    marginRight: 15,
  },
  abstractSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "purple",
    borderRadius: 20,
    marginRight: 15,
  },
  defaultSwatch: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 20,
    // marginLeft: 5,
  },
  defaultBgText: {
    fontSize: 10,
    fontWeight: "300",
    color: "#757083",
    textAlign: "center",
    opacity: 1,
    // marginBottom: 10,
  }
})