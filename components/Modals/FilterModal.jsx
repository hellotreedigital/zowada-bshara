import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import {
  getByExperienceDomain,
  getByExperienceType,
  getExpertASC,
} from "../../api/Expert/Expert";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import AppContext from "../../appContext/AppContext";

export const FilterModal = ({
  visible,
  navigation,
  cameraHandler,
  imageHandler,
  profilePic,
  allExperts,
  setAllExperts,
  loadingResults,
  setLoadingResults,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);
  const [results, setResults] = useState([]);
  const [experiencedValue, setExperienceValue] = useState(null);

  let experience = [];
  let expeienceType = [];
  let experienceId = [];
  let experienceTypeId = [];

  React.useEffect(() => {
    fixedTitles.experience.map((data) => {
      experience.push(data.title);
      experienceId.push(data.id);
    });
    fixedTitles.experienceType.map((data) => {
      expeienceType.push(data.title);
      experienceTypeId.push(data.id);
    });
  }, [props]);

  const SORTING_DATA = [
    {
      id: "0",
      title: fixedTitles.expertsTitles["a-z"].title,
    },
    {
      id: "1",
      title: fixedTitles.expertsTitles["higher-price"].title,
    },
    {
      id: "2",
      title: fixedTitles.expertsTitles["lower-price"].title,
    },
  ];
  const getASCHandler = () => {
    setLoadingResults(true);
    props.close();
    getExpertASC("full_name", 1, "asc")
      .then((res) => {
        setLoadingResults(false);
        if (allExperts) {
          setAllExperts(res.data.experts);
          props.close();
        } else {
          setResults(res.data.experts);
          props.close();
          navigation.navigate("ResultScreenScreen", {
            data: res.data.experts,
            fees: false,
          });
        }
      })
      .catch((err) => {
        setLoadingResults(false);
      });
  };

  const getByEperienceDomainHandler = (id) => {
    props.close();
    setLoadingResults(true);
    getByExperienceDomain(id)
      .then((res) => {
        setLoadingResults(false);
        if (allExperts) {
          setAllExperts(res.data.experts);
        } else {
          navigation.navigate("ResultScreenScreen", {
            data: res.data.experts,
            fees: false,
            search: false,
            filter: true,
          });
        }
      })
      .catch((err) => {
        setLoadingResults(false);
      });
  };

  const getByEperienceTypeHandler = (id) => {
    props.close();
    setLoadingResults(true);
    getByExperienceType(id)
      .then((res) => {
        setLoadingResults(false);
        if (allExperts) {
          setAllExperts(res.data.experts);
        } else {
          navigation.navigate("ResultScreenScreen", {
            data: res.data.experts,
            fees: false,
            search: false,
            filter: true,
          });
        }
      })
      .catch((err) => {
        setLoadingResults(false);
      });
  };

  const getExpertsByFees = (fees, page, dir) => {
    props.close();
    setLoadingResults(true);
    getExpertASC(fees, page, dir)
      .then((res) => {
        setLoadingResults(false);
        if (allExperts) {
          setAllExperts(res.data.experts);
        } else {
          setResults(res.data.experts);

          navigation.navigate("ResultScreenScreen", {
            data: res.data.experts,
            fees: true,
            dir: dir,
          });
        }
      })
      .catch((err) => {
        setLoadingResults(false);
      });
  };

  const filterHandler = (id) => {
    switch (id) {
      case "0":
        getASCHandler();
        break;
      case "1":
        // setFeesDir("desc")
        getExpertsByFees("consultancy_fee", 1, "desc");
        break;
      case "2":
        // setFeesDir("asc")
        getExpertsByFees("consultancy_fee", 1, "asc");
        break;
      default:
        break;
    }
  };

  return (
    <Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.modalView}>
          <View>
            <TouchableOpacity onPress={() => props.close()}>
              <CloseSVG />
            </TouchableOpacity>
          </View>
          <View style={styles.filterWrapper}>
            <View>
              <Typography
                content={fixedTitles.expertsTitles["sort-by"].title}
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
                content={fixedTitles.expertsTitles["filter"].title}
                color={"#E8AF2E"}
                size={20}
                bold={true}
                align="left"
              />
            </View>
            <View style={{ width: "100%" }}>
              <ModalDropdown
                options={experience}
                dropdownStyle={styles.dropdownStyles}
                showsVerticalScrollIndicator={false}
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={fixedTitles.expertsTitles["experience"].title}
                onSelect={(item) => {
                  setExperienceValue(experienceId[item]);
                  getByEperienceDomainHandler(experienceId[item]);
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
                showsVerticalScrollIndicator={false}
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={
                  fixedTitles.expertsTitles["experience-type"].title
                }
                onSelect={(item) => {
                  setExperienceValue(experienceTypeId[item]);
                  getByEperienceTypeHandler(experienceTypeId[item]);
                }}
                renderRowText={(item) => {
                  return (
                    <View
                      style={
                        {
                          // alignSelf: "flex-start",
                        }
                      }
                    >
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
    height: SCREEN_HEIGHT * 0.55,
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
    // marginHorizontal: SCREEN_WIDTH * 0.032,
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
    marginTop: 12,
    // borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 5,
    height: 100,
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  containerStyles: {
    textAlign: "right",
    paddingVertical: 10,
    // alignItems: "flex-start",
    backgroundColor: "#F2F5F6",
    // width: "auto",
    // borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
  },
  arrowContainer: {
    position: "absolute",
    alignItems: "flex-end",
    right: 10,
  },
});
