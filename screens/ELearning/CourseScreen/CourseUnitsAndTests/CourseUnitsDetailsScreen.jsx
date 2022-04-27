import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { CourseUnitTemplate } from "./CourseUnitTemplate";
import { getSingleLesson } from "../../../../api/ELearning/ELearning";

const data = [
  {
    id: "0",
    title:
      " العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "فلان الفلاني",
    location: "موقع",
    topRanked: true,
    price: "89.00$",
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "1",
    title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "فلان الفلاني",
    location: "موقع",
    topRanked: true,
    price: "89.00$",
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "2",
    title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "فلان الفلاني",
    location: "موقع",
    topRanked: true,
    price: "89.00$",
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "3",
    title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "فلان الفلاني",
    location: "موقع",
    topRanked: true,
    price: "89.00$",
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "4",
    title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "تقدم للإختبار",
  },
  {
    id: "5",
    title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
    name: "تقدم للإختبار",
  },
];

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر
    
    
    صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
    هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const CourseUnitsDetailsScreen = ({ navigation, route }) => {
  let [lessonData, setLessonData] = useState({});
  let [lessonDataArray, setLessonDataArray] = useState([]);
  useEffect(() => {
    (async () => {
      let lessonData = await getSingleLesson(
        route.params.data.courseId,
        route.params.data.lessonId
      );
      console.log(lessonData.data.lesson);
      let lessonDataArray = lessonData.data.lesson.articles.concat(lessonData.data.lesson.case_studies, lessonData.data.lesson.stickers, lessonData.data.lesson.videos)
      setLessonData(lessonData.data.lesson);
      setLessonDataArray(lessonDataArray)
    })();
  }, []);

  function deleteCartItem() {}

  function continueWithCourse() {
    const screenData = {
      backButtonTitle: "اختبار",
      contentText: longText,
      continueTo: "multipleAnswersTestScreen",
    };
    navigation.push("testIntroScreen", {
      data: screenData,
    });
  }

  return (
    <FlatList
      style={[styles.mainPageContainer]}
      renderItem={(item) => {
        return (
          <CourseUnitTemplate
            item={item}
            handleClickEvent={deleteCartItem}
            continueWithCourse={continueWithCourse}
          />
        );
      }}
      data={lessonDataArray}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={<ListHeader navigation={navigation} lessonData={lessonData} />}
    />
  );
};

const ListHeader = ({ navigation, lessonData }) => {
  
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
