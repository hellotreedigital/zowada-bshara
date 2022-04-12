import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../components/Typography/Typography";
import { colors } from "../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../globals/globals";

export const PrimaryButton = ({ content, onPress, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: props.type === "large" ? SCREEN_WIDTH * 0.51 : props.type === "larger" ? "100%" : 151 },
      ]}
      onPress={onPress}
    >
      <Typography
        roman={true}
        content={content}
        color={colors.white}
        size={props.size || 16}
        lh={props.lh}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH * 0.4,
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
});
