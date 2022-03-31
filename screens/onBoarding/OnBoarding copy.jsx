import React, { useContext, useState } from "react";
import {
  I18nManager,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Screen1SVG from "../../SVGR/onBoarding/Screen1Icon";
import Screen2svg from "../../SVGR/onBoarding/Screeb2Icon";
import Screen3SVG from "../../SVGR/onBoarding/Screen3Icon";
import {
  aspectRatio,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../globals/globals";
import { colors } from "../../globals/colors";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import Typography from "../../components/Typography/Typography";
import AppContext from "../../appContext/AppContext";
import { SvgCssUri } from "react-native-svg";
import { WebView } from "react-native-webview";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import * as Animatable from "react-native-animatable";
import { ease } from "react-native/Libraries/Animated/Easing";

const systemFonts = [
  ...defaultSystemFonts,
  "HelveticaBold",
  "HelveticaRegular",
  "HelveticaLight",
];

export const RenderOnBoardingSlides = ({
  item,
  index,
  tagsStyles,
  activePage,
}) => {
  let server = "https://zowada-backend.hellotree.dev/storage/";
  let animationText = I18nManager.isRTL ? "slideInRight" : "slideInLeft";
  return (
    <View>
      <View
        style={{
          width: SCREEN_WIDTH,
          alignItems: "center",
        }}
      >
        <View style={styles.bg}>
          <SvgCssUri
            height="360"
            width={SCREEN_WIDTH}
            uri={server + item.background_image}
          />
        </View>
        <Animatable.View
          // iterationDelay={200}
          easing="ease-in-out"
          useNativeDriver={true}
          animation={activePage.includes(index) ? "fadeIn" : null}
          style={[styles.fg, { opacity: 0 }]}
        >
          <SvgCssUri
            height={aspectRatio < 2 ? "300" : "295"}
            uri={server + item.foreground_image}
          />
        </Animatable.View>
      </View>

      <View style={styles.title}>
        <Animatable.View
          iterationDelay={200}
          easing="ease-in-out"
          useNativeDriver={true}
          animation={activePage.includes(index) ? animationText : null}
          style={{
            // minHeight: SCREEN_HEIGHT * 0.06,
            // marginBottom: SCREEN_HEIGHT * 0.2,
            height: "100%",

            transform: [
              { translateX: I18nManager.isRTL ? -SCREEN_WIDTH : SCREEN_WIDTH },
            ],
          }}
        >
          <Typography
            content={item.title || ""}
            size={20}
            ln={30}
            color={"#E54C2E"}
            bold={true}
            align="center"
            lines={2}
          />
        </Animatable.View>

        <Animatable.View
          iterationDelay={200}
          easing="ease-in-out"
          useNativeDriver={true}
          animation={activePage.includes(index) ? animationText : null}
          style={[
            styles.desc,

            {
              marginTop: item.title ? (SCREEN_HEIGHT > 800 ? 10 : 5) : 0,
              transform: [
                {
                  translateX: I18nManager.isRTL ? -SCREEN_WIDTH : SCREEN_WIDTH,
                },
              ],
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderHtml
              source={{ html: item.text }}
              contentWidth={SCREEN_WIDTH * 0.9}
              tagsStyles={tagsStyles}
              systemFonts={systemFonts}
            />
          </ScrollView>
        </Animatable.View>
      </View>
    </View>
  );
};

export const OnBoardingScreen = (props) => {
  const [activePage, setActivePage] = useState([0]);
  const tagsStyles = {
    p: {
      ...styles.text,
    },
  };
  const { onBoarding, fixedTitles } = useContext(AppContext);
  const [isDone, setIsDone] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={({ item, index }) => {
          return (
            <RenderOnBoardingSlides
              item={item}
              tagsStyles={tagsStyles}
              activePage={activePage}
              index={index}
            />
          );
        }}
        onSlideChange={(idx) => {
          setActivePage([...activePage, idx]);
        }}
        data={onBoarding}
        onDone={isDone}
        // bottomButton
        pagingEnabled
        showSkipButton
        // showDoneButton={false}
        dotStyle={{
          bottom:
            SCREEN_HEIGHT > 800 ? SCREEN_HEIGHT * 0.12 : SCREEN_HEIGHT * 0.08,
          backgroundColor: "#CFD9DC",
          marginHorizontal: 6,
        }}
        activeDotStyle={{
          bottom:
            SCREEN_HEIGHT > 800 ? SCREEN_HEIGHT * 0.12 : SCREEN_HEIGHT * 0.08,

          backgroundColor: colors.dark_blue,
          marginHorizontal: 6,
        }}
        renderNextButton={() => {
          return (
            <View style={[styles.button, styles.buttonPrimary]}>
              <Typography
                content={fixedTitles.onboardingTitles["next"].title}
                color={colors.white}
                lh={SCREEN_HEIGHT * 0.026}
                size={15}
                roman={true}
              />
            </View>
          );
        }}
        renderDoneButton={() => {
          return (
            <View
              style={{
                position: "relative",
                width: SCREEN_WIDTH / 1.5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.done();
                }}
                style={[styles.button, styles.buttonPrimary, styles.done]}
              >
                <View>
                  <Typography
                    content={fixedTitles.onboardingTitles["next"].title}
                    color={colors.white}
                    lh={SCREEN_HEIGHT * 0.026}
                    size={15}
                    roman={true}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        renderSkipButton={() => {
          return (
            <TouchableOpacity
              onPress={() => props.done()}
              style={styles.button}
            >
              <Typography
                content={fixedTitles.onboardingTitles["skip"].title}
                color={colors.white}
                size={SCREEN_HEIGHT * 0.02}
                size={15}
                roman={true}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH * 0.41,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    bottom: Platform.OS === "ios" ? SCREEN_HEIGHT * 0.01 : 0,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: colors.dark_blue,
  },
  done: {
    // right: Platform.OS === "ios" ? "65%" : "0%",
  },
  text: {
    fontFamily: "HelveticaLight",
    fontSize: SCREEN_HEIGHT * 0.019,
    color: colors.dark_blue,
    textAlign: "center",
    lineHeight: 24,
  },
  bg: {
    position: "relative",
    top: -15,
    overflow: "hidden",
  },
  fg: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.122,
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    top: aspectRatio < 2 ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT * 0.54,
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.95,
  },
  desc: {
    position: "absolute",
    top: aspectRatio < 2 ? SCREEN_HEIGHT * 0.07 : SCREEN_HEIGHT * 0.09,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    maxHeight: SCREEN_HEIGHT * 0.14,
    marginTop: SCREEN_HEIGHT > 800 ? 20 : 8,
  },
});
