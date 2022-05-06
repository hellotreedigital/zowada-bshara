import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import { ImageBoxForList } from "../../../../../components/Boxes/ImageBoxForList";
import ThumbsUp from "../../../../../assets/ThumbsUp.png";
import Comment from "../../../../../assets/Comment.png";
import RenderHtml from 'react-native-render-html';

import { getArticle, getArticleComments, likeUnlikeArticle } from '../../../../../api/ELearning/ELearning'

const courses = [
  {
    id: "0",
    title: "",
    topRanked: true,
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "1",
    title: "",
    topRanked: true,
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "2",
    title: "",
    topRanked: true,
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: "3",
    title: "",
    topRanked: true,
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
];

export const CourseArticleScreen = ({ navigation, route }) => {
  const [loadingResults, setLoadingResults] = useState(false);
  let [courseRefresh, setcourseRefresh] = useState(false);
  let [commentsCount, setCommentsCount] = useState(null);
  const { width } = useWindowDimensions();
  const { data } = route.params;
  let [article, setArticle] = useState();


  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setcourseRefresh(prev => !prev);
    });
    return () => {focusListener?.remove()};
  }, [navigation])


  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let articlee = await getArticle(
        data.courseId,
        data.lessonId,
        data.articleId
      );

      let artComments = await getArticleComments(
        data.courseId,
        data.lessonId,
        data.articleId
      );
      setCommentsCount(artComments.data.comments.data.length);

      setArticle(articlee.data.article)
      setLoadingResults(false);
    })();
  }, [courseRefresh]);



  async function likeArticle(){
    const like = await likeUnlikeArticle(data.courseId,
      data.lessonId,
      data.articleId);
    let a = Object.assign({}, article);
    a.liked_by_count = like.data.likes_count;
    setArticle(a);
  }

  function goToArticleCommentsScreen(){
    navigation.push('articleCommentsScreen', {data:{
      courseId: data.courseId,
      lessonId: data.lessonId,
      articleId: data.articleId
    }})
  }



  function goToPoster() {
    navigation.push("coursePosterScreen", {data: {}});
  }

  function articleImageClicked() {}

  return (
    <ScrollView style={[styles.mainPageContainer, globalStyles.verticalTopSpacer20]}>
      <CustomPageHeader
        navigation={navigation}
        title={article?.title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
      <View style={[globalStyles.verticalTopSpacer20, globalStyles.verticalBottomSpacer20]}>
          {article ? <RenderHtml
          contentWidth={width}
          source={{html: article?.content}}
        /> : null}
      </View>

      <View
      style={[
        globalStyles.verticalBottomSpacer20,
      ]}
    >
      <View style={[globalStyles.cardShadowStyle1, globalStyles.verticalBottomSpacer20]}>
          <View style={globalStyles.whiteCard}>
        <View style={[styles.columns]}>
          <TouchableOpacity style={[styles.rows, styles.bottomPart]} onPress={() => likeArticle()}>
            <Image resizeMode="cover" source={ThumbsUp} style={styles.imagee} />
            <Text style={{ height: "auto", textAlignVertical: "center" }}>
            {article?.liked_by_count}
            </Text>

            {/* <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                            <Text style={{height: 'auto'}}>7500</Text>                     */}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rows, styles.bottomPart]} onPress={() => {goToArticleCommentsScreen()}}>
            <Image resizeMode="cover" source={Comment} style={styles.imagee} />
            <Text style={{ height: "auto" }}>عرض جميع {commentsCount} تعليق</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>

      <SecondaryButton
        fullWidth={true}
        content="استمر"
        onPress={() => navigation.pop()}
      />
    </View>


    </ScrollView>
  );
};






/**
 * export const CourseArticleScreen = ({ navigation, route }) => {
  const [loadingResults, setLoadingResults] = useState(false);
  const { data } = route.params;
  let [article, setArticle] = useState();


  useEffect(() => {
    (async () => {
      setLoadingResults(true);
      let articlee = await getArticle(
        data.courseId,
        data.lessonId,
        data.articleId
      );

      setArticle(articlee.data.article)
      setLoadingResults(false);
    })();
  }, []);






  function goToPoster() {
    navigation.push("coursePosterScreen", {data: {}});
  }

  function articleImageClicked() {}

  return (
    <FlatList
      style={[styles.mainPageContainer]}
      renderItem={(item) => {
        return (
          <ImageBoxForList
            item={item}
            handleClickEvent={articleImageClicked}
            isArticle={true}
          />
        );
      }}
      data={courses}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      numColumns={2}
      nestedScrollEnabled
      ListHeaderComponent={<ListHeader data={article} navigation={navigation} />}
      ListFooterComponent={<ListFooter navigation={navigation} goToPoster={goToPoster} />}
    />
  );
};

const ListHeader = ({ data, navigation }) => {

  const { width } = useWindowDimensions();

  return (
    <View style={globalStyles.verticalTopSpacer20}>
      <CustomPageHeader
        navigation={navigation}
        title={data?.title}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
      <View style={[globalStyles.verticalTopSpacer20, globalStyles.verticalBottomSpacer20]}>
          {data ? <RenderHtml
          contentWidth={width}
          source={{html: data?.content}}
        /> : null}
      </View>

      <View style={styles.articleSpacer}></View>

      {false && <View>
        <Text style={styles.articleImageCollectionHeader}>
          ابصورة أكثر عقلانية ومننستشعرها بصورة أكثر عقلانية ومن
        </Text>
      </View>}
    </View>
  );
};

const ListFooter = ({ navigation, goToPoster }) => {
  return (
    <View
      style={[
        globalStyles.verticalTopSpacer20,
        globalStyles.verticalBottomSpacer20,
      ]}
    >
      <View style={[globalStyles.cardShadowStyle1, globalStyles.verticalBottomSpacer20]}>
          <View style={globalStyles.whiteCard}>
        <View style={[styles.columns]}>
          <View style={[styles.rows, styles.bottomPart]}>
            <Image resizeMode="cover" source={ThumbsUp} style={styles.imagee} />
            <Text style={{ height: "auto", textAlignVertical: "center" }}>
              135000
            </Text>

            <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                            <Text style={{height: 'auto'}}>7500</Text>
                            </View>

                            <View style={[styles.rows, styles.bottomPart]}>
                              <Image resizeMode="cover" source={Comment} style={styles.imagee} />
                              <Text style={{ height: "auto" }}>عرض جميع 20 تعليق</Text>
                            </View>
                          </View>
                          </View>
                        </View>
                  
                        <SecondaryButton
                          fullWidth={true}
                          content="استمر"
                          onPress={() => goToPoster()}
                        />
                      </View>
                    );
                  };
 */