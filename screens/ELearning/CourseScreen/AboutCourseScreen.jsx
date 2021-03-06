import React, { useContext, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { courseStyles as styles } from "./CourseStyles";
import { FeedbackCard } from "../../../components/Feedback/FeedbackCard";
import { FeedbackPersonCard } from "../../../components/Feedback/FeedbackPersonCard";
import { colors } from "../../../globals/colors";
import Typography from "../../../components/Typography/Typography";

import { globalStyles } from "../../../globals/globaStyles";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import MessageModal from "../../../components/Modals/MessageModal";
import { addToCart } from "../../../api/ELearning/ELearning";
import RenderHtml from "react-native-render-html";
import AppContext from "../../../appContext/AppContext";

export const AboutCourseScreen = ({ navigation, courseInfo, registered }) => {
  let [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  const {
    fixedTitles
} = useContext(AppContext);

  function personPressed() {
    /* TODO document why this function 'personPressed' is empty */
  }

  function goToCart() {
    (async () => {
      setLoading(true);
      const a = await addToCart(courseInfo.id);
      if (a.status ? a.status.toString()[0] : "" === "2") {
        setLoading(false);
        navigation.push("cartScreen");
      } else {
        setModalVisible(true);
      }
    })();
  }

  return (
    <ScrollView style={styles.paragraph} showsVerticalScrollIndicator={false}>
      <MessageModal
        visible={modalVisible}
        message={fixedTitles.coursesTitles["already-in-cart"].title}
        close={() => {
          setModalVisible(false);
        }}
      />
      <View style={globalStyles.loader}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_blue}
        />
      </View>
      <View
        style={[
          globalStyles.verticalTopSpacer20,
          globalStyles.verticalBottomSpacer20,
        ]}
      >
        {courseInfo ? (
          <RenderHtml
            contentWidth={width}
            style={globalStyles.textDarkBlue}
            source={{ html: courseInfo?.about }}
          />
        ) : null}
      </View>
      <View style={[styles.rowContainer, globalStyles.verticalTopSpacer10]}>
        <Text>{fixedTitles.coursesTitles["course-price"].title}:</Text>
        <Text style={[globalStyles.textBlue, styles.extraMargin]}>
          {courseInfo?.price} {fixedTitles.coursesTitles["currency"].title}
        </Text>
      </View>

      <View style={[globalStyles.cardShadow, globalStyles.verticalTopSpacer20]}>
        <View style={[globalStyles.whiteCard, { paddingVertical: 10 }]}>
          <Text style={[globalStyles.textBlue, globalStyles.leftText]}>
          {fixedTitles.coursesTitles["what-will-you-learn"].title}
          </Text>
          <Text style={[globalStyles.textDarkBlue, globalStyles.leftText]}>
            {" "}
            {courseInfo?.learning_objectives}
          </Text>
        </View>
      </View>

      <View
        style={[
          globalStyles.verticalBottomSpacer20,
          globalStyles.verticalTopSpacer20,
        ]}
      >
        <Text
          style={[
            globalStyles.textBlue,
            styles.verticalTopSpacer10,
            globalStyles.leftText,
          ]}
        >
          {fixedTitles.coursesTitles["teacher"].title}
        </Text>
        <FeedbackPersonCard
          data={{
            text: courseInfo?.about_teacher,
            rating: courseInfo?.teacher?.teacher_rating,
            full_name: courseInfo?.teacher?.full_name,
            image_absolute_url: `${courseInfo?.formatted_image}${courseInfo?.teacher?.image}`,
            experienceDomain: courseInfo?.teacher?.experience_domain?.title,
          }}
          size="large"
        />
      </View>

      <View style={[styles.cardShadow, globalStyles.verticalTopSpacer20]}>
        <View style={[globalStyles.whiteCard]}>
          <View style={[styles.about, styles.spacing]}>
            <View style={styles.aboutLeft}>
              <Typography
                bold={true}
                align="left"
                color={colors.blue}
                size={16}
                content={fixedTitles.coursesTitles["comments"].title}
              />
            </View>
            <TouchableOpacity
              style={styles.aboutRight}
              onPress={() => {
                navigation.push("courseCommentsScreen", {data:{courseId: courseInfo.id, registered: registered}});
              }}
            >
              <Typography
                color={colors.dark_blue}
                size={14}
                content={fixedTitles.coursesTitles["show-all"].title}
                align="left"
              />
            </TouchableOpacity>
          </View>
          {courseInfo?.comment ? (
            <FeedbackCard
              data={{
                text: courseInfo?.comment?.comment,
                rating: courseInfo?.comment?.rating,
                full_name: courseInfo?.comment?.user?.full_name,
                image_absolute_url:
                  courseInfo?.comment?.user?.image_absolute_url,
              }}
              onPress={personPressed}
              size="small"
            />
          ) : (
            <View style={styles.aboutLeft}>
              <Typography
                bold={true}
                align="left"
                color={colors.blue}
                size={16}
                content={fixedTitles.coursesTitles["no-comments"].title}
              />
            </View>
          )}
        </View>
      </View>
      {registered === 0 && (
        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content={fixedTitles.coursesTitles["register"].title}
            fullWidth={true}
            onPress={() => {
              goToCart();
            }}
          />
        </View>
      )}

      <View
        style={[
          globalStyles.verticalTopSpacer20,
          globalStyles.verticalBottomSpacer10,
        ]}
      />
    </ScrollView>
  );
};

const ListItem = ({ content }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <Text style={{ display: "flex" }}>{"\u002D"}</Text>
      <Text style={{ flex: 1 }}> {content}</Text>
    </View>
  );
};
