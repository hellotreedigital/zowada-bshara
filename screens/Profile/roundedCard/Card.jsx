import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";

export const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.Card}>
      <View>{item.icon}</View>
      <View>
        <Typography
          size={14}
          bold={true}
          content={item.title}
          align="center"
          color={item.color}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
