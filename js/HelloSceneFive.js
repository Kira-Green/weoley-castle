"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroButton
} from "react-viro";

export default class HelloSceneFive extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloWorldScene.js") });
  };

  sceneSix = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneSix.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/360_0111_Stitch_XHC.JPG")} />
        <ViroText
          text="The Castle again"
          width={1}
          height={1}
          position={[-2, 0.5, 0.3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Another one"
          width={1}
          height={1}
          position={[1, 0, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/arrow.png")}
          position={[-6, 0, 1]}
          width={2}
          height={2}
          opacity={0.4}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.sceneSix, timeToFuse: 1500 }}
        />
        <ViroText
          text="Gaze on the box to go back to the beach"
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
  }
});

module.exports = HelloSceneFive;
