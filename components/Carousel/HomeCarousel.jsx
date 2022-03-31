import React, { useState, useRef, useContext } from "react";
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

const DATA = [
  {
    id: 0,
    image:
      "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    button: true,
    title: "العنوان هنا",
    text:
      "لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى)",
  },
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    button: false,
    title: "العنوان هنا",
    text:
      "لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى)",
  },

  {
    id: 2,
    image:
      "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    button: true,
    title: "العنوان هنا",
    text:
      "لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى)",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    button: true,
    title: "العنوان هنا",
    text:
      "لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى)",
  },
];
const renderCasousel = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <View>
        <ImageBackground
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", position: "relative" }}
        />
        <View style={styles.title}>
          <Typography
            size={16}
            bold={true}
            content={item.title}
            color={colors.white}
            lh={18}
          />
        </View>
        <View style={styles.subtitle}>
          <Typography
            size={14}
            // bold={true}
            lh={20}
            content={item.text}
            align="left"
            color={colors.white}
          />
        </View>
        {item.button && (
          <View style={styles.button}>
            <WhiteButton content="عرض المزيد" size={13} home={true} />
          </View>
        )}
      </View>
    </View>
  );
};

export const HomeCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef();
  return (
    <View>
      <Carousel
        data={DATA}
        renderItem={renderCasousel}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View
        style={{
          top: -SCREEN_HEIGHT * 0.06,
          alignItems: "center",
        }}
      >
        <AnimatedDotsCarousel
          length={DATA.length}
          interpolateOpacityAndColor={true}
          currentIndex={activeSlide}
          maxIndicators={4}
          inactiveIndicatorConfig={{
            color: "white",
            margin: 3,
            opacity: 1,
            size: SCREEN_HEIGHT * 0.007,
          }}
          activeIndicatorConfig={{
            color: colors.dark_blue,
            margin: 3,
            opacity: 1,
            size: SCREEN_HEIGHT * 0.007,
          }}
          decreasingDots={[
            {
              config: {
                color: "white",
                margin: 3,
                opacity: 1,
                size: SCREEN_HEIGHT * 0.007,
              },
              quantity: 0.5,
            },
            {
              config: { color: "white", margin: 3, opacity: 0.5, size: 4 },
              quantity: 1,
            },
          ]}
        />
        {/* <Pagination
        ref={carousel}
        dotsLength={DATA.length} // also based on number of sildes you want
        activeDotIndex={activeSlide}
        containerStyle={styles.activeSlideContainer}
        dotStyle={{
          width: SCREEN_HEIGHT * 0.007,
          height: SCREEN_HEIGHT * 0.007,
          marginHorizontal: -20,
          backgroundColor: colors.dark_blue,
        }}
        inactiveDotStyle={{
          width: SCREEN_HEIGHT * 0.007,
          height: SCREEN_HEIGHT * 0.007,
          backgroundColor: "white",
          marginHorizontal: -20,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    height: SCREEN_HEIGHT * 0.4,
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
});
