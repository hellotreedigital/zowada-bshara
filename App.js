import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  I18nManager,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Navigation } from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContext from "./appContext/AppContext";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AuthContext from "./appContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFixedTitles } from "./api/FixedTitles/FixedTitles";
import { getOnboardings } from "./api/onBoarding/OnBoarding";
import { getUserData } from "./api/Userinfo/UserInformation";
import * as Updates from "expo-updates";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./globals/globals";
import { getBestExperts, getExperts } from "./api/Expert/Expert";

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [appLanguage, setAppLanguage] = useState(null);
  const [token, setToken] = useState(null);
  const [onBoarding, setOnBoarding] = useState([]);
  const [isOnBoardingVisible, setIsOnBoardingVisible] = React.useState(true);
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [experts, setExperts] = useState([]);
  const [bestExperts, setBestExperts] = useState([]);
  const [fixedTitles, setFixedTitle] = useState({
    menuTitle: null,
    authTitles: null,
    onboardingTitles: null,
    settingsTitles: null,
    experience: null,
    experienceType: null,
    bottomBarText: null,
    settingsTitles: null,
    courses_types: null
  });
  const [authState, setAuthState] = useState({});
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [verificationTypes, setVerificationTypes] = useState({
    phone: null,
    email: null,
  });
  const notificationListener = useRef();
  const responseListener = useRef();
  let experience = null;
  let experienceType = null;
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => {
        //TODO: Remove this comment
        //alert(err);
        setExpoPushToken("testing Token");
      });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  const checkForToken = async () => {
    const value = await AsyncStorage.getItem("@token");
    if (value === null) return;
    setToken(value);
  };
  const onBoardingStatus = async () => {
    const value = await AsyncStorage.getItem("@onboardingStatus");
    if (value === null) return;
    const isOnBoarding = JSON.parse(value);
    setIsOnBoardingVisible(isOnBoarding);
  };

  const fixedTitlesHandler = () => {
    getFixedTitles()
      .then((res) => {
        setFixedTitle({
          authTitles: res.data.auth_titles,
          menuTitle: res.data.menu_titles,
          onboardingTitles: res.data.onboarding_titles,
          experience: res.data.experience_domain,
          experienceType: res.data.experience_type,
          bottomBarText: res.data.bottom_menu,
          settingsTitles: res.data.setting_titles,
          coursesTypes: res.data.courses_types
        });

        setAppIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExpertsHandler = () => {
    getExperts()
      .then((res) => {
        setExperts(res.data.experts.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => null;
  };
  const getBestExpertsHandler = () => {
    getBestExperts()
      .then((res) => {
        setBestExperts(res.data.experts.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => null;
  };
  const getAppLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem("@lang");
      if (value !== null) {
        if (value == "1" && I18nManager.isRTL) {
          await I18nManager.forceRTL(false);
          await Updates.reloadAsync();
        } else if (value == "0" && !I18nManager.isRTL) {
          await I18nManager.forceRTL(true);
          await Updates.reloadAsync();
        }
      } else {
        await AsyncStorage.setItem("@lang", "0");
        await I18nManager.forceRTL(false);
      }
      setLanguageLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getOnBoardings = () => {
    getOnboardings()
      .then((res) => {
        setOnBoarding(res.data.onboardings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userDataHandler = () => {
    let server = "https://staging.zowada-backend.hellotree.dev/storage/";

    getUserData()
      .then((res) => {
        setProfilePic(server + res.data.user.image);
        setUserName(res.data.user.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppLanguage();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await checkForToken();
        getExpertsHandler();
        getBestExpertsHandler();
        userDataHandler();

        getOnBoardings();
        await fixedTitlesHandler();
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          // Load a font `Montserrat` from a static resource
          HelveticaBold: require("./assets/fonts/HelveticaBold.ttf"),
          HelveticaLight: require("./assets/fonts/HelveticaLight.ttf"),
          // Any string can be used as the fontFamily name. Here we use an object to provide more control
          HelveticaRegular: {
            uri: require("./assets/fonts/HelveticaRegular.ttf"),
            display: Font.FontDisplay.FALLBACK,
          },
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await onBoardingStatus();
        await checkForToken();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && languageLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !languageLoaded) {
    return (
      <View
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        }}
      >
        <ImageBackground
          style={{ height: "100%", width: "100%" }}
          source={require("./assets/splash.png")}
          resizeMode="contain"
        />
      </View>
    );
  } else {
    // onLayoutRootView();
  }

  return (
    <SafeAreaProvider>
      {appIsReady && languageLoaded && (
        <AuthContext.Provider value={{ profilePic, setProfilePic }}>
          <AppContext.Provider
            value={{
              setIsExpert,
              isOnBoardingVisible,
              isExpert,
              expoPushToken,
              setToken,
              token,
              setIsOnBoardingVisible,
              fixedTitles,
              appLanguage,
              setAppLanguage,
              setOnBoarding,
              onBoarding,
              setVerificationTypes,
              verificationTypes,
              experience,
              experienceType,
              setUserName,
              userName,
              isCamera,
              setIsCamera,
              experts,
              setExperts,
              bestExperts,
              setBestExperts,
            }}
          >
            <StatusBar translucent={true} animated />
            <Navigation />
          </AppContext.Provider>
        </AuthContext.Provider>
      )}
    </SafeAreaProvider>
  );
}
