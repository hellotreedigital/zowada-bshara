import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView,
  Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTests/CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import ShareSVG from "../../../SVGR/Home/Share";
import { colors } from "../../../globals/colors";
import { Formik } from "formik";
import { getSingleLesson } from "../../../api/ELearning/ELearning";
import { SCREEN_HEIGHT } from "../../../globals/globals";
import Comment from "../../../assets/Comment.png";

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
    <Formik
        initialValues={{
          comment: ""
        }}
      >
        {({ handleChange, values }) => (
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

export const EmptyListComponent = () =>{
  return(
    <View>
      <Text style={[globalStyles.textDarkBlue, globalStyles.leftText, {fontSize:18, fontWeight:'bold'}]}>No Comments</Text>
    </View>
  )
}