import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, SafeAreaView, KeyboardAvoidingView,
  Platform, TextInput} from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import { Formik } from "formik";
import {CaseStudyForm} from '../../../../../components/RegisterForm/CaseStudyForm'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../../globals/globals";

const questions=[
    {
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    },{
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    },{
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    }
]

export const CaseStudyScreen = ({ navigation }) => {

    let [allQuestions, setAllQuestions] = useState([]);
    const [errorObject, setErrorObject] = useState({
      errorVisible: false,
      answerError: 'خطأ'
    });

    useEffect(() => {
      setAllQuestions(questions);
    }, []);

    const handleExpertLogin = (values) => {
      var formdata = new FormData();
      formdata.append("answer", values.answer);
    };

  return (
    <ScrollView style={[globalStyles.body, globalStyles.backgrounLightGrey, styles.bottomPadding]}>
      <CustomPageHeaderWithProgress
        navigation={navigation}
        title="اختبار"
        showShare={false}
        showNotification={false}
        color={colors.blue}
        showProgress={true}
      />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>
          <View style={[globalStyles.verticalTopSpacer20]}><Text style={[globalStyles.textCenter, globalStyles.textBlue]}>اسم الموضوع</Text></View>

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
            <Text style={[globalStyles.textDarkBlue,styles.columns, styles.testText]}>
            صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى
            </Text>
          </View>

          <View style={styles.rows}>
            <Text style={[globalStyles.textDarkBlue,styles.columns, styles.testText, globalStyles.verticalTopSpacer20]}>
            صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى
            </Text>
          </View>

          <Formik
        initialValues={{
          answer: ""
        }}
      >
        {({ handleChange, values }) => (
            <SafeAreaView style={globalStyles.verticalTopSpacer20}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={globalStyles.verticalTopSpacer20}
              >
                <View style={styles.loader}>
                </View>
                <KeyboardAvoidingView
                  keyboardVerticalOffset={-120}
                  behavior={Platform.OS === "ios" ? "position" : "padding"}
                >
                  <View style={styles.content}>
                    <View style={styles.form}>
                    <TextInput
                      style={[styles.caseStudyInput]}
                      placeholder={'dcn'}
                      keyboardType="default"
                      placeholderTextColor={colors.blue}
                      selectionColor={colors.dark_blue}
                      secureTextEntry={false}
                      value={values.answer}
                      onChangeText={handleChange}
                      placeholderStyle={styles.textboxfieldd}
                      multiline={true}
                      numberOfLines={6}
                    />
                    </View>
                  </View>
                  <>
                    <View style={styles.button}>
                      <View style={styles.submit}>
                      </View>
                    </View>
                  </>
                </KeyboardAvoidingView>
              </ScrollView>
            </SafeAreaView>
        )}
      </Formik>


        </View>
      </View>
    </View>


      <View style={[globalStyles.verticalTopSpacer20]}><SecondaryButton content="استمر" fullWidth={true} onPress={()=> navigation.push('caseStudyAnswersScreen')}/></View>
      </View>

    </ScrollView>
  );
};
