import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  I18nManager,
  TouchableOpacity,
  Platform,
} from "react-native";

import Avatar from "../../../components/Avatar/Avatar";
import { SendMessageModal } from "../../../components/Modals/SendMessageModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import RatingsSVG from "../../../SVGR/Globals/Ratings";
import AppContext from "../../../appContext/AppContext";

export const ExpertPortfolioScreen = ({ navigation, route }) => {
  const { fixedTitles } = useContext(AppContext);
  const { data } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.arrow}>
          <TouchableOpacity
            style={{
              width: 20,
              height: 45,
              justifyContent: "center",
              paddingTop: I18nManager.isRTL ? 12 : 0,
            }}
            onPress={() => navigation.pop()}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
              fill={"#E8AF2E"}
            />
          </TouchableOpacity>
          <View style={{ marginBottom: SCREEN_HEIGHT * 0.024 }}>
            <Typography
              content={fixedTitles.expertsTitles["group-view"].title}
              size={20}
              bold={true}
              color="#E8AF2E"
            />
          </View>
        </View>
        <View style={styles.userRow}>
          <View style={styles.image}>
            <Avatar
              loader={false}
              name={data.full_name}
              profilePic={data.image_absolute_url}
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
            {data.experience_domain.title !== null && (
              <View style={styles.text}>
                <Typography
                  size={14}
                  color={Platform.OS == "ios" ? "#CFD9DC" : colors.dark_blue}
                  roman={true}
                  content={data.experience_domain.title}
                  align="left"
                />
              </View>
            )}

            <View style={{ top: -SCREEN_HEIGHT * 0.015 }}>
              <RatingsSVG />
            </View>
          </View>
        </View>
        <View style={styles.arrow}>
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
          <Typography
            color={colors.dark_blue}
            size={14}
            roman={true}
            align="left"
            content={data.location}
          />
        </View>
        {data.about && (
          <View>
            <View style={[styles.card, { width: "95%", minHeight: "auto" }]}>
              <Typography
                size={14}
                roman={true}
                align="left"
                content={data.about}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  arrow: {
    flexDirection: "row",
    width: "95%",

    alignSelf: "center",
  },
  image: {
    width: SCREEN_HEIGHT * 0.11,
    height: SCREEN_HEIGHT * 0.11,
  },
  userRow: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
  },
  userInfo: {
    paddingLeft: SCREEN_WIDTH * 0.016,
  },
  text: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.015,
    width: SCREEN_WIDTH * 0.65,
  },
  card: {
    width: "99%",
    alignSelf: "center",
    backgroundColor: colors.white,
    minHeight: SCREEN_HEIGHT * 0.0856,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.14,
    shadowRadius: 3.5,

    elevation: 5,
  },
  btn: {
    marginVertical: 15,
  },
  button: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
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
  smallBtn: {
    width: SCREEN_WIDTH * 0.27,
    borderRadius: 5,
    marginRight: 17,
    height: SCREEN_HEIGHT * 0.03,
  },
  btnRow: {
    flexDirection: "row-reverse",
    marginBottom: 17,
    marginTop: 10,
  },
  secondary: {
    backgroundColor: "#E8AF2E",
  },
  smallCard: {
    backgroundColor: "white",
    marginTop: 15,
    width: SCREEN_WIDTH * 0.415,
    paddingHorizontal: 15,
    borderRadius: 10,
    minHeight: SCREEN_HEIGHT * 0.19,
    marginBottom: 15,
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
});
