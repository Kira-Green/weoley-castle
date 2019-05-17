"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroAnimations
} from "react-viro";

export default class HelloSceneTwo extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneThree = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatChambers.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/chambers2.JPG")} />
        <ViroText
          text="Welcome to School of Code"
          width={1}
          height={1}
          position={[1, 0, -0.9]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Meet Giant Rhys"
          width={1}
          height={1}
          position={[0, 0, -3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[0, 0, -5]} scale={[1, 1, 1]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneThree, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/cellar1.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="Gaze on the box to go back to the beach"
          width={1.5}
          height={2}
          position={[2, 0.5, 2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroBox
          position={[2, 0, 2]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
          animation={{ name: "rotate", run: true, loop: true }}
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

module.exports = HelloSceneTwo;
