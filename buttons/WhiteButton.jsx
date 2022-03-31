import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../components/Typography/Typography";
import { colors } from "../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../globals/globals";

export const WhiteButton = ({ content, onPress, disabled, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,

        {
          width:
            !props.full && props.type === "large" ? SCREEN_WIDTH * 0.51 : 151,
        },
        { height: props.home ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.046 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Typography
        roman={true}
        lh={props.lh}
        content={content}
        color={colors.dark_blue}
        size={props.size}
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
    backgroundColor: "#fff",
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
