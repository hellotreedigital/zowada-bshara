import React, { useContext } from "react";
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import AppContext from "../../appContext/AppContext";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import { WebView } from "react-native-webview";

export const renderCard = ({ item }) => {
  console.log(item);

  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];
  console.log(item.text);
  return (
    <View style={styles.card}>
      <View>
        <Typography
          content={item.title}
          align="left"
          color={colors.focused}
          size={16}
          bold={true}
        />
      </View>
      <View>
        <RenderHTML
          source={{
            html: item.text,
          }}
          contentWidth={SCREEN_WIDTH * 0.9}
          tagsStyles={{
            p: {
              fontFamily: "HelveticaLight",
              fontSize: SCREEN_HEIGHT * 0.018,
              color: colors.dark_blue,
              textAlign: I18nManager.isRTL ? "left" : "right",
              lineHeight: 24,
              paddingHorizontal: 20,
            },
          }}
          systemFonts={systemFonts}
        />
      </View>
    </View>
  );
};

export const AboutScreen = ({ navigation }) => {
  const data = [
    {
      id: "0",
      title: "رؤيتنا",
      text: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
    {
      id: "1",
      title: "مهمتنا",
      text: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
    {
      id: "2",
      title: "قيمنا",
      text: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
  ];

  const { aboutUs } = useContext(AppContext);

  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ marginRight: 10 }}
        >
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View>
          <Typography
            content={aboutUs.titles["about-us"].title}
            align="left"
            color={colors.focused}
            size={20}
            bold={true}
          />
        </View>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <View>
          <RenderHTML
            source={{
              html: aboutUs.titles["about-us"].text,
            }}
            contentWidth={SCREEN_WIDTH * 0.9}
            tagsStyles={{
              p: {
                fontFamily: "HelveticaLight",
                fontSize: SCREEN_HEIGHT * 0.018,
                color: colors.dark_blue,
                textAlign: I18nManager.isRTL ? "left" : "right",
                lineHeight: 24,
                paddingHorizontal: 20,
              },
            }}
            systemFonts={systemFonts}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={renderCard}
            contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.04 }}
            data={aboutUs.sections}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    // marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    // marginHorizontal: 20,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingBottom: 30,
  },
  card: {
    width: SCREEN_WIDTH - 20,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 20,
    shadowOpacity: 0.16,
    shadowRadius: 6.51,
    marginBottom: SCREEN_HEIGHT * 0.009,
    marginTop: SCREEN_HEIGHT * 0.009,

    elevation: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});
