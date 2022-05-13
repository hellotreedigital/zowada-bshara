import React, { useContext,useState, useEffect} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {globalStyles} from '../../../globals/globaStyles';
import { eLearnineStyles as styles } from '../ELearningStyles';
import {CustomPageHeader} from '../../../components/CustomPageHeader/CustomPageHeader';
import { ImageBoxForList } from "../../../components/Boxes/ImageBoxForList";
import {colors} from '../../../globals/colors';
import { getAllCourses } from '../../../api/ELearning/ELearning';
import AppContext from "../../../appContext/AppContext";

    
export const AllCoursesScreen = ({navigation}) => {

    let [allCourses, setAllCourses] = useState([]);
    const { fixedTitles } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            let allCoursesData = await getAllCourses('');
            setAllCourses(allCoursesData.data.courses.data);
        })()
    }, [])

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
    

    return(
        <FlatList
        style={styles.whiteBackground}
        renderItem={(item) => {
            return(
                <ImageBoxForList item={item} handleClickEvent={CourseListItemClickEvent}/>
            )
        }}
        data={allCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        nestedScrollEnabled
        ListHeaderComponent={<ListHeader navigation={navigation}/>}
    />
    )
};

  const ListHeader = ({ navigation }) => {

    const { fixedTitles } = useContext(AppContext);

    
    return (
      <View style={globalStyles.verticalTopSpacer20}>
        <CustomPageHeader
          navigation={navigation} title={fixedTitles.coursesTitles["all-courses"].title} showShare={false} showNotification={false} color={colors.blue}
          spaceHorizontally={true} showCart={true}
        />
      </View>
    );
  };