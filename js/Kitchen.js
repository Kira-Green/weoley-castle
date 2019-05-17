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
  ViroAnimations
} from "react-viro";

export default class HelloSceneFive extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneSix = () => {
    this.props.sceneNavigator.push({ scene: require("./Brewhouse.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/kitchen.JPG")} />
        <ViroText
          text="Continue on to the Brewery!"
          width={1}
          height={1}
          position={[-0.75, 1.5, 5]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Various stories of the kitchen being set on fire by splashing fat."
          width={1.5}
          height={1}
          position={[1, 0, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={500} />
        <ViroPortalScene>
          <ViroPortal position={[-1, 0, 7]} scale={[1, 1, 1]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneSix, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/bakehouse.JPG")} />
        </ViroPortalScene>
        <ViroText
          text="Gaze on the Knight's Helmet to go back to the platform!"
          width={1}
          height={1}
          position={[-2, 1, 0.4]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[-5, 0, 1]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          animation={{ name: "rotate", run: true, loop: true }}
          onFuse={{ callback: this.backToBeach, timeToFuse: 1500 }}
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

module.exports = HelloSceneFive;
