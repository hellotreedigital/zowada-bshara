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
import { globalStyles } from "../../globals/globaStyles";

export const ProfileWithNameBox = ({ item }) => {
    return (
        <View style={[styles.card]}>
            <View>
                <Avatar loader={false} name={item.teacher.full_name} custom={true} profilePic={item.teacher.image_absolute_url} />
            </View>
            <View style={[styles.info, {flexDirection:'row'}]}>
                <Text style={[styles.tutorName, globalStyles.textDarkBlue]}>{item.teacher.full_name}</Text>
            </View>
        </View>
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
        textAlign: "center",
        flex: 1,
        flexWrap: 'wrap',
        width: SCREEN_HEIGHT * 0.11,
        height:'auto',
        color: colors.dark_blue
    }
});
