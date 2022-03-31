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
import FavoriteSVG from "../../SVGR/Home/Favorite";
import Typography from "../Typography/Typography";

export const FullBox = ({ item }) => {
  // console.log(item);
  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <ImageBackground
          style={[styles.image, { width: "100%", height: 100 }]}
          resizeMode="cover"
          source={{ uri: item.image }}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoRight}>
          <Typography color="#fff" size={14} content={item.title} />
          <View style={styles.locationText}>
            <Typography color="#CFD9DC" size={12} content={item.location} />
          </View>
        </View>
        <View style={styles.infoLeft}>
          <View style={styles.rankedBox}>
            <View style={{ top: -1.5 }}>
              <Typography
                size={10}
                content="Top ranked"
                color="#fff"
                align="center"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.fav}>
        <TouchableOpacity style={styles.favIcon}>
          <FavoriteSVG />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT * 0.178,
    width: SCREEN_WIDTH * 0.672,
    position: "relative",
  },
  image: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  info: {
    flexDirection: "row",
    backgroundColor: colors.dark_blue,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoRight: {
    flexDirection: "row",
    // marginBottom: 10,
    paddingTop: 10,
    marginHorizontal: 5,
    top: -5,
  },
  locationText: {
    marginHorizontal: 12,
    // marginTop: 4,
    top: 3,
  },
  favIcon: {
    backgroundColor: "white",
    height: SCREEN_HEIGHT * 0.03,
    width: SCREEN_HEIGHT * 0.03,
    borderRadius: (SCREEN_HEIGHT * 0.03) / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 199999,
  },
  fav: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.007,
    right: SCREEN_WIDTH * 0.026,
  },
  rankedBox: {
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_HEIGHT * 0.023,
    borderRadius: SCREEN_HEIGHT * 0.012,
    backgroundColor: "#E54C2E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: SCREEN_WIDTH * 0.026,
  },
});
