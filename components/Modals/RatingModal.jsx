import React from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";
import { Rating, AirbnbRating } from "react-native-ratings";
import { SearchBox } from "../SearchBox/SearchBox";

export const RatingModal = ({ visible, list, ...props }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.center]}>
          <TouchableOpacity onPress={() => props.close()}>
            <CloseSVG />
          </TouchableOpacity>
          <View>
            <Typography
              content="أضف تقييم"
              color={colors.dark_yellow}
              size={20}
              bold={true}
              align="center"
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <AirbnbRating
              type="custom"
              showRating={false}
              count={5}
              defaultRating={0}
              size={20}
              starImage={require("../../assets/emptyStar.png")}
            />
          </View>
          <View>
            <TextInput
              style={[styles.textinput, { height: SCREEN_HEIGHT * 0.19 }]}
              placeholder={"أضف تعليق هنا"}
              placeholderTextColor={colors.dark_blue}
              placeholderStyle={styles.placeholderStyle}
              multiline={true}
            />
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button}>
              <Typography
                size={16}
                content="إرسل"
                color={colors.white}
                align="center"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    // height: 137,
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
    padding: 20,
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
  textinput: {
    width: "100%",
    backgroundColor: "#F2F5F6",
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.dark_blue,
  },
  button: {
    width: SCREEN_WIDTH * 0.8,
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
  wrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
});
