import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import Modal from "react-native-modal";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { BlurView } from "expo-blur";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import { LinearGradient } from "react-native-svg";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import AppContext from "../../appContext/AppContext";

const daysRender = ({ item, index }) => {
  return <DaysItem name={item} index={index} />;
};
const MonthRender = ({ item, index }) => {
  return <MonthItem name={item} index={index} />;
};

const Item = React.memo(
  ({ opacity, selected, vertical, fontSize, name, setSelected, index }) => {
    return (
      <View
        style={[
          styles.optionWrapper,
          {
            opacity,
            borderColor: "transparent",
            width: SCREEN_WIDTH * 0.3,
            height: 40,
            // alignSelf: "center",
          },
        ]}
      >
        <Typography
          fit={true}
          lines={1}
          bold={true}
          color={colors.dark_blue}
          content={name}
          align="center"
        />
      </View>
    );
  }
);
const MonthItem = React.memo(
  ({ selected, vertical, fontSize, name, setSelected, index }) => {
    return (
      <View
        style={[
          styles.optionWrapper,
          {
            borderColor: "transparent",
            width: SCREEN_WIDTH * 0.3,
            height: 40,
            alignItems: "flex-start",
          },
        ]}
      >
        <Typography
          fit={true}
          lines={1}
          bold={true}
          color={colors.dark_blue}
          content={name}
          align="center"
        />
      </View>
    );
  }
);
const ItemToRender = (
  { item, index, flatlistKey },
  indexSelected,
  vertical,
  setSelected
) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  return (
    <Item
      selected={selected}
      vertical={vertical}
      name={item}
      setSelected={setSelected}
      index={index}
    />
  );
};
const DaysItem = ({
  selected,
  vertical,
  fontSize,
  name,
  setSelected,
  index,
}) => {
  return (
    <View
      style={[
        styles.optionWrapper,
        {
          width: SCREEN_WIDTH * 0.2,
          height: 40,
        },
      ]}
    >
      <Typography
        fit={true}
        lines={1}
        bold={true}
        color={colors.dark_blue}
        content={name}
        align="center"
      />
    </View>
  );
};

const WheelPicker = ({ visible, setSelectedStartDate, future, ...props }) => {
  const { fixedTitles } = useContext(AppContext);

  const [selectedDay, setSelectedDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [daysIndex, setDaysIndex] = useState(1);
  const [monthIndex, setMonthIndex] = useState(1);
  const [yearIndex, setYearIndex] = useState(0);

  const yearsRef = useRef(null);
  const daysRef = useRef(null);
  const monthRef = useRef(null);
  var n = new Date().getFullYear() - 18;
  var futureYears = new Date().getFullYear() + 10;
  var YEARS = Array.from(
    { length: future ? futureYears : n },
    (item, index) => index + 1
  );

  var PRESENT_YEARS = Array.from(
    { length: new Date().getFullYear() + 10 },
    (item, index) => index + 1
  );

  function generateArrayOfYears() {
    var max = new Date().getFullYear() + 10;
    var min = max - 10;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }

  const yearListRef = null;
  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [DAYS, setDAYS] = useState([]);
  useEffect(() => {
    DaysHandler();
  }, []);

  const updateBirthdate = () => {
    setUpdateBirthdate(yearIndex + "-" + monthIndex + "-" + daysIndex);
    let date = daysIndex + "-" + MONTHS[monthIndex - 1] + "-" + yearIndex;
    setBirthday(date);
    setTimeout(() => {
      close();
    }, 100);
  };

  const DaysHandler = () => {
    let days = new Date(yearIndex, monthIndex + 1, 0).getDate();
    setDAYS(Array.from(Array(days + 1).keys()).slice(1));
  };

  const wheelEndResultHandler = () => {
    let year =
      yearIndex == 0
        ? future
          ? 2032
          : props.present
          ? 2020
          : 2004
        : yearIndex;
    if (!props.present) {
      setSelectedStartDate(daysIndex + "-" + monthIndex + "-" + year);
    } else {
      setSelectedStartDate(year + "-" + monthIndex + "-" + daysIndex);
    }
    props.close();
  };

  // useEffect(() => {
  //   if (props.present) {
  //     monthRef?.current?.scrollToIndex({
  //       animated: false,
  //       index: new Date().getMonth() - 2,
  //     });
  //     daysRef?.current?.scrollToIndex({
  //       animated: false,
  //       index: new Date().getDay(),
  //     });
  //     // let monthIndex = new Date().getMonth();
  //     // setMonthIndex([monthIndex]);
  //     // setDaysIndex(DAYS[new Date().getDay() + 2]);
  //     // console.log("re render");
  //     // setYearIndex(generateArrayOfYears()[2]);
  //     // console.log(generateArrayOfYears()[2]);
  //   }
  // }, [props]);

  // useEffect(() => {
  //   setMonthIndex([new Date().getMonth() - 2]);
  //   setDaysIndex(new Date().getDate());
  // }, []);

  return (
    <Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => props.close()} style={styles.header}>
            <CloseSVG />
          </TouchableOpacity>

          <View style={styles.body}>
            <View style={[styles.dateContainer]}>
              <FlatList
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) =>
                    setTimeout(resolve, 500)
                  );
                  wait.then(() => {
                    monthRef.current?.scrollToIndex({
                      index: 0,
                      animated: true,
                    });
                  });
                }}
                initialScrollIndex={0}
                ref={monthRef}
                style={{ elevation: 10 }}
                data={MONTHS}
                renderItem={MonthRender}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                setSelected={setSelectedMonth}
                contentContainerStyle={{ paddingVertical: 80 }}
                decelerationRate="fast"
                onMomentumScrollEnd={(ev) => {
                  setTimeout(() => {
                    DaysHandler();
                  }, 100);

                  const newIndex = ev.nativeEvent.contentOffset.y / 40;
                  setMonthIndex(newIndex + 1);
                }}
              />
              <View style={{ elevation: 10 }}>
                <FlatList
                  onScrollToIndexFailed={(info) => {
                    const wait = new Promise((resolve) =>
                      setTimeout(resolve, 500)
                    );
                    wait.then(() => {
                      daysRef.current?.scrollToIndex({
                        index: 0,
                        animated: true,
                      });
                    });
                  }}
                  initialScrollIndex={0}
                  ref={daysRef}
                  style={{ elevation: 10 }}
                  data={DAYS}
                  renderItem={daysRender}
                  keyExtractor={(item) => item.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 80 }}
                  snapToInterval={40}
                  //   scrollEventThrottle={30}
                  setSelected={setSelectedDay}
                  decelerationRate="fast"
                  onMomentumScrollEnd={(ev) => {
                    const newIndex = ev.nativeEvent.contentOffset.y / 40;
                    setDaysIndex(DAYS[newIndex]);
                  }}
                />
              </View>
              <FlatList
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) =>
                    setTimeout(resolve, 500)
                  );
                  wait.then(() => {
                    yearsRef.current?.scrollToIndex({
                      index: 0,
                      animated: true,
                    });
                  });
                }}
                initialScrollIndex={0}
                ref={yearsRef}
                style={{ elevation: 10 }}
                data={
                  props.present
                    ? generateArrayOfYears().reverse()
                    : YEARS.reverse()
                }
                renderItem={ItemToRender}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                setSelected={setSelectedMonth}
                contentContainerStyle={{
                  paddingVertical: 80,
                }}
                decelerationRate="fast"
                onMomentumScrollEnd={(ev) => {
                  const newIndex = ev.nativeEvent.contentOffset.y / 40;
                  if (!props.present) {
                    setYearIndex(YEARS[newIndex]);
                  } else {
                    setYearIndex(generateArrayOfYears()[newIndex]);
                  }
                }}
              />
              <View
                style={{
                  backgroundColor: "#CFD9DC",
                  height: 44,
                  width: SCREEN_WIDTH * 0.9,

                  position: "absolute",
                  top: 77,
                  left: -20,
                  alignItems: "center",
                  borderRadius: 22,
                  zIndex: -1,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.19,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              />
              <LinearGradient
                pointerEvents="none"
                colors={["#fff", "rgba(255,255,255,0)", "#fff"]}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => wheelEndResultHandler()}
              style={styles.button}
            >
              <Typography
                content={fixedTitles.funding["save"].title}
                color="white"
                size={16}
                align="center"
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default WheelPicker;

const styles = StyleSheet.create({
  modalView: {
    height: SCREEN_HEIGHT * 0.47,
    position: "relative",
    bottom: Platform.OS == "ios" ? 0 : 30,
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

    elevation: 9,
  },
  blurContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  header: {
    padding: SCREEN_HEIGHT * 0.02,
  },
  optionWrapper: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  dateContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",

    width: SCREEN_WIDTH,
    height: 200,
    position: "relative",
    left: 30,
  },
  button: {
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
    alignSelf: "center",
    marginTop: 30,
  },
});
