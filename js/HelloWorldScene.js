"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  ViroText,
  ViroButton,
  Viro360Image,
  ViroMaterials,
  Viro3DObject,
  ViroPortalScene,
  ViroAmbientLight,
  ViroPortal
} from "react-viro";

export default class HelloWorldScene extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  sceneOne = () => {
    this.props.sceneNavigator.push({ scene: require("./HelloSceneOne.js") });
  };
  render() {
    return (
      <ViroScene>
        <Viro360Image source={require("./res/platform2.JPG")} />
        <ViroText
          text="Look at the archways to find new places!"
          width={2}
          height={2}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />
        <ViroPortalScene>
          <ViroPortal position={[0, -1.5, -2]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneOne, timeToFuse: 1500 }}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        </ViroPortalScene>
      </ViroScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/castlelogo.png")
  }
});
module.exports = HelloWorldScene;
