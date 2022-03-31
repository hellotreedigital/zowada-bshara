import { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, I18nManager } from "react-native";
import { SvgCssUri } from "react-native-svg";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

// Globals
import { aspectRatio, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { colors } from "../../globals/colors";

// Components
import Typography from "../../components/Typography/Typography";

// Context
import AppContext from "../../appContext/AppContext";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

let server = "https://zowada-backend.hellotree.dev/storage/";
const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
];

export const OnBoardingScreen = (props) => {

    const { onBoarding, fixedTitles } = useContext(AppContext);
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        if (activeIndex == onBoarding.length - 1) props.done();
        else setActiveIndex(activeIndex + 1);
    }

    const prevSlide = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexGrow: 1 }}>
                {
                    onBoarding.map((slide, index) => (
                        <Slide slide={slide} prevSlide={prevSlide} nextSlide={nextSlide} activeIndex={activeIndex} index={index} key={index} />
                    ))
                }
            </View>
            <View style={styles.dotsWrapper}>
                {
                    onBoarding.map((slide, index) => (
                        <View style={[styles.dot, index == activeIndex ? { backgroundColor: colors.dark_blue } : {}]} key={index} />
                    ))
                }
            </View>
            <View style={styles.buttonsWrapper}>
                {
                    activeIndex != onBoarding.length - 1 && (
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.button} onPress={() => props.done()}>
                                <Typography
                                    content={fixedTitles.onboardingTitles["skip"].title}
                                    color={colors.white}
                                    size={15}
                                    roman={true}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.dark_blue }]} onPress={nextSlide}>
                        <View>
                            <Typography
                                content={fixedTitles.onboardingTitles["next"].title}
                                color={colors.white}
                                size={15}
                                roman={true}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

};

const Slide = ({ slide, nextSlide, prevSlide, activeIndex, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (activeIndex == index) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        }
    }, [activeIndex]);

    const onSwipeRight = () => {
        I18nManager.isRTL ? nextSlide() : prevSlide();
    }

    const onSwipeLeft = () => {
        I18nManager.isRTL ? prevSlide() : nextSlide();
    }

    return (
        <ScrollView style={styles.slide} contentContainerStyle={{ flex: 1 }}>
            <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <SvgCssUri
                        height={SCREEN_WIDTH * 0.87}
                        width={SCREEN_WIDTH}
                        uri={server + slide.background_image}
                    />
                    <View style={styles.foregroundImage}>
                        <SvgCssUri
                            height={SCREEN_WIDTH * 0.8}
                            width={SCREEN_WIDTH}
                            uri={server + slide.foreground_image}
                        />
                    </View>
                    <Typography
                        content={slide.title || ""}
                        color={"#E54C2E"}
                        align="center"
                        size={20}
                        bold={true}
                    />
                    <RenderHTML
                        source={{ html: slide.text }}
                        contentWidth={SCREEN_WIDTH}
                        tagsStyles={{
                            p: {
                                fontFamily: "HelveticaLight",
                                fontSize: SCREEN_HEIGHT * 0.019,
                                color: colors.dark_blue,
                                textAlign: "center",
                                lineHeight: 24,
                                paddingHorizontal: 20,
                            }
                        }}
                        systemFonts={systemFonts}
                    />
                </Animated.View>
            </GestureRecognizer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    dotsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor: "#CFD9DC",
        marginHorizontal: 4,
    },
    buttonsWrapper: {
        flexDirection: 'row',
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    buttonWrapper: {
        flexGrow: 1,
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#E8AF2E",
        borderRadius: 10,
        width: '100%',
        paddingVertical: 6,
    },
    slide: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    foregroundImage: {
        alignItems: 'center',
        marginTop: -(SCREEN_WIDTH * 0.52),
        marginBottom: 30,
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.8,
    },
});