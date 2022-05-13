import React, { useEffect } from "react";
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
import CachedImage from "react-native-expo-cached-image";

export const FullBox = ({ item, setIsLiked, isLiked, ...props }) => {
  return (
    <TouchableOpacity
      onPress={() => props.press()}
      style={[
        styles.card,
        props.fullWidth && {
          width: SCREEN_WIDTH - 40,
          alignSelf: "center",
          marginRight: 0,
        },
      ]}
    >
      <View>
        <CachedImage
          style={[styles.image, { width: "100%", height: 100 }]}
          resizeMode="cover"
          source={{ uri: item?.formatted_image }}
        />
      </View>
      <View style={styles.info}>
        <View style={[styles.infoRight]}>
          <Typography
            color="#fff"
            size={12}
            fit={true}
            lines={1}
            content={item?.name}
          />
          <View style={styles.locationText}>
            <Typography color="#CFD9DC" size={10} content={item?.address} />
          </View>
        </View>
        <View style={styles.infoLeft}>
          {item?.is_best_shop == 1 && (
            <View style={styles.rankedBox}>
              <View style={{ top: -1.5 }}>
                <Typography
                  size={8}
                  content="Top ranked"
                  color="#fff"
                  align="center"
                />
              </View>
            </View>
          )}
        </View>
      </View>
      {!props.myCards && (
        <View style={styles.fav}>
          <TouchableOpacity
            onPress={() => props.addToFavorites()}
            style={styles.favIcon}
          >
            <FavoriteSVG isLiked={item.is_favorite == 1 ? true : false} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.672,
    position: "relative",
    marginRight: 20,
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
    paddingVertical: 2,
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
