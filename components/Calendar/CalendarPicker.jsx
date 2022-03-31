import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import moment from "moment";
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
    }, 200);
  };

  return (
    <View style={styles.dateContainer}>
      <CalendarPicker
        showDayStragglers={false}
        startFromMonday={false}
        allowRangeSelection={false}
        todayBackgroundColor="transparent"
        maxDate={new Date()}
        onDateChange={(date, type) => onDateChange(date, type)}
        monthTitleStyle={[styles.regularText, styles.monthTitle]}
        yearTitleStyle={[styles.regularText, styles.monthTitle]}
        previousTitleStyle={[styles.regularText, styles.prevText]}
        nextTitleStyle={[styles.regularText, styles.prevText]}
        width={SCREEN_WIDTH * 0.8}
        selectMonthTitle="Select Month"
        selectedDayTextColor="white"
        selectYearTitle=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "5%",
    width: SCREEN_WIDTH * 0.8,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 25,
    position: "absolute",
    top: -80,
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
