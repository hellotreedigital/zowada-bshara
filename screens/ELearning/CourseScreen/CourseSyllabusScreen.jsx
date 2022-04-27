import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, I18nManager, } from "react-native";
import { courseStyles as styles } from "./CourseStyles";
import image from "../../../assets/correctMark.png";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import {globalStyles} from '../../../globals/globaStyles';
import MessageModal from "../../../components/Modals/MessageModal";
import { colors } from "../../../globals/colors";

export const CourseSyllabusScreen = ({ navigation, courseInfo, registered }) => {

  return (
    <ScrollView style={styles.paragraph} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.verticalTopSpacer20}>
        {courseInfo?.lessons.map((item, index) => (
          <SyllabusItem
            key={item.id}
            content={item}
            isFirst={index === 0}
            isLast={index === courseInfo?.lessons.length - 1}
            ind={index}
            navigation={navigation}
            registered={registered}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const SyllabusItem = ({ content, isFirst, isLast, ind, navigation, registered }) => {

  let [modalVisible, setModalVisible] = useState(false);

  function goToLesson(){
    if(registered === 1) {
      let lessonData = {
        lessonId: content.id,
        courseId: content.course_id
      }
      navigation.push('courseUnitsDetailsScreen', {data: lessonData})
    }
    else setModalVisible(true)
    }

  return (
    <TouchableOpacity
      style={[
        styles.syllabusItemContainer,
        isFirst && styles.firstItemBorder,
        isLast && styles.lastItemBorder,
      ]}
      onPress={() => {goToLesson() }}
    >
      <MessageModal
                visible={modalVisible}
                message={"You are not registered for this course yet"}
                close={() => {
                  setModalVisible(false);
                }}
              />
      <View style={[styles.rows]}>
        <View style={[styles.columns]}>
          <Text style={[globalStyles.icon, globalStyles.backgrounWhite, globalStyles.iconBorder]}>{ind + 1}</Text>
        </View>
        <View style={styles.columns}>
          <Text style={[globalStyles.textBlue, globalStyles.leftText]}>{content.title}</Text>
          <Text style={[globalStyles.leftText]}>{content.subtitle}</Text>
        </View>
      </View>

      <View style={[styles.columns]}>
      {content.isPassed && content.registered ? <View style={[globalStyles.icon, globalStyles.backgrounWhite, styles.columns]}>
          <Image resizeMode="cover" source={image} style={styles.imagee} /> 
        </View> : null}

        {!content.isPassed && content.registered ? 
        <View style={globalStyles.icon}>
            <ArrowSVG
            style={{
                transform: [
                    { rotateY: I18nManager.isRTL ? "180deg" : "0deg" },
                ]
            }}
            fill={colors.blue}
        /></View> : null}
      </View>
    </TouchableOpacity>
  );
};