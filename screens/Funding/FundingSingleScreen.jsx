import {
  ActivityIndicator,
  Button,
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import { SharedElement } from "react-navigation-shared-element";
import { ProgressBar, Colors } from "react-native-paper";
import { colors } from "../../globals/colors";
import Typography from "../../components/Typography/Typography";
import { Video as RNVideo } from "../../components/Video/Video";
import DummyGirlSVG from "../../SVGR/DummyGirl";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import {
  editFundingData,
  getFundingsById,
  removeFunding,
} from "../../api/Funding/Funding";
import numeral from "numeral";
import PenSVG from "../../SVGR/Globals/Pen";
import RemoveSVG from "../../SVGR/Globals/Remove";
import FundingModal from "../../components/Modals/CenterModal/FundingModal";
import CachedImage from "react-native-expo-cached-image";

import AppContext from "../../appContext/AppContext";
export const FundingSingleScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [fundingData, setFundingData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("هل أنت متأكد أنك تريد حذف");
  const [removeLoader, setRemoveLoader] = useState(false);
  const [hidebtn, setHideBtn] = useState(false);

  const { userData, fixedTitles } = useContext(AppContext);

  const removeHandler = () => {
    setModalVisible("true");
  };

  const closeModalHandler = () => {
    if (!hidebtn) {
      setModalVisible(false);
    } else {
      setModalVisible(false);
      navigation.pop();
    }
  };

  const confirmRemoveHandler = () => {
    setRemoveLoader(true);
    removeFunding(data.id)
      .then((res) => {
        setHideBtn(true);
        setMessage("سيتم حذف النشاط بعد موافقة المشرف");
      })
      .catch((err) => {})
      .finally(() => {
        setRemoveLoader(false);
      });
  };

  const editHandler = () => {
    editFundingData(data.id)
      .then((res) => {
        navigation.push("FundUserInfoForm", {
          editMode: true,
          editData: res.data.project,
          id: data.id,
        });
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (!isFocused) return;
    getFundingById();
  }, [isFocused]);

  const getFundingById = () => {
    setLoading(true);
    getFundingsById(data.id)
      .then((res) => {
        setFundingData(res.data.project);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <>
        <View>
          <SharedElement id={data.id}>
            <>
              <CachedImage
                source={{ uri: data.image_absolute_url }}
                style={styles.image}
              />
              <View style={styles.overlay} />
            </>
          </SharedElement>
        </View>
        {Object.keys(fundingData)?.length > 0 ? (
          <>
            <View
              onPress={() => navigation.pop()}
              style={{
                width: SCREEN_WIDTH - 40,
                alignItems: "flex-end",
                position: "absolute",
                top: Platform.OS == "ios" ? STATUS_BAR_HEIGHT : 24,
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "0deg" }],
              }}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 30,
                    right: 20,
                    height: 40,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.pop()}
                >
                  <ArrowSVG
                    style={{
                      transform: [
                        { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                      ],
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      width: "65%",
                    }}
                  >
                    <Typography
                      content={fundingData.name}
                      color={colors.white}
                      size={13}
                      fit={true}
                      lines={2}
                      align="left"
                    />
                  </View>
                </TouchableOpacity>
                {fundingData?.user_id == userData?.id && (
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => removeHandler()}
                      style={styles.icon}
                    >
                      <RemoveSVG />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => editHandler()}
                      style={styles.icon}
                    >
                      <PenSVG />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.progressbar}>
              <ProgressBar
                progress={Number(
                  fundingData.donations / fundingData.target_amount
                )}
                color={colors.focused}
                style={styles.bar}
              />
              <View style={styles.row}>
                <View style={{ marginHorizontal: 4 }}>
                  <Typography
                    content={`${numeral(fundingData.donations).format(
                      "0,0"
                    )} USD`}
                    align="left"
                    size={14}
                    bold
                    color={colors.focused}
                  />
                </View>
                <View>
                  <Typography
                    content={fixedTitles.funding["from"].title}
                    align="left"
                    color={"#CFD9DC"}
                    size={14}
                  />
                </View>
                <View style={{ marginHorizontal: 4 }}>
                  <Typography
                    content={`${numeral(fundingData.target_amount).format(
                      "0,0"
                    )} USD`}
                    align="left"
                    color={"#CFD9DC"}
                    size={14}
                  />
                </View>
              </View>
              <View>
                <Typography
                  content={`${fixedTitles.funding["governates"].title} : ${fundingData?.governate["title"]}`}
                  align="left"
                  size={14}
                  color={colors.dark_blue}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Typography
                  content={`${fixedTitles.funding["districts"].title} : ${fundingData?.district["title"]}`}
                  align="left"
                  size={14}
                  color={colors.dark_blue}
                />
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              <View>
                <RNVideo
                  videoRef={videoRef}
                  status={status}
                  setStatus={setStatus}
                  link={fundingData.video_absolute_url}
                />
              </View>
              <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
                <Typography
                  content={fixedTitles.funding["about"].title}
                  align="left"
                  size={16}
                  bold
                  color={colors.focused}
                />
              </View>
              <View style={styles.textContainer}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  align="left"
                  content={fundingData.about}
                />
              </View>
              <View style={[styles.row, styles.name, { alignItems: "center" }]}>
                <View>
                  <Image
                    style={styles.profileImage}
                    source={{ uri: fundingData.applicant_image_absolute_url }}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Typography
                    content={fundingData?.applicant_name}
                    size={16}
                    align="left"
                    bold={true}
                    color={colors.focused}
                  />
                </View>
              </View>
              <View style={styles.textContainer}>
                <Typography
                  size={14}
                  align="left"
                  color={colors.dark_blue}
                  content={fundingData?.about_applicant}
                />
              </View>
              <View style={[styles.textContainer, { marginTop: 30 }]}>
                <Typography
                  size={16}
                  bold={true}
                  align="left"
                  color={colors.focused}
                  content={fixedTitles.funding["money-user"].title}
                />
              </View>
              <View style={styles.textContainer}>
                <Typography
                  size={14}
                  bold={false}
                  align="left"
                  color={colors.dark_blue}
                  content={fundingData.purpose_of_grant}
                />
              </View>
            </ScrollView>
            <View>
              {fundingData?.closed_at === null && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("DonateScreen", {
                      id: data.id,
                    })
                  }
                  style={styles.button}
                >
                  <Typography
                    content={fixedTitles.funding["donate-now"].title}
                    size={16}
                    color={"white"}
                    align="center"
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <View
            style={{
              top: "20%",
            }}
          >
            <ActivityIndicator
              size="large"
              color={colors.dark_blue}
              animating={loading}
            />
          </View>
        )}
        <FundingModal
          visible={modalVisible}
          loading={removeLoader}
          message={message}
          close={() => closeModalHandler()}
          submit={() => confirmRemoveHandler()}
          hidebtn={hidebtn}
        />
      </>
    </View>
  );
};
FundingSingleScreen.sharedElements = (route, otherRoute, showing) => {
  if (
    otherRoute.name === "singleFunding" ||
    (otherRoute.name === "FundingSearchScreen" && showing)
  ) {
    const { data } = route.params;
    return [`${data.id}`];
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: SCREEN_HEIGHT * 0.28,
    position: "relative",
  },
  progressbar: {
    marginTop: 20,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  bar: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderRadius: 3,
    backgroundColor: "#CFD9DC",
  },
  row: {
    flexDirection: "row",
  },
  textContainer: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
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
    alignSelf: "center",
    elevation: 5,
    position: "absolute",
    bottom: 30,
  },
  name: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 26,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginHorizontal: 20,
    width: SCREEN_WIDTH - 40,
  },
  icon: {
    backgroundColor: colors.white,
    width: SCREEN_HEIGHT * 0.04,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: (SCREEN_HEIGHT * 0.04) / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.43,
    shadowRadius: 7.51,
    marginHorizontal: 5,
    elevation: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  profileImage: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_HEIGHT * 0.07,
    borderRadius: (SCREEN_HEIGHT * 0.07) / 2,
    marginBottom: 4,
  },
});
