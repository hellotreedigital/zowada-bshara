import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import React from "react";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { colors } from "../../globals/colors";
import Typography from "../Typography/Typography";

export const Header = (props) => {
  return (
    <>
      {props.blue ? (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.header}
        >
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => props.navigation.goBack()}
            >
              <ArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
                fill={colors.dark_blue}
              />
            </TouchableOpacity>
            <View style={{ right: 20, width: "95%" }}>
              <Typography
                content={props?.title}
                color={colors.dark_blue}
                align="left"
                size={20}
                bold={true}
                fit={true}
                lines={1}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.header}
        >
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => props.navigation.goBack()}
            >
              <ArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
                fill={props.red ? colors.focused : colors.dark_yellow}
              />
            </TouchableOpacity>
            <View style={{ right: 20, width: "95%" }}>
              <Typography
                content={props?.title}
                color={props.red ? colors.focused : colors.dark_yellow}
                align="left"
                size={20}
                bold={true}
                fit={true}
                lines={1}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
