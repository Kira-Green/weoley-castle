"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroAnimations,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroImage,
  ViroButton
} from "react-viro";

export default class HelloSceneFour extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneFive = () => {
    this.props.sceneNavigator.push({ scene: require("./Kitchen.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/greathall1.JPG")} />
        <ViroText
          text="Return to start scene"
          width={1}
          height={1}
          position={[-2, 1, 2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[-2, 0.2, 2]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
        />
        <ViroText
          text="To the kitchen"
          width={1}
          height={1}
          position={[3, 1, 3.5]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />

        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[3, 0, 3.5]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneFive, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/kitchen.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="Return to main menu"
          width={1}
          height={1}
          position={[0.2, 1, -4]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[0.2, -0.2, -4.5]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
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
      rotateX: "+=90"
    },
    duration: 2500 //.25 seconds
  }
});
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  redTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "red",
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
