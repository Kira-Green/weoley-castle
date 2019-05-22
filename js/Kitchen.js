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
  ViroMaterials,
  ViroSphere,
  ViroNode,
  ViroImage
} from "react-viro";

export default class KitchenScene extends Component {
  constructor() {
    super();

    this.state = {
      artVisible: false
    }; // initialize state
  }

  backToPlatform = () => {
    this.props.sceneNavigator.push({ scene: require("./WelcomeSceneVR.js") });
  };

  toBrewhouse = () => {
    this.props.sceneNavigator.push({ scene: require("./Brewhouse.js") });
  };

  showPrevScene = () => {
    this.props.sceneNavigator.pop();
  };

  showArt = () => {
    this.setState({
      artVisible: true
    });
  };

  render() {
    const { artVisible } = this.state;
    return (
      <ViroScene>
        <Viro360Image source={require("./res/kitchen.JPG")} />
        <ViroText
          text="Various stories of the kitchen being set on fire by splashing fat."
          width={1.5}
          height={1}
          position={[1, 0, -2]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        />
        {/* <ViroText
          text="Continue on to the Brewery!"
          width={1}
          height={1}
          position={[0, 1, 5]}
          transformBehaviors={["billboard"]}
          style={styles.redTextStyle}
        /> */}

        <ViroImage
          source={require("./res/text/toBrewery.png")}
          position={[0, 1.4, 4]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1, 1, 1]}
        />

        <ViroAmbientLight color="#ffffff" castsShadow={true} intensity={500} />
        <ViroPortalScene>
          <ViroPortal position={[0, 0, 5]} scale={[0.5, 0.5, 0.5]}>
            <Viro3DObject
              source={require("./res/portal_archway.vrx")}
              resources={[
                require("./res/portal_archway_diffuse.png"),
                require("./res/portal_archway_normal.png"),
                require("./res/portal_archway_specular.png")
              ]}
              onFuse={{ callback: this.toBrewhouse, timeToFuse: 1500 }}
              type="VRX"
              transformBehaviors={["billboard"]}
            />
          </ViroPortal>
          <Viro360Image source={require("./res/bakehouse.JPG")} />
        </ViroPortalScene>
        {/* <ViroText
          text="Return to previous scene"
          width={1}
          height={1}
          position={[-2, 1, 0.4]}
          transformBehaviors={["billboard"]}
          style={styles.helloWorldTextStyle}
        /> */}

        <ViroImage
          source={require("./res/text/returnHelmet.png")}
          position={[-2, 1, 0.4]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[0.6, 0.6, 0.6]}
        />

        <ViroButton
          source={require("./res/knight.png")}
          position={[-5, 0.8, 1]}
          width={0.8}
          height={0.8}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.showPrevScene, timeToFuse: 2000 }}
        />
        {/* <ViroText
          text="Return to start scene"
          width={1}
          height={1}
          position={[3, 1, 2]}
          transformBehaviors={["billboard"]}
          style={styles.blackTextStyle}
        /> */}
        <ViroImage
          source={require("./res/text/returnStart.png")}
          position={[3, 1.2, 2]}
          transformBehaviors={["billboard"]}
          // opacity={0.6}
          scale={[1, 1, 1]}
        />

        <ViroButton
          source={require("./res/weoleyface.png")}
          position={[3, 0, 2]}
          width={1}
          height={1}
          transformBehaviors={["billboard"]}
          onFuse={{ callback: this.backToPlatform, timeToFuse: 2000 }}
          animation={{ name: "rotate", run: true, loop: true }}
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
      </ViroScene>
    );
  }
}

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseTexture: require("./res/grid_bg.jpg")
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
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  redTextStyle: {
    color: "red",
    fontFamily: "Arial",
    fontSize: 15,
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

module.exports = KitchenScene;
