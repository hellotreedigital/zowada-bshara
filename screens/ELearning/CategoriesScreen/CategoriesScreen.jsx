import React, { useState, useEffect } from "react";
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

    const [loading, setLoading] = useState(false);
    const { data } = route.params;
    return (
        <FlatList
            style={styles.whiteBackground}
            renderItem={(item) => {
                return(
                    <ImageBoxForList item={item}/>
                )
            }}
            data={courses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            nestedScrollEnabled
            ListHeaderComponent={<ListHeaderComponent navigation={navigation} data={data} />}
        />
    )
}

const ListHeaderComponent = ({ navigation, data }) => {

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
                            />
                        </TouchableOpacity>
                        <Typography
                            content={`${data.title} ${data.id}`}
                            color={colors.blue}
                            size={22}
                            bold={true}
                            lh={26}
                            align="left"
                        />
                    </View>
                    <View style={styles.right}>
                        {data.allowFilter && <TouchableOpacity style={styles.icon} onPress={() => navigation.push("filterScreen")}>
                            <FilterSVG />
                        </TouchableOpacity>}
                        {data.allowSearch && <TouchableOpacity style={styles.icon}>
                            <SearchSVG />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </View>

    )
}
