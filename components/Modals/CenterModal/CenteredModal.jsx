import React, { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
import Typography from "../../Typography/Typography";
import moment from "moment";
import {
  getAvailableHours,
  getUnavailableDays,
} from "../../../api/Booking/Booking";
import { SearchBox } from "../../SearchBox/SearchBox";
import AppContext from "../../../appContext/AppContext";

export const CenteredModal = ({
  visible,
  list,
  newCase,
  bookingType,
  date,
  time,
  loading,
  setLoading,
  navigation,
  canBookForFree,
  id,
  messageSent,
  messageJSX,
  searchString,
  setSearchString,
  price,
  addLink,
  zoomError,
  expertId,
  caseData,
  caseID,
  red,
  funding,
  editMode,
  ...props
}) => {
  const { fixedTitles, userData } = useContext(AppContext);

  const data = [
    {
      id: "0",
      title: fixedTitles.expertsTitles["date"].title,
      type: date,
    },
    {
      id: "1",
      title: fixedTitles.expertsTitles["time"].title,
      type: time,
    },
    {
      id: "2",
      title: fixedTitles.expertsTitles["case-price"].title,
      type: price,
    },
  ];
  const freeData = [
    {
      id: "0",
      title: fixedTitles.expertsTitles["date"].title,
    },
    {
      id: "1",
      title: fixedTitles.expertsTitles["time"].title,
    },
  ];

  const newCaseHandler = (type) => {
    let disabledDays = [];
    setLoading(true);
    getUnavailableDays(expertId)
      .then((res) => {
        res.data.non_working_days.map((data) => {
          disabledDays.push(data.day.slug);
        });
        fullDays = res.data.full_dates;
        setLoading(false);
        navigation.navigate("calendarScreen", {
          data: {
            id: expertId,
            full_name: caseData.expert.full_name,
          },
          bookingType: type,
          disabledDays: disabledDays,
          fullDates: fullDays,
          hours: [],
          reopen: true,
          id: id,
          caseID: caseID,
        });
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        props.close();
      });
  };

  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_yellow}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={40}
        >
          <View
            style={[
              styles.center,

              { justifyContent: "center" },
              newCase && { height: SCREEN_HEIGHT * 0.34 },
              list && { height: "auto", padding: 20 },
              funding && { height: 250 },
            ]}
          >
            <TouchableOpacity
              style={[!list && { top: -10 }, editMode && { top: -35 }]}
              onPress={() => props.close()}
            >
              <CloseSVG stroke={red ? colors.focused : colors.dark_yellow} />
            </TouchableOpacity>
            {!messageSent && (
              <View style={!list && !newCase && { top: -5 }}>
                {!newCase ? (
                  <Typography
                    content={
                      list ? "تفاصيل الحجز" : "تم تحديد موعد اجتماعك بنجاح"
                    }
                    color={colors.dark_yellow}
                    size={20}
                    bold={true}
                    align="center"
                  />
                ) : (
                  <Typography
                    content="طلب الفتح مرة أخرى"
                    color={colors.dark_blue}
                    size={16}
                    bold={false}
                    align="center"
                  />
                )}
              </View>
            )}

            {messageSent && (
              <View style={{ top: -10 }}>
                <Typography
                  content={messageJSX}
                  color={red ? colors.focused : colors.dark_yellow}
                  size={20}
                  bold={true}
                  align="center"
                />
              </View>
            )}

            {newCase && (
              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  onPress={() => newCaseHandler("paid")}
                  style={{ marginBottom: 15 }}
                >
                  <SecondaryButton
                    onPress={() => newCaseHandler("paid")}
                    content="حجز مدفوع"
                    size={16}
                  />
                </TouchableOpacity>

                {/* <View>
                {canBookForFree !== null && (
                  <TouchableOpacity
                    onPress={() => newCaseHandler("free")}
                    style={styles.button}
                  >
                    <Typography
                      content="استشارة مجانية"
                      size={16}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                )}
              </View> */}
              </View>
            )}

            {list && (
              <View>
                {bookingType !== "free" ? (
                  <>
                    {data.map((data, index) => {
                      return (
                        <View style={styles.flex} key={index.toString()}>
                          <View style={styles.spacing}>
                            <Typography
                              content={data.title}
                              color={colors.dark_yellow}
                              size={14}
                              bold={true}
                              align="left"
                            />
                          </View>
                          <View>
                            <Typography
                              color={colors.dark_blue}
                              size={14}
                              content={data.type}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {freeData.map((data, index) => {
                      return (
                        <View style={styles.flex} key={index.toString()}>
                          <View style={{ marginRight: 10 }}>
                            <Typography
                              content={data.title}
                              color={colors.dark_yellow}
                              size={14}
                              bold={true}
                              align="left"
                            />
                          </View>
                          <View style={styles.spacing}>
                            <Typography
                              color={colors.dark_blue}
                              size={14}
                              content={index == 0 ? date : time}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            )}
            {list && (
              <View style={styles.btn}>
                {addLink && (
                  <View style={{ marginBottom: 20, top: -10 }}>
                    <>
                      <SearchBox
                        placeholder={"أدخل الارابط"}
                        searchString={searchString}
                        setSearchString={setSearchString}
                        width={SCREEN_WIDTH * 0.8}
                      />
                      {zoomError && userData?.is_expert == 1 && (
                        <View>
                          <Typography
                            content={zoomError}
                            color={"red"}
                            size={12}
                            align="left"
                          />
                        </View>
                      )}
                    </>
                  </View>
                )}

                <SecondaryButton
                  onPress={() => props.submit()}
                  content="تأكيد الحجز"
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    height: 142,
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    shadowColor: "#00000030",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
  },
  message: {
    height: "100%",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.019,
  },
  title: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT * 0.0015,
  },
  btn: {
    marginTop: SCREEN_HEIGHT * 0.037,
    alignItems: "center",
  },
  btnWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginRight: 10,
  },
  loader: {
    position: "absolute",
    zIndex: 1000,
    alignSelf: "center",
  },
  button: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_yellow,
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
});
