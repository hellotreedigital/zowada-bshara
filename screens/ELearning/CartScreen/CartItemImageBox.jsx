import React, {useEffect} from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import Typography from "../../../components/Typography/Typography";
import TrashSVG from '../../../SVGR/Globals/Trash';
import {globalStyles} from '../../../globals/globaStyles';


export const CartItemImageBox = ({ item, handleClickEvent }) => {
    
    function deleteItem(cItem){
        handleClickEvent(cItem)
    }

    return (
        <View style={[styles.card]} onPress={()=> handleClickEvent ? handleClickEvent(item) : {}}>
            <View style={[styles.columns]}>
                <View style={[styles.rows]}>
                    <ImageBackground
                        style={[
                            styles.image,
                            { width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25 },
                        ]}
                        resizeMode="cover"
                        source={{ uri: item.item.course.formatted_image }}
                    />
                    <View style={[styles.columns, styles.spaceHorizontal]}>
                    <Typography
                        color={colors.dark_blue}
                        size={14}
                        content={`${item.item.course.title}`}
                    />
                        <Typography
                        color={colors.blue}
                        size={14}
                        content={item.item.course.price}
                    />
                    </View>
                </View>
            </View>

            <View style={[styles.columns, styles.verticalJustify]}>
                    <TouchableOpacity style={[globalStyles.icon, globalStyles.backgrounWhite]} onPress={()=> deleteItem(item.item.course)}>
                    <TrashSVG /></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    columns:{
        display:'flex',
        flexDirection: 'column',
    },
    verticalJustify:{
        justifyContent:'center'
    },
    rows:{
        display:'flex',
        flexDirection: 'row',
    },
    spaceHorizontal:{
        paddingHorizontal: 10
    },
    image: {
        borderRadius: 10,
        overflow: "hidden",
    },
    info: {
        flexDirection: "row",
        backgroundColor: "transparent",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    infoRight: {
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: 5,
    },
    locationText: {
        marginHorizontal: 12,
    },
});