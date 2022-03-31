import React from "react";
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";

export const renderCard = ({ item }) => {
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
        <Typography
          content={item.text}
          align="left"
          color={colors.dark_blue}
          size={14}
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
      text:
        "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
    {
      id: "1",
      title: "مهمتنا",
      text:
        "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
    {
      id: "2",
      title: "قيمنا",
      text:
        "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل اصي” فتجعلها تبدو (أي الأحرف) ",
    },
  ];

  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
            content="معلومات عنا"
            align="left"
            color={colors.focused}
            size={20}
            bold={true}
          />
        </View>
      </View>
      <View>
        <RenderHTML
          source={{
            html:
              "<p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف) </p>",
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
          renderItem={renderCard}
          data={data}
          keyExtractor={(item) => item.id}
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
  header: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    // marginHorizontal: 20,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  card: {
    width: SCREEN_WIDTH - 20,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#00000080",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.51,
    marginBottom: SCREEN_HEIGHT * 0.009,
    marginTop: SCREEN_HEIGHT * 0.009,

    elevation: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});
