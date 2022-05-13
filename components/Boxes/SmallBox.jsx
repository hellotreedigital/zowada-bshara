import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Avatar from "../Avatar/Avatar";
import Typography from "../Typography/Typography";

export const SmallBox = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.card}>
      <View>
        {item.image_absolute_url ? (
          <ImageBackground
            style={[styles.image]}
            resizeMode="cover"
            source={{ uri: item.image_absolute_url }}
          />
        ) : (
          <Avatar loader={false} name={item.full_name} custom={true} />
        )}
      </View>
      <View style={styles.info}>
        <View style={[styles.infoRight, { top: -SCREEN_HEIGHT * 0.002 }]}>
          <Typography
            fit={true}
            lines={2}
            color={colors.dark_blue}
            size={13}
            content={item.full_name}
            align="left"
          />
        </View>
        <View style={styles.infoLeft}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT * 0.179,
    width: SCREEN_HEIGHT * 0.143,
    borderRadius: SCREEN_HEIGHT * 0.012,
  },
  image: {
    // borderRadius: 10,
    overflow: "hidden",
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12,
    borderRadius: SCREEN_HEIGHT * 0.012,
  },
  info: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoRight: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  locationText: {
    marginHorizontal: 12,
  },
});
