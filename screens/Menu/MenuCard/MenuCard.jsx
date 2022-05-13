import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";

export const MenuCard = ({ item, navigation }) => {
  const navigationHandler = (slug) => {
    switch (slug) {
      case 0:
        navigation.navigate("Expert");
        break;
      case 1:
        navigation.navigate("Updates");
        case 2:
          navigation.navigate("ELearning");
        break;
      case 4:
        navigation.navigate("settings");
        break;
      case 5:
        navigation.navigate("AboutScreen");
        break;
      case 3:
        navigation.navigate("EventStack");
        break;
      case 6:
        navigation.navigate("ContactUsScreen");
        break;
      case 7:
        navigation.navigate("Funding");
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigationHandler(item.id)}
    >
      <View style={styles.image}>{item.icon}</View>
      <View style={styles.text}>
        <Typography
          size={14}
          bold={true}
          color={colors.dark_blue}
          content={item.title}
          align="left"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT * 0.13,
    width: SCREEN_WIDTH * 0.42,
    backgroundColor: "white",
    marginLeft: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
    paddingBottom: SCREEN_HEIGHT * 0.022,
  },
  image: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  text: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
});
