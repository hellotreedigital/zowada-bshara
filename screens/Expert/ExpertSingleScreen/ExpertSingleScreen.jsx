import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	I18nManager,
	TouchableOpacity,
	Platform,
} from "react-native";

import Avatar from "../../../components/Avatar/Avatar";
import { SendMessageModal } from "../../../components/Modals/SendMessageModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import RatingsSVG from "../../../SVGR/Globals/Ratings";

export const ExpertSingleScreen = ({ navigation, route }) => {
	const { data } = route.params;

	const [modalVisible, setModalVisible] = useState(false);
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<SafeAreaView>
				<View style={styles.arrow}>
					<TouchableOpacity
						style={{ width: 40, height: 40 }}
						onPress={() => navigation.pop()}
					>
						<ArrowSVG
							style={{
								transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
								marginVertical: 10,
							}}
							fill={"#E8AF2E"}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.userRow}>
					<View style={styles.image}>
						<Avatar name={data.full_name} loader={false} />
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
								content={data?.experience_domain?.title}
								align="left"
							/>
						</View>
						<View style={styles.ratingWrapper}>
							<RatingsSVG />
						</View>
					</View>
				</View>
				<View
					style={{
						marginTop: SCREEN_HEIGHT * 0.014,
						width: SCREEN_WIDTH - 20,
						alignSelf: "center",
					}}
				>
					<Typography
						color={colors.dark_blue}
						size={14}
						roman={true}
						align="left"
						content={data.years_of_experience + " عاما من الخبرة"}
					/>
					{data.location && (
						<Typography
							color={colors.dark_blue}
							size={14}
							roman={true}
							align="left"
							content={data.location}
						/>
					)}
				</View>
				<View style={[styles.card, { height: SCREEN_HEIGHT * 0.08 }]}>
					<View style={{ paddingTop: 8 }}>
						<View style={{ height: 25 }}>
							<Typography
								content="عدد القضايا"
								align="left"
								bold={true}
								color={"#E8AF2E"}
								size={14}
							/>
						</View>
						<View
							style={{ justifyContent: "center", top: -SCREEN_HEIGHT * 0.03 }}
						>
							<Typography
								content="5000"
								align="right"
								bold={true}
								size={34}
								color={"#E8AF2E"}
							/>
						</View>
					</View>
				</View>

				<View style={styles.btn}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("expertPortfolio", {
								data,
							})
						}
						style={styles.button}
					>
						<Typography
							content="عرض التفاصيل"
							color={"white"}
							size={16}
							roman={true}
						/>
					</TouchableOpacity>
				</View>

				<View style={[styles.card, { marginTop: 0 }]}>
					<View>
						<Typography
							content="طلب الحجز"
							align="left"
							bold={true}
							color={"#E8AF2E"}
							size={14}
						/>
					</View>
					<View>
						<Typography
							size={14}
							color={colors.dark_blue}
							roman={true}
							align="left"
							content="صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم اهنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد "
						/>
					</View>
					<View style={styles.btnRow}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("calendarScreen", {
									data: data,
									bookingType: "paid",
								})
							}
							style={[styles.button, styles.smallBtn]}
						>
							<Typography
								content="حجز مدفوع"
								color={"white"}
								size={11}
								roman={true}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("calendarScreen", {
									data: data,
									bookingType: "free",
								})
							}
							style={[styles.button, styles.smallBtn, styles.secondary]}
						>
							<Typography
								content="استشارة مجانية"
								color={"white"}
								size={11}
								roman={true}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					style={[styles.card]}
				>
					<View>
						<Typography
							content="طرح سؤال"
							align="left"
							bold={true}
							color={"#E8AF2E"}
							size={14}
						/>
					</View>
					<View>
						<Typography
							size={14}
							color={colors.dark_blue}
							roman={true}
							align="left"
							content="صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. "
						/>
					</View>
					<View style={styles.btnRow}>
						<TouchableOpacity
							onPress={() => setModalVisible(true)}
							style={[styles.button, styles.smallBtn, styles.secondary]}
						>
							<Typography
								content="طرح سؤال"
								color={"white"}
								size={11}
								roman={true}
							/>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
				<View style={styles.list}>
					<ScrollView
						contentContainerStyle={{
							width: SCREEN_WIDTH - 20,
							justifyContent: "center",
						}}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View
							style={[styles.smallCard, { marginRight: SCREEN_WIDTH * 0.034 }]}
						>
							<View style={styles.row}>
								<View>
									<Typography
										content="تقييم"
										color="#E8AF2E"
										size={14}
										bold={true}
										align="left"
									/>
								</View>
								<TouchableOpacity>
									<Typography
										content="اظهار الكل"
										color={colors.dark_blue}
										size={12}
										roman={true}
										align="left"
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.value}>
								<View>
									<Typography
										content="4.1"
										size={34}
										bold={true}
										color={colors.dark_blue}
										align="left"
									/>
								</View>
								<View
									style={{
										position: "relative",
										top: -SCREEN_HEIGHT * 0.0175,
									}}
								>
									<Typography
										content="20 التعليقات"
										size={14}
										bold={true}
										color={"#CFD9DC"}
										align="left"
									/>
								</View>
							</View>
						</View>
						<View style={[styles.smallCard]}>
							<View style={styles.row}>
								<View>
									<Typography
										content="كلفة"
										color="#E8AF2E"
										size={14}
										bold={true}
										align="left"
									/>
								</View>
								<View>
									<Typography
										content="LBP"
										color={colors.dark_blue}
										size={18}
										bold={true}
										align="left"
									/>
								</View>
							</View>
							<View style={styles.value}>
								<View>
									<Typography
										content={data.consultancy_fee}
										size={34}
										bold={true}
										color={colors.dark_blue}
										align="left"
										lines={1}
										fit={true}
									/>
								</View>
								<View
									style={{
										position: "relative",
										top: -SCREEN_HEIGHT * 0.0175,
										// left: -SCREEN_WIDTH * 0.027,
									}}
								>
									<Typography
										content="في الساعة"
										size={14}
										bold={true}
										color={"#CFD9DC"}
										align="left"
									/>
								</View>
							</View>
							<View
								style={{ top: -SCREEN_HEIGHT * 0.01, alignSelf: "flex-start" }}
							>
								<TouchableOpacity
									// onPress={() => setModalVisible(true)}
									style={[styles.button, styles.smallBtn, styles.secondary]}
								>
									<Typography
										content="إحجز"
										color={"white"}
										size={11}
										roman={true}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
					<SendMessageModal
						visible={modalVisible}
						close={() => setModalVisible(false)}
						setModalVisible={SendMessageModal}
					/>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		marginTop: Platform.OS == "android" ? 40 : 0,
	},
	arrow: {
		marginHorizontal: 20,
		top: 5,
	},
	image: {
		width: SCREEN_HEIGHT * 0.11,
		height: SCREEN_HEIGHT * 0.11,
	},
	userRow: {
		flexDirection: "row",
		marginTop: 20,
		width: SCREEN_WIDTH - 20,

		alignSelf: "center",
	},
	userInfo: {
		paddingLeft: SCREEN_WIDTH * 0.026,
		width: SCREEN_WIDTH - 20,
		alignSelf: "center",
	},
	text: {
		position: "relative",
		top: -SCREEN_HEIGHT * 0.015,
	},
	card: {
		width: SCREEN_WIDTH - 20,
		alignSelf: "center",
		backgroundColor: colors.white,
		minHeight: SCREEN_HEIGHT * 0.0856,
		borderRadius: 10,
		paddingHorizontal: 15,
		marginTop: SCREEN_HEIGHT * 0.018,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.14,
		shadowRadius: 6.68,

		elevation: 1,
	},
	btn: {
		marginVertical: SCREEN_HEIGHT * 0.018,
	},
	button: {
		width: SCREEN_WIDTH - 20,
		alignSelf: "center",
		height: SCREEN_HEIGHT * 0.05,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.dark_blue,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.16,
		shadowRadius: 6.68,

		elevation: 1,
	},
	smallBtn: {
		width: SCREEN_WIDTH * 0.27,
		borderRadius: 5,
		marginRight: 17,
		height: SCREEN_HEIGHT * 0.03,
	},
	btnRow: {
		flexDirection: "row",
		marginBottom: 17,
		marginTop: 10,
	},
	secondary: {
		backgroundColor: "#E8AF2E",
	},
	smallCard: {
		backgroundColor: "white",
		marginTop: SCREEN_HEIGHT * 0.018,
		width: SCREEN_WIDTH * 0.45,
		paddingHorizontal: 15,
		borderRadius: 10,
		minHeight: SCREEN_HEIGHT * 0.19,
		marginBottom: 15,
		shadowColor: "#000",

		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.19,
		shadowRadius: 6.68,

		elevation: 11,
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
	ratingWrapper: {
		top: -15,
	},
});
