import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView,
  Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTests/CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import ShareSVG from "../../../SVGR/Home/Share";
import { colors } from "../../../globals/colors";
import { Formik } from "formik";
import { getSingleLesson } from "../../../api/ELearning/ELearning";
import { SCREEN_HEIGHT } from "../../../globals/globals";

export const CourseCommentsScreen = ({ navigation }) => {
    
    let[comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
    })();
  }, []);

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
        <FlatList
      style={[styles.mainPageContainer, {flexGrow:1}]}
      renderItem={(item) => {
        return (
          <Text>avc</Text>
        );
      }}
      data={comments}
      keyExtractor={(item) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
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
    <Formik
        initialValues={{
          comment: ""
        }}
      >
        {({ handleChange, values }) => (
                  <View style={styles.commentVideoFormContainer}>
                    <View style={styles.commentVideoForm}>
                    <TextInput
                      style={[styles.commentInput]}
                      placeholder={'أضف تعليقك هنا'}
                      keyboardType="default"
                      placeholderTextColor={colors.blue}
                      selectionColor={colors.dark_blue}
                      secureTextEntry={false}
                      value={values.comment}
                      onChangeText={handleChange("comment")}
                      placeholderStyle={styles.textboxfieldd}
                    />
                    </View>
                      <TouchableOpacity style={styles.submitCommentIcon}>
                            <ShareSVG color='#fff'/>
                        </TouchableOpacity>
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
        title={'تعليقات'}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
    </View>
  );
};