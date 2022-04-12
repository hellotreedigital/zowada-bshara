import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Avatar from "../Avatar/Avatar";
import Typography from "../Typography/Typography";

export const ProfileWithNameBox = ({ item }) => {
    // console.log(item);
    return (
        <TouchableOpacity style={styles.card}>
            <View>
                <Avatar loader={false} name={item.full_name} custom={true} profilePic={item.image} />
            </View>
            <View style={styles.info}>
                <Text style={styles.tutorName}>{item.full_name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: SCREEN_HEIGHT * 0.156,
    },
    image: {
        borderRadius: 0.13 / 2,
        overflow: "hidden",
    },
    info: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    infoRight: {
        flexDirection: "row",
        marginBottom: 10,
    },
    locationText: {
        marginHorizontal: 12,
    },
    tutorName: {
        textAlign: "center"
    }
});
