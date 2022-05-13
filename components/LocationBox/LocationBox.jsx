import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { Navigation } from "../../navigation";
import Typography from "../Typography/Typography";
import { MapStyle } from "./MapStyle";
const LocationBox = ({
  editMode,
  navigation,
  userData,

  ...props
}) => {
  const editMapHandler = () => {
    if (!editMode) return;
    navigation.navigate("MapScreen");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => editMapHandler()}
      style={styles.container}
    >
      <View pointerEvents="none" style={styles.mapBorder}>
        <MapView
          initialRegion={props.location}
          customMapStyle={MapStyle}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        />
      </View>
      <View style={styles.spacing}>
        <Typography
          content={userData?.address}
          color={colors.dark_blue}
          align="left"
          size={14}
          roman={true}
        />
      </View>
    </TouchableOpacity>
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
