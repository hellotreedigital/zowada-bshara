import {
  I18nManager,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";

import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import AppContext from "../../appContext/AppContext";
import CachedImage from "react-native-expo-cached-image";

export const EventsCard = ({ navigation, item, index }) => {
  const { fixedTitles } = useContext(AppContext);
  return (
    <Animatable.View
      animation={I18nManager.isRTL ? "slideInRight" : "slideInLeft"}
      style={styles.card}
      // delay={index}
    >
      <View>
        <CachedImage
          style={styles.image}
          source={{
            uri: item.formatted_image,
          }}
        />
        <View style={styles.loader}>
          <ActivityIndicator color={colors.dark_blue} />
        </View>
      </View>
      <View style={styles.cardHeader}>
        <View style={[styles.name, { width: "70%" }]}>
          <Typography
            content={item.name}
            color={colors.dark_blue}
            size={16}
            bold={true}
            fit={true}
            lines={1}
            align="left"
            fit={true}
            lines={1}
          />
        </View>
        <View>
          <Typography
            content={item.date}
            color={`#CFD9DC`}
            size={12}
            bold={false}
            fit={true}
            lines={1}
            align="right"
          />
        </View>
      </View>
      <View style={styles.about}>
        <Typography
          ellipsizeMode="tail"
          lines={2}
          content={item.about}
          align="left"
          color={colors.dark_blue}
          size={12}
        />
      </View>
      <View style={styles.btnwrapper}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("SingleEvent", {
              item: item,
            })
          }
          style={styles.button}
        >
          <Typography
            content={fixedTitles.events["view-more"].title}
            size={14}
            align="center"
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 20,
    marginTop: 5,
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    height: SCREEN_HEIGHT * 0.192,
    width: "100%",
    overflow: "hidden",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    position: "relative",
    elevation: 10,
    zIndex: 1000,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  about: {
    paddingHorizontal: 10,
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnwrapper: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
});
