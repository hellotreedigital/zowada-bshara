import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import { SearchBox } from "../SearchBox/SearchBox";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

export const SendMessageModal = ({
	visible,
	navigation,
	setModalVisible,
	...props
}) => {
	return (
		<Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
			<BlurView intensity={60} style={styles.blurContainer}>
				<View style={styles.avoidModal}>
					<KeyboardAccessoryView
						avoidKeyboard={Platform.OS == "android" ? false : true}
						androidAdjustResize={Platform.OS == "android" ? true : false}
						style={{ borderRadius: 10 }}
						hideBorder
						alwaysVisible
					>
						<View style={styles.modalView}>
							<View style={styles.header}>
								<TouchableOpacity
									style={{ zIndex: 1 }}
									onPress={() => props.close()}
								>
									<CloseSVG />
								</TouchableOpacity>
								<View>
									<Typography
										content="أدخل السؤال هنا"
										color={"#E8AF2E"}
										bold={true}
										size={20}
									/>
								</View>
								<View />
							</View>
							<View style={styles.body}>
								<View>
									<SearchBox placeholder="موضوع الاستفسار" />
								</View>
								<View style={{ marginTop: SCREEN_HEIGHT * 0.015 }}>
									<SearchBox
										placeholder="السؤال"
										multiline={true}
										height={SCREEN_HEIGHT * 0.19}
									/>
								</View>
							</View>
							<View>
								<TouchableOpacity style={styles.button}>
									<Typography size={16} content="إرسل" color={colors.white} />
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAccessoryView>
				</View>
			</BlurView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		minHeight: SCREEN_HEIGHT * 0.48,
		marginTop: "auto",
		backgroundColor: "white",
		width: SCREEN_WIDTH,
		alignSelf: "center",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -5,
		},

		shadowOpacity: 0.15,
		shadowRadius: 10.46,
		paddingHorizontal: SCREEN_WIDTH * 0.055,
		paddingTop: SCREEN_HEIGHT * 0.02,
		elevation: 9,
	},
	blurContainer: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		alignSelf: "center",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: SCREEN_HEIGHT * 0.036,
	},
	avoidModal: {
		backgroundColor: "white",
		flex: 1,
		bottom: Platform.OS === "ios" ? 0 : 40,
		position: "absolute",
		width: SCREEN_WIDTH,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		zIndex: 1000,
	},
	button: {
		width: SCREEN_WIDTH * 0.9,
		height: SCREEN_HEIGHT * 0.05,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E8AF2E",
		borderRadius: 10,
		shadowColor: "#00000070",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.45,
		shadowRadius: 3.84,

		elevation: 5,
		marginTop: SCREEN_HEIGHT * 0.036,
		marginBottom: SCREEN_HEIGHT * 0.036,
		zIndex: 1000000,
	},
});
