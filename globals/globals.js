import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";

import {
  Dimensions,
  I18nManager,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const BOTTOM_BAR_HEIGHT =
  SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_BAR_HEIGHT;

export const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
