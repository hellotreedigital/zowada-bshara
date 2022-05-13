import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";

export const CartButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.cartHandler("increment")}>
        <Text style={[styles.buttons]}>
          {`${props.cartNumber == props.stock ? " " : "+"}`}
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={[styles.buttons, { color: colors.focused, fontSize: 12 }]}>
          {props.cartNumber}
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.cartHandler("decrement")}>
        <Text style={styles.buttons}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.24,
    borderRadius: 16,
    borderColor: colors.dark_blue,
    // height: SCREEN_HEIGHT * 0.034,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
  },
  buttons: {
    color: colors.dark_blue,
    padding: 10,
  },
});
