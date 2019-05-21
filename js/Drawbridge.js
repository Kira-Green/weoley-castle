"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

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
  constructor() {
    super();

    this.state = {
      text:
        "Welcome to Weoley Castle Ruins! Despite it's name, it's not 'Weoley' a castle",
      showImage: true,
      artVisible: false,
      drawbridgeAudio: false,
      moreInfo: false
    };
  }

  changeText = isChanging => {
    let text = isChanging
      ? "This is where the drawbridge and entrance used to be, surrounded by a moat!"
      : "Welcome to Weoley Castle Ruins! Despite it's name, it's not 'Weoley' a castle";
    this.setState({
      text,
      showImage: false
    });
  };

  showArt = () => {
    this.setState({
      artVisible: true
    });
  };

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  toChambers = () => {
    this.props.sceneNavigator.push({ scene: require("./Chambers.js") });
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  drawbridgeFinished = () => {
    this.setState(state => ({ moreInfo: !this.state.moreInfo }));
  };

  render() {
    const { text, showImage, artVisible } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        <ViroText
          text={text}
          width={1.5}
          height={2}
          position={[0, 0.5, -2]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
        />
        {showImage ? (
          <ViroButton
            source={require("./res/down.png")}
            position={[0, -0.5, -1.9]}
            width={2}
            height={2}
            visible={true}
            opacity={0.4}
            onFuse={{ callback: this.changeText, timeToFuse: 1500 }}
            animation={{ name: "moveUpDown", run: true, loop: true }}
            scale={[0.2, 0.2, 0.2]}
          />
        ) : (
          <ViroButton source={require("./res/down.png")} visible={false} />
        )}

        <ViroText
          text="To the stables"
          width={1}
          height={1}
          position={[2, 0.5, -0.8]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
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
        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[5, 0, -2]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toChambers, timeToFuse: 1500 }}
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
            <ViroSound
              source={require("./res/audio/A3_FoundKey.mp3")}
              loop={false}
              volume={1}
            />
          </ViroNode>
        ) : (
          <ViroNode>
            <ViroSphere
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.3}
              position={[0, 0, 5]}
              materials={["spherematerial"]}
              onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
            />
          </ViroNode>
        )}
        <ViroText
          text="Return to start scene"
          width={2}
          height={2}
          position={[-3, 0.7, 0.8]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-4, -0, 1]}
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
    diffuseTexture: require("./res/artifacts/ironKey.jpg")
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

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 13,
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

module.exports = DrawbridgeScene;
