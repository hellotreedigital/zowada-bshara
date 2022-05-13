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
import { MaskedInput, RNTextInput } from "../Textinput/TextInput";
import ModalDropdown from "react-native-modal-dropdown";

import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../globals/colors";
import Typography from "../Typography/Typography";
import AppContext from "../../appContext/AppContext";
import PhonePicker from "../PhonePicker/PhonePicker";
export const ExpertForm = ({
  values,
  handleChange,
  setExperienceValue,
  setExperienceType,
  errorObject,
  experience,
  experienceType,
  experienceValue,
  setYearsOfExperience,
  yearsOfExperience,
  yearsOfExperienceArr,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);

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
        isError={errorObject.fullNameError}
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
        isError={errorObject.emailError}
      />
      <View>
        <RNTextInput
          placeholder={fixedTitles.authTitles["phone-number"].title}
          spacing={true}
          spacingVal={15}
          type={"number-pad"}
          password={false}
          handleChange={handleChange("mobile")}
          value={values.mobile}
          error={errorObject.mobileError}
          isError={errorObject.mobileError}
        />
        <View style={{ position: "absolute", right: 0 }}>
          <PhonePicker />
        </View>
      </View>
      <>
        <ModalDropdown
          options={experience}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
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
        {errorObject.experienceError && (
          <View style={{ top: -15 }}>
            <Typography
              size={12}
              align="left"
              color="red"
              content={errorObject.experienceError}
            />
          </View>
        )}
      </>
      <>
        <ModalDropdown
          options={experienceType}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerStyles,
            { marginBottom: errorObject.experienceError ? 0 : 15 },
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
        {errorObject.experienceError && (
          <View style={{ marginBottom: 15 }}>
            <Typography
              content={errorObject.experienceError}
              color="red"
              align="left"
            />
          </View>
        )}
      </>
      <View style={{ marginBottom: 15 }}>
        <MaskedInput
          placeholder={fixedTitles.authTitles["fees15-mins"].title}
          spacing={true}
          spacingVal={15}
          type={"number-pad"}
          password={false}
          handleChange={handleChange("fees")}
          value={values.fees}
          mask={"money"}
          options={{
            precision: 0,
            separator: ",",
            delimiter: ",",
            unit: "LBP",
            suffixUnit: "",
          }}
          error={errorObject.fees}
          isError={errorObject.fees}
        />
      </View>
      <RNTextInput
        placeholder={fixedTitles.authTitles["educational-background"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        handleChange={handleChange("educationalBackground")}
        value={values.educationalBackground}
        error={errorObject.educationBgError}
        isError={errorObject.educationBgError}
      />
      {/* <RNTextInput
        placeholder={fixedTitles.authTitles["years-of-experience"].title}
        spacing={true}
        spacingVal={15}
        type={"number-pad"}
        password={false}
        handleChange={handleChange("experienceYears")}
        value={values.experienceYears}
      /> */}
      <>
        <ModalDropdown
          options={yearsOfExperienceArr}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerStyles,
            { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={fixedTitles.authTitles["years-of-experience"].title}
          onSelect={(item) => {
            setYearsOfExperience(item + 1);
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
        {errorObject.experienceYears && (
          <View style={{ top: -15 }}>
            <Typography
              size={12}
              align="left"
              color="red"
              content={errorObject.experienceYears}
            />
          </View>
        )}
      </>
      <RNTextInput
        placeholder={fixedTitles.authTitles["password"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={true}
        handleChange={handleChange("password")}
        value={values.password}
        error={errorObject.passwordError}
        isError={errorObject.passwordError}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["confirm-password"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={true}
        handleChange={handleChange("confirmPassword")}
        value={values.confirmPassword}
        error={errorObject.confirmPassword}
        isError={errorObject.confirmPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: "100%",
    alignSelf: "center",
    fontFamily: "HelveticaLight",
  },
  dropdownStyles: {
    backgroundColor: "white",
    height: 100,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "flex-start",
    padding: 10,
    fontFamily: "HelveticaLight",
  },
  containerStyles: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 6,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    // marginVertical: 7,
  },
  label: {
    color: colors.white,
    fontFamily: "HelveticaLight",
    fontSize: 14,
  },
});
