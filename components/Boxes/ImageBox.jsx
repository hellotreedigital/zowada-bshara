import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";

export const ImageBox = ({ item, singleFunding, fullWidth, ...props }) => {
  //
  return (
    <TouchableOpacity
      onPress={() => singleFunding()}
      style={[styles.card, fullWidth && styles.fullCard]}
    >
      <View>
        <ImageBackground
          style={[
            styles.image,

            {
              width: fullWidth ? SCREEN_WIDTH * 0.9 : SCREEN_WIDTH * 0.669,
              height: SCREEN_HEIGHT * 0.14,
            },
          ]}
          resizeMode="cover"
          source={{ uri: props.image }}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoRight}>
          <Typography color={colors.dark_blue} size={14} content={props.name} />
        </View>
        <View style={styles.infoLeft}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT * 0.176,
    width: SCREEN_WIDTH * 0.669,
    marginRight: 20,
  },
  fullCard: {
    height: SCREEN_HEIGHT * 0.176,

    marginRight: 20,
  },
  image: {
    borderRadius: 10,
    overflow: "hidden",
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
