"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroButton,
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

export default class HelloBeachScene extends Component {
  constructor() {
    super();

    this.state = {
      text:
        "Welcome to Weoley Castle Ruins! Despite it's name, it's not 'Weoley' a castle",
      showImage: true,
      artVisible: false
    };

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
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

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneTwo = () => {
    this.props.sceneNavigator.push({ scene: require("./Chambers.js") });
  };

  render() {
    const { text, showImage, artVisible } = this.state;
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        <ViroText
          text={text}
          width={1.5}
          height={2}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
        />
        {showImage ? (
          <ViroButton
            source={require("./res/down.png")}
            position={[0, -0.5, -2]}
            width={2}
            height={2}
            visible={true}
            opacity={0.4}
            onFuse={{ callback: this.changeText, timeToFuse: 1500 }}
            scale={[0.2, 0.2, 0.2]}
          />
        ) : (
          <ViroButton source={require("./res/down.png")} visible={false} />
        )}

        <ViroText
          text="To the chambers"
          width={1}
          height={1}
          position={[2, 0.5, -0.8]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
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
              onFuse={{ callback: this.sceneTwo, timeToFuse: 1500 }}
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
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.1}
            position={[0, 0, 5]}
            materials={["spherematerial"]}
            onFuse={{ callback: this.showArt, timeToFuse: 1500 }}
          />
        )}

        <ViroText
          text="Return to start scene"
          position={[1.5, 0.5, 1]}
          height={2}
          width={1.5}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[3, 0, 2]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroText
          text="Return to main menu"
          width={2}
          height={2}
          position={[-3, 1, 1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-3, -0, 1]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
        />
      </ViroScene>
    );
  }

  _showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }
}

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  }
});

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
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

module.exports = HelloBeachScene;
