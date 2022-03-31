import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  I18nManager,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../../components/Avatar/Avatar";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import ArrowLeftSVG from "../../../SVGR/Globals/ArrowLeft";
import moment from "moment";
export const CalendarScreen = ({ navigation, route }) => {
  const { data, bookingType } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
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
  const [disbaledDates, setDisabledDates] = useState([]);
  let dates = [];
  function getDaysInMonth(month, year, days) {
    let pivot = moment().month(month).year(year).startOf("month");
    const end = moment().month(month).year(year).endOf("month");

    while (pivot.isBefore(end)) {
      days.forEach((day) => {
        dates.push(pivot.day(day).toISOString());
      });
      pivot.add(7, "days");
    }
    return dates;
  }

  const DISABLED_DAYS = ["Monday", "Friday", "Sunday"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.header}
        >
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View style={styles.userImage}>
          {data.image ? (
            <ImageBackground
              style={styles.image}
              source={{ uri: data.image }}
            />
          ) : (
            <Avatar loader={false} name={data.full_name} customSize={0.17} />
          )}
        </View>
        <View style={styles.userInfo}>
          <View>
            <Typography
              size={20}
              bold={true}
              content={data.full_name}
              color={colors.white}
            />
          </View>
          <View>
            {data.location && (
              <Typography
                size={16}
                content={data.location}
                color={colors.white}
              />
            )}
          </View>
          <View>
            <Typography
              content="التواريخ المتاحة"
              size={16}
              color={colors.white}
              bold={true}
            />
          </View>
        </View>
        <View style={styles.calendar}>
          <CalendarPicker
            disabledDates={disbaledDates}
            weekdays={weekdays}
            months={months}
            textStyle={{ color: colors.dark_blue, fontSize: 12 }}
            minDate={new Date()}
            selectedStartDate={selectedStartDate}
            showDayStragglers={false}
            startFromMonday={false}
            allowRangeSelection={false}
            todayBackgroundColor="transparent"
            todayTextStyle={{ color: colors.dark_blue }}
            selectedDayColor={colors.dark_yellow}
            onDateChange={(date) => {
              setSelectedStartDate(date);
            }}
            onMonthChange={(date) => {
              setDisabledDates(
                getDaysInMonth(date.month(), date.year(), DISABLED_DAYS)
              );
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
        <View style={styles.globalwidth}>
          <Typography
            content="الوقت المتاح"
            size={16}
            bold={true}
            color={colors.white}
          />
        </View>
        <View style={styles.globalwidth}>
          <View style={styles.card}>
            <View></View>
            <View></View>
            <View></View>
          </View>
        </View>
        <View style={styles.globalwidth}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FormScreen", {
                bookingType,
              });
            }}
            style={styles.button}
          >
            <Typography
              content={"طلب الحجز"}
              size={16}
              roman={true}
              color={colors.dark_blue}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8AF2E",
    paddingTop: Platform.OS == "android" ? 40 : 0,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  image: {
    height: SCREEN_HEIGHT * 0.17,
    width: SCREEN_HEIGHT * 0.17,
    borderRadius: (SCREEN_HEIGHT * 0.17) / 2,
    overflow: "hidden",
  },
  userImage: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
  },
  userInfo: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 15,
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
  calendar: {
    backgroundColor: colors.white,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: SCREEN_HEIGHT * 0.04,
    marginBottom: 20,
  },
  boldText: {
    color: colors.dark_yellow,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "HelveticaBold",
  },
  yearTitle: {
    display: "none",
  },
  globalwidth: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 12,
  },
});
