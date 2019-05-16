"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
	ViroARScene,
	ViroText,
	ViroSound,
	ViroConstants,
	ViroARImageMarker,
	ViroARTrackingTargets,
	ViroImage,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroPortalScene,
	ViroPortal,
	Viro360Image,
	ViroVideo
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR...",
			image1: false,
			sound1: false,
			image2: false,
			sound2: false,
			pauseVideo: true
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
		this._onAnchorFound = this._onAnchorFound.bind(this);
		this._onAnchorFoundTwo = this._onAnchorFoundTwo.bind(this);
		this._onAnchorFoundThree = this._onAnchorFoundThree.bind(this);
		this._onPortalEnter = this._onPortalEnter.bind(this);
		this._onPortalExit = this._onPortalExit.bind(this);
	}

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroAmbientLight color="#ffffff" intensity={200} />
				<ViroText
					text={this.state.text}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					style={styles.helloWorldTextStyle}
					outerStroke={{
						type: "Outline",
						width: 2,
						color: "black"
					}}
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
						visible={this.state.image1}
					/>
					<ViroSound
						source={require("./res/horse-carriage-sound.mp3")}
						loop={false}
						muted={!this.state.sound1}
						paused={false}
						volume={1}
					/>
				</ViroARImageMarker>

				<ViroARImageMarker
					target={"targetTwo"}
					onAnchorFound={this._onAnchorFoundTwo}
				>
					<ViroSound
						source={require("./res/medieval-music.wav")}
						loop={false}
						muted={!this.state.sound2}
						paused={false}
						volume={1}
					/>
				</ViroARImageMarker>

				<ViroARImageMarker
					target={"targetThree"}
					onAnchorFound={this._onAnchorFoundThree}
				>
<ViroPortalScene
					passable={true}
					dragType="FixedDistance"
					onDrag={() => {}}
				>
					<ViroPortal position={[1, 0, -1]} scale={[0.15, 0.15, 0.15]}>
						<Viro3DObject
							source={require("./res/portal_archway.vrx")}
							resources={[
								require("./res/portal_archway_diffuse.png"),
								require("./res/portal_archway_normal.png"),
								require("./res/portal_archway_specular.png")
							]}
							type="VRX"
						/>
						
					</ViroPortal>
					<Viro360Image source={require("./res/BmInside1.JPG")} />
					<ViroSound source={require("./res/medieval-music.wav")} />
</ViroPortalScene>					

				</ViroARImageMarker>

				<ViroText
					text="Step through the portal to see the ruins close up!"
					scale={[0.5, 0.5, 0.5]}
					position={[0, -0.4, 1]}
					style={styles.helloWorldTextStyle}
					transformBehaviors={"billboard"}
					outerStroke={{
						type: "Outline",
						width: 2,
						color: "#FF0000"
					}}
				/>

				<ViroPortalScene
					passable={true}
					dragType="FixedDistance"
					onDrag={() => {}}
				>
					<ViroPortal position={[0, 0, 1]} scale={[0.15, 0.15, 0.15]}>
						<Viro3DObject
							source={require("./res/portal_archway.vrx")}
							resources={[
								require("./res/portal_archway_diffuse.png"),
								require("./res/portal_archway_normal.png"),
								require("./res/portal_archway_specular.png")
							]}
							type="VRX"
						/>
					</ViroPortal>
					<Viro360Image source={require("./res/1_Stitch_XHCtext.JPG")} />

					<ViroText
						text="Step into a reconstruction of the castle."
						scale={[0.6, 0.6, 0.6]}
						position={[-1, -0.4, 2]}
						style={styles.helloWorldTextStyle}
						transformBehaviors={"billboard"}
						outerStroke={{
							type: "Outline",
							width: 2,
							color: "blue"
						}}
					/>
					<ViroPortalScene
						onPortalEnter={this._onPortalEnter}
						onPortalExit={this._onPortalExit}
						passable={true}
						dragType="FixedDistance"
						onDrag={() => {}}
					>
						<ViroPortal
							position={[-1, 0, 2]}
							scale={[0.15, 0.15, 0.15]}
						>
							<Viro3DObject
								source={require("./res/portal_wood_frame/portal_wood_frame.vrx")}
								resources={[
									require("./res/portal_wood_frame/portal_wood_frame_diffuse.png"),
									require("./res/portal_wood_frame/portal_wood_frame_normal.png"),
									require("./res/portal_wood_frame/portal_wood_frame_specular.png")
								]}
								type="VRX"
							/>
						</ViroPortal>
						<Viro360Image
							source={require("./res/360_theater_dark.jpg")}
						/>
						<ViroVideo
							source={require("./res/WCreconstruction5.mp4")}
							loop={false}
							paused={this.state.pauseVideo}
							position={[7500, 300, -300]}
							scale={[8000, 5000, 3000]}
							rotationPivot={[-1, 0, 2]}
							rotation={[0, -90, 0]}
							transformBehaviors={"billboard"}
						/>
					</ViroPortalScene>
				</ViroPortalScene>
			</ViroARScene>
		);
	}

	_onAnchorFound() {
		this.setState({
			text: "",
			sound1: true,
			image1: true,
			sound2: false
		});
	}

	_onAnchorFoundTwo() {
		this.setState({
			text: "In the Great Hall amazing feasts were held for visitors",
			sound1: false,
			image1: false,
			sound2: true
		});
	}

	_onAnchorFoundThree() {
		this.setState({
			text:
				"A range of artefacts were found at WC. Many are kept at Birmingham Museum",
			sound1: false,
			image1: false,
			sound2: false
		});
	}

	_onPortalEnter() {
		this.setState({
			pauseVideo: false
		});
	}

	_onPortalExit() {
		this.setState({
			pauseVideo: true
		});
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text:
					"Welcome to Weoley Castle! Scan the markers. Look around to find portals."
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			text: "Try to focus your camera on one of the marker images on the boards.";
		}
	}
}

ViroARTrackingTargets.createTargets({
	targetOne: {
		source: require("./res/testLogo2.jpg"),
		orientation: "Up",
		physicalWidth: 0.04 //real world width in meters
	},
	targetTwo: {
		source: require("./res/targetTwo.jpg"),
		orientation: "Up",
		physicalWidth: 0.04 //real world width in meters
	},
	targetThree: {
		source: require("./res/targetThree.jpg"),
		orientation: "Up",
		physicalWidth: 0.04 //real world width in meters
	}
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
