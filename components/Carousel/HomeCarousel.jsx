import React, { useState, useRef, useContext } from "react";
import {
  FlatList,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

const RenderCasousel = ({
  item,
  singleJobHandler,
  fixedTitles,
  singleShopHandler,
}) => {
  console.log(item);

  const redirectHandler = () => {
    if (item.link) {
      Linking.openURL(item.link).catch((err) => {
        alert(err);
      });
    } else {
      switch (item.redirect_option.title) {
        case "Course":
          // get single course
          break;
        case "Shop":
          singleJobHandler(item.redirect_option.id);

        case "Store":
          singleShopHandler(item.redirect_option.id);
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.carouselItem}>
      <View style={{ width: SCREEN_WIDTH }}>
        <ImageBackground
          source={{ uri: item.formatted_image }}
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
        <View style={styles.button}>
          <WhiteButton
            onPress={() => redirectHandler()}
            content={fixedTitles.landingTitles["view-more"].title}
            size={13}
            home={true}
          />
        </View>
      </View>
    </View>
  );
};

export const HomeCarousel = ({ singleJobHandler, singleShopHandler }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const { landingData, fixedTitles } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  const carousel = useRef();
  return (
    <View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={landingData.swiper}
        renderItem={({ item }) => (
          <RenderCasousel
            fixedTitles={fixedTitles}
            item={item}
            singleShopHandler={(id) => singleShopHandler(id)}
            singleJobHandler={(id) => singleJobHandler(id)}
          />
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width)
          );
          setIndex(index);
        }}
      />
      <View
        style={{
          top: -SCREEN_HEIGHT * 0.06,
          alignItems: "center",
        }}
      >
        <AnimatedDotsCarousel
          length={landingData.swiper.length}
          interpolateOpacityAndColor={true}
          currentIndex={index}
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
