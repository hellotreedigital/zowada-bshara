import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import AppContext from "../../appContext/AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { getNotifications } from "../../api/Profile/Profile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { PrimaryButton } from "../../buttons/PrimaryButton";

import { CenteredModal } from "../../components/Modals/CenterModal/CenteredModal";
import numeral from "numeral";
import { caseActions } from "../../api/Clients/Clients";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { singleJob } from "../../api/Jobs";

const NotificationBox = ({
  item,
  caseActionHandler,
  userData,
  navigation,
  index,
  fixedTitles,
  setLinkingLoader,
}) => {
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  const singleJobHandler = (id) => {
    setLinkingLoader(true);
    singleJob(id)
      .then((res) => {
        navigation.navigate("SingleJobScreen", {
          item: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLinkingLoader(false);
      });
  };

  const singleCaseHandler = (item) => {
    if (
      item.notification_slug == "job-accepted" ||
      item.notification_slug == "application-rejected" ||
      item.notification_slug == "application-under-review" ||
      item.notification_slug == "application-accepted"
    ) {
      singleJobHandler(item.job_id);
    } else if (
      item.notification_slug == "shop-accepted" ||
      item.notification_slug == "shop-edit-rejected" ||
      item.notification_slug == "shop-edit-accepted"
    ) {
      navigation.navigate("MyShops");
    } else if (
      item.notification_slug == "you-received-a-new-order" ||
      item.notification_slug == "order-delivered" ||
      item.notification_slug == "order-canceled" ||
      item.notification_slug == "order-accepted" ||
      item.notification_slug == "dispute-opened" ||
      item.notification_slug == "delivery-confirmed" ||
      item.notification_slug == "order-rejected" ||
      item.notification_slug == "delivery-rejected"
    ) {
      navigation.navigate("MyOrdersScreen");
    } else if (item.notification_slug == "free-question-asked") {
      if (case_id == null) {
        navigation.navigate("UserQuestionsScreen", {
          title: fixedTitles.profileTitles["all-questions"].title,
        });
      } else {
        navigation.navigate("questionList", {
          caseID: item?.case_id,
        });
      }
    } else if (item.notification_slug == "your-question-was-answered") {
      navigation.navigate("questionList", {
        caseID: item?.case_id,
      });
    } else if (item.notification_slug == "appointments-daily-reminder") {
      navigation.navigate("myCalendarScreen");
    } else if (item.notification_slug == "case-question-asked") {
      navigation.navigate("questionList", {
        caseID: item?.case.id,
      });
    } else if (
      item.case?.accepted == 1 ||
      (item?.case?.closed !== 1 &&
        item.case.accepted !== 1 &&
        item.case.rejection_reason_id == null)
    ) {
      if (userData?.is_expert == 1) {
        navigation.navigate("singleCaseScreen", {
          data: item.case,
          notification: true,
          expertView: userData?.is_expert === 1 ? true : false,
          clientName:
            userData?.id === item.case.expert_id
              ? item.case.user.full_name
              : item.case.expert.full_name,
          from: item?.case?.appointments[0]?.from_without_seconds,
          to: item?.case?.appointments[0]?.to_without_seconds,
          cost: item?.case?.appointments[0]?.cost,
          date: item?.case?.appointments[0]?.date,
          location: item?.case?.appointments[0]?.location,
          zoomLink: item?.case.appointments[0]?.zoom_link,
          closed: item.case.closed == 1 ? true : false,
          caseID: item?.case_id,
        });
      } else if (item?.case?.appointments[0]?.cost > 0) {
        navigation.navigate("PaymentGateWay", {
          endpoint: `appointments/${item.case.appointments[0].id}/pay`,
          formdata: null,
          id: item.case.appointments[0].id,
          type: "appointments",
        });
        // navigation.navigate("singleCaseScreen", {
        //   data: item.case,
        //   notification: true,
        //   expertView: userData?.is_expert === 1 ? true : false,
        //   clientName: item.case.user.full_name,
        //   from: item?.case?.appointments[0]?.from_without_seconds,
        //   to: item?.case?.appointments[0]?.to_without_seconds,
        //   cost: item?.case?.appointments[0]?.cost,
        //   date: item?.case?.appointments[0]?.date,
        //   location: item?.case?.appointments[0]?.location,
        //   zoomLink: item?.case.appointments[0]?.zoom_link,
        //   closed: item.case.closed == 1 ? true : false,
        //   caseID: item?.case_id,
        // });
      }
    }
  };

  return (
    <View animation={fadeIn} delay={150 * index}>
      <TouchableOpacity
        activeOpacity={Platform.OS == "ios" ? 0 : 1}
        onPress={() => singleCaseHandler(item)}
        style={styles.card}
      >
        <View style={styles.row}>
          <View>
            <Image
              style={styles.image}
              source={{ uri: item?.sender?.image_absolute_url }}
            />
          </View>
          <View style={{ width: SCREEN_WIDTH * 0.7 }}>
            <>
              <Typography
                size={12}
                content={item.subject}
                color={colors.dark_blue}
                fit={true}
                lines={2}
                bold={true}
                align="left"
              />
            </>
            <View style={{ top: -5 }}>
              <Typography
                size={12}
                content={item.description}
                color={colors.dark_blue}
                fit={true}
                lines={2}
                bold={false}
                align="left"
              />
            </View>
            <View style={{ top: -2 }}>
              <Typography
                size={8}
                color={"#10425140"}
                content={item.time_ago}
                align="left"
              />
            </View>
            <View>
              <View style={styles.row}>
                {item.notification_slug == "new-case" && (
                  <>
                    {/* to be fixed (!closed !acceped !rejected) */}
                    {item?.case?.closed !== 1 &&
                      item.case?.accepted !== 1 &&
                      item.case?.rejection_reason_id == null && (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              caseActionHandler(item?.case_id, "reject", item)
                            }
                            style={styles.button}
                          >
                            <Typography
                              content="الغاء الطلب"
                              color={colors.white}
                              align="center"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              caseActionHandler(item.case_id, "accept", item)
                            }
                            style={styles.button}
                          >
                            <Typography
                              content="قبول"
                              color={colors.white}
                              align="center"
                            />
                          </TouchableOpacity>
                        </>
                      )}
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const List = ({
  data,
  loading,
  caseActionHandler,
  getNotificationsHandler,
  setDate,
  date,
  navigation,
  userData,
  fixedTitles,
  newNotification,
  linkingLoader,
  setLinkingLoader,
  setOffset,
  offset,
  loadMoreNotifications,
  scrollLoading,
}) => {
  return (
    <View style={styles.list}>
      <FlatList
        onEndReached={loadMoreNotifications}
        contentContainerStyle={{ paddingBottom: 60 }}
        data={data}
        renderItem={({ item, index }) => (
          <NotificationBox
            setLinkingLoader={setLinkingLoader}
            linkingLoader={linkingLoader}
            fixedTitles={fixedTitles}
            index={index}
            userData={userData}
            navigation={navigation}
            setDate={setDate}
            date={date}
            caseActionHandler={(id, type, item) =>
              caseActionHandler(id, type, item)
            }
            item={item}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getNotificationsHandler}
            tintColor={colors.dark_blue}
          />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  content="You have 0 notifications"
                  color={colors.dark_blue}
                  size={12}
                  align="center"
                />
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          alignSelf: "center",
        }}
      >
        <ActivityIndicator color={colors.focused} animating={scrollLoading} />
      </View>
    </View>
  );
};

export const Notification = ({ navigation, route }) => {
  const {
    userId,
    canBookForFree,
    fixedTitles,
    userData,
    newNotification,
    setIsNotification,
    isNotification,
  } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCaseModal, setNewCaseModal] = useState(false);
  const [newCaseLoader, setNewCaseLoader] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [cost, setCost] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [linkString, setLinkString] = useState("");
  const [zoomError, setZoomError] = useState(null);
  const [online, setOnline] = useState(null);
  const newCaseModalHandler = () => {
    setLinkString("");
    setNewCaseModal(false);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsNotification(false);
    }
  }, [isFocused]);

  const [offset, setOffset] = useState(1);

  const getNotificationsHandler = () => {
    setLoading(true);
    getNotifications(1)
      .then((res) => {
        setNotifications(res.data.notifications.data);
        setOffset(offset + 1);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const [scrollLoading, setScrollLoading] = useState(false);

  const loadMoreNotifications = () => {
    setScrollLoading(true);
    getNotifications(offset)
      .then((res) => {
        setNotifications([...notifications, ...res.data.notifications.data]);
        setOffset(offset + 1);
      })
      .catch((err) => {})
      .finally(() => {
        setScrollLoading(false);
      });
  };

  const caseActionHandler = (id, type, item) => {
    setOnline(item.case.appointments[0]?.location == null ? true : false);
    setCaseId(id);
    setDate(item.case.appointments[0]?.date);
    let time = `${item.case.appointments[0]?.from_without_seconds}-${item.case.appointments[0]?.to_without_seconds}`;
    setTime(time);
    setCost(item.case.appointments[0]?.cost);
    if (type == "reject") {
      navigation.navigate("rejectCaseScreen", {
        id,
        type,
        notification: true,
      });
    } else {
      setNewCaseModal(true);
    }
  };

  const acceptCaseHandler = () => {
    setZoomError(null);
    setNewCaseLoader(true);
    let formdata = new FormData();
    if (linkString !== "") {
      formdata.append("zoom_link", linkString);
    }
    caseActions(formdata, caseId, "accept")
      .then((res) => {
        setLinkString("");
        navigation.navigate("clientScreen");
        setNewCaseModal(false);
      })
      .catch((err) => {
        if (err.response.data.errors.zoom_link) {
          setZoomError(err.response.data.errors.zoom_link);
        }
      })
      .finally(() => {
        setNewCaseLoader(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => getNotificationsHandler();

      return unsubscribe();
    }, [userId])
  );

  const [linkingLoader, setLinkingLoader] = useState(false);

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: linkingLoader ? 9 : 0, elevation: linkingLoader ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          animating={linkingLoader}
          size="large"
          color={colors.dark_orange}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          title={fixedTitles.shopTitles["notifications"].title}
          red={true}
          navigation={navigation}
        />
        <List
          scrollLoading={scrollLoading}
          setScrollLoading={setScrollLoading}
          setOffset={setOffset}
          offset={offset}
          loadMoreNotifications={loadMoreNotifications}
          setLinkingLoader={setLinkingLoader}
          linkingLoader={linkingLoader}
          fixedTitles={fixedTitles}
          setDate={setDate}
          date={date}
          getNotificationsHandler={() => getNotificationsHandler()}
          caseActionHandler={(id, type, item) =>
            caseActionHandler(id, type, item)
          }
          data={notifications}
          loading={loading}
          navigation={navigation}
          userData={userData}
          newNotification={newNotification}
        />

        <CenteredModal
          visible={newCaseModal}
          close={() => newCaseModalHandler()}
          navigation={navigation}
          loading={newCaseLoader}
          setLoading={setNewCaseLoader}
          canBookForFree={canBookForFree}
          id={caseId}
          list={true}
          newCase={false}
          expertView={true}
          searchString={linkString}
          setSearchString={setLinkString}
          submit={() => acceptCaseHandler()}
          date={date}
          time={time}
          price={`${numeral(cost).format("0,0")} LBP`}
          addLink={online}
          zoomError={zoomError}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flexGrow: 1,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingLeft: 10,
  },
  image: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    width: SCREEN_WIDTH * 0.267,
    height: SCREEN_HEIGHT * 0.042,
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
    marginRight: 10,
    elevation: 5,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
});
