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
  ViroSound,
  ViroPortalScene,
  ViroImage,
  ViroButton,
  ViroMaterials,
  ViroSphere,
  ViroNode
} from "react-viro";

export default class GreatHallScene extends Component {
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

  toKitchen = () => {
    this.props.sceneNavigator.push({ scene: require("./Kitchen.js") });
    this.setState(state => ({
      artifactPaused: true,
      description: false
    }));
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  showArt = () => {
    const { numArtifactsFound } = this.props.sceneNavigator.viroAppProps;

    this.setState(
      {
        artVisible: true,
        artifactPaused: false,
        description: true
      },
      numArtifactsFound
    );
  };

  render() {
    const { artVisible } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/greathall1.JPG")} />

        <ViroImage
          source={require("./res/text/returnHelmet.png")}
          position={[-2, 1.3, 2]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1, 1, 1]}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[-2, 0.2, 2]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        {/* <ViroText
          text="To the kitchen"
          width={1}
          height={1}
          position={[3, 1, 3.5]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        /> */}

        <ViroImage
          source={require("./res/text/onToKitchen.png")}
          position={[3, 2, 3.5]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1.5, 1.5, 1.5]}
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
              onFuse={{ callback: this.toKitchen, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/kitchen.JPG")} />
        </ViroPortalScene>
        {/* <ViroText
          text="Return to start scene"
          width={1}
          height={1}
          position={[0.2, 1, -4]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        /> */}

        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[0.2, 1, -4]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1, 1, 1]}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[0.2, -0.2, -4.5]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
          animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroSound
          source={require("./res/audio/GreatHall.mp3")}
          loop={false}
          volume={1}
          paused={this.state.description}
        />
        <ViroSound
          source={require("./res/audio/A4_FoundTile.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />
        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/floorTile.jpg")}
              position={[0, 0, 2]}
              transformBehaviors={["billboard"]}
              visible={true}
            />
          </ViroNode>
        ) : (
          <ViroNode>
            <ViroSphere
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.1}
              position={[0, 0, 5]}
              materials={["spherematerial"]}
              onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
            />
          </ViroNode>
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

module.exports = GreatHallScene;
