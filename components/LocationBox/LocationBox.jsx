import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { MapStyle } from "./MapStyle";
const LocationBox = () => {
  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.mapBorder}>
        <MapView
          customMapStyle={MapStyle}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        />
      </View>
      <View style={styles.spacing}>
        <Typography
          content="الموقع ، المنطقة ، الشارع"
          color={colors.dark_blue}
          align="left"
          size={14}
          roman={true}
        />
      </View>
    </View>
  );
};

export default LocationBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.18,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",

    // overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },
  map: {
    height: SCREEN_HEIGHT * 0.135,
  },
  spacing: {
    marginLeft: 10,
  },
  mapBorder: {
    height: SCREEN_HEIGHT * 0.135,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: "hidden",
  },
});
