import React, { useState, useRef, useContext, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AppContext from "../../appContext/AppContext";
import { WhiteButton } from "../../buttons/WhiteButton";
import { colors } from "../../globals/colors";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import Typography from "../Typography/Typography";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

const DATA =
{
    id: 0,
    button: true,
    title: "العنوان هنا",
    text:
        "لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى)",
};

export const PageHeadImageContainer = ({imageUrl, info}) => {
    
    return (
        <View>
            <View style={styles.carouselItem}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{ uri: imageUrl ? imageUrl : ''}}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%", position: "relative" }}
                    />
                    <View style={styles.overlay}/>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.infoText]}>{info? info.title : ''}</Text>
                    <Text style={[styles.infoText]}>{info? info?.teacher.full_name : ''}</Text>
                </View>
            </View>
            <View
                style={{
                    top: -SCREEN_HEIGHT * 0.06,
                    alignItems: "center",
                }}
            >
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselItem: {
        height: SCREEN_HEIGHT * 0.35,
    },
    title: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        marginTop: SCREEN_HEIGHT * 0.087,
        marginLeft: 24,
        marginBottom: 6,
    },
    subtitle: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        marginTop: SCREEN_HEIGHT * 0.12,
        marginLeft: 24,
        width: SCREEN_WIDTH * 0.9,
    },
    button: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        marginTop: SCREEN_HEIGHT * 0.21,
        marginLeft: 24,
        marginBottom: 6,
    },
    activeSlideContainer: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        marginTop: SCREEN_HEIGHT * 0.26,
        marginLeft: 24,
        marginBottom: 6,
        alignItems: "center",
        width: SCREEN_WIDTH * 0.9,
    },
    imageContainer:{
        display:'flex',
    },
    infoContainer:{
        position: "absolute",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        height: '100%',
        paddingHorizontal: 35
    },
    infoText:{
        marginVertical:7,
        color:'white',
        fontSize: 20,
        textAlign:'left',
        fontWeight:'bold'
    },
    overlay:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'#d2d2d2',
        opacity: 0.5
       }
});
