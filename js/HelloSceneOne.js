"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroButton,
  ViroMaterials,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations
} from "react-viro";

export default class HelloBeachScene extends Component {
  constructor() {
    super();

    this.state = {
      text:
        "Welcome to Weoley Castle Ruins! Despite it's name, it's not 'Weoley' a castle",
      showImage: true
    };

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  changeText = isChanging => {
    let text = isChanging
      ? "On this self guided tour, we will highlight some points of interest! Have a look around!"
      : "Welcome to Weoley Castle Ruins! Despite it's name, it's not 'Weoley' a castle";
    this.setState({
      text,
      showImage: false
    });
  };

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloWorldScene.js") });
  };

  sceneTwo = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneTwo.js") });
  };

  render() {
    const { text, showImage } = this.state;
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/1_Stitch_XHC.JPG")} />
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
          text="Gaze on the box to go back to the beach"
          width={1}
          height={0.5}
          position={[-3, 1, 3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[-3, 0.5, 3]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
          animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroText
          text="Go to the classroom"
          width={1}
          height={1}
          position={[2, 0.5, -0.8]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        />
        {/* <ViroButton
          source={require("./res/archway.png")}
          position={[5, 0, -2]}
          width={1}
          height={1}
          opacity={0.4}
          onFuse={{ callback: this.sceneTwo, timeToFuse: 1500 }}
          transformBehaviors={["billboard"]}
        /> */}
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
          <Viro360Image source={require("./res/360_0082_Stitch_XHC.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="This is where the drawbridge and entrance used to be, surrounded by a moat"
          position={[2.5, 0.5, 2]}
          height={2}
          width={1.5}
          style={styles.helloWorldTextStyle}
          transformBehaviors={["billboard"]}
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
