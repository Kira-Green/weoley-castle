"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroAnimations,
  ViroAmbientLight,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  ViroImage,
  ViroButton,
  ViroDirectionalLight
} from "react-viro";

export default class HelloSceneFour extends Component {
  constructor() {
    super();

    this.state = {}; // initialize state

    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  backToBeach = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  sceneFive = () => {
    this.props.sceneNavigator.push({ scene: require("./Kitchen.js") });
  };

  cellarScene = () => {
    this.props.sceneNavigator.push({ scene: require("./Cellar.js") });
  };

  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require("./res/greathall1.JPG")} />
        <ViroText
          text="Gaze at the Knights Helmet to return to the platform"
          width={1}
          height={1}
          position={[-2, 0.8, 0.4]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="Back to Weoley"
          width={1}
          height={1}
          position={[0.2, 2, -8]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroAmbientLight color="#ffffff" />
        <ViroPortalScene>
          <ViroPortal position={[-0.8, 0, 10]} scale={[1, 1, 1]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneFive, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/kitchen.JPG")} />
        </ViroPortalScene>

        <ViroAmbientLight
          color="#ffffff"
          intensity={200}
          temperature={(8.0, 4.0, 80.0)}
        />
        <ViroDirectionalLight
          color="#1099"
          direction={[0.8, -2, -11]}
          castsShadow={true}
          intensity={200}
        />
        <ViroPortalScene>
          <ViroPortal position={[0.8, -0.5, -10]} scale={[1, 1, 1]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.cellarScene, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
              renderingOrder={1}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/cellar1.JPG")} />
        </ViroPortalScene>

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
      rotateY: "+90"
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
  blackTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloSceneFour;
