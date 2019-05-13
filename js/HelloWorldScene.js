"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  ViroText,
  ViroButton,
  Viro360Image,
  ViroMaterials
} from "react-viro";

export default class HelloWorldScene extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  sceneOne = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneOne.js") });
  };
  render() {
    return (
      <ViroScene>
        <Viro360Image source={require("./res/guadalupe_360.jpg")} />
        <ViroText
          text="Look at the archways to find new places!"
          width={2}
          height={2}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/archway.png")}
          position={[0, -1.2, -2]}
          width={1}
          height={1}
          opacity={0.8}
          onFuse={{ callback: this.sceneOne, timeToFuse: 1500 }}
        />
      </ViroScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/castlelogo.png")
  }
});
module.exports = HelloWorldScene;
