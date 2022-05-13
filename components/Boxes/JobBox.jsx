import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../../globals/colors";

import { SCREEN_HEIGHT } from "../../globals/globals";
import Typography from "../Typography/Typography";

const JobBox = ({
  item,
  spacing,
  onPress,
  location,
  company,
  status,
  fullWidth,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.cart,
        spacing && { marginHorizontal: 5 },
        { width: fullWidth ? "100%" : SCREEN_WIDTH * 0.42 },
      ]}
    >
      <View>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: item.formatted_image,
          }}
        />
        <View>
          <Typography
            content={item.title || props.jobName}
            size={14}
            align="left"
            color={colors.dark_blue}
          />
        </View>
        {location && (
          <View style={{ top: -SCREEN_HEIGHT * 0.013 }}>
            <Typography
              content={item.district?.title}
              size={12}
              align="left"
              color={`#CFD9DC`}
            />
          </View>
        )}
        {props.application && (
          <View style={{ top: -SCREEN_HEIGHT * 0.035 }}>
            <Typography
              content={props.application}
              size={12}
              align="left"
              color={colors.dark_blue}
            />
          </View>
        )}
        {company && (
          <View
            style={{
              top: props.application
                ? -SCREEN_HEIGHT * 0.05
                : -SCREEN_HEIGHT * 0.022,
            }}
          >
            <Typography
              content={item.company_name}
              size={12}
              align="left"
              color={colors.dark_orange}
            />
          </View>
        )}

        {status && (
          <View style={{ top: -SCREEN_HEIGHT * 0.03 }}>
            <Typography
              content={item.status}
              size={12}
              align="left"
              color={colors.dark_orange}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default JobBox;

const styles = StyleSheet.create({
  cart: {
    width: SCREEN_WIDTH * 0.42,
    minHeight: SCREEN_HEIGHT * 0.18,
    // marginHorizontal: 10,
    zIndex: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.14,
    borderRadius: 10,
    zIndex: 10,
    elevation: 10,
  },
});
