import React, { useState, useEffect } from "react";
import { eLearnineStyles as styles } from '../ELearningStyles';
import { FlatList, View, TouchableOpacity, ActivityIndicator, I18nManager } from "react-native";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import SearchSVG from "../../../SVGR/Globals/Search";
import { ImageBoxForList } from "../../../components/Boxes/ImageBoxForList";
import FilterSVG from "../../../SVGR/Globals/Filter";
import {globalStyles} from '../../../globals/globaStyles';
import { getAllCourses } from '../../../api/ELearning/ELearning';
import MyOrdersSVG from "../../../SVGR/Profile/MyOrders";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";

const courses = [
    {
        id: "0",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "1",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "2",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    }, {
        id: "3",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "4",
        title: "اسم",
        location: "موقع",
        topRanked: true,
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    }
];

export const CategoriesScreen = ({ navigation, route }) => {

    let [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data } = route.params;
    const [filters, setFilters] = useState();
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        (async () => {
            setLoading(true);
            let allCoursesData = await getAllCourses(`?page_size=15&courses_type_id=${data.id}`);
            setAllCourses(allCoursesData.data.courses.data);
            setLoading(false);
        })()
    }, []);
    

    function filterCourses(filters){
        (async () => {
            let url = `?page_size=15&courses_type_id=${data.id}`;
            if(filters.aZSelected) url += `&sort_by=title`
            else if(filters.cheapestSelected) url += `&sort_by=price&sort_direction=ASC`
            else if(filters.mostExpensiveSelected) url += `&sort_by=price&sort_direction=DESC`
            
            let allCoursesData = await getAllCourses(url);
            console.log(allCoursesData);
            setAllCourses(allCoursesData.data.courses.data);
        })()
    }
    
    
    function searchCategoryByText(searchText){
        (async () => {
            let url = `?page_size=15&courses_type_id=${data.id}`;

            if(filters.searchString !== '' && filters.searchString !== null && filters.searchString !== undefined) url += `&search=${filters.searchString}`
            
            let allCoursesData = await getAllCourses(url);
            console.log(allCoursesData);
            setAllCourses(allCoursesData.data.courses.data);
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
            style={styles.whiteBackground}
            renderItem={(item) => {
                return(
                    <ImageBoxForList item={item} handleClickEvent={CourseListItemClickEvent} height={SCREEN_HEIGHT*0.2}/>
                )
            }}
            data={allCourses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            nestedScrollEnabled
            ListHeaderComponent={<ListHeaderComponent navigation={navigation} data={data} filterCourses={filterCourses} searchCategoryByText={searchCategoryByText} loading={loading}/>}
        />
    )
}

const ListHeaderComponent = ({ navigation, data, filterCourses, searchCategoryByText, loading }) => {    

    function filterCategory(filters){
        filterCourses(filters)
    }
    
    function searchByText(searchText){
        searchCategoryByText(searchText)
    }

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
                            style={[styles.spacing, {display:'flex', flexDirection:'row', width:SCREEN_WIDTH*0.4}]}
                        >
                            <View style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <ArrowSVG
                                    style={{
                                        transform: [
                                            { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                                        ]
                                    }}
                                    fill={colors.blue}
                                />
                            </View>
                            <View style={[{display:'flex', flexDirection:'column', justifyContent:'center'}, globalStyles.horizontalLeftSpace5]}>
                                <Typography
                                    content={`${data.title}`}
                                    color={colors.blue}
                                    size={22}
                                    bold={true}
                                    align="left"
                                />

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.right}>
                        <View style={globalStyles.iconMargin}>
                        <View style={[globalStyles.smallIconShadow]}>
                    <TouchableOpacity style={[styles.icon]} onPress={()=> {navigation.push('cartScreen')}}>
                            <MyOrdersSVG  size={30} background='#fff' fill='#e54c2e'/>
                        </TouchableOpacity>
                        </View></View>
                        {data.allowFilter && 
                        <View style={globalStyles.iconMargin}>
                        <View style={[globalStyles.smallIconShadow]}>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.push("filterScreen", {onGoBack: (filters) => {
                            filterCategory(filters)
                        }})}>
                            <FilterSVG />
                        </TouchableOpacity>
                        </View></View>
                        }
                        {data.allowSearch && 
                        <View style={globalStyles.iconMargin}>
                        <View style={[globalStyles.smallIconShadow]}>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.push("eLearningSearchScreen", {data:{id:data.id}})}>
                            <SearchSVG />
                        </TouchableOpacity>
                        </View></View>
                        }
                    </View>
                </View>
            </View>
        </View>

    )
}
