import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, I18nManager, FlatList, SafeAreaView } from "react-native";
import { eLearnineStyles as styles } from './ELearningStyles';
import AppContext from "../../appContext/AppContext";
import { HomeCarousel } from "../../components/Carousel/HomeCarousel";
import { PageHeadImageContainer } from "../../components/PageHeadImageContainer/PageHeadImageContainer";
import { colors } from "../../globals/colors";
import NotificationSVG from "../../SVGR/Home/Notification";
import Typography from "../../components/Typography/Typography";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { AccordationList } from "../../components/AccordationList/AccordationList";
import { ExpertCard } from "../../components/ExpertsCard/ExpertCard";
import { FilterModal } from "../../components/Modals/FilterModal";
import { expertSearch } from "../../api/Expert/Expert";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { ImageBoxForList } from "../../components/Boxes/ImageBoxForList";
import { ProfileWithNameBox } from "../../components/Boxes/ProfileWithNameBox";
import ShareSVG from "../../SVGR/Home/Share";
import MyOrdersSVG from "../../SVGR/Profile/MyOrders";

import {
    SCREEN_WIDTH
} from "../../globals/globals";
import { getHomeData } from '../../api/ELearning/ELearning';

export const ELearningScreen = ({ navigation }) => {

    let [homePageData, setHomePageData] = useState({
        homepage_courses:[],
        special_courses:[],
        top_teachers:[]
    });
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchString, setSearchString] = useState(null);

    useEffect(() => {
        (async () => {
            let homePageAllData = await getHomeData();
            setHomePageData(homePageAllData.data);
        })()

    }, [])
    
    function goToCourse(course){
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
                    <ImageBoxForList item={item} handleClickEvent={goToCourse}/>
                )
            }}
            data={homePageData.homepage_courses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            nestedScrollEnabled
            ListHeaderComponent={<ListHeaderComponent navigation={navigation} homePageData={homePageData}/>}
        />
    )
}



const ListHeaderComponent = ({ navigation, homePageData }) => {
    let [homeData, setHomeData] = useState({
        homepage_courses:[],
        special_courses:[],
        top_teachers:[]
    });

    const {
        fixedTitles
    } = useContext(AppContext);


    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState(null);
    const [topImageUrl, setTopImageUrl] = useState("https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");

    useEffect(() => {
            if(homePageData){
                setHomeData(homePageData);
            }

    }, [homePageData])


    function goToCategories(categoryId, title) {
        let categoriesData = {
            allowSearch: true,
            allowFilter: true,
            dataUrl: "",
            id: categoryId,
            title: title
        }
        navigation.push("categoriesScreen", {
            data: categoriesData
        })
    }
    
    function goToShowAllCourses() {
        navigation.push("allCoursesScreen")
    }

    function CategoriesListClickEvent(category){
        goToCategories(category.id, category.title);
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
        <View>
            <View style={styles.loader}>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    color={colors.dark_blue}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.carousel}>
                        <PageHeadImageContainer imageUrl={topImageUrl}/>
                    </View>
                </View>
                <View style={[styles.status, styles.statusPosition]}>

                    <View style={[styles.left, styles.headTitle]}>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            style={styles.spacing}
                        >
                            <ArrowSVG
                                style={{
                                    transform: [
                                        { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <Typography
                            content={"التعليم الإلكتروني"}
                            color={colors.white}
                            size={22}
                            bold={true}
                            lh={26}
                            align="left"
                        />
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity style={styles.icon} onPress={()=> {navigation.push('cartScreen')}}>
                            <MyOrdersSVG  size={30} background='#fff' fill='#e54c2e'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <ShareSVG />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <NotificationSVG />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchBox}>
                    <SearchBox
                        filterEnabled={false}
                        onPress={() => setModalVisible(true)}
                        onSearchPress={() => searchHandler()}
                        searchString={searchString}
                        setSearchString={setSearchString}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <View style={[styles.about, styles.spacing]}>
                    <View style={styles.aboutLeft}>
                        <View style={styles.clickableTitles}>
                            <Typography
                                bold={true}
                                color={colors.blue}
                                size={16}
                                content="الفئات"
                                align="left"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        renderItem={(item) => {
                            return(
                                <ImageBoxForList item={item} handleClickEvent={CategoriesListClickEvent}/>
                            )
                        }}
                        data={fixedTitles.coursesTypes}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{flexGrow: 1}}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: SCREEN_WIDTH * 0.03 }} />}
                    />
                </View>
                <View style={[styles.about, styles.spacing]}>
                    <View style={styles.aboutLeft}>
                        <Typography
                            bold={true}
                            color={colors.blue}
                            size={16}
                            content="دورة مميزة"
                            align="left"
                        />
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        renderItem={(item) => {
                            return(
                                <ImageBoxForList item={item} handleClickEvent={CourseListItemClickEvent}/>
                            )
                        }}
                        data={homeData.special_courses}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{flexGrow: 1}}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: SCREEN_WIDTH * 0.03 }} />}
                    />
                </View>
                <View style={[styles.about, styles.spacing]}>
                    <View style={styles.aboutLeft}>
                        <TouchableOpacity style={styles.clickableTitles}
                            onPress={() => navigation.push("tutorsScreen")}>
                            <Typography
                                bold={true}
                                color={colors.blue}
                                size={16}
                                content="أفضل المدربين"
                                align="left"
                            />
                        </TouchableOpacity>
                    </View>
                </View>


            <Text>
                </Text>
                <View style={[styles.list]}>
                    <FlatList
                        renderItem={ProfileWithNameBox}
                        data={homeData.top_teachers}
                        contentContainerStyle={{flexGrow: 1}}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: SCREEN_WIDTH * 0.06 }} />}
                    />
                </View>
                <View style={[styles.about, styles.spacing]}>
                    <View style={styles.aboutLeft}>
                        <Typography
                            bold={true}
                            align="left"
                            color={colors.blue}
                            size={16}
                            content="جميع الدورات"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.aboutRight}
                        onPress={()=> goToShowAllCourses()}
                    >
                        <Typography
                            color={colors.dark_blue}
                            size={14}
                            content="اظهار الكل"
                            align="left"
                        />
                    </TouchableOpacity>
                </View>
                <View>
                </View>
            </View>
        </View>
    )
}