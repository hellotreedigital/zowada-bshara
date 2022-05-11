import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView,
  Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTests/CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import ShareSVG from "../../../SVGR/Home/Share";
import { colors } from "../../../globals/colors";
import { Formik } from "formik";
import Comment from "../../../assets/Comment.png";
import { FeedbackCard } from "../../../components/Feedback/FeedbackCard";
import {
  getSingleCourseComments,
  commentCourse,
} from "../../../api/ELearning/ELearning";


export const CourseCommentsScreen = ({ navigation, route }) => {
    
  const { data } = route.params;
    let [comments, setComments] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);

    useEffect(() => {
      (async () => {
        setLoadingResults(true);
        let courseComments = await getSingleCourseComments(
          data.courseId
        );
        setComments(courseComments.data.comments.data);
        setLoadingResults(false);
      })();
    }, []);

    async function onCommentCoursePressed(comment){
      setLoadingResults(true);
      await commentCourse(data.courseId, {
        comment: comment,
        rating: 5
      });
      let courseComments = await getSingleCourseComments(
        data.courseId
      );
      setComments(courseComments.data.comments.data);
      setLoadingResults(false);
    }

  return (
    <View style={[globalStyles.verticalTopSpacer20, globalStyles.backgrounWhite, {flex:1, flexGrow:1}]}>
        <CustomPageHeader
        navigation={navigation}
        title={'تعليقات'}
        showShare={false}
        showNotification={false}
        color={colors.blue}
        spaceHorizontally={true}
      />


    <View style={globalStyles.indicator}>
        <ActivityIndicator
          animating={loadingResults}
          color={colors.dark_blue}
          size="large"
        />
      </View>


        <FlatList
      style={[styles.mainPageContainer, {flexGrow:1}]}
      renderItem={(item) => {
        return (
          <FeedbackCard
              data={{
                text: item.item.comment,
                rating: item.item.rating,
                full_name: '',
                image_absolute_url:
                  '',
              }}
              onPress={() => {}}
              size="small"
            />
        );
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
        style={[styles.mainPageContainer, globalStyles.verticalBottomSpacer10, {}]}
      >
        <View
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[globalStyles.verticalTopSpacer20, {flexGrow:1}]}
        >
    {data.registered === 1 && <Formik
        initialValues={{
          comment: ""
        }}
      >
        {({ handleChange, values, resetForm }) => (
                  <View style={[styles.commentVideoFormContainer]}>
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
                        editable={data.registered !== 1 ? false : true}
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
                      disabled={data.registered === 1 ? false : true }
                      onPress={() => {
                        onCommentCoursePressed(values.comment);
                        resetForm();
                      }}
                    >
                      <ShareSVG color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
        )}
      </Formik>}
        </View>
        </KeyboardAvoidingView>
    </View>
  );
};


export const EmptyListComponent = () =>{
  return(
    <View>
      <Text style={[globalStyles.textDarkBlue, globalStyles.leftText, {fontSize:18, fontWeight:'bold'}]}>No Comments</Text>
    </View>
  )
}

const ItemDivider = () => {
  return (
    <View
      style={{
        width: "100%",
        marginVertical: 10,
      }}
    />
  );
};