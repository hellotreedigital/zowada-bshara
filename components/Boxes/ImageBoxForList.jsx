import React from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { globalStyles } from "../../globals/globaStyles";
import { CourseUnitTemplate } from "../../screens/ELearning/CourseScreen/CourseUnitsAndTests/CourseUnitTemplate";
import Typography from "../Typography/Typography";

export const ImageBoxForList = ({ item, handleClickEvent, ...props }) => {
    
    return (
        <TouchableOpacity style={[props.isArticle ? styles.articleCard : styles.card, props.height && {height: props.height}]} onPress={()=> handleClickEvent ? handleClickEvent(item.item) : {}}>
            <View>
                <ImageBackground
                    style={[props.isArticle ? styles.articleImage : styles.image]}
                    resizeMode="cover"
                    source={{ uri: item.item.formatted_image }}
                />
            </View>
            {!props.isArticle ? <View style={[styles.info]}>
                <View style={styles.infoRight}>
                    <Text style={[styles.courseTitle, globalStyles.textDarkBlue]}>{item.item.title}</Text>
                </View>
            </View>: null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: SCREEN_HEIGHT * 0.166,
        width: SCREEN_WIDTH * 0.43,
    },
    image: {
        borderRadius: 10,
        overflow: "hidden",
        width: SCREEN_WIDTH * 0.43,
        height:SCREEN_HEIGHT * 0.13
    },
    articleCard: {
        height: SCREEN_HEIGHT * 0.145,
        width: SCREEN_WIDTH * 0.437,
    },
    articleImage:{
        borderRadius: 10,
        overflow: "hidden",
        width: SCREEN_WIDTH * 0.437,
        height:SCREEN_HEIGHT * 0.13
    },
    info: {
        flexDirection: "row",
        backgroundColor: "transparent",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    infoRight: {
        flexDirection: "row",
        marginHorizontal: 5,
    },
    extraMargin:{
        marginBottom: 10
    },
    locationText: {
        marginHorizontal: 12,
    },
    courseTitle:{
        fontSize:SCREEN_HEIGHT * 14 /810,
        fontFamily: 'HelveticaRegular',
    }
});
