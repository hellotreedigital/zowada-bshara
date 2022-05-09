import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../../components/CustomPageHeader/CustomPageHeader";
import ShareSVG from "../../../../../SVGR/Home/Share";
import { colors } from "../../../../../globals/colors";
import { Formik } from "formik";
import {
  getStickerComments,
  commentSticker,
} from "../../../../../api/ELearning/ELearning";
import Comment from "../../../../../assets/Comment.png";

import { VideoFeedbackCard } from "../../../../../components/Feedback/VideoFeedbackCard";

export const PosterCommentsScreen = ({ navigation, route }) => {
  let [comments, setComments] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const { data } = route.params;

  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let stComments = await getStickerComments(
        data.courseId,
        data.lessonId,
        data.stickerId
      );
      setComments(stComments.data.comments.data);
      setLoadingResults(false);
    })();
  }, []);

  async function onCommentStickerPressed(comment) {
    setLoadingResults(true);
    await commentSticker(data.courseId, data.lessonId, data.stickerId, {
      comment: comment,
    });
    let stComments = await getStickerComments(
      data.courseId,
      data.lessonId,
      data.stickerId
    );
    setComments(stComments.data.comments.data);
    setLoadingResults(false);
  }

  return (
    <View
      style={[
        globalStyles.verticalTopSpacer20,
        globalStyles.backgrounWhite,
        { flex: 1, flexGrow: 1 },
      ]}
    >
      <View style={globalStyles.indicator}>
        <ActivityIndicator
          animating={loadingResults}
          color={colors.dark_blue}
          size="large"
        />
      </View>

      <CustomPageHeader
        navigation={navigation}
        title={"تعليقات"}
        showShare={false}
        showNotification={false}
        color={colors.blue}
        spaceHorizontally={true}
      />
      <FlatList
        style={[styles.mainPageContainer, { flexGrow: 1 }]}
        renderItem={(item) => {
          return <VideoFeedbackCard data={item} size="small" />;
        }}
        data={comments}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemDivider />}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={30}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        enabled={Platform.OS === "ios" ? true : false}
        style={[
          styles.mainPageContainer,
          globalStyles.verticalBottomSpacer10,
          {},
        ]}
      >
        <View
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[globalStyles.verticalTopSpacer20, { flexGrow: 1 }]}
        >
          <Formik
            initialValues={{
              comment: "",
            }}
          >
            {({ handleChange, values, resetForm }) => (
              <View style={styles.commentVideoFormContainer}>
                <View style={styles.commentVideoForm}>
                  <View>
                    <TextInput
                      style={[styles.commentInput]}
                      placeholder={"أضف تعليقك هنا"}
                      keyboardType="default"
                      placeholderTextColor="#dedede"
                      selectionColor={colors.dark_blue}
                      secureTextEntry={false}
                      value={values.comment}
                      onChangeText={handleChange("comment")}
                      placeholderStyle={styles.textboxfieldd}
                    />
                    <View style={[styles.commentMessageIcon, { left: 0 }]}>
                      <Image
                        resizeMode="cover"
                        source={Comment}
                        style={styles.imagee}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.submitCommentIconContainer]}>
                  <TouchableOpacity
                    style={styles.submitCommentIcon}
                    onPress={() => {
                      onCommentStickerPressed(values.comment);
                      resetForm();
                    }}
                  >
                    <ShareSVG color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const ListHeader = ({ navigation }) => {
  return (
    <View style={globalStyles.verticalTopSpacer20}>
      <CustomPageHeader
        navigation={navigation}
        title={"تعليقات"}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
    </View>
  );
};

const ItemDivider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
        opacity: 0.4,
        marginVertical: 10,
      }}
    />
  );
};
