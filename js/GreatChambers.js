"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroBox,
  ViroButton,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroAnimations
} from "react-viro";

export default class HelloSceneThree extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneFour = () => {
    this.props.sceneNavigator.push({ scene: require("./GreatHall.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/greatchamber.JPG")} />
        <ViroText
          text="See Giant Rhys on the right!"
          width={1.5}
          height={1.5}
          position={[-3, 0.5, 1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/arrow.png")}
          position={[-3, 0, 1]}
          width={1}
          height={1}
          opacity={0.4}
          transformBehaviors={["billboard"]}
        />

        <ViroText
          text="Let's go and see Olivia"
          width={1}
          height={1}
          position={[3, 0.2, 2.1]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[4, -1, 3]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneFour, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/greathall1.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="Gaze on the box to go back to the beach"
          width={1.5}
          height={1.5}
          position={[0, 0.5, 3]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, 0, 3]}
          scale={[0.5, 0.5, 0.2]}
          materials={["grid"]}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
          animation={{ name: "rotate", run: true, loop: true }}
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
    fontSize: 15,
    color: "#ffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloSceneThree;
