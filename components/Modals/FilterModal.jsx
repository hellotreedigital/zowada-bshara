import React, { useState } from "react";
import {
  ActivityIndicator,
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import { getExpertASC } from "../../api/Expert/Expert";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";

const SORTING_DATA = [
  {
    id: "0",
    title: "A- Z",
  },
  {
    id: "1",
    title: "الأغلى",
  },
  {
    id: "2",
    title: "أرخص",
  },
];

export const FilterModal = ({
  visible,
  navigation,
  cameraHandler,
  imageHandler,
  profilePic,

  ...props
}) => {
  const [loadingResults, setLoadingResults] = useState(false);
  const [results, setResults] = useState([]);
  const [experiencedValue, setExperienceValue] = useState(null);
  let experience = ["test", "test1", "test2"];
  const getASCHandler = () => {
    setLoadingResults(true);
    getExpertASC("full_name", 1, "asc")
      .then((res) => {
        setLoadingResults(false);

        setResults(res.data.experts.data);
        props.close();
        navigation.navigate("ResultScreenScreen", {
          data: res.data.experts.data,
          fees: false,
        });
      })
      .catch((err) => {
        setLoadingResults(false);
        console.log(err);
      });
  };

  const getExpertsByFees = (fees, page, dir) => {
    setLoadingResults(true);
    getExpertASC(fees, page, dir)
      .then((res) => {
        setLoadingResults(false);
        setResults(res.data.experts.data);
        props.close();
        navigation.navigate("ResultScreenScreen", {
          data: res.data.experts.data,
          fees: true,
          dir: dir,
        });
      })
      .catch((err) => {
        setLoadingResults(false);
        console.log(err);
      });
  };

  const filterHandler = (id) => {
    switch (id) {
      case "0":
        getASCHandler();
        break;
      case "1":
        getExpertsByFees("consultancy_fee", 1, "desc");
        break;
      case "2":
        getExpertsByFees("consultancy_fee", 1, "asc");
        break;
      default:
        break;
    }
  };

  return (
    <Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={loadingResults}
            color={colors.dark_blue}
            size="large"
          />
        </View>
        <View style={styles.modalView}>
          <View>
            <TouchableOpacity onPress={() => props.close()}>
              <CloseSVG />
            </TouchableOpacity>
          </View>
          <View style={styles.filterWrapper}>
            <View>
              <Typography
                content="صنف حسب"
                color={"#E8AF2E"}
                size={20}
                bold={true}
                align="left"
              />
            </View>
            <View>
              {SORTING_DATA?.map(({ id, title }) => (
                <TouchableOpacity onPress={() => filterHandler(id)} key={id}>
                  <Typography
                    align="left"
                    content={title}
                    color={colors.dark_blue}
                    size={16}
                    roman={true}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <Typography
                content="تصفية بحسب"
                color={"#E8AF2E"}
                size={20}
                bold={true}
                align="left"
              />
            </View>
            <View style={{ width: "100%" }}>
              <ModalDropdown
                isf
                options={experience}
                dropdownStyle={styles.dropdownStyles}
                showsVerticalScrollIndicator
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={"مجال الخبرة"}
                onSelect={(item) => {
                  setExperienceValue(item);
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
                isFullWidth
                renderSeparator={() => <View />}
                renderRowComponent={TouchableOpacity}
                keyboardShouldPersistTaps="handled"
                renderRightComponent={() => {
                  return <View style={styles.arrowContainer} />;
                }}
                renderRightComponent={() => {
                  return (
                    <View style={styles.arrowContainer}>
                      <ArrowDownSVG />
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <ModalDropdown
                options={experience}
                dropdownStyle={styles.dropdownStyles}
                showsVerticalScrollIndicator
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={"  نوع الخبرة"}
                onSelect={(item) => {
                  setExperienceValue(item);
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
                isFullWidth
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
              />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.022,
    height: SCREEN_HEIGHT * 0.5,
    position: "relative",
    bottom: Platform.OS == "ios" ? -30 : 0,
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
  filterWrapper: {
    marginHorizontal: SCREEN_WIDTH * 0.032,
  },
  indicator: {
    position: "absolute",
    top: "45%",
    width: SCREEN_WIDTH,
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: "100%",
    alignSelf: "center",
  },
  dropdownStyles: {
    // width: SCREEN_WIDTH * 0.9,
    // alignSelf: "center",
    height: 100,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: !I18nManager.isRTL ? "flex-end" : "flex-start",
    position: "absolute",
  },
  containerStyles: {
    textAlign: "right",
    paddingVertical: 10,
    // alignItems: "flex-start",
    backgroundColor: "#F2F5F6",
    width: "auto",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
  },
  arrowContainer: {
    width: SCREEN_WIDTH * 0.6,
    alignItems: "flex-end",
  },
});
