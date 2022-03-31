import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import MessageSVG from "../../SVGR/Profile/Message";
import PhoneSVG from "../../SVGR/Profile/Phone";
import Typography from "../Typography/Typography";

export const ContactBox = () => {
  const phoneHandler = () => {
    Linking.openURL(`tel:76940499`).catch((err) => {
      alert(err);
    });
  };

  const mailHandler = () => {
    Linking.openURL("mailto:support@example.com").catch((err) => {
      alert(err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Typography
          content="تواصل"
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
              content="الهاتف"
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
                content="76940499"
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
              content="بريد إلكتروني"
              size={12}
              bold={true}
              color={colors.dark_blue}
              align="left"
            />
            <View style={styles.subTitle}>
              <Typography
                content="email@email.com"
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
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 15,
    elevation: 1,
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
