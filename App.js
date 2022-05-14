import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  I18nManager,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  LogBox,
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
import {
  getAvailableHours,
  getCasesList,
  getQuestionList,
} from "./api/Profile/Profile";
import Pusher from "pusher-js/react-native";
import * as Location from "expo-location";
import { weeklyWeather } from "./api/WeatherDB/Weather";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { getCart, shopHome } from "./api/Shop";
import { jobs, promotedJobs } from "./api/Jobs";
import {
  getAboutUs,
  getPrivacyPolicy,
  getRefundPolicy,
  getTerms,
} from "./api/infomativeApi";
import { getLandingData } from "./api/Landing";
import { set } from "react-native-reanimated";

let pusherSubscribed = false;
let notificationChannel = false;
export default function App() {
  LogBox.ignoreAllLogs();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const [finalMessage, setFinalMessage] = useState({
    messageString: null,
    recipient_id: null,
    read: null,
  });
  const [readArray, setReadArray] = useState([]);

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
  const [userData, setUserData] = useState([]);
  const [pusher, setPusher] = useState();
  const [notificationsCounter, setNotificationsCounter] = useState(0);
  const [fundingSearch, setFundingSearch] = useState();
  const [chatsCounter, setChatsCounter] = useState(0);
  const [availabilityHours, setAvailabilyHours] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [fixedTitles, setFixedTitle] = useState({
    menuTitle: null,
    authTitles: null,
    onboardingTitles: null,
    settingsTitles: null,
    experience: null,
    experienceType: null,
    bottomBarText: null,
    settingsTitles: null,
    expertsTitles: null,
    profileTitles: null,
    rejections: null,
    yearsExp: null,
    paymentType: null,
    updates: null,
    coursesTitles:null
  });
  const [authState, setAuthState] = useState({});
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [price, setPrice] = React.useState(null);
  const [temrsAccepted, setTermAccepted] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [verificationTypes, setVerificationTypes] = useState({
    phone: null,
    email: null,
  });
  const [casesList, setCasesList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [canBookForFree, setCanBookForFree] = useState(false);
  const [cantAskFreeQuestion, setCantAskFreeQuestion] = useState(false);
  const [puhserToken, setPuhserToken] = useState(null);
  const [faq, setFaq] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [isNotification, setIsNotification] = useState(false);
  const [updates, setUpdates] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState([]);
  const [intervals, setIntervals] = useState([]);

  //screen props (tabs)
  const [canAdd, setCanAdd] = useState(false);

  //shop
  const [swiperData, setSwiperData] = useState([]);
  const [favShops, setFavShops] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [shopLocationName, setShopLocationName] = useState(null);
  const [customMap, setCustomMap] = useState(null);
  const [related, setRelated] = useState([]);

  const [cartNumber, setCartNumber] = useState(1);
  const [storeDelivery, setStoreDelivery] = useState(null);
  const [deliveryDuration, setDeliveryDuration] = useState(null);
  let experience = null;
  const bottomSheetModalRef = useRef(null);
  const [cartStatus, setCartStatus] = useState(null);

  //country code
  const [countryCode, setCountryCode] = useState("LB");
  const [country, setCountry] = useState({
    callingCode: ["961"],
    cca2: "LB",
    currency: ["LBP"],
    flag: "flag-lb",
    name: "Lebanon",
    region: "Asia",
    subregion: "Western Asia",
  });
  //jobs
  const [jobList, setJobList] = useState();
  const [allJobsdata, setAllJobsData] = useState([]);
  const [maxSalary, setMaxSalary] = useState(null);
  const [promtedJobs, setPromotedJobs] = useState([]);

  //my listedJobs Data

  const [data, setData] = useState();

  //about us
  const [aboutUs, setAboutUs] = useState();

  //terms
  const [terms, setTerms] = useState();

  //pp
  const [privacyPolicy, setPrivacyPolicy] = useState();

  //refund policy
  const [refundPolicy, setRefundPolicy] = useState();

  //new popup
  const [storeModalVisible, setStoreModalVisible] = useState(false);

  //landing
  const [landingData, setLandingData] = useState();

  //profile address
  const [address, setAddress] = React.useState(null);

  let experienceType = null;
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => {
        alert(err);
        // setExpoPushToken("testing Token");
      });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        fixedTitlesHandler();
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

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
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        alert(status);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } else {
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

    setToken(JSON.parse(value));

    setPuhserToken(value.replace('"', ""));
  };
  
  const checkForUserId = async () => {
    const value = await AsyncStorage.getItem("@userId");
    if (value === null) return;
    setUserId(value);
  };

  const onBoardingStatus = async () => {
    const value = await AsyncStorage.getItem("@onboardingStatus");
    if (value === null) return;
    const isOnBoarding = JSON.parse(value);
    setIsOnBoardingVisible(isOnBoarding);
  };

  const landingHandler = () => {
    getLandingData()
      .then((res) => {
        setLandingData({
          courses: res.data.courses,
          crowdfundings: res.data.crowdfundings,
          experts: res.data.experts,
          jobs: res.data.jobs,
          shops: res.data.shops,
          swiper: res.data.swiper,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobsHandler = () => {
    promotedJobs()
      .then((res) => {
        setPromotedJobs(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAboutUsHandler = () => {
    getAboutUs()
      .then((res) => {
        setAboutUs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTermsHandler = () => {
    getTerms()
      .then((res) => {
        setTerms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPrivacyPolicyHandler = () => {
    getPrivacyPolicy()
      .then((res) => {
        setPrivacyPolicy(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fixedTitlesHandler = () => {
    getFixedTitles()
      .then((res) => {
        setNotificationsCounter(res.data.unread_notifications);
        setChatsCounter(res.data.unread_conversations);
        setFixedTitle({
          authTitles: res.data.auth_titles,
          menuTitle: res.data.menu_titles,
          onboardingTitles: res.data.onboarding_titles,
          experience: res.data.experience_domain,
          experienceType: res.data.experience_type,
          bottomBarText: res.data.bottom_menu,
          settingsTitles: res.data.setting_titles,
          expertsTitles: res.data.experts_fixed_titles,
          profileTitles: res.data.profile_titles,
          rejections: res.data.rejection_reasons,
          clients: res.data.clients_titles,
          events: res.data.events_titles,
          yearsExp: res.data.years_of_experience,
          sex: res.data.gender,
          socialStatus: res.data.social_status,
          governates: res.data.governates,
          projectType: res.data.project_type,
          companyDomain: res.data.company_domain,
          companyType: res.data.company_type,
          paymentType: res.data.payment_type,
          updates: res.data.updates_titles,
          funding: res.data.crowdfunding_titles,
          shopTypes: res.data.shop_types,
          productTypes: res.data.product_types,
          sizesTypes: res.data.sizes,
          grant: res.data.purpose_of_grant,
          nation: res.data.nationalities,
          shopTitles: res.data.shop_titles,
          jobTitles: res.data.job_types,
          districts: res.data.districts,
          jobFixedTitles: res.data.job_titles,
          jobExperience: res.data.job_experience_domains,
          contactTitles: res.data.contact_us_titles,
          landingTitles: res.data.landing_titles,
          withdrawalTitles: res.data.withdrawal_payment_type,
          coursesTitles: res.data.courses_Titles,

        });

        setAppIsReady(true);
      })
      .catch((err) => {});
  };

  const getRefundHandler = () => {
    getRefundPolicy()
      .then((res) => {
        setRefundPolicy(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExpoLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    getExpoLocation();
  }, []);

  const getExpertsHandler = () => {
    getExperts()
      .then((res) => {
        setExperts(res.data.experts);
      })
      .catch((err) => {});
    return () => null;
  };
  const getBestExpertsHandler = () => {
    getBestExperts()
      .then((res) => {
        setBestExperts(res.data.experts.data);
        setFaq(res.data.faqs);
      })
      .catch((err) => {});
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
    } catch (e) {}
  };

  const getOnBoardings = () => {
    getOnboardings()
      .then((res) => {
        setOnBoarding(res.data.onboardings);
      })
      .catch((err) => {});
  };

  const userDataHandler = () => {
    getUserData()
      .then((res) => {
        setProfilePic(res.data.user.image_absolute_url);
        setAvailabilyHours(res.data);
        setIntervals(res.data.intervals);
        setUserData(res.data.user);
        setAvailability(res.data.user.availability);
        setUserName(res.data.user.full_name);
        setUserId(res.data.user.id);
        setUser(res.data.user);
        setTermAccepted(res.data.user.terms_conditions_accepted);
        // setCanBookForFree(res.data.user.free_consultation_taken);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const getCasesListHandler = () => {
    getCasesList()
      .then((res) => {
        setCasesList(res.data.cases);
      })
      .catch((err) => {});
  };

  const getQuestionListHandler = () => {
    getQuestionList()
      .then((res) => {
        setQuestionList(res.data.questions.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAppLanguage();
  }, []);

  const getPusher = async () => {
    if (!pusherSubscribed) {
      Pusher.logToConsole = true;
      pusherSubscribed = true;
      let newPusher = new Pusher("84d9ddc6fdac8fe0feab", {
        cluster: "ap2",
        appId: "1348656",
        restServer: "https://staging.zowada-backend.hellotree.dev/api",
        authEndpoint:
          "https://staging.zowada-backend.hellotree.dev/broadcasting/auth",
        encrypted: true,
        auth: {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setPusher(newPusher);
    }
  };

  const getWeather = () => {
    weeklyWeather(location.coords.latitude, location.coords.longitude)
      .then((res) => {
        setWeather(res.data.daily);
      })
      .catch((err) => {});
  };

  const getHomeShop = () => {
    shopHome()
      .then((res) => {
        setSwiperData(res.data.swiper);
        setFavShops(res.data.favorite_shops);
        setAllShops(res.data.all_shops);
      })
      .catch((err) => {});
  };

  const getCartStatusHandler = async () => {
    getCart()
      .then((res) => {
        setCartStatus(res.data.cart);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    async function prepare() {
      try {
        await checkForToken();
        await getCartStatusHandler();
        getExpertsHandler();
        landingHandler();
        getHomeShop();
        getBestExpertsHandler();
        userDataHandler();
        getCasesListHandler();
        getOnBoardings();
        getJobsHandler();
        await fixedTitlesHandler();
        getRefundHandler();
        getAboutUsHandler();
        getPrivacyPolicyHandler();
        getTermsHandler();
        getQuestionListHandler();
        // getHomeShop();
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

  useEffect(() => {
    if (!appIsReady) return;
    if (token) {
      getPusher();
    }
  }),
    [token, pusher, userData, appIsReady, userId];

  useEffect(() => {
    if (!appIsReady) return;
    if (location) {
      getWeather();
    }
  }, [appIsReady, location]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && languageLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      if (pusher) {
        const channel = pusher.subscribe(
          `private-notifications.${userData?.id}`
        );
        channel.bind("NotificationEvent", (data) => {
          setNotificationsCounter(data.unread_notifications);
        });
      }
    }
  }, [pusher, userData, appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      if (pusher) {
        const channel = pusher.subscribe(
          `private-unread-conversations.${userData?.id}`
        );
        channel.bind("UnreadConversations", (data) => {
          setChatsCounter(data.unread_conversations);
        });
      }
    }
  }, [pusher, userData, appIsReady]);
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
    <SafeAreaProvider
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {appIsReady && languageLoaded && (
          <AuthContext.Provider value={{ profilePic, setProfilePic, user, setUser }}>
            <AppContext.Provider
              value={{
                setIsExpert,
                isOnBoardingVisible,
                isExpert,
                expoPushToken,
                setToken,
                token,
                setUserId,
                userId,
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
                temrsAccepted,
                setTermAccepted,
                casesList,
                canBookForFree,
                setCanBookForFree,
                setQuestionList,
                questionList,
                userId,
                cantAskFreeQuestion,
                setCantAskFreeQuestion,
                faq,
                userData,
                setUserData,
                setCasesList,
                setFaq,
                price,
                setPrice,
                pusher,
                finalMessage,
                setFinalMessage,
                readArray,
                setReadArray,
                newNotification,
                isNotification,
                setIsNotification,
                chatsCounter,
                setChatsCounter,
                notificationsCounter,
                setNotificationsCounter,
                setChatsCounter,
                chatsCounter,
                fundingSearch,
                setFundingSearch,
                setUpdates,
                updates,
                weather,
                setLocation,
                location,
                setWeather,
                setAvailabilyHours,
                availabilityHours,
                availability,
                setAvailability,
                bottomSheetModalRef,
                setShopLocationName,
                shopLocationName,
                setCustomMap,
                customMap,
                swiperData,
                favShops,
                allShops,
                setAllShops,
                cartNumber,
                setCartNumber,
                setFavShops,
                related,
                setRelated,
                setStoreDelivery,
                storeDelivery,
                setCartStatus,
                cartStatus,
                setSwiperData,
                setCountryCode,
                countryCode,
                country,
                setCountry,
                setCanAdd,
                canAdd,
                jobList,
                setJobList,
                intervals,
                setIntervals,
                allJobsdata,
                setAllJobsData,
                promtedJobs,
                setPromotedJobs,
                setMaxSalary,
                maxSalary,
                data,
                setData,
                setPusher,
                aboutUs,
                terms,
                privacyPolicy,
                refundPolicy,
                setDeliveryDuration,
                deliveryDuration,
                storeModalVisible,
                setStoreModalVisible,
                landingData,
                setProfilePic,
                profilePic,
                setAddress,
                address,
              }}
            >
              <StatusBar translucent={true} animated />
              <BottomSheetModalProvider>
                <Navigation />
              </BottomSheetModalProvider>
            </AppContext.Provider>
          </AuthContext.Provider>
        )}
      </View>
    </SafeAreaProvider>
  );
}