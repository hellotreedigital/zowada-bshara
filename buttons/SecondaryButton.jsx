import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../components/Typography/Typography";
import { colors } from "../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../globals/globals";

export const SecondaryButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Typography
        roman={true}
        content={props.content}
        color={colors.white}
        size={16}
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
});
