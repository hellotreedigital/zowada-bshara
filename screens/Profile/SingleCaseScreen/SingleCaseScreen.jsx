import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { askNormalQuestion, rateNewCase } from "../../../api/Booking/Booking";
import AppContext from "../../../appContext/AppContext";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import Avatar from "../../../components/Avatar/Avatar";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";
import { RatingModal } from "../../../components/Modals/RatingModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import PenSVG from "../../../SVGR/Globals/Pen";
import numeral from "numeral";
import { SearchBox } from "../../../components/SearchBox/SearchBox";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import { caseActions, closeCase } from "../../../api/Clients/Clients";
import { askCaseQuestion, otherUser } from "../../../api/Profile/Profile";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
const SingleCaseScreen = ({ navigation, route }) => {
  const {
    data,
    expertView,
    clientName,
    fees,
    notification,
    cost,
    from,
    to,
    name,
    date,
    location,
    zoomLink,
    senderId,
    closed,
    caseID,
  } = route.params;
  const [caseCost, setCaseCost] = useState(cost);
  const { canBookForFree, fixedTitles, userData } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(null);
  const [newCaseModal, setNewCaseModal] = useState(false);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [newCaseLoader, setNewCaseLoader] = useState(false);
  const [cantRate, setCantRate] = useState(true);
  const [titleString, setTitleString] = useState("");
  const [answerString, setAnswerString] = useState("");
  const [linkString, setLinkString] = useState("");
  const [singlePageLoader, setSinglePageLoader] = useState(false);
  const [onlineCase, setOnlineCase] = useState(null);
  const [zoomError, setZoomError] = useState(null);

  let hours = data?.appointments[0]?.from.split(":")[0];
  let mins = data?.appointments[0]?.from.split(":")[1];

  let toHours = data?.appointments[0]?.to.split(":")[0];
  let toMins = data?.appointments[0]?.to.split(":")[1];

  React.useEffect(() => {
    setCantRate(data.rating == null ? true : false);
  }, []);

  const ratingHandler = () => {
    setModalVisible(true);
  };

  const newCasesHandler = () => {
    setNewCaseLoader(false);
    setNewCaseModal(true);
  };

  const submitRatingHandler = () => {
    setRatingLoading(true);
    var ratingFormdata = new FormData();
    ratingFormdata.append("case_id", data.id);
    if (ratingComment !== "") {
      ratingFormdata.append("rating_comment", ratingComment);
    }
    ratingFormdata.append("rating", rating);

    rateNewCase(ratingFormdata)
      .then((res) => {
        setRatingLoading(false);
        setModalVisible(false);
        setCantRate(false);
      })
      .catch((err) => {
        setRatingLoading(false);
      });
  };

  const zoomHandler = () => {
    if (data?.appointments[0]?.location == null) {
      if (data?.appointments[0]?.zoom_link !== null) {
        if (expertView) {
          Linking.openURL(data?.appointments[0]?.zoom_link);
        } else {
          Linking.openURL(data?.appointments[0]?.zoom_link);
        }
      }
    }
  };

  const caseActionHandler = (data, id, type) => {
    setOnlineCase(data.appointments[0].location == null ? true : false);
    if (type == "reject") {
      navigation.navigate("rejectCaseScreen", {
        id: data.appointments[0].case_id,
        type,
        notification: false,
      });
    } else {
      setNewCaseModal(true);
    }
  };

  const acceptCaseHandler = () => {
    setNewCaseLoader(true);
    let formdata = new FormData();
    if (linkString !== "") {
      formdata.append("zoom_link", linkString);
    }
    caseActions(formdata, data.appointments[0].case_id, "accept")
      .then((res) => {
        if (!notification) {
          navigation.navigate("singleClient");
        } else {
          navigation.pop();
        }
        setNewCaseModal(false);
      })
      .catch((err) => {
        if (err.response.data.errors.zoom_link) {
          setZoomError(err.response.data.errors.zoom_link);
        }
      })
      .finally((err) => {
        setNewCaseLoader(false);
      });
  };

  const otherProfileViewHandler = () => {
    if(data?.expert?.id){
    if (userData?.is_expert == 1 && userData.id == data?.expert.id) {
      otherUser(data.user_id).then((res) => {
        navigation.navigate("otherProfile", {
          data: res.data,
        });
      });
    } else {
      otherUser(data.expert_id).then((res) => {
        navigation.navigate("otherProfile", {
          data: res.data,
        });
      });
    }
  }else{

    if (userData?.is_expert == 1 && userData.id == data.appointments[0].expert_id) {
      otherUser(data.appointments[0].user_id).then((res) => {
        navigation.navigate("otherProfile", {
          data: res.data,
        });
      });
    } else {
      otherUser(data.appointments[0].expert_id).then((res) => {
        navigation.navigate("otherProfile", {
          data: res.data,
        });
      });
    }
  }

  };

  const closeCaseHandler = () => {
    setSinglePageLoader(true);
    closeCase(data.id)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {})
      .finally(() => {
        setSinglePageLoader(false);
      });
  };

  const normalQuestionHandler = () => {
    setSinglePageLoader(true);
    let formdata = new FormData();
    formdata.append("subject", titleString);
    formdata.append("value", answerString);
    formdata.append("case_id", data.id);
    askCaseQuestion(formdata)
      .then((res) => {
        //
        setTitleString("");
        setAnswerString("");
      })
      .catch((err) => {})
      .finally(() => {
        setSinglePageLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color={colors.dark_blue}
            animating={singlePageLoader}
          />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={expertView ? -160 : -160}
        >
          <View style={styles.header}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.pop()}
                style={styles.spacing}
              >
                <ArrowSVG
                  style={{
                    transform: [
                      { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                    ],
                  }}
                  fill={colors.dark_yellow}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ right: 30, top: 0 }}
              >
                <Typography
                  content={data?.name}
                  size={20}
                  bold={true}
                  color={colors.dark_yellow}
                  align="left"
                />
              </TouchableOpacity>
            </View>
            {!expertView && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FormScreen", {
                    bookingType: "Paid",
                  })
                }
                style={styles.icon}
              >
                <PenSVG />
              </TouchableOpacity>
            )}
          </View>
          {expertView && (
            <>
              {data?.accepted == 1 && (
                <View style={styles.approval}>
                  <Typography
                    color={"#CFD9DC"}
                    content={data.status.title}
                    size={14}
                    roman={true}
                    align="left"
                  />
                </View>
              )}
            </>
          )}
          {!expertView ? (
            <>
              {data.accepted == 0 && (
                <View style={styles.approval}>
                  <Typography
                    color={"#CFD9DC"}
                    content={
                      fixedTitles.expertsTitles["waiting-approval"].title
                    }
                    size={14}
                    roman={true}
                    align="left"
                  />
                </View>
              )}
            </>
          ) : (
            <>
              {data.accepted == 0 && (
                <View style={styles.approval}>
                  <Typography
                    color={"#CFD9DC"}
                    content={data.status.title}
                    size={14}
                    roman={true}
                    align="left"
                  />
                </View>
              )}
            </>
          )}

          <View>
            <View style={styles.card}>
              <View>
                <Typography
                  content={fixedTitles.expertsTitles["about-reservation"].title}
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
                  content={data.details}
                />
              </View>
            </View>
            <View>
              <View style={[styles.card, styles.secondCard]}>
                <View
                  style={[
                    styles.row,
                    { alignItems: "flex-start", marginBottom: 10 },
                  ]}
                >
                  <View style={{ marginRight: 8 }}>
                    {data.image ? (
                      <ImageBackground
                        style={styles.image}
                        source={{ uri: data.image }}
                      />
                    ) : (
                      <>
                        {name ? (
                          <TouchableOpacity
                            onPress={() => otherProfileViewHandler()}
                          >
                            <Avatar name={name} loader={false} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => otherProfileViewHandler()}
                          >
                            <Avatar
                              name={
                                expertView ? clientName : data.expert?.full_name
                              }
                              loader={false}
                            />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                  <View
                    style={{
                      top: expertView
                        ? SCREEN_HEIGHT * 0.027
                        : SCREEN_HEIGHT * 0.011,
                    }}
                  >
                    <View>
                      {name ? (
                        <View
                          style={{
                            top:
                              Platform.OS === "ios" ? SCREEN_HEIGHT * 0.012 : 0,
                          }}
                        >
                          <Typography
                            content={name}
                            color={colors.dark_blue}
                            size={16}
                            bold={true}
                            align="left"
                          />
                        </View>
                      ) : (
                        <Typography
                          content={
                            expertView ? clientName : data.expert?.full_name
                          }
                          color={colors.dark_blue}
                          size={16}
                          bold={true}
                          align="left"
                        />
                      )}
                    </View>
                    <View style={{ top: -12 }}>
                      <Typography
                        fit={true}
                        lines={1}
                        content={data.expert?.educational_background}
                        color={colors.dark_blue}
                        size={14}
                        bold={false}
                        align="left"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  {!closed && (
                    <TouchableOpacity
                      onPress={
                        () =>
                          navigation.navigate("singleChat", {
                            data: {
                              sender_id:
                                userData?.is_expert !== 1
                                  ? data?.expert_id
                                  : data?.user_id,
                              recipient_image:
                                userData?.is_expert !== 1
                                  ? data.expert?.image_absolute_url
                                  : data.expert?.image_absolute_url,
                              name:
                                userData?.is_expert !== 1
                                  ? data.expert?.full_name
                                  : clientName,
                            },
                          })
                        //
                      }
                      style={styles.button}
                    >
                      <Typography
                        content={fixedTitles.expertsTitles["chat"].title}
                        color={colors.white}
                        size={14}
                        align="center"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View>
              <View style={styles.card}>
                <View>
                  <Typography
                    content={fixedTitles.expertsTitles["price"].title}
                    align="left"
                    bold={true}
                    color={"#E8AF2E"}
                    size={14}
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: 15,
                    top: -10,
                  }}
                >
                  {caseCost ? (
                    <Typography
                      fit={true}
                      lines={1}
                      size={29}
                      color={colors.dark_blue}
                      bold={true}
                      align="left"
                      content={`${numeral(caseCost).format("0,0")} LBP`}
                    />
                  ) : (
                    <Typography
                      fit={true}
                      lines={1}
                      size={29}
                      color={colors.dark_blue}
                      bold={true}
                      align="left"
                      content={`${numeral(
                        expertView ? data.cost : data.cost
                      ).format("0,0")} LBP`}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Typography
                  content={fixedTitles.expertsTitles["about-meeting"].title}
                  align="left"
                  bold={true}
                  color={"#E8AF2E"}
                  size={14}
                />
              </View>
              <View style={styles.row}>
                <View>
                  <Typography
                    content={fixedTitles.expertsTitles["date"].title}
                    color={"#E8AF2E"}
                    size={14}
                    bold={true}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  {date ? (
                    <Typography
                      content={date}
                      color={colors.dark_blue}
                      size={12}
                    />
                  ) : (
                    <Typography
                      content={data?.appointments[0]?.date}
                      color={colors.dark_blue}
                      size={12}
                    />
                  )}
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Typography
                    content={fixedTitles.expertsTitles["from-to"].title}
                    color={"#E8AF2E"}
                    size={14}
                    bold={true}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  {from && to ? (
                    <Typography
                      color={colors.dark_blue}
                      content={`${from}-${to}`}
                    />
                  ) : (
                    <Typography
                      color={colors.dark_blue}
                      content={`${hours}:${mins}-${toHours}:${toMins}`}
                    />
                  )}
                </View>
              </View>
              {expertView ? (
                <>
                  {!notification && (
                    <>
                      <View style={styles.row}>
                        <View>
                          <Typography
                            content={fixedTitles.expertsTitles["type"].title}
                            color={"#E8AF2E"}
                            size={14}
                            bold={true}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => zoomHandler()}
                          style={{ marginLeft: 10 }}
                        >
                          <Typography
                            color={colors.focused}
                            content={
                              data?.appointments[0]?.location !== null
                                ? data?.appointments[0]?.location
                                : data?.appointments[0]?.zoom_link !== null
                                ? "Online Meeting"
                                : "Online Meeting"
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  {notification && (
                    <>
                      <View style={styles.row}>
                        <View>
                          <Typography
                            content={fixedTitles.expertsTitles["type"].title}
                            color={"#E8AF2E"}
                            size={14}
                            bold={true}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => zoomHandler()}
                          style={{ marginLeft: 10 }}
                        >
                          <Typography
                            color={colors.focused}
                            content={
                              location !== null
                                ? location
                                : zoomLink !== null
                                ? "Online Meeting"
                                : "Online Meeting"
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </>
              ) : (
                <>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <View>
                        <Typography
                          content={fixedTitles.expertsTitles["type"].title}
                          color={"#E8AF2E"}
                          size={14}
                          bold={true}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => zoomHandler()}
                        style={{ marginLeft: 10 }}
                      >
                        <Typography
                          color={colors.focused}
                          content={
                            data?.appointments[0]?.location !== null
                              ? data?.appointments[0]?.location
                              : data?.appointments[0]?.zoom_link !== null
                              ? "Online Meeting"
                              : "Online Meeting"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
            {!closed && (
              <>
                {cost !== 0 && (
                  <View style={[styles.card, styles.autoCard]}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Typography
                          content={
                            fixedTitles.expertsTitles["ask-a-question"].title
                          }
                          align="left"
                          bold={true}
                          color={"#E8AF2E"}
                          size={14}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("questionList", {
                            caseID: data.id,
                          })
                        }
                      >
                        <Typography
                          content={`عرض كل الأسئلة`}
                          align="left"
                          bold={false}
                          color={colors.dark_blue}
                          size={12}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.questionaire}>
                      <View style={styles.topInput}>
                        <SearchBox
                          width={"100%"}
                          placeholder={
                            fixedTitles.expertsTitles["question-title"].title
                          }
                          searchString={titleString}
                          setSearchString={setTitleString}
                        />
                      </View>
                      <View style={{ top: 0 }}>
                        <SearchBox
                          width={"100%"}
                          placeholder={
                            fixedTitles.expertsTitles["subject"].title
                          }
                          multiline={true}
                          height={SCREEN_HEIGHT * 0.09}
                          searchString={answerString}
                          setSearchString={setAnswerString}
                        />
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => normalQuestionHandler()}
                          style={[
                            styles.button,
                            {
                              backgroundColor: colors.dark_blue,
                              marginTop: 15,
                            },
                          ]}
                        >
                          <Typography
                            color={colors.white}
                            content="إرسال"
                            align="center"
                            size={14}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
            {!expertView && (
              <View style={styles.btnWrapper}>
                {cantRate && data.closed == 1 && (
                  <View>
                    <TouchableOpacity
                      onPress={() => ratingHandler()}
                      style={[
                        styles.button,
                        { backgroundColor: colors.dark_blue },
                      ]}
                    >
                      <Typography
                        content={
                          fixedTitles.expertsTitles["add-a-rating"].title
                        }
                        color={colors.white}
                        size={16}
                        align="center"
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {data.closed == 1 && (
                  <View>
                    <TouchableOpacity
                      onPress={() => newCasesHandler()}
                      style={[styles.button, { marginVertical: 15 }]}
                    >
                      <Typography
                        content={fixedTitles.expertsTitles["reopen-case"].title}
                        color={colors.white}
                        size={16}
                        align="center"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {expertView && (
              <>
                {data.status["slug"] == "case-awaiting-approval" && (
                  <View
                    style={[
                      styles.row,
                      { justifyContent: "space-evenly", marginTop: 20 },
                    ]}
                  >
                    <SecondaryButton
                      onPress={() => caseActionHandler(data, data.id, "accept")}
                      content="قبول"
                    />
                    <PrimaryButton
                      onPress={() => caseActionHandler(data, data.id, "reject")}
                      content="رفض"
                    />
                  </View>
                )}
                {userData?.id == data.expert_id &&
                  data.status["slug"] == "case-approved" && (
                    <View
                      style={{
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => closeCaseHandler()}
                        style={styles.fullBtn}
                      >
                        <Typography
                          content="اغلق القضية"
                          align="center"
                          size={16}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <RatingModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        submitRating={() => submitRatingHandler()}
        setRatingComment={setRatingComment}
        ratingComment={ratingComment}
        setRating={setRating}
        rating={rating}
        ratingLoading={ratingLoading}
        setRatingLoading={setRatingComment}
      />
      <CenteredModal
        caseID={caseID}
        caseData={data}
        expertId={data.expert_id}
        visible={newCaseModal}
        close={() => setNewCaseModal(false)}
        navigation={navigation}
        loading={newCaseLoader}
        setLoading={setNewCaseLoader}
        canBookForFree={canBookForFree}
        id={data.id}
        list={expertView}
        newCase={!expertView}
        expertView={expertView}
        searchString={linkString}
        setSearchString={setLinkString}
        submit={() => acceptCaseHandler()}
        date={data?.appointments[0]?.date}
        time={`${hours}:${mins}-${toHours}:${toMins}`}
        price={`${numeral(data.cost).format("0,0")} LBP`}
        addLink={onlineCase}
        zoomError={zoomError}
      />
    </SafeAreaView>
  );
};

export default SingleCaseScreen;

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
    paddingBottom: 6,
    width: 40,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
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
  approval: {
    width: SCREEN_WIDTH * 0.85,
    alignSelf: "center",
    top: -15,
    marginLeft: 15,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    minHeight: SCREEN_HEIGHT * 0.0856,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 3.5,

    elevation: 10,
  },
  image: {
    height: SCREEN_HEIGHT * 0.078,
    width: SCREEN_HEIGHT * 0.078,
    borderRadius: (SCREEN_HEIGHT * 0.078) / 2,
    overflow: "hidden",
  },
  secondCard: {
    padding: 15,
  },
  button: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  questionaire: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
    padding: 7,
  },
  autoCard: {
    height: "auto",
    paddingBottom: 17,
  },
  btnWrapper: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.048,
  },
  topInput: {
    marginBottom: 15,
  },
  fullBtn: {
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
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
});
