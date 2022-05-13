import React from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import RedArrowSVG from "../../../SVGR/Globals/RedArrow";

export const RenderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Typography
          content={item.title}
          align="left"
          color={item.slug == "question" ? colors.focused : colors.dark_yellow}
          bold={true}
          size={14}
        />
      </View>
      <View style={styles.about}>
        <Typography size={12} content={item.text} align="left" />
      </View>
    </View>
  );
};

export const SingleQuestionScreen = ({ navigation, route }) => {
  const { data } = route.params;

  const questions = [
    {
      id: "0",
      title: "سؤال",
      text:
        "ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل",
      slug: "question",
    },
    {
      id: "1",
      title: "إجابه",
      text:
        "ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل",
      slug: "answer",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RedArrowSVG />
        </TouchableOpacity>
        <View>
          <ImageBackground style={styles.image} source={{ uri: data.image }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={{ top: SCREEN_HEIGHT * 0.009 }}>
            <Typography
              content="اسم الحالة"
              color={colors.dark_blue}
              size={16}
              align="left"
              bold={true}
            />
          </View>
          <View style={{ top: -SCREEN_HEIGHT * 0.005 }}>
            <Typography
              content="اسم االمستخدم"
              size={12}
              align="left"
              color={colors.dark_blue}
            />
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={questions}
          renderItem={RenderItem}
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
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: SCREEN_HEIGHT * 0.045,
    height: SCREEN_HEIGHT * 0.045,
    borderRadius: (SCREEN_HEIGHT * 0.045) / 2,
    overflow: "hidden",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT * 0.015,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6.68,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    elevation: 1,
  },
  list: {
    width: SCREEN_WIDTH,
    alignSelf: "center",
    height: SCREEN_HEIGHT,
  },
  about: {
    paddingBottom: 10,
  },
});
