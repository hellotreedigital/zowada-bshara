import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import FavoriteSVG from "../../../SVGR/Home/Favorite";

export const HalfCard = ({
  item,
  isLiked,
  onPress,
  addToFavorites,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Image
          source={{
            uri: item.formatted_image,
          }}
          style={styles.image}
        />
        <View style={styles.body}>
          <Typography content={item.name} color={colors.white} align="left" />
          {/* <View style={{ marginHorizontal: 8 }}>
            <Typography
              content={item.address}
              color={colors.white}
              align="left"
            />
          </View> */}
        </View>
      </View>
      <View style={styles.fav}>
        <TouchableOpacity
          onPress={() => addToFavorites()}
          style={styles.favIcon}
        >
          <FavoriteSVG isLiked={isLiked} />
        </TouchableOpacity>
      </View>

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: SCREEN_HEIGHT * 0.016,
    width: SCREEN_WIDTH * 0.42,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  image: {
    height: SCREEN_HEIGHT * 0.123,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  body: {
    backgroundColor: colors.dark_blue,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.026,
    paddingVertical: 3,
    flexDirection: "row",
  },
  fav: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.007,
    right: SCREEN_WIDTH * 0.026,
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

  rankedBox: {
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_HEIGHT * 0.023,
    borderRadius: SCREEN_HEIGHT * 0.012,
    backgroundColor: "#E54C2E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: SCREEN_WIDTH * 0.026,
    position: "absolute",
    left: 10,
    top: 10,
  },
});
