"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroAnimations,
  ViroButton
} from "react-viro";

export default class HelloSceneSix extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  returnToMenu = () => {
    this.props.sceneNavigator.push();
  };

  render() {
    return (
      <ViroScene hdrEnabled={true} shadowsEnabled={true}>
        <Viro360Image source={require("./res/bakehouse.JPG")} />
        <ViroText
          text="Last one"
          width={1}
          height={1}
          position={[-2, -0.6, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Gaze on the back to go back to the beach"
          width={1}
          height={1}
          position={[4, 1.5, -5]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[4, 0, -5]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          animation={{ name: "rotate", run: true, loop: true }}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          animation={{ name: "rotate2", run: true, loop: true }}
          position={[10, 0, 10]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.returnToMenu, timeToFuse: 1500 }}
        />
      </ViroScene>
    );
  }

  _showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }
}

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  },
  rotate2: {
    properties: {
      rotateX: "+=40"
    },
    duration: 300 //.25 seconds
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

// ViroMaterials.createMaterials({
//   grid: {
//     diffuseTexture: require("./res/knight.png")
//   }
// });

module.exports = HelloSceneSix;
