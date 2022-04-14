import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, ImageBackground, Image } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../globals/colors";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";
import { SCREEN_HEIGHT } from "../../../../globals/globals";

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

export const CoursePosterScreen = ({ navigation }) => {
  let [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);

  useEffect(() => {
    setAllQuestionsAndAnswers(questionsAndAnswers);
  }, []);

  function goToTestIntro(){

    const screenData ={
        backButtonTitle:"دراسة الحالة",
        contentText: longText,
        continueTo:"caseStudyScreen"
      }

    navigation.push('testIntroScreen',{
        data: screenData
    })
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
        title="ملصق"
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>

      <View style={[globalStyles.cardShadowStyle1, globalStyles.verticalBottomSpacer20]}>
        <View style={[styles.card]}>
            <View style={[styles.columns]}>
                <View style={[styles.rows, styles.backgroundGrey, styles.topPart]}>

                        <View>
                        <ImageBackground
                        style={[
                            styles.posterImage,
                            { height: SCREEN_HEIGHT * 0.35 },
                        ]}
                        resizeMode="cover"
                        source={{ uri: "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}}
                    />
                        </View>
                </View>

                <View style={[styles.columns]}>
                <View style={[styles.rows, styles.bottomPart]}>
                    <Image resizeMode="cover" source={ThumbsUp} style={styles.imagee} /> 
                    <Text style={{height: 'auto', textAlignVertical:"center"}}>135000</Text>

                    {/* <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>7500</Text>                     */}
                </View>

                <View style={[styles.rows, styles.bottomPart]}>
                    <Image resizeMode="cover" source={Comment} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>عرض جميع 20 تعليق</Text>               
                </View>


                </View>
            </View>
        </View>
        </View>


        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content="استمر"
            fullWidth={true}
            onPress={() => goToTestIntro()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
