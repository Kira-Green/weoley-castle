"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroButton,
  ViroSound,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroAnimations,
  ViroSphere,
  ViroImage,
  ViroMaterials,
  ViroNode
} from "react-viro";

export default class ChambersScene extends Component {
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

  toGreatChambers = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatChambers.js") });
    this.setState(state => ({
      artifactPaused: true,
      description: false
    }));
  };

  showArt = () => {
    const { numArtifactsFound } = this.props.sceneNavigator.viroAppProps;
    this.setState(
      {
        artVisible: !this.state.artVisible,
        artifactPaused: false,
        description: true
      },
      numArtifactsFound
    );
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  render() {
    const { artVisible } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/chambers2.JPG")} />

        <ViroImage
          source={require("./res/text/chambersStables.png")}
          position={[2.8, 0, -0.9]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />
        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[-3.5, 1.2, 0]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />

        <ViroSound
          source={require("./res/audio/A2_FoundGlass.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />

        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />
        <ViroDirectionalLight color="#000" direction={[0, -1, -0.2]} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, 1, 0]}
          position={[-3, -2, 6]}
          color="#000"
          intensity={250}
        />
        <ViroPortalScene>
          <ViroPortal position={[0, 0, 5]} scale={[0.5, 0.5, 0.5]}>
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
        <ViroSound
          source={require("./res/audio/Chambers.mp3")}
          loop={false}
          volume={1}
          paused={this.state.description}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[0, 0, -3]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />

        <ViroImage
          source={require("./res/text/returnScene.png")}
          position={[0, 1, -3]}
          transformBehaviors={["billboard"]}
          scale={[0.6, 0.6, 0.6]}
        />

        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/syrianGlass.jpg")}
              position={[3, 0, 3]}
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
              position={[3, 0, 3]}
              materials={["spherematerial"]}
              onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
            />
          </ViroNode>
        )}

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

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/stripetexture.jpg")
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

module.exports = ChambersScene;
