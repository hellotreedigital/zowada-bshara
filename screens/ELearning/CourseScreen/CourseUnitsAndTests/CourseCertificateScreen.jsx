import React, { useState, useEffect } from "react";
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

export const CourseCertificateScreen = ({ navigation }) => {
  let [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);

  useEffect(() => {
    setAllQuestionsAndAnswers(questionsAndAnswers);
  }, []);

  function goToResultCertificate() {
    const screenData = {
      backButtonTitle: "دراسة الحالة",
      contentText: longText,
      continueTo: "caseStudyScreen",
    };

    navigation.push("testIntroScreen", {
      data: screenData,
    });
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
          <Text style={[globalStyles.leftText, globalStyles.textBlue, globalStyles.textCenter, globalStyles.textMedium, globalStyles.textBold]}>تهانينا لقد حصلت على شارة جديدة </Text>
        </View>
        <View style={[styles.lessonCertificateTextContainer]}>
          <Text style={[globalStyles.leftText, globalStyles.textDarkBlue, globalStyles.textCenter, globalStyles.textMedium, globalStyles.textBold]}>بإمكانك مشاركة النتيجة على </Text>
        </View>
    </ScrollView>
  );
};
