"use strict";

import React, { Component } from "react";

import {
  ViroScene,
  Viro360Image,
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
    };
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
    const { artVisible } = this.state;
    return (
      <ViroScene hdrEnabled={true} shadowsEnabled={true}>
        <Viro360Image source={require("./res/bakehouse.JPG")} />
        <ViroImage
          source={require("./res/text/well.png")}
          position={[-1.8, 0, -2]}
          transformBehaviors={["billboard"]}
          scale={[0.6, 0.6, 0.6]}
        />
        <ViroImage
          source={require("./res/text/returnScene.png")}
          position={[1.7, 0.7, -2]}
          transformBehaviors={["billboard"]}
          scale={[0.6, 0.6, 0.6]}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[2.5, 0, -3]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />

        <ViroImage
          source={require("./res/text/brewhouseEnd.png")}
          position={[3, 1, 0]}
          transformBehaviors={["billboard"]}
          scale={[1.3, 1.3, 1.3]}
        />
        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[-2, 1.3, 2]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
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

module.exports = BrewhouseScene;
