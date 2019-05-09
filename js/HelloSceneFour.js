"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroButton,
  ViroImage
} from "react-viro";

export default class HelloSceneFour extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloWorldScene.js") });
  };

  sceneFive = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneFive.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/360_0084_Stitch_XHC.JPG")} />
        <ViroText
          text="This is Olivia! Say Hi"
          width={1}
          height={1}
          position={[-2, 1, -0]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Back to Weoley"
          width={1}
          height={1}
          position={[-1, 0.5, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/arrow.png")}
          position={[-1, 0, -2]}
          width={1.5}
          height={1.5}
          opacity={0.4}
          onFuse={{ callback: this.sceneFive, timeToFuse: 1500 }}
        />
        <ViroText
          text="Gaze on the weird pic man, to go back to the beach"
          width={1}
          height={1}
          position={[2, 0.5, 5]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />

        <ViroImage
          source={require("./res/castlelogo.png")}
          position={[2, 2, 20]}
          height={8}
          width={8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
        />
      </ViroScene>
    );
  }

  _showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  blackTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloSceneFour;
