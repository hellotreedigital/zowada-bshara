import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../globals/colors";
import { SCREEN_WIDTH } from "../../../../globals/globals";
import Certificate from "../../../../assets/Certificate.png";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";
import { RatingModal } from "../../../../components/Modals/RatingModal";
import {
  commentCourse,
} from "../../../../api/ELearning/ELearning";
import AppContext from "../../../../appContext/AppContext";

export const CourseCompletionCertificateScreen = ({ navigation, route }) => {

  const { data } = route.params
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const { fixedTitles } = useContext(AppContext);



  const continueWithCourse = () => {
    setModalVisible(true);
  };

  async function rateCourse(courseRating){
    setLoadingResults(true);
      await commentCourse(data.courseId, courseRating);
      navigation.pop(6)
      setLoadingResults(false);
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
        title={fixedTitles.coursesTitles["sticker"].title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <RatingModal
        visible={modalVisible}
        genColor={colors.dark_blue}
        rateCourse={rateCourse}
        close={() => {setModalVisible(false);}}
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
          <Text style={[globalStyles.leftText, globalStyles.textBlue, globalStyles.textCenter, globalStyles.textMedium, globalStyles.textBold]}>{fixedTitles.coursesTitles["earned-a-new-badge"].title}</Text>
        </View>

        <View style={[globalStyles.verticalTopSpacer20, globalStyles.verticalBottomSpacer20, {display:'flex', flexDirection:'row', justifyContent:'center'}]}>
          <SecondaryButton
            content={fixedTitles.coursesTitles["rate-the-course"].title}
            onPress={() => continueWithCourse()}
          />
        </View>

    </ScrollView>
  );
};
