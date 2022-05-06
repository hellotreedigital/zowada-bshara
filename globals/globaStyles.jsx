import {StyleSheet} from 'react-native';
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "./globals";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
    body: {
        paddingTop: 24,
        width: SCREEN_WIDTH,
        zIndex: -1,
        position: "relative",
        display:'flex',
        flex:1,
    },
    verticalTopSpacer10:{
        marginTop: 10
    },
    verticalBottomSpacer10:{
        marginBottom: 10
    },
    verticalTopSpacer20:{
        marginTop: 20
    },
    verticalBottomSpacer20:{
        marginBottom: 20
    },
    verticalBottomNoSpace:{
        paddingBottom:0,
        marginBottom: 0
    },
    verticalTopNoSpace:{
        paddingTop:0,
        marginTop:0
    },
    horizontalLeftSpace5:{
        marginLeft: 5
    },
    horizontalRightSpace5:{
        marginRight: 5
    },
    textBlue:{
        color: colors.blue
    },
    textDarkBlue:{
        color: colors.dark_blue
    },
    textRed:{
        color: 'red'
    },
    backgrounBlue:{
        backgroundColor: colors.blue,
    },
    backgrounDarkBlue:{
        backgroundColor: colors.dark_blue,
    },
    backgrounWhite:{
        backgroundColor:'white'
    },
    backgrounLightBlue:{
        backgroundColor:colors.light_blue
    },
    backgrounLightGrey:{
        backgroundColor:colors.light_grey
    },
    textCenter:{
        textAlign:'center'
    },
    icon: {
        width: SCREEN_HEIGHT * 0.037,
        height: SCREEN_HEIGHT * 0.037,
        borderRadius: SCREEN_HEIGHT * 0.037/2,
        color: colors.blue,
        textAlign: "center",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical:'center',
        overflow:'hidden'
    },
    iconBorder:{
        borderWidth: 1,
        borderColor: colors.blue
    },
    whiteCard:{
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#ffffff"
    },
    cardShadowStyle1:{
        borderRadius: 16,
        paddingHorizontal: 2,
        backgroundColor: 'transparent',
        shadowColor: '#444',
        shadowOffset: {
          width: 6,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 4,
    },
    cardShadow:{
        borderRadius: 16,
        padding: 3,
        paddingBottom: -2,
        backgroundColor: 'transparent',
        shadowColor: '#444',
        shadowOffset: {
          width: 6,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 4,
    },
    loader: {
        position: "absolute",
        top: "30%",
        alignSelf: "center",
    },
    leftText:{
        textAlign:'left'
    },indicator: {
        position: "absolute",
        top: "45%",
        width: SCREEN_WIDTH,
    },disabledVideo:{
        opacity: 0.3
    }
})