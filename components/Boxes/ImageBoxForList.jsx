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
import Typography from "../Typography/Typography";

export const ImageBoxForList = ({ item, handleClickEvent }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={()=> handleClickEvent ? handleClickEvent(item.item) : {}}>
            <View>
                <ImageBackground
                    style={[
                        styles.image,
                        { width: SCREEN_WIDTH * 0.43, height: SCREEN_HEIGHT * 0.13 },
                    ]}
                    resizeMode="cover"
                    source={{ uri: item.item.image }}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.infoRight}>
                    <Typography
                        color={colors.dark_blue}
                        size={14}
                        content={item.item.title}
                    />
                </View>
                <View style={styles.infoLeft}></View>
            </View>
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