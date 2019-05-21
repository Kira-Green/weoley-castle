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
			psalterImage1: false,
			trumpetPause: true,
			pauseVideo: true,
			ruinsPause: true,
			introPause: false,
			funFactVisible: false,
			funFactVisible2: false
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
		this._onAnchorFound = this._onAnchorFound.bind(this);
		this._onAnchorFoundTwo = this._onAnchorFoundTwo.bind(this);
		this._onAnchorFoundThree = this._onAnchorFoundThree.bind(this);
		this._onPortalEnter = this._onPortalEnter.bind(this);
		this._onPortalExit = this._onPortalExit.bind(this);
		this._onPortalEnterRuins = this._onPortalEnterRuins.bind(this);
		this._onPortalExitRuins = this._onPortalExitRuins.bind(this);
		this._funFactFound = this._funFactFound.bind(this);
		this._funFactFound2 = this._funFactFound2.bind(this);
	}

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroAmbientLight color="#ffffff" intensity={200} />
				<ViroSound
					source={require("./res/intro.mp3")}
					loop={false}
					paused={this.state.introPause}
					volume={1}
				/>

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
					onPortalEnter={this._onPortalEnterRuins}
					onPortalExit={this._onPortalExitRuins}
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
							renderingOrder={-1}
						/>
					</ViroPortal>
					<Viro360Image source={require("./res/ruinsWithText.jpg")} />
					<ViroSound
						source={require("./res/ruinsInformal.mp3")}
						loop={false}
						paused={this.state.ruinsPause}
						volume={1}
					/>
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
								renderingOrder={-1}
							/>
						</ViroPortal>
						<Viro360Image
							source={require("./res/360_theater_dark.jpg")}
						/>
						<ViroVideo
							source={require("./res/WCreconstruction6.mp4")}
							loop={false}
							paused={this.state.pauseVideo}
							position={[15000, 1200, -500]}
							scale={[16000, 10000, 6000]}
							rotationPivot={[-1, 0, 2]}
							rotation={[0, -90, 0]}
							transformBehaviors={"billboardY"}
							renderingOrder={1}
						/>
					</ViroPortalScene>
				</ViroPortalScene>

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
						source={require("./res/Marker1audio.mp3")}
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
						source={require("./res/Marker2.mp3")}
						loop={false}
						muted={!this.state.sound2}
						paused={false}
						volume={1}
					/>

					<ViroImage
						height={0.5}
						width={0.5}
						source={require("./res/luttrellPsalter1.jpg")}
						position={[0, 0, -1]}
						transformBehaviors={["billboard"]}
						visible={this.state.psalterImage1}
					/>
					<ViroImage
						height={0.5}
						width={0.5}
						source={require("./res/luttrellPsalter3.png")}
						position={[1, 0, -1]}
						scale={[1.2, 1.2, 1.2]}
						transformBehaviors={["billboard"]}
						visible={this.state.psalterImage1}
						rotation={[0, -45, 0]}
						rotationPivot={[0, 0, 0]}
					/>
					<ViroImage
						height={0.5}
						width={0.5}
						source={require("./res/luttrellPsalter4.jpg")}
						position={[2, 0, -1]}
						scale={[1.4, 1.4, 1.4]}
						transformBehaviors={["billboard"]}
						visible={this.state.psalterImage1}
						rotation={[0, -45, 0]}
						rotationPivot={[0, 0, 0]}
					/>
				</ViroARImageMarker>

				<ViroARImageMarker
					target={"targetThree"}
					onAnchorFound={this._onAnchorFoundThree}
				>
					<ViroSound
						source={require("./res/audioMarker3.mp3")}
						loop={false}
						paused={false}
						volume={1}
					/>
					<ViroPortalScene
						passable={true}
						dragType="FixedDistance"
						onDrag={() => {}}
					>
						<ViroPortal
							position={[1, 0, -1]}
							scale={[0.5, 0.5, 0.5]}
						>
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
					</ViroPortalScene>
				</ViroARImageMarker>

				<ViroImage
					height={0.2}
					width={0.2}
					transformBehaviors={"billboard"}
					position={[-2, -0.3, -2]}
					source={require("./res/redShield.png")}
					onClick={this._funFactFound}
				/>
				<ViroSound
					source={require("./res/fanfare.mp3")}
					loop={false}
					paused={this.state.trumpetPause}
					volume={1}
				/>

				<ViroText
					text="In the 1600s the castle became a ruin"
					scale={[0.7, 0.7, 0.7]}
					position={[-2, -0.5, -2]}
					style={styles.helloWorldTextStyle}
					outerStroke={{
						type: "Outline",
						width: 1,
						color: "orange"
					}}
					visible={this.state.funFactVisible}
				/>

				<ViroImage
					height={0.2}
					width={0.2}
					transformBehaviors={"billboard"}
					position={[2, -1, 2]}
					source={require("./res/redShield.png")}
					onClick={this._funFactFound2}
				/>

				<ViroText
					text="In 1272 some knights were caught illegally hunting deer"
					scale={[0.7, 0.7, 0.7]}
					position={[2, -1.3, 2]}
					transformBehaviors={"billboard"}
					style={styles.helloWorldTextStyle}
					outerStroke={{
						type: "Outline",
						width: 1,
						color: "orange"
					}}
					visible={this.state.funFactVisible2}
				/>
			</ViroARScene>
		);
	}

	_onAnchorFound() {
		this.setState({
			text: "",
			sound1: true,
			image1: true,
			sound2: false,
			introPause: true,
			psalterImage1: false
		});
	}

	_onAnchorFoundTwo() {
		this.setState({
			text: "Images of medieval life",
			sound1: false,
			image1: false,
			sound2: true,
			psalterImage1: true,
			introPause: true
		});
	}

	_onAnchorFoundThree() {
		this.setState({
			text:
				"A range of artefacts were found at WC. Many are kept at Birmingham Museum",
			sound1: false,
			image1: false,
			sound2: false,
			psalterImage1: false,
			introPause: true
		});
	}

	_onPortalEnter() {
		this.setState({
			pauseVideo: false,
			psalterImage1: false,
			introPause: true
		});
	}

	_onPortalExit() {
		this.setState({
			pauseVideo: true,
			psalterImage1: false
		});
	}

	_onPortalEnterRuins() {
		this.setState({
			ruinsPause: false,
			introPause: true,
			psalterImage1: false
		});
	}

	_onPortalExitRuins() {
		this.setState({
			ruinsPause: true,
			psalterImage1: false
		});
	}
	_funFactFound() {
		this.setState({
			funFactVisible: !this.state.funFactVisible,
			trumpetPause: false
		});
	}
	_funFactFound2() {
		this.setState({
			funFactVisible2: !this.state.funFactVisible2,
			trumpetPause: false
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
