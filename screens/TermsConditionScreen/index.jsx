import React, { useContext } from "react";
import { StyleSheet, Text, View,ScrollView, SafeAreaView } from "react-native";

import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { colors } from "../../globals/colors";
import AppContext from "../../appContext/AppContext";

export const TermsConditionScreen = ({ navigation }) => {
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];
  const { terms } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        red
        navigation={navigation}
        title={terms.terms_conditions.title}
      />
      <ScrollView>
        <RenderHTML
          source={{ html: terms.terms_conditions.text }}
          contentWidth={SCREEN_WIDTH}
          tagsStyles={{
            p: {
              fontFamily: "HelveticaLight",
              fontSize: SCREEN_HEIGHT * 0.019,
              color: colors.dark_blue,
              lineHeight: 24,
              paddingHorizontal: 20,
            },
            strong: {
              fontFamily: "HelveticaBold",
            }
          }}
          systemFonts={systemFonts}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
