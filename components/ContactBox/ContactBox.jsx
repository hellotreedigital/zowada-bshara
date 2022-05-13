import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import MessageSVG from "../../SVGR/Profile/Message";
import PhoneSVG from "../../SVGR/Profile/Phone";
import Typography from "../Typography/Typography";

export const ContactBox = ({ userData, title, phoneTitle, emailTitle }) => {
  const phoneHandler = () => {
    Linking.openURL(`tel:${userData?.phone_number}`).catch((err) => {
      alert(err);
    });
  };

  const mailHandler = () => {
    Linking.openURL(`mailto:${userData?.email}`).catch((err) => {
      alert(err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Typography
          content={title}
          color={"#E54C2E"}
          sie={14}
          bold={true}
          align="left"
        />
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => phoneHandler()} style={styles.icon}>
            <PhoneSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => phoneHandler()} style={styles.col}>
            <Typography
              content={phoneTitle}
              size={12}
              bold={true}
              color={colors.dark_blue}
              align="left"
            />
            <View style={[styles.subTitle, styles.border]}>
              <Typography
                size={12}
                bold={false}
                color={colors.dark_blue}
                content={userData?.phone_number}
                align="left"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.spacing]}>
          <TouchableOpacity onPress={() => mailHandler()} style={styles.icon}>
            <MessageSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => mailHandler()} style={styles.col}>
            <Typography
              content={emailTitle}
              size={12}
              bold={true}
              color={colors.dark_blue}
              align="left"
            />
            <View style={styles.subTitle}>
              <Typography
                content={userData?.email}
                size={12}
                bold={false}
                color={colors.dark_blue}
                align="left"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    alignSelf: "center",
    minHeight: SCREEN_HEIGHT * 0.19,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 15,
    elevation: 10,
  },
  headerTitle: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.013,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  box: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: colors.focused,
    height: SCREEN_HEIGHT * 0.03,
    width: SCREEN_HEIGHT * 0.03,
    borderRadius: (SCREEN_HEIGHT * 0.03) / 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.04,
    marginRight: SCREEN_WIDTH * 0.053,
    top: -SCREEN_HEIGHT * 0.009,
  },
  subTitle: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.011,
  },
  spacing: {
    marginBottom: SCREEN_HEIGHT * 0.019,
  },
  border: {
    borderBottomColor: "#F2F5F6",
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * 0.7,
  },
});
