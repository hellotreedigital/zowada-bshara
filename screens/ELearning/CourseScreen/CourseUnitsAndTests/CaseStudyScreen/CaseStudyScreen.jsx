import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  useWindowDimensions
} from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import { Formik, useFormik } from "formik";
import { CaseStudyForm } from "../../../../../components/RegisterForm/CaseStudyForm";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../../globals/globals";
import {
  getCaseStudy,
  answerCaseStudy,
} from "../../../../../api/ELearning/ELearning";
import RenderHtml from "react-native-render-html";

export const CaseStudyScreen = ({ navigation, route }) => {
  const { data } = route.params;
  let [caseStudy, setcaseStudy] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const { width } = useWindowDimensions();

  const formikRef = useRef();

  const [errorObject, setErrorObject] = useState({
    errorVisible: false,
    answerError: "خطأ",
  });

  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let caseStudyData = await getCaseStudy(
        data.courseId,
        data.lessonId,
        data.case_studyId
      );
      setcaseStudy(caseStudyData.data.case_study);
      if (caseStudyData?.data?.answer?.answer) {
        if(formikRef.current){
          formikRef.current.setFieldValue('answer', caseStudyData.data.answer.answer);
        }
      }
      setLoadingResults(false);
    })();
  }, []);

  async function onSubmitCaseStudyPressed(answer) {
    setLoadingResults(true);
    await answerCaseStudy(data.courseId, data.lessonId, data.case_studyId, {
      answer: answer,
    });
    navigation.push('caseStudyAnswersScreen', {data: {caseStudy: caseStudy, isLast: data.isLast}})
    setLoadingResults(false);
  }

  return (
    <ScrollView
      style={[
        globalStyles.body,
        globalStyles.backgrounLightGrey
      ]}
      contentContainerStyle={{flexGrow:1}}
    >
      <CustomPageHeaderWithProgress
        navigation={navigation}
        title="اختبار"
        showShare={false}
        showNotification={false}
        color={colors.blue}
        showProgress={true}
        progress={caseStudy?.answer !== null ? 1 : 0.5}
      />
      <Formik
      innerRef={formikRef}
        initialValues={{
          answer: "",
        }}
      >
        {({ handleChange, values, resetForm, setFieldValue }) => (

          <View style={[styles.mainPageContainer,
            globalStyles.verticalBottomSpacer20, {flexGrow:1, justifyContent:'space-between'}]}>
            <View style={[globalStyles.verticalTopSpacer20]}>
            <View>
              <Text style={[globalStyles.textCenter, globalStyles.textBlue]}>
                {caseStudy.title}
              </Text>
            </View>

            <View
              style={[
                globalStyles.cardShadow,
                globalStyles.verticalTopSpacer20,
                styles.testText,
              ]}
            >
              <View style={[globalStyles.whiteCard]}>
                <View style={styles.textTextContainer}>
                  <View style={styles.rows}>
                  {caseStudy.subject ? (
                    <RenderHtml
                      contentWidth={width}
                      style={globalStyles.textDarkBlue}
                      source={{ html: caseStudy?.subject }}
                    />
                  ) : null}
                  </View>

                  <SafeAreaView style={globalStyles.verticalTopSpacer20}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      style={globalStyles.verticalTopSpacer20}
                    >
                      <View style={styles.loader}></View>
                      <KeyboardAvoidingView
                        keyboardVerticalOffset={-120}
                        behavior={
                          Platform.OS === "ios" ? "position" : "padding"
                        }
                      >
                        <View style={styles.content}>
                          <View style={styles.form}>
                            <TextInput
                              style={[styles.caseStudyInput]}
                              placeholder={caseStudy?.answer?.answer ? caseStudy.answer.answer : "أجب عن السؤال هنا"}
                              keyboardType="default"
                              placeholderTextColor={colors.blue}
                              selectionColor={colors.dark_blue}
                              secureTextEntry={false}
                              value={values.answer}
                              onChangeText={handleChange("answer")}
                              placeholderStyle={styles.textboxfieldd}
                              multiline={true}
                              numberOfLines={6}
                            />
                          </View>
                        </View>
                      </KeyboardAvoidingView>
                    </ScrollView>
                  </SafeAreaView>
                </View>
              </View>
            </View>
            </View>

            <View style={[globalStyles.verticalTopSpacer20,
        globalStyles.verticalBottomSpacer20]}>
              <SecondaryButton
                content="استمر"
                fullWidth={true}
                onPress={() => {
                  onSubmitCaseStudyPressed(values.answer);
                  resetForm();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
