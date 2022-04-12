import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../components/Typography/Typography";
import { colors } from "../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../globals/globals";

export const TransparentButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, props.fullWidth && styles.fullWidth]}>
      <Typography
        roman={true}
        content={props.content}
        color={colors.dark_blue}
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
    backgroundColor: 'white',
    borderRadius: 10,
  },
  fullWidth:{
    width: '100%'
  }
});
