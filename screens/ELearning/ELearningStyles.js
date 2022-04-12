import { StyleSheet } from "react-native";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "../../globals/globals";

const eLearnineStyles = StyleSheet.create({

    status: {
        zIndex: 10000,
        // marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    statusPosition: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
    },
    left: {
        marginLeft: 24,
    },
    right: {
        marginRight: 24,
        flexDirection: "row",
    },
    header: {
        position: "relative",
    },
    icon: {
        width: SCREEN_HEIGHT * 0.037,
        height: SCREEN_HEIGHT * 0.037,
        borderRadius: SCREEN_HEIGHT * 0.037,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: SCREEN_WIDTH * 0.0315,
    },
    clickableTitles: {
        height: SCREEN_HEIGHT * 0.05,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 0
    },
    container: {
        backgroundColor: "#fff",
    },
    searchBox: {
        position: "absolute",
        bottom: -22,
        alignSelf: "center",
        zIndex: 100000000,
    },
    body: {
        paddingTop: 24,
        width: SCREEN_WIDTH,
        backgroundColor: "white",
        zIndex: -1,
    },
    about: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 22,
    },
    list: {
        position: "relative",
        paddingLeft: SCREEN_WIDTH * 0.059,
        marginBottom: SCREEN_HEIGHT * 0.015,
    },
    spacing: {
        marginRight: 10,
    },

    whiteBackground: {
        backgroundColor: 'white'
    },

    loader: {
        position: "absolute",
        top: "30%",
        alignSelf: "center",
    },

    headTitle: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    columnWrapper: {
        margin: 0,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal: SCREEN_WIDTH * 0.059
    }
});

export { eLearnineStyles };