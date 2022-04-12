import React, { useContext, useState } from "react";
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
import {
    SCREEN_WIDTH
} from "../../globals/globals";

const data = [
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

const dataTutor = [
    {
        id: "0",
        full_name: "اسم",
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "1",
        full_name: "اسم",
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "2",
        full_name: "اسم",
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    }, {
        id: "3",
        full_name: "اسم",
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        id: "4",
        full_name: "اسم",
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    }
];

export const ELearningScreen = ({ navigation }) => {

    const {
        appLanguage,
        userName,
        token,
        bestExperts,
        setBestExperts,
    } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchString, setSearchString] = useState(null);

    return (
        <FlatList
            style={styles.whiteBackground}
            renderItem={(item) => {
                return(
                    <ImageBoxForList item={item}/>
                )
            }}
            data={data}
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
    const [searchString, setSearchString] = useState(null);
    const [topImageUrl, setTopImageUrl] = useState("https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");

    function goToCategories(categoryId, title) {
        let data = {
            allowSearch: true,
            allowFilter: true,
            dataUrl: "",
            id: categoryId,
            title: title
        }
        navigation.push("categoriesScreen", {
            data: data
        })
    }

    function CategoriesListClickEvent(category){
        goToCategories(category.id, category.title);
    }

    function CourseistClickEvent(course){
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
                        <TouchableOpacity style={styles.clickableTitles}
                            onPress={() => goToCategories()}>
                            <Typography
                                bold={true}
                                color={colors.blue}
                                size={16}
                                content="الفئات"
                                align="left"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        renderItem={(item) => {
                            return(
                                <ImageBoxForList item={item} handleClickEvent={CategoriesListClickEvent}/>
                            )
                        }}
                        data={data}
                        keyExtractor={(item) => item.id}
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
                                <ImageBoxForList item={item} handleClickEvent={CourseistClickEvent}/>
                            )
                        }}
                        data={data}
                        keyExtractor={(item) => item.id}
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
                <View style={styles.list}>
                    <FlatList
                        renderItem={ProfileWithNameBox}
                        data={dataTutor}
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