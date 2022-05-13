import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import AppContext from "../../appContext/AppContext";

const PhonePicker = () => {
  const { countryCode, setCountryCode, country, setCountry } =
    useContext(AppContext);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  return (
    <View>
      <CountryPicker
        translation="eng"
        withFlag={true}
        withFilter
        onSelect={(country) => onSelect(country)}
        countryCode={countryCode}
      />
    </View>
  );
};

export default PhonePicker;

const styles = StyleSheet.create({});
