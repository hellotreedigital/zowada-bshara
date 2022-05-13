import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import AppContext from "../../../appContext/AppContext";

import { Header } from "../../../components/Header/Header";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_WIDTH } from "../../../globals/globals";
import numeral from "numeral";
import { getUserData } from "../../../api/Userinfo/UserInformation";
const ListLabel = ({ left, right, color, navigate }) => {
  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => navigate()}>
        <Typography
          content={right}
          size={14}
          bold={false}
          color={color ? color : colors.focused}
          align="right"
        />
      </TouchableOpacity>
      <View>
        <Typography
          content={left}
          size={14}
          bold
          color={color ? color : colors.focused}
          align="left"
        />
      </View>
    </View>
  );
};

const WithdrawCard = ({ amount, button, color, hideBtn, navigate }) => {
  return (
    <View style={styles.card}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Typography
          fit={true}
          lines={1}
          content={amount}
          color={colors.dark_blue}
          size={34}
          bold
        />
      </View>
      {!hideBtn && (
        <TouchableOpacity
          onPress={() => navigate()}
          style={[styles.button, color && { backgroundColor: color }]}
        >
          <Typography
            content={button}
            color={colors.white}
            size="16"
            align="center"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const ReportScreen = ({ navigation, route }) => {
  const { title } = route.params;
  const { userData, setUserData, fixedTitles } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState();

  const onRefresh = () => {
    setRefreshing(true);
    getUserData()
      .then((res) => {
        setUserData(res.data.user);
        setRefreshing(false);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} navigation={navigation} red />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <ListLabel
            navigate={() => navigation.navigate("WithdrawalHistory")}
            left={fixedTitles.profileTitles["store-credit"].title}
          />
          <WithdrawCard
            hideBtn
            amount={`${numeral(userData?.shop_total_amount).format("0,0")} LBP`}
            button={fixedTitles.profileTitles["withdrawal-request"].title}
          />
          <ListLabel
            navigate={() => navigation.navigate("WithdrawalHistory")}
            left={fixedTitles.profileTitles["consultancy"].title}
            right={fixedTitles.profileTitles["withdrawal-list"].title}
          />
          <WithdrawCard
            navigate={() => navigation.navigate("WithdrawScreen", { id: 2 })}
            amount={`${numeral(userData?.total_consultancy_amount).format(
              "0,0"
            )} LBP`}
            button={fixedTitles.profileTitles["withdrawal-request"].title}
            color={colors.dark_yellow}
          />
          <ListLabel
            navigate={() => navigation.navigate("WithdrawalHistory")}
            left={fixedTitles.profileTitles["course-credit"].title}
            right={fixedTitles.profileTitles["withdrawal-list"].title}
            color={`#1F9B89`}
          />
          <WithdrawCard
            navigate={() => {}}
            amount={`N/A`}
            button={fixedTitles.profileTitles["withdrawal-request"].title}
            color={colors.dark_blue}
          />
          <ListLabel
            left={fixedTitles.profileTitles["crowdfunding"].title}
            right={fixedTitles.profileTitles["withdrawal-list"].title}
            color={colors.dark_yellow}
            navigate={() => navigation.navigate("WithdrawalHistory")}
          />
          <WithdrawCard
            navigate={() => navigation.navigate("WithdrawScreen", { id: 1 })}
            amount={`${numeral(userData?.total_crowdfunding_amount).format(
              "0,0"
            )} USD`}
            button={fixedTitles.profileTitles["withdrawal-request"].title}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    elevation: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: "center",
    paddingTop: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.dark_blue,
    width: "100%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
