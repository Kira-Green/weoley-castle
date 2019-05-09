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

export default class HelloSceneThree extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloWorldScene.js") });
  };

  sceneFour = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneFour.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/rhys.JPG")} />
        <ViroText
          text="See Giant Rhys on the right!"
          width={1.5}
          height={1.5}
          position={[-3, 0.5, 1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroText
          text="Let's go and see Olivia"
          width={1}
          height={1}
          position={[3, 0.5, 1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/arrow.png")}
          position={[2, -0.5, 0.8]}
          width={2}
          height={2}
          opacity={0.4}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.sceneFour, timeToFuse: 1500 }}
        />
        <ViroText
          text="Gaze on the box to go back to the beach"
          width={1.5}
          height={1.5}
          position={[0, 0.5, 3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, 0, 3]}
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

module.exports = HelloSceneThree;
