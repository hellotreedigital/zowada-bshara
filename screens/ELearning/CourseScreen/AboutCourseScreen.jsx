import React, { useState } from "react";
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

const commentorData = {
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3744&q=80",
  full_name: "اسم المعلم",
  experience_domain: {},
  comment: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد`,
};

export const AboutCourseScreen = ({ navigation, courseInfo, registered }) => {
  let [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

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
        message={"Already in cart"}
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
        <Text>سعر الدورة:</Text>
        <Text style={[globalStyles.textBlue, styles.extraMargin]}>
          {courseInfo?.price} LBP
        </Text>
      </View>

      <View style={[globalStyles.cardShadow, globalStyles.verticalTopSpacer20]}>
        <View style={[globalStyles.whiteCard, { paddingVertical: 10 }]}>
          <Text style={[globalStyles.textBlue, globalStyles.leftText]}>
            ماذا ستتعلم
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
          المدرب
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
                content="التعليقات"
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
                content="عرض المزيد"
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
                content="No Comments"
              />
            </View>
          )}
        </View>
      </View>
      {registered === 0 && (
        <View style={[globalStyles.verticalTopSpacer20]}>
          <SecondaryButton
            content="تسجيل"
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
