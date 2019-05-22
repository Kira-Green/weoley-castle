"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroButton,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroImage,
  ViroPortalScene,
  ViroSound,
  ViroAnimations,
  ViroMaterials,
  ViroSphere,
  ViroNode
} from "react-viro";

export default class KitchenScene extends Component {
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

  toBrewhouse = () => {
    this.props.sceneNavigator.push({ scene: require("./Brewhouse.js") });
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
        <Viro360Image source={require("./res/kitchen.JPG")} />
        <ViroImage
          source={require("./res/text/toBrewery.png")}
          position={[0, 1.4, 4]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />

        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={500} />
        <ViroPortalScene>
          <ViroPortal position={[0, 0, 5]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toBrewhouse, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/bakehouse.JPG")} />
        </ViroPortalScene>

        <ViroImage
          source={require("./res/text/returnScene.png")}
          position={[-2, 1, 0.4]}
          transformBehaviors={["billboard"]}
          scale={[0.6, 0.6, 0.6]}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[-5, 0.8, 1]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[3, 1.2, 2]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />
        <ViroSound
          source={require("./res/audio/Kitchen.mp3")}
          loop={false}
          volume={1}
          paused={this.state.description}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[3, 0, 2]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
          animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroSound
          source={require("./res/audio/A5_FoundDog.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />
        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/dogSkull.jpg")}
              position={[-2.8, -0.2, -2.5]}
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
              position={[-2.8, -0.2, -2.5]}
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
    diffuseTexture: require("./res/stripetexture.jpg")
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateX: "+=90"
    },
    duration: 2500
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

module.exports = KitchenScene;
