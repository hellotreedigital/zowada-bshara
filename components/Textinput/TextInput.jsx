import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ShadowPropTypesIOS,
  I18nManager,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { TextInputMask } from "react-native-masked-text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../globals/globaStyles";

export const RNTextInput = ({ ...props }) => {
  return (
    <View style={{ marginBottom: props.spacing ? props.spacingVal : 0 }}>
      {props.masked ? (
        <View>
          <TouchableOpacity
            onPress={() => props.setIsCalendar(!props.isCalendar)}
            style={[styles.box]}
          >
            <Typography
              content={props.selectedStartDate || "date or time"}
              color="#fff"
              size={14}
              roman={true}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={[styles.container]}
          placeholder={props.placeholder}
          keyboardType={props.type}
          placeholderTextColor="#ffffff"
          selectionColor={colors.dark_blue}
          secureTextEntry={props.password}
          value={props.value}
          onChangeText={props.handleChange}
          placeholderStyle={styles.textboxfieldd}
        />
      )}

      <View style={styles.error}>
        {props.isError && (
          <Typography
            content={props.error}
            color="red"
            size={12}
            align="left"
          />
        )}
      </View>
    </View>
  );
};

export const RNCheckoutTextInput = ({ ...props }) => {
  return (
    <View style={{ marginBottom: props.spacing ? props.spacingVal : 0 }}>
      {props.masked ? (
        <View>
          <TouchableOpacity
            onPress={() => props.setIsCalendar(!props.isCalendar)}
            style={[styles.box]}
          >
            <Typography
              content={props.selectedStartDate || "date or time"}
              color={colors.dark_blue}
              size={14}
              roman={true}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={[styles.container, styles.grayBG, globalStyles.textDarkBlue]}
          placeholder={props.placeholder}
          keyboardType={props.type}
          placeholderTextColor={colors.dark_blue}
          selectionColor={colors.dark_blue}
          secureTextEntry={props.password}
          value={props.value}
          onChangeText={props.handleChange}
          placeholderStyle={styles.textboxfieldd}
        />
      )}

      <View style={styles.error}>
        {props.isError && (
          <Typography
            content={props.error}
            color="red"
            size={12}
            align="left"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    textAlign: I18nManager.isRTL ? "right" : "left",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",

    height: 40,
    fontFamily: "HelveticaLight",
  },
  grayBG:{
    backgroundColor:colors.light_grey
  },
  error: {},
  textboxfieldd: {
    fontFamily: "HelveticaLight",
  },
  box: {
    width: SCREEN_WIDTH * 0.9,
    textAlign: I18nManager.isRTL ? "right" : "left",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: "HelveticaLight",
  },
});
