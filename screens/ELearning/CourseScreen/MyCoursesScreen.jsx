import React, { useContext, useState, useEffect } from "react";
import { eLearnineStyles as styles } from '../ELearningStyles';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, I18nManager } from "react-native";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import NotificationSVG from "../../../SVGR/Home/Notification";
import SearchSVG from "../../../SVGR/Globals/Search";
import { ImageBoxForList } from "../../../components/Boxes/ImageBoxForList";
import FilterSVG from "../../../SVGR/Globals/Filter";
import {globalStyles} from '../../../globals/globaStyles';
import { getMyCourses } from '../../../api/ELearning/ELearning';
import AppContext from "../../../appContext/AppContext";

export const MyCoursesScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    let [myCourses, setMyCourses] = useState([]);
    const { fixedTitles } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            let allMyCourses = await getMyCourses();
            setMyCourses(allMyCourses.data.courses);
        })()
      }, [])

      function goToCourse(course){
        let data = {
            allowSearch: true,
            allowFilter: true,
            dataUrl: "",
            id: course.id,
            title: course.title
        }
        navigation.push("courseScreen", {
            data: data
        })
    }

    return (
        <FlatList
            style={styles.whiteBackground}
            renderItem={(item) => {
                return(
                    <ImageBoxForList item={item} handleClickEvent={goToCourse}/>
                )
            }}
            data={myCourses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            nestedScrollEnabled
            ListHeaderComponent={<ListHeaderComponent navigation={navigation} />}
        />
    )
}

const ListHeaderComponent = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    

    return (
        <View
            style={[styles.whiteBackground, globalStyles.body]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.loader}>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    color={colors.dark_blue}
                />
            </View>

            <View style={styles.container}>
                <View style={styles.status}>

                    <View style={[styles.left, styles.headTitle]}>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            style={styles.spacing}
                        >
                            <ArrowSVG
                                style={{
                                    transform: [
                                        { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                                    ]
                                }}
                                fill={colors.blue}
                                strokeW={3}
                            />
                        </TouchableOpacity>
                        <Typography
                            content={fixedTitles.coursesTitles["my-courses"].title}
                            color={colors.blue}
                            size={22}
                            bold={true}
                            lh={26}
                            align="left"
                        />
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity style={styles.icon}>
                            <SearchSVG />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}
