import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../globals/colors";

export const MyOrdersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
