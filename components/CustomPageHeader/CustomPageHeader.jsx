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
import ShareSVG from "../../SVGR/Home/Share";
import Typography from "../../components/Typography/Typography";
import NotificationSVG from "../../SVGR/Home/Notification";

export const CustomPageHeader = ({
  navigation,
  title,
  showShare,
  showNotification,
  color,
  spaceHorizontally,
  isAbsolute
}) => {
  return (
    <View style={[styles.status, isAbsolute && styles.statusPosition, spaceHorizontally && styles.horizontalSpacing]}>
      <TouchableOpacity
          onPress={() => navigation.pop()}
          style={[]}
        >
      <View style={[styles.spacing, styles.headTitle, ]}>
        
          <ArrowSVG
            style={[{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }, styles.spacing]}
            fill={color}
          />
        <Typography
          content={title}
          color={color}
          size={22}
          bold={true}
          lh={26}
          align="left"
        />
      </View>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalSpacing:{
    marginHorizontal: 20
  }
});