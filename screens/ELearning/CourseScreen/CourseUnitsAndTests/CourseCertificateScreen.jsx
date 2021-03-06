import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../globals/colors";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";
import ThumbsUp from "../../../../assets/ThumbsUp.png";
import Comment from "../../../../assets/Comment.png";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import badge from "../../../../assets/Group498.png";
import badge1 from "../../../../assets/Group4186.png";
import Certificate from "../../../../assets/LessonCertificate.png";
import AppContext from "../../../../appContext/AppContext";

export const CourseCertificateScreen = ({ navigation, route }) => {

  const { data } = route.params;
  const { fixedTitles } = useContext(AppContext);

  function continueWithCourse() {
    if(data.isLastLesson){
      navigation.push("courseCompletionCertificateScreen", {data:{courseId: data.courseId}});
    }else{
      navigation.pop(4)
    }

    
  }

  return (
    <ScrollView
      style={[
        globalStyles.body,
        globalStyles.backgrounLightGrey,
        styles.bottomPadding,
      ]}
    >
      <CustomPageHeaderWithProgress
        navigation={navigation}
        title={fixedTitles.coursesTitles["sticker"].title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <View
        style={[
          styles.mainPageContainer,
          {
            width: "100%",
            position: "relative",
            marginHorizontal: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          },
        ]}
      >
        <View style={[styles.certificateImagesContainer]}>
          <View style={[styles.posterImageContainer]}>
            <Image
              style={[styles.posterImage, { width: SCREEN_WIDTH * 0.6 }]}
              resizeMode="contain"
              source={Certificate}
            />
          </View>
      </View>
        </View>
        <View style={[styles.lessonCertificateTextContainer]}>
          <Text style={[globalStyles.leftText, globalStyles.textBlue, globalStyles.textCenter, globalStyles.textMedium, globalStyles.textBold]}>{fixedTitles.coursesTitles["you-have-finished-the-course"].title}</Text>
        </View>
        <View style={[styles.lessonCertificateTextContainer]}>
          <Text style={[globalStyles.leftText, globalStyles.textDarkBlue, globalStyles.textCenter, globalStyles.textMedium, globalStyles.textBold]}>{fixedTitles.coursesTitles["remaining-steps"].title}</Text>
        </View>

        <View style={[globalStyles.verticalTopSpacer20, {display:'flex', flexDirection:'row', justifyContent:'center'}]}>
          <SecondaryButton
            content={fixedTitles.coursesTitles["continue"].title}
            onPress={() => continueWithCourse()}
          />
        </View>
    </ScrollView>
  );
};
