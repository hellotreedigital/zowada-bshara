import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { colors } from "../../globals/colors";
import AppContext from "../../appContext/AppContext";

export const RefundPolicyScreen = ({ navigation }) => {
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];

  const { refundPolicy } = useContext(AppContext);

  console.log(refundPolicy);
  let text = refundPolicy.refund_policy.text;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        red
        navigation={navigation}
        title={refundPolicy.refund_policy.title}
      />
      <View>
        <RenderHTML
          source={{ html: text }}
          contentWidth={SCREEN_WIDTH}
          tagsStyles={{
            p: {
              fontFamily: "HelveticaLight",
              fontSize: SCREEN_HEIGHT * 0.019,
              color: colors.dark_blue,
              textAlign: "left",
              lineHeight: 24,
              paddingHorizontal: 20,
            },
          }}
          systemFonts={systemFonts}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
