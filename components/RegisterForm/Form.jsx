import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppContext from "../../appContext/AppContext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { RNTextInput } from "../Textinput/TextInput";
import { CalendarModal } from "../Calendar/CalendarPicker";
import WheelPicker from "../WheelPicker/WheelPicker";
import PhonePicker from "../PhonePicker/PhonePicker";
export const Form = ({
  values,
  handleChange,
  errorObject,
  selectedStartDate,
  setSelectedStartDate,
  isCalendar,
  setIsCalendar,
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
          isError={errorObject.errorVisible}
        />
        <View
          style={{
            position: "absolute",
            right: 0,
            alignItems: "center",
          }}
        >
          <PhonePicker />
        </View>
      </View>
      <RNTextInput
        placeholder={fixedTitles.authTitles["date-of-birth"].title}
        spacing={true}
        spacingVal={15}
        type={"number-pad"}
        password={false}
        handleChange={handleChange("dob")}
        value={values.dob}
        masked={true}
        maskType={"datetime"}
        options={{
          format: "YYYY-MM-DD",
        }}
        error={errorObject.birthdayError}
        isError={errorObject.errorVisible}
        setIsCalendar={setIsCalendar}
        isCalendar={isCalendar}
        selectedStartDate={selectedStartDate}
      />
      <RNTextInput
        placeholder={fixedTitles.authTitles["location"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        handleChange={handleChange("location")}
        value={values.location}
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

      <WheelPicker
        setSelectedStartDate={setSelectedStartDate}
        visible={isCalendar}
        close={() => setIsCalendar(false)}
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
});
