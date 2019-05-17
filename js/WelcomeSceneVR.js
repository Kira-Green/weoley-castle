"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroButton,
  ViroMaterials,
  Viro3DObject,
  ViroPortalScene,
  ViroAmbientLight,
  ViroAnimations,
  ViroPortal
} from "react-viro";

export default class HelloWorldScene extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  sceneOne = () => {
    this.props.sceneNavigator.push({ scene: require("./Drawbridge.js") });
  };
  render() {
    return (
      <ViroScene>
        <Viro360Image source={require("./res/platform2.JPG")} />
        <ViroText
          text="The helmet returns you to this scene!"
          width={2}
          height={2}
          position={[2, 0, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require("./res/knight.png")}
          position={[2, -1, -2]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroText
          text="Look at the archway to enter the ruins!"
          width={2}
          height={2}
          position={[-2, 1, 4]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />
        <ViroPortalScene>
          <ViroPortal position={[-3, -1, 6]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.sceneOne, timeToFuse: 1500 }}
              rotation={[0, 160, 0]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        </ViroPortalScene>

        <ViroText
          text="The logo returns you to the main menu!"
          width={2}
          height={2}
          position={[-6, 1, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-6, -0.5, -2]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          // animation={{ name: "rotate", run: true, loop: true }}
        />
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

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 500 //.25 seconds
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/knight.png")
  }
});
module.exports = HelloWorldScene;
