import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList, Image } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBoxForList } from "../../../../components/Boxes/ImageBoxForList";
import ThumbsUp from "../../../../assets/ThumbsUp.png";
import ThumbsDown from "../../../../assets/ThumbsDown.png";
import Comment from "../../../../assets/Comment.png";

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
  const { data } = route.params;

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
      ListHeaderComponent={<ListHeader data={data} navigation={navigation} />}
      ListFooterComponent={<ListFooter navigation={navigation} goToPoster={goToPoster} />}
    />
  );
};

const ListHeader = ({ data, navigation }) => {
  return (
    <View style={globalStyles.verticalTopSpacer20}>
      <CustomPageHeader
        navigation={navigation}
        title={data.backButtonTitle}
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />
      <Text>{data.contentText}</Text>

      <View style={styles.articleSpacer}></View>

      <View>
        <Text style={styles.articleImageCollectionHeader}>
          ابصورة أكثر عقلانية ومننستشعرها بصورة أكثر عقلانية ومن
        </Text>
      </View>
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

            {/* <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                            <Text style={{height: 'auto'}}>7500</Text>                     */}
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
