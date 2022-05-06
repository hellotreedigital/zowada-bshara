import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView,
  ActivityIndicator,
  View, Text, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { CourseUnitTemplate } from "./CourseUnitTemplate";
import { getSingleLesson, getLessonExam } from "../../../../api/ELearning/ELearning";

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر
    
    
    صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const CourseUnitsDetailsScreen = ({ navigation, route }) => {
  let [courseRefresh, setcourseRefresh] = useState(false);
  let [lessonData, setLessonData] = useState({});
  const [loadingResults, setLoadingResults] = useState(false);
  let [lessonDataArray, setLessonDataArray] = useState([]);


  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setcourseRefresh(prev => !prev);
    });
    return () => {focusListener?.remove()};
  }, [navigation])
  

  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let lessondata = await getSingleLesson(
        route.params.data.courseId,
        route.params.data.lessonId
      );
      
      let examdata = await getLessonExam(
        route.params.data.courseId,
        route.params.data.lessonId
      );
      examdata.data.exam.type = 1;
      examdata.data.exam.infoText = 'تقدم للإختبار';
      const videosLength = lessondata.data.lesson.videos.length;
      if(videosLength > 0){
        if(lessondata.data.lesson.videos[videosLength - 1].watched) examdata.data.exam.disabled = false;
        else examdata.data.exam.disabled = true;
      }

      lessondata.data.lesson.videos.forEach((vid, index) => {
        vid.type = 0;
        vid.disabled = index === 0 ? false : !lessondata.data.lesson.videos[index - 1].watched
      });

      lessondata.data.lesson.case_studies.forEach((case_study, index) => {
        case_study.type = 2;
        case_study.infoText = 'دراسة الحالة';
        if(examdata.data.exam.disabled) case_study.disabled = true;
        else{
          case_study.disabled = index === 0 ? false : !lessondata.data.lesson.case_studies[index - 1].disabled
        }
      });

      lessondata.data.lesson.articles.forEach((article) => {
        article.type = 3;
        article.infoText = 'مقالة';
      });
      lessondata.data.lesson.stickers.forEach((sticker) => { 
        sticker.type = 4;
        sticker.infoText = 'ملصق';
      });

      let lessondataArray = lessondata.data.lesson.videos.concat(
        examdata.data.exam,
        lessondata.data.lesson.case_studies,
        lessondata.data.lesson.articles,
        lessondata.data.lesson.stickers
      );
      setLessonData(lessondata.data.lesson);
      setLessonDataArray(lessondataArray);
      setLoadingResults(false);
    })();
  }, [courseRefresh]);

  function refreshLesson(){
    setcourseRefresh(prev => !prev);
  }

  function handleClickEvent(i){
    switch(i.type){
      case 1:
        const screenData = {
          backButtonTitle: "اختبار",
          contentText: longText,
          continueTo: "multipleAnswersTestScreen",
          item: i,
        };
        navigation.push("testIntroScreen", {
          data: screenData,
          courseId: route.params.data.courseId
        });
        break;
      case 2:
        navigation.push("caseStudyScreen");
        break;
      case 3:
        const articleScreenData ={
          courseId: route.params.data.courseId,
          lessonId: route.params.data.lessonId,
          articleId: i.id
        }
        navigation.push("courseArticleScreen", {data:articleScreenData});
        break;
      case 4:
        navigation.push("coursePosterScreen", {data: {i}, courseId: route.params.data.courseId,
        lessonId: route.params.data.lessonId});
        break;
      default:
        break;
    }
    
  }

  // function continueWithCourse(item) {
  //   if (item.item.absolute_video_url) {

  //     let posterData = { video: absolute_video_url };
  //     navigation.push("coursePosterScreen", { data: posterData });
  //   } else {

  //     const screenData = {
  //       backButtonTitle: "اختبار",
  //       contentText: longText,
  //       continueTo: "multipleAnswersTestScreen",
  //       item: item,
  //     };
  //     navigation.push("testIntroScreen", {
  //       data: screenData,
  //     });
  //   }
  // }

  return (
    <SafeAreaView style={{flex: 1}}>

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
        <ListHeader navigation={navigation} lessonData={lessonData} loadingResults={loadingResults} />
      }
      ListFooterComponent={<ListFooter />}
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

const ListFooter = () => {
  return (
    <View style={[styles.lessonFAQ, globalStyles.verticalBottomSpacer20]}>
      <TouchableOpacity style={styles.lessonFAQIcon}>
        <Text style={[{color:"#fff", fontWeight:'bold', fontSize:22}]}>?</Text>
      </TouchableOpacity>
    </View>
  );
};
