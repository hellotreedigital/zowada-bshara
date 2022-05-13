import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  I18nManager,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../../components/Header/Header";
import AppContext from "../../../appContext/AppContext";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import Checkbox from "expo-checkbox";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import { Dropdown } from "react-native-element-dropdown";
import AddHoursSVG from "../../../SVGR/Profile/AddHours";
import RemoveHoursSVG from "../../../SVGR/Profile/RemoveHours";
import { updateWorkingHours } from "../../../api/Profile/Profile";
import { getUserData } from "../../../api/Userinfo/UserInformation";
import { useIsFocused } from "@react-navigation/native";

const RenderItem = ({
  item,
  isActive,
  setIsActive,
  availability,
  setAvailability,
  fromHour,
  setFromHour,
  showDropDown,
  setShowDropDown,
  intervals,
  dayIndex,
}) => {
  function toggleIsWorking(dayIndex) {
    let newAvailability = [...availability];
    newAvailability[dayIndex].is_working =
      !newAvailability[dayIndex].is_working;
    setAvailability(newAvailability);
  }

  function getIntervalValue(timeString) {
    let value = null;
    intervals.forEach((interval) => {
      if (interval.value === timeString) {
        value = interval;
      }
    });

    return value;
  }

  function addClick(dayIndex) {
    let newAvailability = [...availability];
    newAvailability[dayIndex].daily_schedule.push({
      from: "",
      to: "",
    });
    setAvailability(newAvailability);
  }

  function removeInterval(dayIndex, scheduleIndex) {
    if (availability[dayIndex].daily_schedule.length === 1) return;

    let newAvailability = [...availability];
    newAvailability[dayIndex].daily_schedule.splice(scheduleIndex, 1);
    setAvailability(newAvailability);
  }
  function setSelectedFrom(dayIndex, scheduleIndex, newValue) {
    let newAvailability = [...availability];
    newAvailability[dayIndex].daily_schedule[scheduleIndex].from =
      newValue.value;
    if (
      newAvailability[dayIndex].daily_schedule[scheduleIndex].to <
      newValue.value
    ) {
      newAvailability[dayIndex].daily_schedule[scheduleIndex].to = null;
    }
    setAvailability(newAvailability);
  }
  function getIntervalsToOptions(dayIndex, scheduleIndex) {
    let options = [];
    intervals.forEach((interval) => {
      if (
        interval.value >
        availability[dayIndex].daily_schedule[scheduleIndex].from
      ) {
        options.push(interval);
      }
    });
    return options;
  }
  function setSelectedTo(dayIndex, scheduleIndex, newValue) {
    let newAvailability = [...availability];
    newAvailability[dayIndex].daily_schedule[scheduleIndex].to = newValue.value;
    setAvailability(newAvailability);
  }

  return (
    <>
      <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            style={styles.checkbox}
            onValueChange={() => toggleIsWorking(dayIndex)}
            color={colors.dark_blue}
            value={item?.is_working == 1 ? true : false}
          />
        </View>

        <View>
          <Typography
            content={item.day.title}
            color={colors.dark_blue}
            align="left"
            size={16}
          />
        </View>
        {item?.is_working == 1 && (
          <View>
            <View key={dayIndex.toString()} style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => addClick(dayIndex)}>
                <AddHoursSVG />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <>
        {item?.is_working == 1 && (
          <View>
            {item.daily_schedule.map((data, scheduleIndex) => {
              // console.log(getIntervalValue(data.from));
              return (
                <View
                  key={scheduleIndex.toString()}
                  style={{
                    flexDirection: "row",

                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Dropdown
                    style={[
                      styles.button,
                      { marginRight: 10 },
                      // isFocus && { borderColor: "blue" },
                    ]}
                    containerStyle={{
                      borderRadius: 10,
                      marginTop: 5,
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={intervals}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={getIntervalValue(data.from)?.label || "select"}
                    searchPlaceholder="Search..."
                    value={getIntervalValue(data.from)}
                    // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setSelectedFrom(dayIndex, scheduleIndex, item);
                    }}
                  />
                  <Dropdown
                    style={[
                      styles.button,
                      // isFocus && { borderColor: "blue" },
                    ]}
                    containerStyle={{ borderRadius: 10, marginTop: 5 }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={getIntervalsToOptions(dayIndex, scheduleIndex)}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={getIntervalValue(data.to)?.label || "select"}
                    searchPlaceholder="Search..."
                    value={getIntervalValue(data.to)} // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    // onChange={(item) => {
                    onChange={(newValue) =>
                      setSelectedTo(dayIndex, scheduleIndex, newValue)
                    }
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      opacity: item?.daily_schedule.length === 1 ? 0 : 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => removeInterval(dayIndex, scheduleIndex)}
                    >
                      <RemoveHoursSVG />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </>
    </>
  );
};

export const EditHours = ({ navigation }) => {
  const isFocused = useIsFocused();

  const {
    availability,
    setAvailability,
    fixedTitles,
    intervals,
    setIntervals,
    setAvailabilyHours,
    userData,
  } = useContext(AppContext);

  const [isActive, setIsActive] = React.useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [fromHour, setFromHour] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
    setAvailability(userData.availability);
  }, [isFocused]);

  const userDataHandler = () => {
    getUserData()
      .then((res) => {
        setIntervals(res.data.intervals);
        setAvailabilyHours(res.data);
        setLoading(false);
        navigation.pop();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  function workingHours() {
    setLoading(true);
    let data = {
      availability: availability,
    };

    updateWorkingHours(data)
      .then((res) => {
        userDataHandler();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  }

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          color={colors.dark_blue}
          animating={loading}
          size="large"
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          title={fixedTitles.profileTitles["working-hours"].title}
          red
          navigation={navigation}
        />
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 20 }} />;
            }}
            data={availability}
            renderItem={({ item, index }) => (
              <RenderItem
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                fromHour={fromHour}
                setFromHour={setFromHour}
                dayIndex={index}
                availability={availability}
                item={item}
                isActive={isActive}
                setIsActive={setIsActive}
                setAvailability={setAvailability}
                intervals={intervals}
              />
            )}
            ListFooterComponent={() => (
              <View>
                <TouchableOpacity
                  onPress={() => workingHours()}
                  style={styles.saveButton}
                >
                  <Typography
                    content={fixedTitles.profileTitles["save"].title}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: SCREEN_HEIGHT * 0.012,
    marginLeft: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.012,
    width: SCREEN_HEIGHT * 0.012,
    borderWidth: 1,
  },
  containerStyles: {
    backgroundColor: colors.dark_blue,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    width: 120,
    height: 45,
  },
  arrowContainer: {
    position: "absolute",
    right: 0,
  },
  dropdownStyles: {
    paddingTop: 15,
    paddingHorizontal: 10,
    // position: "absolute",
    right: 0,
    marginTop: 15,
    borderRadius: 10,
    height: "auto",
    // alignItems: "flex-start",
    height: 150,
  },
  label: {
    fontFamily: "HelveticaLight",
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#F2F5F6",
    height: SCREEN_HEIGHT * 0.04,
    width: SCREEN_WIDTH * 0.23,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    width: SCREEN_WIDTH * 0.9,
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
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 20,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
