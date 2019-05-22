"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroAnimations,
  ViroButton,
  ViroImage,
  ViroSound,
  ViroMaterials,
  ViroSphere,
  ViroNode
} from "react-viro";

export default class BrewhouseScene extends Component {
  constructor() {
    super();

    this.state = {
      artVisible: false,
      description: false,
      artifactPaused: true
    }; // initialize state
  }

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  showArt = () => {
    const { numArtifactsFound } = this.props.sceneNavigator.viroAppProps;

    this.setState(
      {
        artVisible: true,
        description: true,
        artifactPaused: false
      },
      numArtifactsFound
    );
  };

  render() {
    const { artVisible, numFound } = this.state;
    return (
      <ViroScene hdrEnabled={true} shadowsEnabled={true}>
        <Viro360Image source={require("./res/bakehouse.JPG")} />
        <ViroText
          text="Here is where the well used to be"
          width={1}
          height={1}
          position={[-1.8, -0.4, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Return to previous scene"
          width={1}
          height={1}
          position={[1.7, 0.5, -2]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[2.5, 0, -3]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        <ViroText
          text="The brewhouse"
          width={1}
          height={1}
          position={[3, -0.5, 0]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Return to start scene"
          width={1}
          height={1}
          position={[-2, 1, 2]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />
        <ViroSound
          source={require("./res/audio/Brewhouse.mp3")}
          loop={false}
          volume={1}
          paused={this.state.description}
        />
        <ViroSound
          source={require("./res/audio/A6_FoundArrow.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-2, 0, 2]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          animation={{ name: "rotate", run: true, loop: true }}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
        />
        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/arrowHead.jpg")}
              position={[4, -0.2, 4]}
              transformBehaviors={["billboard"]}
              visible={true}
            />
          </ViroNode>
        ) : (
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.1}
            position={[4, -0.2, 5]}
            materials={["spherematerial"]}
            onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
          />
        )}
      </ViroScene>
    );
  }
}

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
});

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
    color: "red",
    fontFamily: "Arial",
    fontSize: 15,
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

module.exports = BrewhouseScene;
