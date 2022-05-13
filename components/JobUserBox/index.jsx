import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { colors } from "../../globals/colors";
import Typography from "../Typography/Typography";

export const JobUserBox = ({ onPress, item, statusId, ...props }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item?.user?.image_absolute_url,
          }}
        />

        <View>
          <Typography
            content={item?.full_name}
            align="left"
            color={colors.dark_blue}
            size={16}
            bold
          />
          <Typography
            content={item?.experience_domain?.title}
            align="left"
            color={colors.dark_orange}
            size={14}
          />
        </View>
      </View>
      {statusId && (
        <View style={{ paddingHorizontal: 5 }}>
          <Typography content={statusId} color={`#CFD9DC`} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
  },
  image: {
    width: SCREEN_HEIGHT * 0.073,
    height: SCREEN_HEIGHT * 0.073,
    borderRadius: (SCREEN_HEIGHT * 0.073) / 2,
    marginRight: 10,
  },
});
