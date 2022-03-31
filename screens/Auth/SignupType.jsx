import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  I18nManager,
} from "react-native";
import AppContext from "../../appContext/AppContext";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { WhiteButton } from "../../buttons/WhiteButton";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";

export const SignupType = ({ navigation }) => {
  const { setIsExpert, expoPushToken, fixedTitles } = useContext(AppContext);

  const signupHandler = (type) => {
    switch (type) {
      case "user":
        setIsExpert(false);
        navigation.navigate("signup", {
          isExpert: false,
          expoPushToken: expoPushToken,
        });
        break;
      case "expert":
        setIsExpert(true);

        navigation.navigate("signup", {
          isExpert: true,
          expoPushToken: expoPushToken,
        });

        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#104251",
          "#12515A",
          "#197A74",
          "#1F9B89",
          "#419E79",
          "#6DA265",
          "#93A654",
          "#B2A946",
          "#C9AC3B",
          "#DAAD33",
          "#E4AE2F",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
        ]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1.5 }}
        style={styles.background}
      >
        <SafeAreaView>
          <View style={styles.logo}>
            <ImageBackground
              style={{ width: 125, height: 105 }}
              source={require("../../assets/LOGO.png")}
              resizeMode="contain"
            />
            <View style={styles.arrow}>
              <TouchableOpacity
                style={{ width: 40, height: 40 }}
                onPress={() => navigation.pop()}
              >
                <ArrowSVG
                  style={{
                    transform: [
                      { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.title}>
              <Typography
                content={fixedTitles.authTitles["register"]?.title}
                color={colors.white}
                bold={true}
                size={20}
                lh={24}
              />
            </View>
            <View style={styles.buttons}>
              <View style={styles.col}>
                <WhiteButton
                  onPress={() => signupHandler("user")}
                  content={fixedTitles.authTitles["user"]?.title}
                  size={16}
                  type="large"
                />
              </View>
              <View style={styles.col}>
                <PrimaryButton
                  onPress={() => signupHandler("expert")}
                  color={colors.white}
                  content={fixedTitles.authTitles["expert"]?.title}
                  size={16}
                  type="large"
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: 32,
    zIndex: 99999,
  },
  title: {
    alignItems: "center",
    marginBottom: 24,
  },
  body: {
    height: SCREEN_HEIGHT / 2.4,

    alignItems: "center",
    justifyContent: "center",
  },
  col: {
    marginBottom: 15,
  },
  arrow: {
    position: "absolute",
    top: Platform.OS === "android" ? 14 : 0,
    left: 22,
  },
});
