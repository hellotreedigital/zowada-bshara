import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";

import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { colors } from "../../globals/colors";
import AppContext from "../../appContext/AppContext";

export const PrivacyPolicyScreen = ({ navigation }) => {
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];

  const { privacyPolicy } = useContext(AppContext);

  console.log(privacyPolicy);
  let text = privacyPolicy.privacy_policy.text;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        red
        navigation={navigation}
        title={privacyPolicy.privacy_policy.title}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <RenderHTML
          source={{ html: text }}
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
