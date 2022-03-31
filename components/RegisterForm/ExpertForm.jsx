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
import { RNTextInput } from "../Textinput/TextInput";
import ModalDropdown from "react-native-modal-dropdown";

import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../globals/colors";
import Typography from "../Typography/Typography";
import AppContext from "../../appContext/AppContext";
export const ExpertForm = ({
  values,
  handleChange,
  setExperienceValue,
  setExperienceType,
  errorObject,
  experience,
  experienceType,
  experienceValue,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const Experience = ["test", "test2", "نوع الخبرة"];

  return (
    <View style={styles.container}>
      <RNTextInput
        placeholder={fixedTitles.authTitles["full-name"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        value={values.fullName}
        handleChange={handleChange("fullName")}
        error={errorObject.fullNameError}
        isError={errorObject.errorVisible}
      />

      <RNTextInput
        placeholder={fixedTitles.authTitles["email-address"].title}
        spacing={true}
        spacingVal={15}
        type={"email-address"}
        password={false}
        value={values.email}
        handleChange={handleChange("email")}
        error={errorObject.emailError}
        isError={errorObject.errorVisible}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["phone-number"].title}
        spacing={true}
        spacingVal={15}
        type={"number-pad"}
        password={false}
        handleChange={handleChange("mobile")}
        value={values.mobile}
        error={errorObject.mobileError}
        isError={errorObject.errorVisible}
      />
      <>
        <ModalDropdown
          options={experience}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator
          style={[
            styles.containerStyles,
            { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={fixedTitles.authTitles["experience-type"].title}
          onSelect={(item) => {
            setExperienceValue(item);
          }}
          renderRowText={(item) => {
            return (
              <View>
                <Typography
                  size={12}
                  content={item}
                  align="right"
                  color={colors.dark_blue}
                />
              </View>
            );
          }}
          renderSeparator={() => <View />}
          renderRowComponent={TouchableOpacity}
          keyboardShouldPersistTaps="handled"
          renderRightComponent={() => {
            return <View style={styles.arrowContainer} />;
          }}
        />
        {errorObject.errorVisible && (
          <View style={{ marginBottom: 15 }}>
            <Typography
              size={12}
              align="left"
              color="red"
              content={errorObject.experienceTypeError}
            />
          </View>
        )}
      </>
      <>
        <ModalDropdown
          options={experienceType}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator
          style={[
            styles.containerStyles,
            { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={fixedTitles.authTitles["experience"].title}
          onSelect={(item) => {
            setExperienceType(item);
          }}
          renderRowText={(item) => {
            return (
              <View>
                <Typography
                  size={12}
                  content={item}
                  align="left"
                  color={colors.dark_blue}
                />
              </View>
            );
          }}
          renderSeparator={() => <View />}
          renderRowComponent={TouchableOpacity}
          keyboardShouldPersistTaps="handled"
          renderRightComponent={() => {
            return <View style={styles.arrowContainer} />;
          }}
        />
        {errorObject.errorVisible && (
          <View style={{ marginBottom: 15 }}>
            <Typography
              content={errorObject.experienceError}
              color="red"
              align="left"
            />
          </View>
        )}
      </>
      <RNTextInput
        placeholder={fixedTitles.authTitles["fees15-mins"].title}
        spacing={true}
        spacingVal={15}
        type={"number-pad"}
        password={false}
        handleChange={handleChange("fees")}
        value={values.fees}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["educational-background"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        handleChange={handleChange("educationalBackground")}
        value={values.educationalBackground}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["years-of-experience"].title}
        spacing={true}
        spacingVal={15}
        type={"number-pad"}
        password={false}
        handleChange={handleChange("experienceYears")}
        value={values.experienceYears}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["password"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={true}
        handleChange={handleChange("password")}
        value={values.password}
        error={errorObject.passwordError}
        isError={errorObject.errorVisible}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["confirm-password"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={true}
        handleChange={handleChange("confirmPassword")}
        value={values.confirmPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: "100%",
    alignSelf: "center",
  },
  dropdownStyles: {
    backgroundColor: "white",
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
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginBottom: 15,
  },
  label: {
    color: colors.white,
  },
});
