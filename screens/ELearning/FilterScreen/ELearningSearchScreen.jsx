import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { globalStyles } from "../../../globals/globaStyles";
import { CustomPageHeader } from "../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../globals/colors";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import ThumbsUp from "../../../assets/ThumbsUp.png";
import Comment from "../../../assets/Comment.png";
import Typography from "../../../components/Typography/Typography";
import { SearchBoxWOFilter } from "../../../components/SearchBox/SearchBox";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { getAllCourses } from '../../../api/ELearning/ELearning';
import { ImageBoxForList } from "../../../components/Boxes/ImageBoxForList";

let url = '?page_size=15';

export const ELearningSearchScreen = ({ navigation, route }) => {
  const [searchString, setSearchString] = useState(null);
  let [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = route.params;

  useEffect(() => {
    if(data.search !== null && data.search != undefined && data.search !== ''){
      setSearchString(data.search);
      searchHandler()
    }
  }, [])
  

  function goToResultCertificate() {
    route.params.onGoBack({
      searchString: searchString,
      cheapestSelected: cheapestSelected,
      mostExpensiveSelected: mostExpensiveSelected,
      aZSelected: aZSelected,
    });
    navigation.pop();
  }

  async function searchHandler() {
    (async () => {
      setLoading(true);
      if (data.id) url += `&courses_type_id=${data.id}`
      let allCoursesData = await getAllCourses(`?page_size=15&search=${searchString !== null ? searchString : data.search}`);
      console.log(allCoursesData.data.courses.data)
      setAllCourses(allCoursesData.data.courses.data);
      setLoading(false);
  })()
  }

  function CourseListItemClickEvent(course){
    let courseScreenData = {
        allowSearch: true,
        allowFilter: true,
        dataUrl: "",
        id: course.id,
        title: course.title
    }
    navigation.push("courseScreen", {
        data: courseScreenData
    })
}

  return (

    <FlatList
            style={[globalStyles.backgrounWhite]}
            renderItem={(item) => {
                return(
                    <ImageBoxForList item={item} handleClickEvent={CourseListItemClickEvent}/>
                )
            }}
            data={allCourses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={[styles.columnWrapper, globalStyles.backgrounWhite, globalStyles.verticalTopSpacer20]}
            numColumns={2}
            nestedScrollEnabled
            ListHeaderComponent={<ListHeaderComponent navigation={navigation} data={data} searchHandler={searchHandler} setSearchString={setSearchString} searchString={searchString} loading={loading}/>}
        />
  );
};

const ListHeaderComponent = ({ navigation,searchHandler, setSearchString, searchString, loading }) => {    

  return (
    <View
    style={[
      globalStyles.body,
      globalStyles.backgrounWhite,
    ]}
  >
    <View style={[styles.mainPageContainer, styles.bottomPadding]}>
      <TouchableOpacity
        style={[styles.headerContainer]}
        onPress={() => navigation.pop()}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.dark_orange}
          />
        </View>
        <View style={styles.searchBox}>
          <SearchBoxWOFilter
            filterEnabled={true}
            width={SCREEN_WIDTH * 0.85}
            onPress={() => setModalVisible(true)}
            onSearchPress={() => searchHandler()}
            searchString={searchString}
            setSearchString={setSearchString}
            searchColor={colors.dark_orange}
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  arrow: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  list: {
    height: SCREEN_HEIGHT * 0.8,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  searchBox: {
    marginLeft: 15,
    alignSelf: "center",
    zIndex: 100000000,
  },
  mainPageContainer: {
    position: "relative",
    marginHorizontal: 20,
    marginTop: 40,
  },
  columnWrapper: {
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.059
}
});