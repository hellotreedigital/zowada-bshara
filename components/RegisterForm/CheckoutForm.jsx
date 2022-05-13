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
export const CheckoutForm = ({
  values,
  handleChange,
  errorObject,
  experience,
  experienceType,
  experienceValue,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const Phone = ["Number1", "Number2", fixedTitles.authTitles["phone-number"].title];
  const CreditCards = ["CC1", "CC2", 'بطاقة ائتمان'];

  return (
    <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
            <Typography
              content={'تفاصيل'}
              color={colors.blue}
              align="left"
              size={19}
            />
          </View>
      <RNCheckoutTextInput
        placeholder={fixedTitles.authTitles["full-name"].title}
        spacing={true}
        spacingVal={15}
        type={"default"}
        password={false}
        value={values.fullName}
        handleChange={handleChange("fullName")}
        error={errorObject.fullNameError}
        isError={errorObject.errorVisible}
        textColor={colors.dark_blue}
      />

      <RNCheckoutTextInput
        placeholder={fixedTitles.authTitles["email-address"].title}
        spacing={true}
        spacingVal={15}
        type={"email-address"}
        password={false}
        value={values.email}
        handleChange={handleChange("email")}
        error={errorObject.emailError}
        isError={errorObject.errorVisible}
        numberOfLines={6}
        textColor={colors.dark_blue}
      />
      <>
      <RNCheckoutTextInput
        placeholder={'phoneNumber'}
        spacing={true}
        spacingVal={15}
        type={"phone-pad"}
        password={false}
        value={values.phoneNumber}
        handleChange={handleChange("phoneNumber")}
        error={errorObject.emailError}
        isError={errorObject.errorVisible}
        numberOfLines={6}
        textColor={colors.dark_blue}
      />
      </>
      <View style={{ marginBottom: 15 }}>
            <Typography
              content={'طريقة الدفع'}
              color={colors.blue}
              align="left"
              size={19}
            />
          </View>
      <>
      <RNCheckoutTextInput
        placeholder={'بطاقة ائتمان'}
        spacing={true}
        spacingVal={15}
        type={"numeric"}
        password={false}
        value={values.creditCard}
        handleChange={handleChange("creditCard")}
        error={errorObject.emailError}
        isError={errorObject.errorVisible}
        numberOfLines={6}
        textColor={colors.dark_blue}
        disabled={true}
      />
      </>
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