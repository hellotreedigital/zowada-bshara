import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { RNCheckoutTextInput } from "../Textinput/TextInput";
import ModalDropdown from "react-native-modal-dropdown";

import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../globals/colors";
import Typography from "../Typography/Typography";
import AppContext from "../../appContext/AppContext";
export const CaseStudyForm = ({
  values,
  handleChange,
  errorObject,
  experience,
  experienceType,
  experienceValue,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <RNCheckoutTextInput
        placeholder="أجب عن السؤال هنا"
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        value={values.fullName}
        handleChange={handleChange("answer")}
        error={errorObject.answerError}
        isError={errorObject.errorVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: "100%",
  },
  dropdownStyles: {
    backgroundColor: colors.light_grey,
    height: 100,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: !I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  containerStyles: {
    width: SCREEN_WIDTH * 0.9,
    textAlign: "right",
    // paddingLeft: 15,
    paddingBottom: 8,
    paddingTop: 14,
    backgroundColor: colors.light_grey,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: colors.dark_blue,
    marginBottom: 15,
  },
  label: {
    color: colors.dark_blue,
  },
});