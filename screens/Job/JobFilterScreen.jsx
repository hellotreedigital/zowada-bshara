import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import RangeSlider from "rn-range-slider";
import { filter } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import { Dropdown } from "react-native-element-dropdown";

import { Header } from "../../components/Header/Header";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT } from "../../globals/globals";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
let loadingData = true;

let districtsOptions = [];
const THUMB_RADIUS = 12;

export const Thumb = () => {
  return <View style={styles.ThumbRoot} />;
};

export const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.labelRoot} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export const Rail = () => {
  return <View style={styles.raitRoot} />;
};

export const RailSelected = () => {
  return <View style={styles.RailSelected} />;
};

export const JobFilterScreen = ({ navigation }) => {
  const [searchString, setSearchString] = useState("");

  const { fixedTitles, maxSalary } = useContext(AppContext);

  const [loctionId, setLocationId] = useState();

  let districtsOptionsId = [];

  useEffect(() => {
    if (loadingData) {
      fixedTitles.districts.map((data) => {
        districtsOptions.push({
          label: data.title,
          value: data.id,
        });
      });
    }
    loadingData = false;
  }, [districtsOptionsId]);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(maxSalary);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const [loading, setLoading] = useState(false);

  const filterHandler = () => {
    setLoading(true);
    filter(searchString, loctionId, low, high)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        navigation.navigate("JobFilterResultScreen", {
          data: res.data.jobs.data,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.dark_orange} />
      </View>
      <SafeAreaView style={styles.container}>
        <Header blue title="فلتر" navigation={navigation} />
        <View>
          <View style={{ paddingBottom: 10 }}>
            <SearchBox
              setSearchString={setSearchString}
              searchString={searchString}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Dropdown
              style={[
                styles.containerStyles,
                // isFocus && { borderColor: "blue" },
              ]}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.dropdownStyles}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={districtsOptions}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder={"موقع العمل"}
              searchPlaceholder="Search..."
              value={loctionId}
              renderItem={(item) => (
                <View style={{ padding: 10 }}>
                  <Typography
                    content={item.label}
                    align="left"
                    color={colors.dark_blue}
                  />
                </View>
              )}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(e) => {
                setLocationId(e.value);
              }}
            />
            {/* <ModalDropdown
              options={districtsOptions}
              dropdownStyle={styles.dropdownStyles}
              isFullWidth
              showsVerticalScrollIndicator={false}
              style={[
                styles.containerStyles,
                // { marginBottom: errorObject.errorVisible ? 0 : 15 },
              ]}
              textStyle={styles.label}
              defaultValue={"موقع العمل"}
              onSelect={(item) => {
                setLocationId(districtsOptionsId[item]);
              }}
              renderRowText={(item) => {
                return (
                  <View>
                    <Typography
                      size={12}
                      content={item}
                      align="right"
                      color={colors.dark_blue}
                    />
                  </View>
                );
              }}
              renderSeparator={() => <View />}
              renderRowComponent={TouchableOpacity}
              keyboardShouldPersistTaps="handled"
              renderRightComponent={() => {
                return (
                  <View style={styles.arrowContainer}>
                    <ArrowDownSVG />
                  </View>
                );
              }}
            /> */}
          </View>
          <View>
            <Typography
              content={`( ${low}/${high} )`}
              align="center"
              color={colors.dark_orange}
            />
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <View style={{ marginRight: 20 }}>
              <Typography
                content="راتب"
                align="left"
                color={colors.dark_blue}
                size={16}
              />
            </View>

            <View style={{ width: 200, alignSelf: "center" }}>
              <RangeSlider
                style={styles.slider}
                min={0}
                max={maxSalary}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                // renderNotch={renderNotch}
                onValueChanged={handleValueChange}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => filterHandler()}
              style={styles.button}
            >
              <Typography content="تطبيق" align="center" color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dropdownStyles: {
    backgroundColor: "white",
    height: 100,
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  containerStyles: {
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    top: 4,
  },
  multi: {
    height: 159,
    textAlignVertical: "top",
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    alignItems: "flex-end",
    right: 0,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ThumbRoot: {
    width: 10,
    height: 10,
    borderRadius: 5,

    borderColor: "#7f7f7f",
    backgroundColor: colors.dark_orange,
  },
  labelRoot: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#4499ff",
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  raitRoot: {
    flex: 1,
    height: 1,
    borderRadius: 2,
    backgroundColor: "#CFD9DC",
  },
  railSelected: {
    height: 4,
    backgroundColor: "#4499ff",
    borderRadius: 2,
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
    marginTop: 20,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  placeholderStyle: {
    fontFamily: "HelveticaRegular",
    color: colors.dark_blue,
    paddingBottom: SCREEN_HEIGHT * 0.008,
    textAlign: I18nManager.isRTL ? "left" : "right",
  },
});
