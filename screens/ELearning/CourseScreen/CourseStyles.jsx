import { StyleSheet } from "react-native";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "../../../globals/globals";
import { colors } from "../../../globals/colors";

export const courseStyles = StyleSheet.create({    
    paragraph:{
        marginHorizontal: 20
    },
    rowContainer: {
        display: "flex",
        flexDirection:"row"
    },
    extraMargin: {
        marginHorizontal: 15
    },
    about: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    spacer:{
        width: 10,
        height: 20
    },

    /** Course Syllabus */

    syllabusContainer:{
        width:'100%'
    },
    syllabusItemContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderColor: colors.dark_blue,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    firstItemBorder:{
        borderTopWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    lastItemBorder:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    rows:{
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        width: '75%'
    },
    columns:{
        display:'flex',
        flexDirection:"column",
        justifyContent:'center',
        paddingHorizontal: 0,
        marginHorizontal: 5
    },
    imagee:{
        width:'57%',
        height:'57%'
    },
    verticalPadding5:{
        paddingVertical: 5
    }
});