import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, I18nManager, } from "react-native";
import { courseStyles as styles } from "./CourseStyles";
import image from "../../../assets/correctMark.png";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import {globalStyles} from '../../../globals/globaStyles';
import { colors } from "../../../globals/colors";


const syllabusItems = [
  {
    id: 0,
    title: "العنوان",
    text: "العنوان هنا فلا أحد يرفض أو يكره",
    isPassed: true,
  },
  {
    id: 1,
    title: "العنوان",
    text: "العنوان هنا فلا أحد يرفض أو يكره",
    isPassed: true,
  },
  {
    id: 2,
    title: "العنوان",
    text: "العنوان هنا فلا أحد يرفض أو يكره",
    isPassed: false,
  },
  {
    id: 3,
    title: "العنوان",
    text: "العنوان هنا فلا أحد يرفض أو يكره",
    isPassed: false,
  }
];

//const image = { uri: "../../../assets/emptyStar.png" };

export const CourseSyllabusScreen = ({ navigation }) => {
  let [syllabusContent, setSyllabusContent] = useState([]);

  useEffect(() => {
    setSyllabusContent(syllabusItems);
  }, []);

  return (
    <ScrollView style={styles.paragraph} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.verticalTopSpacer20}>
        {syllabusContent.map((item, index) => (
          <SyllabusItem
            key={item.id}
            content={item}
            isFirst={index === 0}
            isLast={index === syllabusContent.length - 1}
            ind={index}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const SyllabusItem = ({ content, isFirst, isLast, ind, navigation }) => {
  return (
    <TouchableOpacity
      style={[
        styles.syllabusItemContainer,
        isFirst && styles.firstItemBorder,
        isLast && styles.lastItemBorder,
      ]}
      onPress={() => {navigation.push('courseUnitsDetailsScreen')}}
    >
      <View style={[styles.rows]}>
        <View style={[styles.columns]}>
          <Text style={[globalStyles.icon, globalStyles.backgrounWhite, globalStyles.iconBorder]}>{ind + 1}</Text>
        </View>
        <View style={styles.columns}>
          <Text style={globalStyles.textBlue}>{content.title}</Text>
          <Text>{content.text}</Text>
        </View>
      </View>

      <View style={[styles.columns]}>
      {content.isPassed ? <View style={[globalStyles.icon, globalStyles.backgrounWhite, styles.columns]}>
          <Image resizeMode="cover" source={image} style={styles.imagee} /> 
        </View>: 
        <View style={globalStyles.icon}>
            <ArrowSVG
            style={{
                transform: [
                    { rotateY: I18nManager.isRTL ? "180deg" : "0deg" },
                ]
            }}
            fill={colors.blue}
        /></View>}
      </View>
    </TouchableOpacity>
  );
};
