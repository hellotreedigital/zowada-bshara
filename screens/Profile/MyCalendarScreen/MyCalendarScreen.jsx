import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  ImageBackground,
  FlatList,
  Linking,
  ActivityIndicator,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { appointments, getAppointments } from "../../../api/Profile/Profile";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  aspectRatio,
} from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import ArrowLeftSVG from "../../../SVGR/Globals/ArrowLeft";
import RedArrowSVG from "../../../SVGR/Globals/RedArrow";
import moment from "moment";
import AppContext from "../../../appContext/AppContext";

export const RenderCard = ({ item, userData, fixedTitles }) => {
  let hours = item?.from?.split(":")[0];
  let mins = item?.from?.split(":")[1];

  let toHours = item?.to.split(":")[0];
  let toMins = item?.to.split(":")[1];

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            {userData?.is_expert == 0 ? (
              <ImageBackground
                source={{ uri: item?.expert?.image_absolute_url }}
                style={styles.image}
              />
            ) : (
              <ImageBackground
                source={{ uri: item?.user?.image_absolute_url }}
                style={styles.image}
              />
            )}
          </View>
          <View>
            <View>
              {userData?.is_expert == 0 ? (
                <Typography
                  fit={true}
                  lines={1}
                  align="left"
                  content={item.expert?.full_name}
                  color={colors.dark_blue}
                  size={14}
                  bold={true}
                />
              ) : (
                <Typography
                  fit={true}
                  lines={1}
                  align="left"
                  content={item.user?.full_name}
                  color={colors.dark_blue}
                  size={14}
                  bold={true}
                />
              )}
            </View>

            <View style={{ top: -5 }}>
              <Typography
                align="left"
                content={item.status.title}
                color={`#CFD9DC`}
                size={14}
                bold={false}
              />
            </View>
          </View>
        </View>
        <View>
          <View>
            <Typography
              content={item?.date}
              align="left"
              size={14}
              color={colors.dark_blue}
            />
          </View>
          <View>
            <Typography
              content={`${hours}:${mins}-${toHours}:${toMins}`}
              align="left"
              size={14}
              color={colors.dark_blue}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              item?.location == null &&
              item?.zoom_link &&
              Linking.openURL(item?.zoom_link || "")
            }
          >
            <Typography
              content={
                item.location == null
                  ? item.zoom_link
                    ? "Online Metting"
                    : ""
                  : "Location"
              }
              align="left"
              size={14}
              color={colors.dark_blue}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
//c
const MyCalendarScreen = ({ navigation }) => {
  const [weekdays, setWeekdays] = useState(["S", "M", "T", "W", "T", "F", "S"]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const { fixedTitles, userData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(false);
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

  useEffect(() => {
    appointmentsHandler(selectedStartDate);
  }, []);

  const appointmentsHandler = (date) => {
    setLoader(true);
    let formdata = new FormData();
    formdata.append("day", moment(date).format("YYYY-MM-DD"));
    getAppointments(formdata)
      .then((res) => {
        setLoader(false);

        setAppointments(res.data.appointments);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.header}
        >
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={styles.spacing}
            >
              <RedArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
              />
            </TouchableOpacity>
            <View>
              <Typography
                content={fixedTitles.profileTitles["my-calendar"].title}
                size={20}
                bold={true}
                color={colors.focused}
                align="left"
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.calendar}>
          <CalendarPicker
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
            selectedDayColor={colors.focused}
            onDateChange={(date) => {
              setSelectedStartDate(date);
              appointmentsHandler(date);
            }}
            onMonthChange={(date) => {
              // setDisabledDates(
              //   getDaysInMonth(date.month(), date.year(), disabledDays)
              // );
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
                  fill={colors.focused}
                />
              ) : (
                <ArrowSVG
                  style={{
                    transform: [
                      { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                    ],
                  }}
                  fill={colors.focused}
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
                  fill={colors.focused}
                />
              ) : (
                <ArrowLeftSVG
                  style={{
                    transform: [
                      { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                    ],
                  }}
                  fill={colors.focused}
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
      </View>
      <View
        style={{
          height: aspectRatio > 2 ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.34,
          paddingBottom: aspectRatio > 2 ? 60 : 100,
        }}
      >
        {!loader ? (
          <FlatList
            renderItem={({ item }) => {
              return (
                <RenderCard
                  userData={userData}
                  item={item}
                  fixedTitles={fixedTitles}
                />
              );
            }}
            data={appointments}
            extraData={appointments}
            key={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <>
                  {!loader ? (
                    <View style={{ alignSelf: "center" }}>
                      <Typography
                        color={colors.dark_blue}
                        size={12}
                        content="No appoinments for this date"
                      />
                    </View>
                  ) : (
                    <View>
                      <ActivityIndicator
                        color={colors.dark_blue}
                        animating={loader}
                      />
                    </View>
                  )}
                </>
              );
            }}
          />
        ) : (
          <View>
            <ActivityIndicator animating={loader} color={colors.dark_blue} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  spacing: {
    marginRight: 12,
    paddingBottom: I18nManager.isRTL ? 6 : 0,
    paddingTop: I18nManager.isRTL ? 0 : 10,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 20,
  },
  icon: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 2.65,

    elevation: 5,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.84,

    elevation: 5,
  },
  boldText: {
    color: colors.focused,
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
  image: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    overflow: "hidden",
    marginRight: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.65,

    elevation: 5,
  },
});
