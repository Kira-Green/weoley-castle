"use strict";

import React, { Component } from "react";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroButton,
  ViroSound,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroImage,
  ViroSphere,
  ViroMaterials,
  ViroNode
} from "react-viro";

export default class DrawbridgeScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: (
        <ViroImage
          source={require("./res/text/drawbridgeWelcome.png")}
          position={[0, 0.8, -2]}
          transformBehaviors={["billboard"]}
        />
      ),
      showArrow: true,
      artVisible: false,
      drawbridgeAudio: false,
      moreInfo: false,
      artifactPaused: true
    };
  }

  changeImg = isChanging => {
    let image = isChanging ? (
      <ViroImage
        source={require("./res/text/drawbridgeWelcome2.png")}
        position={[0, 0.8, -2]}
        transformBehaviors={["billboard"]}
      />
    ) : (
      <ViroImage
        source={require("./res/text/drawbridgeWelcome.png")}
        position={[0, 0.8, -2]}
        transformBehaviors={["billboard"]}
      />
    );
    this.setState({
      image,
      showArrow: false
    });
  };

  showArt = () => {
    const { numArtifactsFound } = this.props.sceneNavigator.viroAppProps;
    this.setState(
      {
        artVisible: !this.state.artVisible,
        artifactPaused: false,
        drawbridgeAudio: true,
        moreInfo: false
      },
      numArtifactsFound
    );
  };

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  toChambers = () => {
    this.props.sceneNavigator.push({ scene: require("./Chambers.js") });
    this.setState(() => ({
      artifactPaused: true,
      drawbridgeAudio: false
    }));
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  drawbridgeFinished = () => {
    this.setState(() => ({ moreInfo: !this.state.moreInfo }));
  };

  muteArtifact = () => {
    this.setState(() => ({ artifactPaused: true }));
  };

  render() {
    const { showArrow, artVisible, image } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        {image}
        {showArrow ? (
          <ViroButton
            source={require("./res/down.png")}
            position={[0, -0.5, -1.9]}
            width={2}
            height={2}
            visible={true}
            opacity={0.4}
            onFuse={{ callback: this.changeImg, timeToFuse: 1500 }}
            animation={{ name: "moveUpDown", run: true, loop: true }}
            scale={[0.2, 0.2, 0.2]}
          />
        ) : (
          <ViroButton source={require("./res/down.png")} visible={false} />
        )}

        <ViroImage
          source={require("./res/text/returnHelmet.png")}
          position={[1.5, 0.6, 1]}
        />
        <ViroImage
          source={require("./res/text/toStables.png")}
          position={[2, 0.8, -0.8]}
          transformBehaviors={["billboard"]}
          scale={[0.7, 0.7, 0.7]}
        />

        <ViroSound
          source={require("./res/audio/Drawbridge.mp3")}
          loop={false}
          paused={this.state.drawbridgeAudio}
          volume={1}
          onFinish={this.drawbridgeFinished}
        />
        <ViroSound
          source={require("./res/audio/LookAtArrow.mp3")}
          loop={false}
          paused={!this.state.moreInfo}
          volume={1}
        />
        <ViroSound
          source={require("./res/audio/A3_FoundKey.mp3")}
          loop={false}
          volume={1}
          paused={this.state.artifactPaused}
        />
        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />
        <ViroPortalScene>
          <ViroPortal position={[5, -0.16, -2]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{
                callback: this.toChambers,
                timeToFuse: 1500
              }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/chambers1.JPG")} />
        </ViroPortalScene>

        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/ironKey.jpg")}
              position={[0, 0, 2]}
              height={1}
              width={2}
              transformBehaviors={["billboard"]}
              visible={true}
            />
          </ViroNode>
        ) : (
          <ViroNode>
            <ViroSphere
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.3}
              position={[0, -0.6, 5.5]}
              materials={["spherematerial"]}
              onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
              animation={{ name: "rotateSphere", run: true, loop: true }}
            />
          </ViroNode>
        )}

        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[6, 1.3, 2]}
          transformBehaviors={["billboard"]}
          scale={[1.2, 1.2, 1.2]}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[6, 0, 2]}
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

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/stripetexture.jpg")
  }
});
ViroAnimations.registerAnimations({
  moveUp: { properties: { positionY: "+=0.1" }, duration: 1000 },
  moveDown: {
    properties: { positionY: "-=0.1" },
    duration: 1000
  },
  moveUpDown: [["moveUp", "moveDown"]]
});

module.exports = DrawbridgeScene;
