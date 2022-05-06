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
import MyOrdersSVG from "../../SVGR/Profile/MyOrders";

export const CustomPageHeader = ({
  navigation,
  title,
  showShare,
  showNotification,
  color,
  spaceHorizontally,
  isAbsolute,
  showCart
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
            strokeW={3}
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
      <View style={[styles.right]}>
        {showNotification && (
          <View style={[styles.iconContainer]}>
          <TouchableOpacity style={styles.icon}>
            <ShareSVG />
          </TouchableOpacity>
            </View>
        )}
        {showShare && (
          <View style={[styles.iconContainer]}>
          <TouchableOpacity style={styles.icon}>
            <NotificationSVG />
          </TouchableOpacity>

          </View>
        )}
        {showCart && (
          <View style={[styles.iconContainer]}>
          <TouchableOpacity style={styles.icon} onPress={()=> {navigation.push('cartScreen')}}>
            <MyOrdersSVG  size={30} background='#fff' fill='#e54c2e'/>
          </TouchableOpacity>

          </View>
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
    justifyContent:'space-between'
  },
  statusPosition: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
  },
  left: {
    marginLeft: 24,
  },
  right: {
    flexDirection: "row",
  },
  iconContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  icon: {
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037/2,
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