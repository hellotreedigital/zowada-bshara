import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import ThumbsUp from "../../../../../assets/ThumbsUp.png";
import Comment from "../../../../../assets/Comment.png";
import { SCREEN_HEIGHT } from "../../../../../globals/globals";
import {
  getStickerComments,
  likeUnlikeSticker,
} from "../../../../../api/ELearning/ELearning";
import AppContext from "../../../../../appContext/AppContext";

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر


صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const CoursePosterScreen = ({ navigation, route }) => {
  const [loadingResults, setLoadingResults] = useState(false);
  let [courseRefresh, setcourseRefresh] = useState(false);
  let [commentsCount, setCommentsCount] = useState(null);
  const { width } = useWindowDimensions();
  const { data, courseId, lessonId } = route.params;
  let [sticker, setSticker] = useState();
  const { fixedTitles } = useContext(AppContext);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setcourseRefresh((prev) => !prev);
    });
    return () => {
      focusListener?.remove();
    };
  }, [navigation]);

  useEffect(() => {
    (async () => {
      setLoadingResults(true);

      let stComments = await getStickerComments(courseId, lessonId, data.i.id);
      setCommentsCount(stComments.data.comments.data.length);
      setSticker(data.i);
      setLoadingResults(false);
    })();
  }, [courseRefresh]);

  function goToResultCertificate() {
    const screenData = {
      backButtonTitle: fixedTitles.menuTitle["case-study"].title,
      contentText: longText,
      continueTo: "caseStudyScreen",
    };

    navigation.push("courseCertificateScreen", {
      data: screenData,
    });
  }

  async function likeSticker() {
    const like = await likeUnlikeSticker(courseId, lessonId, sticker.id);
    let s = Object.assign({}, sticker);
    s.liked_by_count = like.data.likes_count;
    setSticker(s);
  }

  function goToStickerCommentsScreen() {
    navigation.push("posterCommentsScreen", {
      data: {
        courseId: courseId,
        lessonId: lessonId,
        stickerId: sticker.id,
      },
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

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>
        <View
          style={[
            globalStyles.cardShadowStyle1,
            globalStyles.verticalBottomSpacer20,
          ]}
        >
          <View style={[styles.posterContainer]}>
            <View style={[styles.noPaddingNoMargin]}>
              <View
                style={[
                  styles.backgroundGrey,
                  styles.topPart,
                  styles.noPaddingNoMargin,
                ]}
              >
                <Image
                  style={[styles.posterImage, { height: SCREEN_HEIGHT * 0.3 }]}
                  resizeMode="cover"
                  source={{
                    uri: "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  }}
                />
              </View>

              <View style={[styles.columns, { padding: 5 }]}>
                <TouchableOpacity
                  style={[styles.rows, styles.bottomPart]}
                  onPress={() => likeSticker()}
                >
                  <Image
                    resizeMode="cover"
                    source={ThumbsUp}
                    style={styles.imagee}
                  />
                  <Text style={{ height: "auto", textAlignVertical: "center" }}>
                    {sticker?.liked_by_count}
                  </Text>

                  {/* <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>7500</Text>                     */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.rows, styles.bottomPart]}
                  onPress={() => {
                    goToStickerCommentsScreen();
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={Comment}
                    style={styles.imagee}
                  />
                  <Text style={{ height: "auto" }}>
                    {fixedTitles.coursesTitles["show-all-s"].title}{" "}
                    {commentsCount} {fixedTitles.coursesTitles["comment"].title}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content={fixedTitles.coursesTitles["continue"].title}
            fullWidth={true}
            onPress={() => goToResultCertificate()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
