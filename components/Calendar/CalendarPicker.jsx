import React, { useState } from "react";
import {
	I18nManager,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import moment from "moment";
import ArrowLeftSVG from "../../SVGR/Globals/ArrowLeft";
import ArrowSVG from "../../SVGR/Globals/Arrow";
export const CalendarModal = ({
	selectedStartDate,
	setSelectedStartDate,
	setIsCalendar,
}) => {
	const onDateChange = (date) => {
		const formatted_date = moment.utc(date).format("YYYY-MM-DD");
		setSelectedStartDate(formatted_date);
		setTimeout(() => {
			setIsCalendar(false);
		}, 400);
	};
	const [weekdays, setWeekdays] = useState(["S", "M", "T", "W", "T", "F", "S"]);

	const [months, setMonths] = useState([
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	]);
	return (
		<>
			<View style={styles.calendar}>
				<CalendarPicker
					weekdays={weekdays}
					months={months}
					textStyle={{ color: colors.dark_blue, fontSize: 12 }}
					// minDate={new Date()}
					selectedStartDate={selectedStartDate}
					showDayStragglers={false}
					startFromMonday={false}
					allowRangeSelection={false}
					todayBackgroundColor="transparent"
					todayTextStyle={{ color: colors.dark_blue }}
					selectedDayColor={colors.dark_yellow}
					onDateChange={(date) => {
						onDateChange(date);
					}}
					width={SCREEN_WIDTH * 0.8}
					selectMonthTitle="Select Month"
					selectedDayTextColor="white"
					selectYearTitle=""
					dayLabelsWrapper={styles.dayHeader}
					previousComponent={
						I18nManager.isRTL ? (
							<ArrowSVG
								style={{
									transform: [
										{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
									],
								}}
								fill={"#E8AF2E"}
							/>
						) : (
							<ArrowSVG
								style={{
									transform: [
										{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
									],
								}}
								fill={"#E8AF2E"}
							/>
						)
					}
					nextComponent={
						I18nManager.isRTL ? (
							<ArrowLeftSVG
								style={{
									transform: [
										{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
									],
								}}
							/>
						) : (
							<ArrowLeftSVG
								style={{
									transform: [
										{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
									],
								}}
							/>
						)
					}
					monthTitleStyle={[styles.boldText, styles.subtitle]}
					yearTitleStyle={[styles.boldText, styles.yearTitle]}
					customDayHeaderStyles={() => {
						return {
							style: styles.dayHeader,
							textStyle: [styles.arrowText],
						};
					}}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	calendar: {
		backgroundColor: colors.white,
		width: SCREEN_WIDTH * 0.9,
		alignSelf: "center",
		borderRadius: 10,
		paddingVertical: SCREEN_HEIGHT * 0.04,
		marginBottom: 20,
		position: "absolute",
		top: -130,
		zIndex: 10000,
		elevation: 100,
	},
	dayHeader: {
		borderWidth: 0,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	arrowText: {
		padding: "5%",
		color: colors.dark_blue,
		textAlign: "center",
		fontSize: 12,
		fontFamily: "HelveticaRegular",
		fontWeight: "600",
	},

	boldText: {
		color: colors.dark_yellow,
		fontWeight: "bold",
		fontSize: 14,
		fontFamily: "HelveticaBold",
	},
	yearTitle: {
		// display: "none",
		marginHorizontal: 8,
	},
	globalwidth: {
		width: SCREEN_WIDTH * 0.9,
		alignSelf: "center",
		alignItems: "center",
	},
	regularText: {
		fontSize: 14,
		fontFamily: "HelveticaRegular",
	},
	prevText: {
		fontSize: 12,
		color: colors.dark_blue,
	},
	monthTitle: {
		fontSize: 12,
		color: colors.dark_blue,
	},
});
