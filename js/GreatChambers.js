"use strict";

import React, { Component } from "react";

import {
  ViroScene,
  Viro360Image,
  ViroButton,
  ViroOmniLight,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroAnimations,
  ViroImage,
  ViroSound,
  ViroNode,
  ViroSphere,
  ViroMaterials
} from "react-viro";

export default class GreatChambersScene extends Component {
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

  toGreatHall = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatHall.js") });
    this.setState(() => ({
      artifactPaused: true,
      description: false
    }));
  };

  cellarScene = () => {
    this.props.sceneNavigator.push({ scene: require("./Cellar.js") });
    this.setState(() => ({
      artifactPaused: true,
      description: false
    }));
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

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  render() {
    const { artVisible } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/greatchamber.JPG")} />
        <ViroImage
          source={require("./res/text/toGH.png")}
          position={[-5, 1.5, 0]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />
        <ViroOmniLight color="#ffffff" castsShadow={true} intensity={1000} />
        <ViroPortalScene>
          <ViroPortal position={[-5, 0, 0]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toGreatHall, timeToFuse: 1500 }}
              type="VRX"
              rotation={[0, 160, 0]}
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/greathall1.JPG")} />
        </ViroPortalScene>

        <ViroImage
          source={require("./res/text/remainsGC.png")}
          position={[-2, 0, 4]}
          transformBehaviors={["billboard"]}
          scale={[1.5, 1.5, 1.5]}
        />

        <ViroImage
          source={require("./res/text/gazeToCellar.png")}
          position={[3.5, 1.1, 3.5]}
          transformBehaviors={["billboard"]}
          scale={[1.5, 1.5, 1.5]}
        />

        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />

        <ViroPortalScene>
          <ViroPortal position={[3.5, -0.6, 3.5]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.cellarScene, timeToFuse: 1500 }}
              type="VRX"
              rotation={[0, 160, 0]}
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/greathall1.JPG")} />
        </ViroPortalScene>

        <ViroSound
          source={require("./res/audio/GreatChambers.mp3")}
          loop={false}
          volume={1}
          paused={this.state.description}
        />
        <ViroSound
          source={require("./res/audio/A1_HareFound.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[-1, 0, -4]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />

        <ViroImage
          source={require("./res/text/returnScene.png")}
          position={[-1, 1, -4]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />

        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/hare.jpg")}
              position={[3.5, -0.9, -0.5]}
              transformBehaviors={["billboard"]}
              visible={true}
            />
          </ViroNode>
        ) : (
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.1}
            position={[3.5, -0.9, -0.5]}
            materials={["spherematerial"]}
            onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
            animation={{ name: "rotateSphere", run: true, loop: true }}
          />
        )}

        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[3.5, 1.5, -0.8]}
          transformBehaviors={["billboard"]}
          scale={[1, 1, 1]}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[3.9, 0.4, -0.9]}
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
  },
  rotateSphere: {
    properties: {
      rotateX: "+=3",
      rotateY: "-=2"
    },
    easing: "Bounce",
    duration: 30
  }
});

module.exports = GreatChambersScene;
