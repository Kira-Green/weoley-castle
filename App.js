import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Linking,
  PixelRatio,
  TouchableHighlight
} from "react-native";

import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "84C85E8C-00E2-4176-9B1C-5D2BD5B3EBC5"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/HelloWorldSceneAR");
var InitialVRScene = require("./js/HelloWorldScene");

var MAIN = "MAIN";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or MAIN, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = MAIN;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._goToURL = this._goToURL.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == MAIN) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _goToURL() {
    Linking.canOpenURL(
      "https://eu-west-1.sumerian.aws/2f7cca0d03dd433f8c5257622304a292.scene"
    ).then(supported => {
      if (supported) {
        Linking.openURL(
          "https://eu-west-1.sumerian.aws/2f7cca0d03dd433f8c5257622304a292.scene"
        );
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }
  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.container}>
        <Image
          source={require("./js/res/WeoleyCastle-19.jpg")}
          flex={1}
          style={{ height: "100%" }}
          resizeMode={"contain"}
          position={"absolute"}
        />
        <View style={localStyles.header}>
          <Image
            source={require("./js/res/weoley.png")}
            resizeMode="contain"
            style={{ width: "80%", height: "40%" }}
          />
          <Image
            resizeMode="contain"
            source={require("./js/res/weoleyface.png")}
            style={{ height: "50%" }}
            marginTop={"2%"}
          />
        </View>
        <View style={localStyles.textContainer}>
          <Text style={localStyles.titleText}>
            Welcome to the Weoley Experience!
          </Text>
        </View>
        <View style={localStyles.instructions}>
          <Text
            style={{ fontSize: 20, color: "white" }}
            onPress={this._goToURL}
          >
            Click here to interact with our virtual host
          </Text>
        </View>

        <TouchableHighlight
          style={localStyles.buttons}
          onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
          underlayColor={"#68a0ff"}
        >
          <Text style={localStyles.buttonText}>VR</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={localStyles.buttons}
          onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
          underlayColor={"#EE82EE"}
        >
          <Text style={localStyles.buttonText}>AR</Text>
        </TouchableHighlight>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: MAIN
    });
  }
}

var localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    flexDirection: "column",
    backgroundColor: "red"
  },
  header: {
    flex: 1,
    width: "100%",
    height: 20,
    backgroundColor: "rgba(100, 100, 100, 0.6)",
    borderBottomColor: "red",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  imageContainer: {
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 1
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    fontWeight: "600",
    height: "30%",
    width: "100%",
    alignItems: "center"
  },
  instructions: {
    backgroundColor: "black",
    opacity: 0.5,
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 1
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  titleText: {
    color: "white",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  buttonCont: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    height: "30%",
    flexDirection: "column"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

module.exports = ViroSample;
