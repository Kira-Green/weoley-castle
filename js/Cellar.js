"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroSound,
  ViroButton,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroImage,
  ViroPortalScene,
  ViroAnimations
} from "react-viro";

export default class CellarScene extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state
  }

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  toGreatHall = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatHall.js") });
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require("./res/cellar1.JPG")} />
        <ViroText
          text="To the Great Hall"
          width={1.5}
          height={1.5}
          position={[-3, 0.5, 0]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" intensity={800} />
        <ViroPortalScene>
          <ViroPortal position={[-3, -1, -0.3]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toGreatHall, timeToFuse: 1500 }}
              type="VRX"
              rotation={[4, 270, 4]}
              // transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/greathall1.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="You are now in the cellar & toilet(swap with image)"
          width={1}
          height={1}
          position={[2, 0, -2]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        />
        <ViroSound
          source={require("./res/audio/Cellar.mp3")}
          loop={false}
          volume={1}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[0, 0, 3]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        <ViroImage
          source={require("./res/text/returnScene.png")}
          position={[0, 1, 3]}
          transformBehaviors={["billboard"]}
          scale={[0.6, 0.6, 0.6]}
        />
        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[3.5, 0.5, 1.2]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1, 1, 1]}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[3.5, -0.8, 1.2]}
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
  }
});

module.exports = CellarScene;
