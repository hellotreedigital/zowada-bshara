import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  I18nManager,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Avatar from "../../../components/Avatar/Avatar";
import { SendMessageModal } from "../../../components/Modals/SendMessageModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import RatingsSVG from "../../../SVGR/Globals/Ratings";
import {
  askNormalQuestion,
  getUnavailableDays,
} from "../../../api/Booking/Booking";
import moment from "moment";
import AppContext from "../../../appContext/AppContext";
import { getQuestionList } from "../../../api/Profile/Profile";
import numeral from "numeral";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getUserData } from "../../../api/Userinfo/UserInformation";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";

export const ExpertSingleScreen = ({ navigation, route }) => {
  const { data } = route.params;

  const {
    cantAskFreeQuestion,
    setCantAskFreeQuestion,
    setQuestionList,
    fixedTitles,
    canBookForFree,
    setCanBookForFree,
    setUserData,
    userData,
  } = useContext(AppContext); //expertsTitles
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState("Message Sent");
  const [value, setValue] = useState(null);
  let disabledDays = [];
  let fullDays;

  React.useEffect(() => {
    setCanBookForFree(data.free_interview_used);
    setCantAskFreeQuestion(data.free_question_asked);
  }, [data]);

  const getQuestionListHandler = () => {
    getQuestionList()
      .then((res) => {
        setQuestionList(res.data.questions.data);
        getUserData()
          .then((res) => {
            setUserData(res.data.user);
            setLoadingQuestion(false);
            setModalVisible(false);
            setTimeout(() => {
              setMessage("Message Sent");
              setMessageModalVisible(true);
            }, 500);
          })
          .catch((err) => {
            setModalVisible(false);
            setTimeout(() => {
              setMessage("Message Was not sent");
              setMessageModalVisible(true);
            }, 500);
          });

        setCantAskFreeQuestion(true);
      })
      .catch((err) => {});
  };

  const normalQuestionHandler = () => {
    setLoadingQuestion(true);
    var formdata = new FormData();
    formdata.append("subject", subject);
    formdata.append("value", value);
    formdata.append("expert_id", data.id);

    askNormalQuestion(formdata)
      .then((res) => {
        getQuestionListHandler();
      })
      .catch((err) => {
        setLoadingQuestion(false);
      });
  };

  const bookingHandler = (type) => {
    setLoading(true);

    getUnavailableDays(data.id)
      .then((res) => {
        res.data.non_working_days.map((data) => {
          disabledDays.push(data.day.slug);
        });

        fullDays = res.data.full_dates;
        setLoading(false);
        navigation.navigate("calendarScreen", {
          data: data,
          bookingType: type,
          disabledDays: disabledDays,
          fullDates: fullDays,
          hours: [],
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  //
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            animating={loading}
            color={colors.dark_blue}
          />
        </View>
        <View style={styles.arrow}>
          <TouchableOpacity
            style={{ width: 40, height: 40 }}
            onPress={() => navigation.pop()}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
                marginVertical: 10,
              }}
              fill={"#E8AF2E"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userRow}>
          <View style={styles.image}>
            <Avatar
              profilePic={data.image_absolute_url}
              name={data.full_name}
              loader={false}
            />
          </View>
          <View style={styles.userInfo}>
            <View style={{ width: SCREEN_WIDTH * 0.6 }}>
              <Typography
                content={data.full_name}
                color={colors.dark_blue}
                size={16}
                bold={true}
                align="left"
                fit={true}
                lines={1}
              />
            </View>
            <View style={styles.text}>
              <Typography
                size={14}
                color={Platform.OS == "ios" ? "#CFD9DC" : colors.dark_blue}
                roman={true}
                content={data?.experience_domain?.title}
                align="left"
              />
            </View>
            <View
              style={[
                styles.ratingWrapper,
                {
                  alignSelf: "flex-start",
                  height: 1,
                  top: -SCREEN_HEIGHT * 0.029,
                },
              ]}
            >
              {/* <RatingsSVG rating={data.rating} /> */}
              <AirbnbRating
                count={5}
                isDisabled={true}
                size={10}
                defaultRating={data.rating}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.014,
            width: SCREEN_WIDTH - SCREEN_WIDTH * 0.053,
            alignSelf: "center",
          }}
        >
          <Typography
            color={colors.dark_blue}
            size={14}
            roman={true}
            align="left"
            content={
              data.years_of_experience_id +
              " " +
              fixedTitles.expertsTitles["years-of-experience"].title
            }
          />
          {data.location && (
            <Typography
              color={colors.dark_blue}
              size={14}
              roman={true}
              align="left"
              content={data.location}
            />
          )}
        </View>
        <View style={[styles.card, { height: SCREEN_HEIGHT * 0.08 }]}>
          <View style={{ paddingTop: 8 }}>
            <View style={{ height: 25 }}>
              <Typography
                content={fixedTitles.expertsTitles["number-of-cases"].title}
                align="left"
                bold={true}
                color={"#E8AF2E"}
                size={14}
              />
            </View>
            <View
              style={{ justifyContent: "center", top: -SCREEN_HEIGHT * 0.03 }}
            >
              <Typography
                content={data.case_count}
                align="right"
                bold={true}
                size={34}
                color={"#E8AF2E"}
              />
            </View>
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("expertPortfolio", {
                data,
              })
            }
            style={styles.button}
          >
            <Typography
              content={fixedTitles.expertsTitles["view-details"].title}
              color={"white"}
              size={16}
              roman={true}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { marginTop: 0 }]}>
          <View>
            <Typography
              content={fixedTitles.expertsTitles["request-reservation"].title}
              align="left"
              bold={true}
              color={"#E8AF2E"}
              size={14}
            />
          </View>
          <View>
            <Typography
              size={14}
              color={colors.dark_blue}
              roman={true}
              align="left"
              content={fixedTitles.expertsTitles["reservation-about"].title}
            />
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity
              onPress={() => bookingHandler("paid")}
              style={[styles.button, styles.smallBtn]}
            >
              <Typography
                content={fixedTitles.expertsTitles["paid-reservation"].title}
                color={"white"}
                size={12}
                roman={true}
                fit={true}
                lines={1}
              />
            </TouchableOpacity>
            {canBookForFree == null ||
              (canBookForFree == false && (
                <TouchableOpacity
                  onPress={() => bookingHandler("free")}
                  style={[styles.button, styles.smallBtn, styles.secondary]}
                >
                  <Typography
                    content={
                      fixedTitles.expertsTitles["free-reservation"].title
                    }
                    color={"white"}
                    size={12}
                    roman={true}
                    fit={true}
                    lines={1}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
        {cantAskFreeQuestion == false && data.id !== userData?.id && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.card]}
            // disabled={cantAskFreeQuestion}
          >
            <View>
              <Typography
                content={fixedTitles.expertsTitles["ask-a-question"].title}
                align="left"
                bold={true}
                color={"#E8AF2E"}
                size={14}
              />
            </View>
            <View>
              <Typography
                size={14}
                color={colors.dark_blue}
                roman={true}
                align="left"
                content={fixedTitles.expertsTitles["about-question"].title}
              />
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.button, styles.smallBtn, styles.secondary]}
                // disabled={cantAskFreeQuestion}
              >
                <Typography
                  content={fixedTitles.expertsTitles["ask-a-question"].title}
                  color={"white"}
                  size={12}
                  roman={true}
                  fit={true}
                  lines={1}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.list}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              width: SCREEN_WIDTH * 0.97,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={[styles.smallCard, { marginRight: SCREEN_WIDTH * 0.034 }]}
            >
              <View style={styles.row}>
                <View>
                  <Typography
                    content={fixedTitles.expertsTitles["rating"].title}
                    color="#E8AF2E"
                    size={14}
                    bold={true}
                    align="left"
                  />
                </View>
                {data.rating !== null && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ratings", {
                        id: data.id,
                      })
                    }
                  >
                    <Typography
                      content={fixedTitles.expertsTitles["show-all"].title}
                      color={colors.dark_blue}
                      size={12}
                      roman={true}
                      align="left"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.value}>
                <View>
                  <Typography
                    fit={true}
                    lines={1}
                    content={
                      parseFloat(data.rating).toFixed(1) ||
                      fixedTitles.expertsTitles["not-rated-yet"].title
                    }
                    size={34}
                    bold={true}
                    color={colors.dark_blue}
                    align="left"
                  />
                </View>
                {data.rating !== null && (
                  <View
                    style={{
                      position: "relative",
                      top: -SCREEN_HEIGHT * 0.0175,
                    }}
                  >
                    <Typography
                      content={
                        `${data.total_rating_comments}` +
                        " " +
                        `${fixedTitles.expertsTitles["comments"].title}`
                      }
                      size={14}
                      bold={true}
                      color={"#CFD9DC"}
                      align="left"
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.smallCard]}>
              <View style={styles.row}>
                <View>
                  <Typography
                    content={fixedTitles.expertsTitles["expense"].title}
                    color="#E8AF2E"
                    size={14}
                    bold={true}
                    align="left"
                  />
                </View>
                <View>
                  <Typography
                    content="LBP"
                    color={colors.dark_blue}
                    size={18}
                    bold={true}
                    align="left"
                  />
                </View>
              </View>
              <View style={styles.value}>
                <View>
                  <Typography
                    content={numeral(data.consultancy_fee).format("0,0")}
                    size={34}
                    bold={true}
                    color={colors.dark_blue}
                    align="left"
                    lines={1}
                    fit={true}
                  />
                </View>
                <View
                  style={{
                    position: "relative",
                    top: -SCREEN_HEIGHT * 0.0175,
                    // left: -SCREEN_WIDTH * 0.027,
                  }}
                >
                  <Typography
                    content={fixedTitles.expertsTitles["per-hour"].title}
                    size={14}
                    bold={true}
                    color={"#CFD9DC"}
                    align="left"
                  />
                </View>
              </View>
              <View
                style={{ top: -SCREEN_HEIGHT * 0.01, alignSelf: "flex-start" }}
              >
                <TouchableOpacity
                  onPress={() => bookingHandler("paid")}
                  style={[styles.button, styles.smallBtn, styles.secondary]}
                >
                  <Typography
                    content={fixedTitles.expertsTitles["reserve"].title}
                    color={"white"}
                    size={11}
                    roman={true}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <SendMessageModal
            visible={modalVisible}
            close={() => setModalVisible(false)}
            setLoadingQuestion={setLoadingQuestion}
            loadingQuestion={loadingQuestion}
            value={value}
            setValue={setValue}
            setSubject={setSubject}
            subject={subject}
            submit={() => normalQuestionHandler()}
          />
          <CenteredModal
            messageJSX={message}
            close={() => setMessageModalVisible(false)}
            visible={messageModalVisible}
            loading={false}
            message={"hi"}
            messageSent={true}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    // width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
  },
  arrow: {
    marginHorizontal: 20,
    top: 5,
  },
  image: {
    width: SCREEN_HEIGHT * 0.11,
    height: SCREEN_HEIGHT * 0.11,
  },
  userRow: {
    flexDirection: "row",
    marginTop: 20,
    width: SCREEN_WIDTH - SCREEN_WIDTH * 0.053,
    // marginHorizontal: 20,

    alignSelf: "center",
  },
  userInfo: {
    paddingLeft: SCREEN_WIDTH * 0.026,
    width: SCREEN_WIDTH - SCREEN_WIDTH * 0.053,
    alignSelf: "center",
  },
  text: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.015,
    width: SCREEN_WIDTH * 0.65,
  },
  card: {
    width: SCREEN_WIDTH - SCREEN_WIDTH * 0.053,
    alignSelf: "center",
    backgroundColor: colors.white,
    minHeight: SCREEN_HEIGHT * 0.0856,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: SCREEN_HEIGHT * 0.018,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.68,

    elevation: 15,
  },
  btn: {
    marginVertical: SCREEN_HEIGHT * 0.018,
  },
  button: {
    width: SCREEN_WIDTH - SCREEN_WIDTH * 0.053,
    alignSelf: "center",
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
    shadowOpacity: 0.16,
    shadowRadius: 6.68,

    elevation: 1,
  },
  smallBtn: {
    width: SCREEN_WIDTH * 0.35,
    borderRadius: 5,
    marginRight: 17,
    height: SCREEN_HEIGHT * 0.037,
  },
  btnRow: {
    flexDirection: "row",
    marginBottom: 17,
    marginTop: 10,
  },
  secondary: {
    backgroundColor: "#E8AF2E",
  },
  smallCard: {
    backgroundColor: "white",
    marginTop: SCREEN_HEIGHT * 0.018,
    width: SCREEN_WIDTH * 0.45,
    paddingHorizontal: 15,
    borderRadius: 10,
    minHeight: SCREEN_HEIGHT * 0.19,
    marginBottom: 15,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.68,

    elevation: 11,
  },

  list: {
    width: "97%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
  },
  ratingWrapper: {
    top: -15,
  },
  loader: {
    position: "absolute",
    top: "50%",

    alignSelf: "center",
    zIndex: 100000,
    elevation: 24,
  },
});
