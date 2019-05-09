"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroText, ViroSound, ViroConstants, ViroARImageMarker, ViroARTrackingTargets, ViroImage } from "react-viro";

export default class HelloWorldSceneAR extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR..."
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
	}

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroText
					text={this.state.text}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					style={styles.helloWorldTextStyle}
				/>
				<ViroARImageMarker 
					target={"targetOne"}
					onAnchorFound={this._onAnchorFound}
				>
					<ViroImage 
						height={0.5}
						width={0.5}
						source={require("./res/map.jpg")}
						// position={[0, 0, -1]}
						transformBehaviors={["billboard"]}
						/>
					<ViroSound 
						source={require("./res/horse-carriage-sound.mp3")}
						/>

				</ViroARImageMarker>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: "Welcome to Weoley Castle! Scan the markers on the information boards to find out more."
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}
}

ViroARTrackingTargets.createTargets({
	"targetOne" : {
		source : require("./res/testLogo2.jpg"),
		orientation : "Up",
		physicalWidth : 0.04 //real world width in meters
	},
});


var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: "Arial",
		fontSize: 10,
		color: "#ffffff",
		textAlignVertical: "center",
		textAlign: "center"
	}
});

module.exports = HelloWorldSceneAR;
