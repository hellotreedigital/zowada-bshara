import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import ShareSVG from "../../SVGR/Home/Share";
import Typography from "../../components/Typography/Typography";
import NotificationSVG from "../../SVGR/Home/Notification";
import { globalStyles } from "../../globals/globaStyles";
import * as Progress from 'react-native-progress';

export const CustomPageHeaderWithProgress = ({
  navigation,
  title,
  showShare,
  showNotification,
  color,
  isAbsolute
}) => {
  return (
    <View style={[styles.status, isAbsolute && styles.statusPosition, globalStyles.verticalTopSpacer10]}>
      <View style={[styles.left, styles.headTitle]}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.spacing}
        >
          <CloseSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            stroke={color}
          />
        </TouchableOpacity>
        <Progress.Bar progress={0.5} width={SCREEN_WIDTH * 0.8} height={7} color={color}/>
      </View>
      <View style={styles.right}>
        {showNotification && (
          <TouchableOpacity style={styles.icon}>
            <ShareSVG />
          </TouchableOpacity>
        )}
        {showShare && (
          <TouchableOpacity style={styles.icon}>
            <NotificationSVG />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    zIndex: 10000,
    // marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  statusPosition: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
  },
  left: {
    marginLeft: 24,
  },
  right: {
    marginRight: 24,
    flexDirection: "row",
  },
  icon: {
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
  },
  spacing: {
    marginRight: 10,
  },
  headTitle: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});