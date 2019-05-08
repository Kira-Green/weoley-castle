"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroScene, Viro360Image, ViroText, ViroBox } from "react-viro";

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
          position={[-2, -0.6, -2]}
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

        <ViroBox
          position={[-1, 0, -2]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onHover={this.sceneFive}
        />
        <ViroText
          text="Go back to the beach"
          width={1}
          height={1}
          position={[5, 0.5, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroBox
          position={[5, 0, -2]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onHover={this.backToBeach}
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
    color: "#FFFF00",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloSceneFour;
