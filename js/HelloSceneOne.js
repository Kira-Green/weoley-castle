"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroScene, Viro360Image, ViroText, ViroBox } from "react-viro";

export default class HelloBeachScene extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloWorldScene.js") });
  };

  sceneTwo = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneTwo.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/1_Stitch_XHC.JPG")} />
        <ViroText
          text="Here are the castle grounds"
          width={1}
          height={1}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Go back to the beach"
          width={1}
          height={1}
          position={[-2, 1, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[-2, 0, -2]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onHover={this.backToBeach}
        />
        <ViroText
          text="Go to the classroom"
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
          onHover={this.sceneTwo}
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
    color: "#FF6347",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloBeachScene;
