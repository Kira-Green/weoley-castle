import React, { Component } from "react";
import {
  AppRegistry,
  ViroButton,
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Linking,
  PixelRatio,
  Animated,
  Easing,
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
var InitialVRScene = require("./js/WelcomeSceneVR");

var MAIN = "MAIN";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or MAIN, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = "MAIN";

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      splash: true
    };
    this.animatedValue = new Animated.Value(0);
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._goToAWS = this._goToAWS.bind(this);
    this._goToWeoleyWebsite = this._goToWeoleyWebsite.bind(this);
    this._goToEvents = this._goToEvents.bind(this);
    this._goToFeedback = this._goToFeedback.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this.splashToggle = this.splashToggle.bind(this);
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

  _goToAWS() {
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

  _goToWeoleyWebsite() {
    Linking.canOpenURL("https://www.birminghammuseums.org.uk/weoley").then(
      supported => {
        if (supported) {
          Linking.openURL("https://www.birminghammuseums.org.uk/weoley");
        } else {
          console.log("Don't know how to open URI weoley website");
        }
      }
    );
  }
  _goToEvents() {
    Linking.canOpenURL(
      "https://www.birminghammuseums.org.uk/weoley/whats-on"
    ).then(supported => {
      if (supported) {
        Linking.openURL("https://www.birminghammuseums.org.uk/weoley/whats-on");
      } else {
        console.log("Don't know how to open URI for events");
      }
    });
  }
  _goToFeedback() {
    Linking.canOpenURL("https://forms.gle/EY7dwpgy7NmBhkdz7").then(
      supported => {
        if (supported) {
          Linking.openURL("https://forms.gle/EY7dwpgy7NmBhkdz7");
        } else {
          console.log("Don't know how to open URI for events");
        }
      }
    );
  }
  // Presents the user with a choice of an AR or VR experience/go to link in footer
  _getExperienceSelector() {
    if (this.state.splash) {
      return (
        <View style={localStyles.container}>
          <View
            style={{
              flex: 1,
              // width: "100%",
              height: "100%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative"
            }}
          >
            <TouchableHighlight
              onPress={this.splashToggle()}
              // style={{
              //   shadowColor: "#000",
              //   shadowOffset: {
              //     width: 0,
              //     height: 2
              //   },
              //   shadowOpacity: 0.37,
              //   shadowRadius: 7.49,

              //   elevation: 12
              // }}
            >
              <Image
                resizeMode="contain"
                source={require("./js/res/weoleyface.png")}
                style={{
                  height: "70%"
                }}
              />
            </TouchableHighlight>
            <Text>Tap on the face to enter</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={localStyles.container}>
          <Image
            source={require("./js/res/WeoleyCastle-19.jpg")}
            flex={1}
            style={{
              height: "100%"
            }}
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
              style={{ height: "70%", bottom: "10%" }}
            />
          </View>
          <View style={localStyles.textContainer}>
            <Text style={localStyles.titleText}>
              Welcome to the{"\n"}Weoley Experience!
            </Text>
          </View>
          <View style={localStyles.experiences}>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
              underlayColor={"rgba(43, 80, 38, .8)"}
            >
              <Text style={localStyles.buttonText}>VR</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
              underlayColor={"rgba(280, 220, 0, 0.8)"}
            >
              <Text
                style={{
                  color: "rgba(83, 102, 38, 1)",
                  textAlign: "center",
                  fontSize: 20
                }}
              >
                AR
              </Text>
            </TouchableHighlight>
          </View>

          <View style={localStyles.footer}>
            <TouchableHighlight
              // style={localStyles.footerButtons}
              onPress={this._goToWeoleyWebsite}
            >
              <Text style={localStyles.footerText}>Weoley {"\n"}website</Text>
            </TouchableHighlight>
            <TouchableHighlight
              // style={localStyles.footerButtons}
              onPress={this._goToEvents}
            >
              <Text style={localStyles.footerText}>Upcoming{"\n"}Events</Text>
            </TouchableHighlight>
            <TouchableHighlight
              // style={localStyles.footerButtons}
              onPress={this._goToFeedback}
            >
              <Text style={localStyles.footerText}>
                Give {"\n"}
                Feedback
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 20,
            width: 80,
            alignItems: "center"
          }}
        >
          <TouchableHighlight onPress={this._exitViro}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                borderWidth: 1,
                borderColor: "white",
                padding: 5,
                borderRadius: 5
              }}
            >
              &#60;&nbsp;Back
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        goHome={() => this.setState(() => ({ navigatorType: MAIN }))}
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

  // This function "exits" Viro by setting the navigatorType to MAIN.
  _exitViro() {
    this.setState({
      navigatorType: MAIN
    });
  }

  splashToggle() {
    return () => {
      this.setState({
        splash: false
      });
    };
  }
}

var localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, .2)"
  },
  header: {
    flex: 4,
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, .2)",
    alignItems: "center",
    flexDirection: "column"
    // position: "absolute"
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .2)",
    flexDirection: "row",
    fontWeight: "600",
    // height: "20%",
    width: "100%"
  },
  titleText: {
    // width: "100%",
    color: "rgba(300, 300, 300, .8)",
    textAlign: "center",
    fontSize: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(300, 300, 300, .6)",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, .5)"
    // marginLeft: "10%"
    // marginRight: "10%"
  },
  experiences: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, .2)"
  },
  buttonText: {
    color: "rgba(43, 80, 38, .8)",
    textAlign: "center",
    fontFamily: "Farah",
    fontSize: 20
  },
  buttons: {
    height: 50,
    width: 110,
    paddingTop: 5,
    paddingBottom: 5,
    margin: "10%",
    backgroundColor: "rgba(255, 198, 0, 0.8)",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "rgba(83, 102, 38, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  buttonCont: {
    flex: 1,
    width: "100%",
    height: "30%",
    flexDirection: "column"
  },
  footer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    // height: "5%",
    backgroundColor: "rgba(0, 0, 0, .6)",
    position: "relative"
  },
  footerButtons: {
    position: "relative",
    height: 60,
    width: "30%",
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 5,
    marginLeft: 5
  },
  footerText: {
    color: "rgba(300, 300, 300, .6)",
    // backgroundColor: "rgba(0, 0, 0, .6)",
    // color: "rgba(43, 80, 38, 1)",
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "rgba(300, 300, 300, .6)",
    padding: 8
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
