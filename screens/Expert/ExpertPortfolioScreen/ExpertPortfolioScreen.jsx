import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	I18nManager,
	TouchableOpacity,
} from "react-native";

import Avatar from "../../../components/Avatar/Avatar";
import { SendMessageModal } from "../../../components/Modals/SendMessageModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import RatingsSVG from "../../../SVGR/Globals/Ratings";

export const ExpertPortfolioScreen = ({ navigation, route }) => {
	const { data } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<SafeAreaView>
				<View style={styles.arrow}>
					<TouchableOpacity
						style={{
							width: 20,
							height: 40,
							justifyContent: "center",
							paddingTop: 12,
						}}
						onPress={() => navigation.pop()}
					>
						<ArrowSVG
							style={{
								transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
							}}
							fill={"#E8AF2E"}
						/>
					</TouchableOpacity>
					<View style={{ marginBottom: SCREEN_HEIGHT * 0.024 }}>
						<Typography
							content="عرض المجموعة"
							size={20}
							bold={true}
							color="#E8AF2E"
						/>
					</View>
				</View>
				<View style={styles.userRow}>
					<View style={styles.image}>
						<Avatar loader={false} name={data.full_name} />
					</View>
					<View style={styles.userInfo}>
						<View>
							<Typography
								content={data.full_name}
								color={colors.dark_blue}
								size={16}
								bold={true}
								align="left"
							/>
						</View>
						<View style={styles.text}>
							<Typography
								size={14}
								color={"#CFD9DC"}
								roman={true}
								content={data.experience_domain.title}
								align="left"
							/>
						</View>
						<View style={{ top: -SCREEN_HEIGHT * 0.015 }}>
							<RatingsSVG />
						</View>
					</View>
				</View>
				<View>
					<Typography
						color={colors.dark_blue}
						size={14}
						roman={true}
						align="left"
						content={data.years_of_experience + " عاما من الخبرة"}
					/>
					<Typography
						color={colors.dark_blue}
						size={14}
						roman={true}
						align="left"
						content={data.location}
					/>
				</View>
				{data.about && (
					<View style={[styles.card, { width: "99%", padding: 10 }]}>
						<Typography
							size={14}
							roman={true}
							align="left"
							content={data.about}
						/>
					</View>
				)}
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 22,
		marginTop: Platform.OS == "android" ? 40 : 0,
	},
	arrow: {
		flexDirection: "row",
	},
	image: {
		width: SCREEN_HEIGHT * 0.11,
		height: SCREEN_HEIGHT * 0.11,
	},
	userRow: {
		flexDirection: "row",
	},
	userInfo: {
		paddingLeft: SCREEN_WIDTH * 0.016,
	},
	text: {
		position: "relative",
		top: -SCREEN_HEIGHT * 0.015,
	},
	card: {
		width: "97%",
		alignSelf: "center",
		backgroundColor: colors.white,
		minHeight: SCREEN_HEIGHT * 0.0856,
		borderRadius: 10,
		paddingHorizontal: 15,
		marginTop: 10,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.14,
		shadowRadius: 3.5,

		elevation: 10,
	},
	btn: {
		marginVertical: 15,
	},
	button: {
		width: "100%",
		height: SCREEN_HEIGHT * 0.05,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.dark_blue,
		borderRadius: 10,
		shadowColor: "#00000070",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.45,
		shadowRadius: 3.84,

		elevation: 5,
	},
	smallBtn: {
		width: SCREEN_WIDTH * 0.27,
		borderRadius: 5,
		marginRight: 17,
		height: SCREEN_HEIGHT * 0.03,
	},
	btnRow: {
		flexDirection: "row-reverse",
		marginBottom: 17,
		marginTop: 10,
	},
	secondary: {
		backgroundColor: "#E8AF2E",
	},
	smallCard: {
		backgroundColor: "white",
		marginTop: 15,
		width: SCREEN_WIDTH * 0.415,
		paddingHorizontal: 15,
		borderRadius: 10,
		minHeight: SCREEN_HEIGHT * 0.19,
		marginBottom: 15,
	},
	list: {
		width: "97%",
		alignSelf: "center",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 6,
	},
});
