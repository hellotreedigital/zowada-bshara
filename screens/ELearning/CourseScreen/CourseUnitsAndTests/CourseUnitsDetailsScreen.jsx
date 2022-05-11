import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { CourseUnitTemplate } from "./CourseUnitTemplate";
import {
  getSingleLesson,
  getLessonExam,
  getCaseStudy,
} from "../../../../api/ELearning/ELearning";
import AppContext from "../../../../appContext/AppContext";
import AuthContext from "../../../../appContext/AuthContext";
import FAQModal from "../../../../components/Modals/FAQModal";

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر
    
    
    صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const CourseUnitsDetailsScreen = ({ navigation, route }) => {
  let [courseRefresh, setcourseRefresh] = useState(false);
  let [lessonData, setLessonData] = useState({});
  const [loadingResults, setLoadingResults] = useState(false);
  let [lessonDataArray, setLessonDataArray] = useState([]);
  let [faqs, setFaqs] = useState([]);
  let [showFAQ, setShowFAQ] = useState(false);

  const { userName, email } = useContext(AppContext);
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext);

  useEffect(() => {
      if (isFocused) setcourseRefresh((prev) => !prev);
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      setLoadingResults(true);

      let examdataraw = await getLessonExam(
        route.params.data.courseId,
        route.params.data.lessonId
      );
      let examdata = examdataraw.data.exam;
      const hasExam = examdata !== null;
      if (hasExam) {
        examdata["type"] = 1;
        examdata["infoText"] = "تقدم للإختبار";
      }else{
        examdata = []
      }

      let lessondata = await getSingleLesson(
        route.params.data.courseId,
        route.params.data.lessonId
      );
      if (lessondata.data.faqs)
        setFaqs(lessondata.data.faqs);

      if (lessondata.data.lesson) {
        let lessonVideos = lessondata.data.lesson.videos;
        const hasVideos = lessonVideos.length > 0;
        let lessonCaseStudies = lessondata.data.lesson.case_studies;
        const hasCaseStudies = lessonCaseStudies.length > 0;
        let lessonStickers = lessondata.data.lesson.stickers;
        let lessonArticles = lessondata.data.lesson.articles;

        let lastStatus = false;

        if (hasVideos) {
          lessonVideos.forEach((vid) => {
            vid["disabled"] = lastStatus;
            lastStatus = !vid.watched;
          });
        }

        if (hasExam) {
          examdata["disabled"] = lastStatus;
          lastStatus = !examdata.is_passed;
        }

        if (hasCaseStudies) {
          for (let cs of lessonCaseStudies) {
            cs.type = 2;
            cs.infoText = "دراسة الحالة";
            cs["disabled"] = lastStatus;

            let caseStudyData = await getCaseStudy(
              route.params.data.courseId,
              route.params.data.lessonId,
              cs.id
            );
            lastStatus = !!caseStudyData?.data?.answer?.answer;
          }

          lessonCaseStudies[lessonCaseStudies.length - 1]["isLast"] = true;
        } else if (hasExam) examdata["isLast"] = true;
        else if (hasVideos)
          lessonVideos[lessonVideos.length - 1]["isLast"] = true;

        lessonArticles.forEach((article) => {
          article.type = 3;
          article.infoText = "مقالة";
        });
        lessonStickers.forEach((sticker) => {
          sticker.type = 4;
          sticker.infoText = "ملصق";
        });

        let lessondataArray = lessonVideos.concat(
          examdata,
          lessonCaseStudies,
          lessonArticles,
          lessonStickers
        );
        setLessonData(lessondata.data.lesson);
        setLessonDataArray(lessondataArray);
      }
      setLoadingResults(false);
    })();
  }, [courseRefresh]);

  function refreshLesson() {
    setcourseRefresh((prev) => !prev);
  }

  function handleClickEvent(i) {
    switch (i.type) {
      case 1:
        const screenData = {
          backButtonTitle: "اختبار",
          contentText: longText,
          continueTo: "multipleAnswersTestScreen",
          item: i,
          isLast: !!i.isLast,
        };
        navigation.push("testIntroScreen", {
          data: screenData,
          courseId: route.params.data.courseId,
        });
        break;
      case 2:
        const caseStudyScreenData = {
          courseId: route.params.data.courseId,
          lessonId: route.params.data.lessonId,
          case_studyId: i.id,
          isLast: !!i.isLast,
        };
        navigation.push("caseStudyScreen", { data: caseStudyScreenData });
        break;
      case 3:
        const articleScreenData = {
          courseId: route.params.data.courseId,
          lessonId: route.params.data.lessonId,
          articleId: i.id,
        };
        navigation.push("courseArticleScreen", { data: articleScreenData });
        break;
      case 4:
        navigation.push("coursePosterScreen", {
          data: { i },
          courseId: route.params.data.courseId,
          lessonId: route.params.data.lessonId,
        });
        break;
      default:
        break;
    }
  }

  function showFAQModal() {
    setShowFAQ(true);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FAQModal
        visible={showFAQ}
        FAQ={faqs}
        close={() => {
          setShowFAQ(false);
        }}
      />
      <View style={globalStyles.indicator}>
        <ActivityIndicator
          animating={loadingResults}
          color={colors.dark_blue}
          size="large"
        />
      </View>
      <FlatList
        style={[styles.mainPageContainer]}
        renderItem={(item) => {
          return (
            <CourseUnitTemplate
              item={item}
              navigation={navigation}
              refreshLesson={refreshLesson}
              handleClickEvent={handleClickEvent}
              courseId={route.params.data.courseId}
            />
          );
        }}
        data={lessonDataArray}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <ListHeader
            navigation={navigation}
            lessonData={lessonData}
            loadingResults={loadingResults}
          />
        }
        ListFooterComponent={<ListFooter showFAQModal={showFAQModal} />}
      />
    </SafeAreaView>
  );
};

const ListHeader = ({ navigation, lessonData, loadingResults }) => {
  return (
    <View style={globalStyles.verticalTopSpacer20}>
      <CustomPageHeader
        navigation={navigation}
        title={lessonData?.title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
    </View>
  );
};

const ListFooter = ({ showFAQModal }) => {
  return (
    <View style={[styles.lessonFAQ, globalStyles.verticalBottomSpacer20]}>
      <TouchableOpacity
        style={styles.lessonFAQIcon}
        onPress={() => {
          showFAQModal();
        }}
      >
        <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 22 }]}>
          ?
        </Text>
      </TouchableOpacity>
    </View>
  );
};
