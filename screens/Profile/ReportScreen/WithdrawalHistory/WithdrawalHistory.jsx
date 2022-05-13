import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  I18nManager,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { getWithdrawal } from "../../../../api/Profile/Profile";
import { Header } from "../../../../components/Header/Header";
import Typography from "../../../../components/Typography/Typography";
import { colors } from "../../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import ArrowSVG from "../../../../SVGR/Globals/Arrow";
import numeral from "numeral";
import moment from "moment";
const RenderItem = ({ item, months, monthIndex, year }) => {
  return (
    <View style={styles.box}>
      <Typography
        size={14}
        bold
        color={colors.dark_blue}
        content={`${months[monthIndex]} ${year}`}
        align="center"
      />
    </View>
  );
};

export const WithdrawalHistory = ({ navigation, route }) => {
  const months = I18nManager.isRTL
    ? [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "ايار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول	",
        "تشرين الثاني	",
        "كانون الأول	",
      ]
    : [
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
  const d = new Date();
  const [monthIndex, setMonthIndex] = useState(d.getMonth());
  const [year, setYear] = useState(d.getFullYear());
  const listRef = useRef(null);
  const [listIndex, setListIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getWithdrawalHandler();

  }, [listIndex, monthIndex]);

  function nextMonth() {
    if (monthIndex == 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }

  function prevMonth() {
    if (monthIndex == 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  }
  const getWithdrawalHandler = () => {
    let formdata = new FormData();

    formdata.append("month_index", monthIndex + 1);
    formdata.append("year", year);

    setLoading(true);
    getWithdrawal(formdata)
      .then((res) => {
        setData(res.data.withdrawals);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} red title="قائمة سحب التمويل" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <View style={{ position: "absolute", left: 0, zIndex: 10 }}>
            <View>
              <IconButton
                compact
                onPress={() => {
                  nextMonth();
                }}
                icon={() => {
                  return (
                    <ArrowSVG
                      fill={colors.dark_blue}
                      style={{
                        transform: [
                          { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                        ],
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>

          <RenderItem months={months} monthIndex={monthIndex} year={year} />

          <View style={{ position: "absolute", right: 0, zIndex: 10 }}>
            <View>
              <IconButton
                compact
                onPress={() => {
                  prevMonth();
                }}
                icon={() => {
                  return (
                    <ArrowSVG
                      fill={colors.dark_blue}
                      style={{
                        transform: [
                          { rotateY: I18nManager.isRTL ? "180deg" : "0deg" },
                        ],
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.loader}>
            <ActivityIndicator
              color={colors.dark_blue}
              size="large"
              color={colors.dark_blue}
              animating={loading}
            />
          </View>
          <FlatList
            data={data}
            ListEmptyComponent={() => (
              <View>
                {loading ? (
                  <ActivityIndicator animating={false} />
                ) : (
                  <Typography
                    content="Empty List"
                    align="center"
                    color={colors.dark_blue}
                    size={14}
                  />
                )}
              </View>
            )}
            renderItem={({ item, index }) => (
              <RenderWithdrawalBox item={item} index={index} data={data} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function RenderWithdrawalBox({ item, index, data }) {
    return (
      <View
        style={[
          styles.item,
          index + 1 == data.length && { borderBottomWidth: 0 },
        ]}
      >
        <View style={styles.left}>
          <View style={{ width: "90%" }}>
            <Typography
              content={`#${item.id} ${item.withdrawal_account_type?.title} `}
              align="left"
              bold
              size={14}
              color={colors.dark_blue}
              fit={true}
              lines={1}
            />
          </View>
          <View style={{ top: -SCREEN_HEIGHT * 0.006 }}>
            <View style={{ width: "90%" }}>
              <Typography
                content={moment(item.created_at).format("YYYY-MM-DD")}
                align="left"
                color={"#CFD9DC"}
                size={14}
                fit={true}
                lines={1}
              />
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={{ width: "90%" }}>
            <Typography
              content={`${numeral(item.amount).format("0,0")} ${
                item.withdrawal_account_type.slug == "conultancylbp"
                  ? "LBP"
                  : "USD"
              }`}
              align="right"
              color={colors.dark_blue}
              bold
              size={14}
              fit={true}
              lines={1}
            />
          </View>
          <View style={{ top: -SCREEN_HEIGHT * 0.006, width: "95%" }}>
            <Typography
              content={item.withdrawal_status}
              align="right"
              color={item.settled_at == null ? colors.focused : "#1F9B89"}
              size={14}
              fit={true}
              lines={1}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: SCREEN_HEIGHT * 0.08,
    backgroundColor: "#F2F5F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 10,
    flexDirection: "row",
    marginBottom: 20,
  },
  box: {
    width: SCREEN_WIDTH - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    backgroundColor: "white",
    shadowColor: "#000",
    height: "auto",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    flexGrow: 1,

    elevation: 5,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderRadius: 10,

    paddingVertical: 15,
  },
  item: {
    borderBottomColor: "#F2F5F6",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    zIndex: 10,
    elevation: 10,
  },
});
