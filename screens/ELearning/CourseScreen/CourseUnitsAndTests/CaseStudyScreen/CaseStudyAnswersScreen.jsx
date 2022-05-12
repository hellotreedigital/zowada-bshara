import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, 
  useWindowDimensions
 } from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import RenderHtml from "react-native-render-html";

export const CaseStudyAnswersScreen = ({ navigation, route }) => {
  const { data } = route.params


  function continueWithCourse(){
    if(data.isLast){
      navigation.push('courseCertificateScreen', {data:{isLastLesson: data.isLastLesson, courseId: data.courseId}});
    }
    else navigation.pop(2)
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
        title="اختبار"
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>
          <QuestionAnswerContainer
            case_study={data?.caseStudy}
          />
        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content="استمر"
            fullWidth={true}
            onPress={() => continueWithCourse()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const QuestionAnswerContainer = ({ case_study }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[globalStyles.verticalTopSpacer20]}>
      <View style={[]}>
        {case_study?.subject ? (
                    <Text
                      style={[globalStyles.textBlue, styles.columns, globalStyles.leftText]}
                    >{case_study?.subject}</Text>
                  ) : null}
        {case_study?.correct_answer ? (
                    <RenderHtml
                      contentWidth={width}
                      style={[
                        globalStyles.textDarkBlue,
                        styles.columns,
                        globalStyles.verticalTopSpacer20,
                        globalStyles.verticalBottomSpacer20
                      ]}
                      source={{ html: case_study?.correct_answer }}
                    />
                  ) : null}
      </View>
    </View>
  );
};
