import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../../components/CustomPageHeader/CustomPageHeader";
import ShareSVG from "../../../../../SVGR/Home/Share";
import { colors } from "../../../../../globals/colors";
import { Formik } from "formik";
import {
  commentVideo,
  getVideoComments,
} from "../../../../../api/ELearning/ELearning";
import Comment from "../../../../../assets/Comment.png";
import AppContext from "../../../../../appContext/AppContext";

import { VideoFeedbackCard } from "../../../../../components/Feedback/VideoFeedbackCard";

export const VideoCommentsScreen = ({ navigation, route }) => {
  let [comments, setComments] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const { data } = route.params;
  const { fixedTitles } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let vidComments = await getVideoComments(
        data.courseId,
        data.lessonId,
        data.videoId
      );
      setComments(vidComments.data.comments.data);
      setLoadingResults(false);
    })();
  }, []);

  async function onCommentVideoPressed(comment) {
    setLoadingResults(true);
    await commentVideo(data.courseId, data.lessonId, data.videoId, {
      comment: comment,
    });
    let vidComments = await getVideoComments(
      data.courseId,
      data.lessonId,
      data.videoId
    );
    setComments(vidComments.data.comments.data);
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
        title={fixedTitles.menuTitle["comments"].title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
        spaceHorizontally={true}
        isAbsolute={false}
        showCart={false}
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
        ListEmptyComponent={<EmptyListComponent />}
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
        <View style={[globalStyles.verticalTopSpacer20, { flexGrow: 1 }]}>
          <Formik
            initialValues={{
              comment: "",
            }}
            onSubmit={() => {}}
          >
            {({ handleChange, values, resetForm }) => (
              <View style={[styles.commentVideoFormContainer]}>
                <View>
                  <View>
                    <TextInput
                      style={[styles.commentInput, styles.textboxfieldd]}
                      placeholder={
                        fixedTitles.coursesTitles["add-your-comment-here"].title
                      }
                      keyboardType="default"
                      placeholderTextColor="#dedede"
                      selectionColor={colors.dark_blue}
                      secureTextEntry={false}
                      value={values.comment}
                      onChangeText={handleChange("comment")}
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
                    style={[styles.submitCommentIcon]}
                    onPress={() => {
                      onCommentVideoPressed(values.comment);
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

export const EmptyListComponent = () => {
  return (
    <View>
      <Text
        style={[
          globalStyles.textDarkBlue,
          globalStyles.leftText,
          { fontSize: 18, fontWeight: "bold" },
        ]}
      >
        {fixedTitles.coursesTitles["no-comments"].title}
      </Text>
    </View>
  );
};
