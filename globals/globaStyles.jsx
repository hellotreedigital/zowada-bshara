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
    textBlue:{
        color: colors.blue
    },
    textDarkBlue:{
        color: colors.dark_blue
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
    icon: {
        width: SCREEN_HEIGHT * 0.037,
        height: SCREEN_HEIGHT * 0.037,
        borderRadius: SCREEN_HEIGHT * 0.037,
        color: colors.blue,
        textAlign: "center",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical:'center'
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
})