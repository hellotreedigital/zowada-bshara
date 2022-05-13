import React, { useEffect, useState, useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  I18nManager,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import Avatar from "../../../components/Avatar/Avatar";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import ArrowLeftSVG from "../../../SVGR/Globals/ArrowLeft";
import { getAvailableHours } from "../../../api/Booking/Booking";
import moment from "moment";
import AppContext from "../../../appContext/AppContext";
export const RenderItem = ({
  item,
  hoursHandler,
  hoursRange,
  loading,
  index,
}) => {
  return (
    <TouchableOpacity
      disabled={loading ? true : false}
      onPress={() => hoursHandler()}
      style={styles.hoursCard}
    >
      <Typography
        fit={true}
        lines={1}
        content={`${item.label.from}-${item.label.to}`}
        color={
          hoursRange.includes(item.value)
            ? colors.dark_yellow
            : colors.dark_blue
        }
        size={12}
        align="left"
        bold={hoursRange.includes(item.value) ? true : false}
      />
    </TouchableOpacity>
  );
};

export const CalendarScreen = ({ navigation, route }) => {
  const { fixedTitles } = useContext(AppContext);
  const buttonData = [
    {
      id: "0",
      title: "15 Mins",
      value: 15,
    },
    {
      id: "1",
      title: "30 Mins",
      value: 30,
    },
    {
      id: "2",
      title: "1 hour",
      value: 60,
    },
  ];

  const {
    data,
    bookingType,
    disabledDays,
    fullDates,
    hours,
    reopen,
    id,
    caseID,
  } = route.params;

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [filterHours, setFilterHours] = useState(hours);
  const [weekdays, setWeekdays] = useState(["S", "M", "T", "W", "T", "F", "S"]);
  const [activeButton, setActiveButton] = useState([
    bookingType == "paid" ? 60 : 15,
  ]);
  const [hoursRange, setHoursRange] = useState([]);

  const [loadingData, setLoadingData] = useState(false);
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
  const [disbaledDates, setDisabledDates] = useState();
  const [temp, setTemp] = useState(null);
  let dates = [];
  let full_dates = [];
  function getFullDates() {
    fullDates?.map((date) => {
      full_dates.push(moment(date).toISOString());
    });

    setDisabledDates(full_dates);
  }
  useEffect(() => {
    getFullDates();
    // getDaysInMonth()

    let date = new Date();
    setDisabledDates(
      getDaysInMonth(moment(date).month(), moment(date).year(), disabledDays)
    );
  }, []);

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

  const buttonHandler = (id) => {
    setActiveButton([id]);
    setHoursRange([]);
    getHoursPerIntervalHandler(
      moment(selectedStartDate).format("YYYY-MM-DD"),
      id
    );
  };

  const hoursHandler = (slug, slugIndex) => {
    var index = hoursRange.indexOf(slug.value);

    if (index !== -1) {
      hoursRange.splice(index, 1);
      setHoursRange([...hoursRange]);
    } else {
      if (bookingType === "paid") {
        if (activeButton == 15) {
          setHoursRange([slug.value]);
        } else if (activeButton == 30) {
          setHoursRange([slug.value]);
        } else if (activeButton == 60) {
          if (hoursRange.length == 0) {
            setTemp(filterHours.indexOf(slug));

            setHoursRange([...hoursRange, slug.value]);
          }
          if (filterHours.indexOf(slug) - 1 == temp) {
            if (hoursRange.length == 1) {
              setHoursRange([...hoursRange, slug.value]);
            }
          }
        }
      } else {
        setHoursRange([slug.value]);
      }
    }
  };

  const getHoursPerIntervalHandler = (date) => {
    console.log(date);

    setLoadingData(true);
    getAvailableHours(
      moment(date).format("YYYY-MM-DD"),
      id || activeButton,
      data.id
    )
      .then((res) => {
        setLoadingData(false);
        console.log(res.data.intervals);
        // setFilterHours(res?.data?.intervals);
      })
      .catch((err) => {
        setLoadingData(false);
      });
  };

  const submitCase = () => {
    navigation.navigate("FormScreen", {
      bookingType,
      data: data,
      date: moment(selectedStartDate).format("YYYY-MM-DD"),
      time: hoursRange,
      expert_id: data.id,
      range: activeButton,
      reopen: reopen,
      case_id: caseID,
    });
  };
  let server = "https://staging.zowada-backend.hellotree.dev/storage/";

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
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
          {data.image_absolute_url ? (
            <>
              <View style={{ position: "relative" }}>
                <Image
                  style={styles.image}
                  source={{ uri: data.image_absolute_url }}
                />
                <View
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "42%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator color={colors.dark_blue} />
                </View>
              </View>
              <View style={styles.rating}>
                <Typography
                  content={parseFloat(data.rating).toFixed(1)}
                  color={colors.dark_yellow}
                  size={17}
                  align="center"
                />
              </View>
            </>
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
              content={fixedTitles.expertsTitles["available-days"].title}
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
              getHoursPerIntervalHandler(date);
            }}
            onMonthChange={(date) => {
              setDisabledDates(
                getDaysInMonth(date.month(), date.year(), disabledDays)
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
            content={fixedTitles.expertsTitles["available-time"].title}
            size={16}
            bold={true}
            color={colors.white}
          />
        </View>
        <View style={styles.row}>
          {buttonData.map((data, index) => {
            if (bookingType === "free") {
              if (data.value === 15) {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => buttonHandler(data.value)}
                    style={[
                      styles.calendarButton,
                      activeButton.includes(data.value) && {
                        backgroundColor: colors.dark_blue,
                      },
                    ]}
                  >
                    <View style={{ top: 1 }}>
                      <Typography
                        content={data.title}
                        color={
                          activeButton.includes(data.value)
                            ? colors.white
                            : colors.dark_blue
                        }
                        size={12}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
            } else {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => buttonHandler(data.value)}
                  style={[
                    styles.calendarButton,
                    activeButton.includes(data.value) && {
                      backgroundColor: colors.dark_blue,
                    },
                  ]}
                >
                  <View style={{ top: 1 }}>
                    <Typography
                      content={data.title}
                      color={
                        activeButton.includes(data.value)
                          ? colors.white
                          : colors.dark_blue
                      }
                      size={12}
                    />
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <View style={styles.globalwidth}>
          <View style={styles.hoursLoader}>
            <ActivityIndicator
              color={colors.dark_blue}
              animating={loadingData}
            />
          </View>
          <View style={styles.hoursList}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterHours}
              renderItem={({ item, index }) => {
                return (
                  <RenderItem
                    index={index}
                    item={item}
                    hoursRange={hoursRange}
                    setHoursRange={setHoursRange}
                    hoursHandler={() => hoursHandler(item, index)}
                    loading={loadingData}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: SCREEN_WIDTH * 0.6,
                    }}
                  >
                    <Typography
                      content={
                        selectedStartDate
                          ? fixedTitles.expertsTitles["not-available"].title
                          : fixedTitles.expertsTitles["select a day"].title
                      }
                      color={colors.dark_blue}
                      size={12}
                      align="center"
                      fit={true}
                      lines={1}
                    />
                  </View>
                );
              }}
              numColumns={2}
              keyExtractor={(item) => item.value.to}
            />
          </View>
        </View>
        <View style={styles.globalwidth}>
          <TouchableOpacity
            disabled={
              selectedStartDate == null || hoursRange.length === 0
                ? true
                : false
            }
            onPress={() => {
              submitCase();
            }}
            style={styles.button}
          >
            <Typography
              content={fixedTitles.expertsTitles["request-reservation"].title}
              size={16}
              roman={true}
              color={colors.dark_blue}
            />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8AF2E",
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
    zIndex: 10000000,
    // position: "relative",
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
  hoursCard: {
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  hoursList: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: SCREEN_WIDTH * 0.7,
    // maxWidth: SCREEN_WIDTH * 0.75,

    height: "auto",
    maxHeight: SCREEN_HEIGHT * 0.25,
    marginBottom: 30,
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: "40%",
    zIndex: 10000,
  },
  row: {
    flexDirection: "row",
    width: SCREEN_WIDTH,

    alignItems: "center",
    justifyContent: "center",
  },
  calendarButton: {
    backgroundColor: "white",
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.035,
    width: SCREEN_WIDTH * 0.16,
    alignItems: "center",
  },
  hoursLoader: {
    position: "absolute",
    zIndex: 100,
    elevation: 10,
    height: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
  rating: {
    height: SCREEN_HEIGHT * 0.045,
    width: SCREEN_HEIGHT * 0.045,
    borderRadius: (SCREEN_HEIGHT * 0.045) / 2,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 10000000,
    alignItems: "center",
    justifyContent: "center",
    bottom: -5,
    left: SCREEN_WIDTH / 1.95,
    borderWidth: 1,
    borderColor: colors.dark_yellow,
  },
});
