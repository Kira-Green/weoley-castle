"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroButton,
  Viro3DObject,
  ViroPortalScene,
  ViroAmbientLight,
  ViroAnimations,
  ViroPortal,
  ViroDirectionalLight,
  ViroSpotLight
} from "react-viro";

export default class WelcomeSceneVR extends Component {
  constructor() {
    super();

    this.state = {}; // Set initial state here
  }

  toDrawbridge = () => {
    this.props.sceneNavigator.push({ scene: require("./Drawbridge.js") });
  };

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require("./res/platform2.JPG")} />
        <ViroText
          text="The helmet will return you to the previous scene!"
          width={2.5}
          height={2.5}
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
        />
        <ViroImage
          source={require("./res/welcomeVRruins.png")}
          position={[-1.8, 1.5, 4]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[2, 2, 2]}
        />

        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={900} />
        <ViroDirectionalLight color="#000" direction={[0, -1, -0.2]} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, 1, 0]}
          position={[-3, -2, 6]}
          color="#000"
          intensity={250}
        />

        <ViroPortalScene>
          <ViroPortal position={[-4, -1, 9]} scale={[1, 1, 1]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toDrawbridge, timeToFuse: 1500 }}
              rotation={[0, 160, 0]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require("./res/drawbridgeoutside.JPG")} />
        </ViroPortalScene>

        <ViroImage
          source={require("./res/welcomeVRreturntext.png")}
          position={[-6, 1, -2]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[2, 2, 2]}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[-6, -0.5, -2]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          animation={{ name: "rotate", run: true, loop: true }}
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
      rotateX: "+=90"
    },
    duration: 2500 //.25 seconds
  }
});

module.exports = WelcomeSceneVR;
