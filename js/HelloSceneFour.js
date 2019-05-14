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
          position={[0.2, 2, -8]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[0.2, 0, -8]} scale={[1, 1, 1]}>
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
          <Viro360Image source={require("./res/360_0111_Stitch_XHC.JPG")} />
        </ViroPortalScene>
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
          // animation={{ name: "rotate", run: true, loop: true }}
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