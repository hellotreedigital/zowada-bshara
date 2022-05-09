import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import { TestQuestionTemplate } from "./TestQuestionTemplate";

const questionsAndAnswers = [
  {
    questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,

    answerText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
  },
  {
    questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,

    answerText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
  },
  {
    questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,

    answerText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
  },
];

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر


صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const TestResultsScreen = ({ navigation, route }) => {
  let [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);
  const { data } = route.params;

  useEffect(() => {
    setAllQuestionsAndAnswers(questionsAndAnswers);
  }, []);

  function goToTestIntro() {
    const screenData = {
      backButtonTitle: "دراسة الحالة",
      contentText: longText,
      continueTo: "caseStudyScreen",
    };

    navigation.push("testIntroScreen", {
      data: screenData,
    });
  }

  function continueWithLesson(){
    if(data.isLast){
      navigation.push('courseCertificateScreen');
    }
    else navigation.pop(3)
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
        <View style={[styles.resultContainer]}>
          <Text>
            <Text
              style={[
                styles.score,
                data.correctAnswers >= data.passing_answers_number
                  ? globalStyles.textBlue
                  : globalStyles.textRed,
              ]}
            >
              {data.correctAnswers}
            </Text>
            <Text style={[styles.score, globalStyles.textDarkBlue]}>/</Text>
            <Text style={[styles.totalValue, globalStyles.textDarkBlue]}>
              {data.numberOfQuestions}
            </Text>
          </Text>
        </View>
        <View>
          <Text
            style={[
              data.correctAnswers >= data.passing_answers_number
                ? globalStyles.textBlue
                : globalStyles.textRed,
              { textAlign: "center", fontWeight:'bold' },
            ]}
          >
            {data.correctAnswers >= data.passing_answers_number
              ? "ناجح"
              : "راسب"}
          </Text>
          {data.correctAnswers <= data.passing_answers_number ?<Text
            style={[
              { textAlign: "center", fontWeight:'bold' },
            ]}
          >
            يرجى إعادة الاختبار
          </Text> : null }
        </View>
        {allQuestionsAndAnswers.map((question, index) => (
          <QuestionAnswerContainer
            key={index}
            ind={index}
            question={question}
          />
        ))}
        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content="استمر"
            fullWidth={true}
            onPress={() => continueWithLesson()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const QuestionAnswerContainer = ({ question }) => {
  return (
    <View style={[globalStyles.cardShadow, globalStyles.verticalTopSpacer20]}>
      <View style={[globalStyles.whiteCard]}>
        <Text style={[globalStyles.textBlue, styles.columns]}>
          {question.questionText}
        </Text>
        <Text
          style={[
            globalStyles.textDarkBlue,
            styles.columns,
            globalStyles.verticalTopSpacer20,
          ]}
        >
          {question.questionText}
        </Text>
      </View>
    </View>
  );
};
