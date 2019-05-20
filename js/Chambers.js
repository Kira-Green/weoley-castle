"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroButton,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroAnimations
} from "react-viro";

export default class ChambersScene extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state
  }

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  toGreatChambers = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatChambers.js") });
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/chambers2.JPG")} />
        <ViroText
          text="Welcome to the chambers and stables"
          width={1}
          height={1}
          position={[2.8, 0, -0.9]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="To the the great chambers"
          width={1}
          height={1}
          position={[0, 1, -3]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />
        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[0, 0, -4]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toGreatChambers, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/cellar1.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="Return to previous scene"
          width={1.5}
          height={2}
          position={[2, 0.5, 2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[2, 0, 2]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        <ViroText
          text="Return to start scene"
          width={2}
          height={2}
          position={[-3, 1, 0]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-3.5, -0, 0]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
          animation={{ name: "rotate", run: true, loop: true }}
        />
      </ViroScene>
    );
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

var styl;
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

module.exports = ChambersScene;
