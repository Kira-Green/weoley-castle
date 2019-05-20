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
  ViroPortalScene,
  ViroAnimations,
  ViroNode, 
  ViroSphere,
  ViroMaterials
} from "react-viro";

export default class HelloSceneThree extends Component {
  constructor() {
    super();

    this.state = {
      artVisible = false
    }; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneFour = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatHall.js") });
  };

  cellarScene = () => {
    this.props.sceneNavigator.push({ scene: require("./Cellar.js") });
  };

  render() {
    const { artVisible } = this.state;
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/greatchamber.JPG")} />
        <ViroText
          text="To the Great Hall..."
          width={1.5}
          height={1.5}
          position={[-3, 0.5, 1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[-6, 0, 2]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneFour, timeToFuse: 1500 }}
              type="VRX"
              rotation={[0, 160, 0]}
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/greathall1.JPG")} />
        </ViroPortalScene>

        <ViroText
          text="Here is where the great chamber used to be"
          width={1}
          height={1}
          position={[0, 0, -4]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        />

        <ViroText
          text="Gaze here to enter the cellar"
          width={1}
          height={1}
          position={[3.5, 0.2, -0.8]}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.cellarScene, timeToFuse: 1500 }}
          style={styles.redTextStyle}
        />
        <ViroText
          text="Return to start scene"
          width={1.5}
          height={1.5}
          position={[0, 0.5, 3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[0, 0, 3]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
        />

        <ViroText
          text="Return to main menu"
          width={2}
          height={2}
          position={[-2.5, 1, -3]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />

        {artVisible ? (
          <ViroNode>
            <ViroImage
              source={require("./res/artifacts/hare.jpg")}
              position={[0, 0, 2]}
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

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-2.5, 0, -3]}
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


showArt = () => {
  this.setState({
    artVisible: true
  });
};

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
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

module.exports = HelloSceneThree;
