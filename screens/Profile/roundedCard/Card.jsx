import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";

export const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.Card}>
      <View>{item.icon}</View>
      <View style={{ width: 70 }}>
        <Typography
          fit={true}
          lines={1}
          size={12}
          bold={true}
          content={item.title}
          align="center"
          color={item.color}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Card: {},
});
