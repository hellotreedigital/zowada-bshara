import React, { useContext } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  LogBox,
  SafeAreaView,
  ImageBackground,
  Image,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "../screens/Home/HomeScreen";
import HomeSVG from "../SVGR/BottomTabIcons/Home";
import StoreSVG from "../SVGR/BottomTabIcons/Store";
import { colors } from "../globals/colors";
import JobsSVG from "../SVGR/BottomTabIcons/Jobs";
import ExpertSVG from "../SVGR/BottomTabIcons/Expert";
import ProfileSVG from "../SVGR/BottomTabIcons/Profile";
import MenuSVG from "../SVGR/BottomTabIcons/Menu";
import TaelimSVG from "../SVGR/Menu/Taelim";
import { JobScreen } from "../screens/Job/JobScreen";
import { StoreScreen } from "../screens/Store/StoreScreen";
import { ExpertScreen } from "../screens/Expert/ExpertScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { MenuScreen } from "../screens/Menu/MenuScreen";
import SettingsScreen from "../screens/Menu/SettingsScreen";
import ChooseLangScreen from "../screens/Menu/ChooseLangScreen";
import AppContext from "../appContext/AppContext";

import { ExpertSingleScreen } from "../screens/Expert/ExpertSingleScreen/ExpertSingleScreen";
import { ExpertPortfolioScreen } from "../screens/Expert/ExpertPortfolioScreen/ExpertPortfolioScreen";
import AllExperts from "../screens/Expert/AllExperts/AllExpertsScreen";
import CasesListScreen from "../screens/Profile/CasesListScreen/CasesListScreen";
import SingleCaseScreen from "../screens/Profile/SingleCaseScreen/SingleCaseScreen";
import { CalendarScreen } from "../screens/Expert/CalendarScreen/CalendarScreen";
import FormScreen from "../screens/FormScreen/FormScreen";
import { TermsConditionsScreen } from "../screens/TermsConditions/TermsConditionsScreen";
import { PaymentScreen } from "../screens/PaymentScreen/PaymentScreen";
import ResultScreen from "../components/ResultScreen/ResultScreen";
import { UserQuestionsScreen } from "../screens/Questions/UserQuestionsScreen";
import { SingleQuestionScreen } from "../screens/Questions/SingleQuestion/SingleQuestionScreen";
import { AboutScreen } from "../screens/About/AboutScreen";

/** ELearning Screens */
import { ELearningScreen } from "../screens/ELearning/ELearningScreen";
import { CategoriesScreen } from "../screens/ELearning/CategoriesScreen/CategoriesScreen";
import { TutorsScreen } from "../screens/ELearning/TutorsScreen/TutorsScreen";
import { FilterScreen } from "../screens/ELearning/FilterScreen/FilterScreen";
import { ELearningSearchScreen } from "../screens/ELearning/FilterScreen/ELearningSearchScreen";
import { CourseScreen } from "../screens/ELearning/CourseScreen/CourseScreen";
import { CourseCommentsScreen } from "../screens/ELearning/CourseScreen/CourseCommentsScreen";
import { CartScreen } from "../screens/ELearning/CartScreen/CartScreen";
import { CheckoutScreen } from "../screens/ELearning/CartScreen/CheckoutScreen";
import { MyCoursesScreen } from "../screens/ELearning/CourseScreen/MyCoursesScreen";
import { CourseUnitsDetailsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/CourseUnitsDetailsScreen";
import { TestIntroScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/TestIntroScreen";
import { MultipleAnswersTestScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/MultipleAnswersTestScreen/MultipleAnswersTestScreen";
import { TestResultsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/MultipleAnswersTestScreen/TestResultsScreen";
import { CaseStudyScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/CaseStudyScreen/CaseStudyScreen";
import { CaseStudyAnswersScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/CaseStudyScreen/CaseStudyAnswersScreen";
import { CourseArticleScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Article/CourseArticleScreen";
import { ArticleCommentsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Article/ArticleCommentsScreen";
import { CoursePosterScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Poster/CoursePosterScreen";
import { PosterCommentsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Poster/PosterCommentsScreen";
import { CourseCertificateScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/CourseCertificateScreen";
import { CourseCompletionCertificateScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/CourseCompletionCertificateScreen";
import { AllCoursesScreen } from "../screens/ELearning/AllCoursesScreen/AllCoursesScreen";
import { VideoCommentsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Video/VideoCommentsScreen";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = ({ navigation, route }) => {
  const { fixedTitles, bottomBarVisible } = useContext(AppContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
        tabBarStyle: {
          // borderRadius: 10,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,

          elevation: 5,
        },
        tabBarLabelStyle: {
          fontFamily: "HelveticaRegular",
        },
      }}
    >
      <BottomTab.Screen
        initialRouteName="Home"
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => <HomeSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
          headerShown: false,
          title: fixedTitles.bottomBarText["homepage"].title,
        }}
      />
      <BottomTab.Screen
        initialRouteName="Jobs"
        name="Jobs"
        component={JobsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <JobsSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
          title: fixedTitles.bottomBarText["jobs"].title,
        }}
      />
      <BottomTab.Screen
        initialRouteName="Store"
        name="Store"
        component={StoreNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <StoreSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
          title: fixedTitles.bottomBarText["shop"].title,
        }}
      />

      {userData?.is_expert == 0 && (
        <BottomTab.Screen
          initialRouteName="Expert"
          name="Expert"
          component={ExpertNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <ExpertSVG focused={focused} />,
            tabBarActiveTintColor: colors.focused,
            title: fixedTitles.bottomBarText["experts"].title,
          }}
        />
      )}
      {userData?.is_expert == 1 && (
        <BottomTab.Screen
          initialRouteName="Clients"
          name="Clients"
          children={(props) => <ClientsNavigator {...props} />}
          options={({ route }) => ({
            tabBarVisible: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => <ClientsSVG focused={focused} />,
            tabBarActiveTintColor: colors.focused,
            title: fixedTitles.bottomBarText["clients"].title,
          })}
        />
      )}

      <BottomTab.Screen
        initialRouteName="Profile"
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ProfileSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
          title: fixedTitles.bottomBarText["profile"].title,
        }}
      />
      <BottomTab.Screen
        initialRouteName="Menu"
        name="Menu"
        component={MenuNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <MenuSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
          title: fixedTitles.bottomBarText["menu"].title,
        }}
      />
    </BottomTab.Navigator>
  );
};
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="homeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="homeSingleExpertScreen"
        component={ExpertSingleScreen}
      />
      <HomeStack.Screen name="FundUserInfoForm" component={FundUserInfoForm} />
      <HomeStack.Screen name="PaymentGateWay" component={PaymentGateWay} />
      <HomeStack.Screen name="DonateScreen" component={DonateScreen} />
      <HomeStack.Screen name="FundBusinessForm" component={FundBusinessForm} />
      <HomeStack.Screen
        name="FundingSingleScreen"
        component={FundingSingleScreen}
      />
      <HomeStack.Screen name="otherProfile" component={OtherProfileView} />

      <HomeStack.Screen name="Jobs" component={JobsNavigator} />
      <HomeStack.Screen name="Store" component={StoreNavigator} />

      <HomeStack.Screen name="store" component={StoreScreen} />
      <HomeStack.Screen
        name="SingleProductScreen"
        component={SingleProductScreen}
      />

      <HomeStack.Screen name="MyCartStack" component={CartNavigator} />
      <HomeStack.Screen name="MapScreen" component={MapScreen} />
      <HomeStack.Screen name='HomeSearchScreen' component={HomeSearchScreen}/>
      <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} />

      <HomeStack.Screen name="FilterScreen" component={FilterScreen} />
      <HomeStack.Screen name="FilterResults" component={FilterResults} />

      <HomeStack.Screen
        name="StoreSearchScreen"
        component={StoreSearchScreen}
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 50 } },
            close: { animation: "timing", config: { duration: 150 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <HomeStack.Screen name="BestShops" component={BestShops} />
      <HomeStack.Screen name="SingleShop" component={SingleShop} />

      <HomeStack.Screen name="AllShops" component={AllShops} />

      <HomeStack.Screen name="MyShops" component={MyShops} />

      <HomeStack.Screen name="MyOrdersScreen" component={OrdersTabs} />

      <HomeStack.Screen name="myCalendarScreen" component={MyCalendarScreen} />
      <HomeStack.Screen name="singleChat" component={SingleChat} />

      <HomeStack.Screen name="chatsList" component={ChatsList} />

      <ExpertStack.Screen name="allExperts" component={AllExperts} />
      <ExpertStack.Screen
        name="expertSingleScreen"
        component={ExpertSingleScreen}
      />
      <HomeStack.Screen name="ratings" component={RatingScreen} />
      <HomeStack.Screen name="notifications" component={Notification} />
      <HomeStack.Screen name="SingleOrder" component={SingleOrder} />
      <HomeStack.Screen name="SingleJobScreen" component={SingleJobScreen} />
      <HomeStack.Screen name="Funding" component={FundingNavigator} />

      <ExpertStack.Screen
        name="expertPortfolio"
        component={ExpertPortfolioScreen}
      />
      <ProfileStack.Screen
        name="singleCaseScreen"
        component={SingleCaseScreen}
      />
      <ExpertStack.Screen name="questionList" component={QuestionList} />

      <ExpertStack.Screen name="calendarScreen" component={CalendarScreen} />
      <ExpertStack.Screen name="FormScreen" component={FormScreen} />
      <ExpertStack.Screen
        name="termsConditions"
        component={TermsConditionsScreen}
      />
      <ExpertStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ExpertStack.Screen name="ResultScreenScreen" component={ResultScreen} />
      <ExpertStack.Screen name="expertScreen" component={ExpertScreen} />
      <BottomTab.Screen
        initialRouteName="Expert"
        name="Expert"
        component={ExpertNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ExpertSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
        }}
      />
      <ClientStack.Screen
        name="rejectCaseScreen"
        component={RejectCaseScreen}
      />
      <HomeStack.Screen name="clientScreen" component={ClientScreen} />
      <ClientStack.Screen name="singleClient" component={SingleClient} />
    </HomeStack.Navigator>
  );
}

const JobStack = createStackNavigator();
function JobsNavigator() {
  return (
    <JobStack.Navigator screenOptions={{ headerShown: false }}>
      <JobStack.Screen name="jobScreen" component={JobScreen} />
      <JobStack.Screen name="notifications" component={Notification} />
      <JobStack.Screen name="SingleJobScreen" component={SingleJobScreen} />
      <JobStack.Screen name="SingleUserScreen" component={SingleUserScreen} />
      <JobStack.Screen name="AllApications" component={AllApications} />
      <JobStack.Screen name="PostJobForm" component={PostJobForm} />
      <JobStack.Screen name="JobsCategory" component={JobsCategory} />
      <JobStack.Screen name="JobFilterScreen" component={JobFilterScreen} />
      <JobStack.Screen name="ApplyForm" component={ApplyForm} />
      <JobStack.Screen name="JobSearchScreen" component={JobSearchScreen} />
      <JobStack.Screen
        name="JobFilterResultScreen"
        component={JobFilterResultScreen}
      />
      <JobStack.Screen name="SingleResume" component={ResumeScreen} />
    </JobStack.Navigator>
  );
}

const JobTabs = createMaterialTopTabNavigator();

function JobNavigator({ navigation }) {
  const { canAdd } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.order}>
      <View style={[styles.header, { justifyContent: "space-between" }]}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.pop()}>
          <ArrowSVG
            fill={colors.dark_orange}
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Typography
              content="وظائفي"
              size={20}
              color={colors.dark_orange}
              align="left"
              bold
            />
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
          {canAdd && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostJobForm", {
                  editMode: false,
                })
              }
              style={styles.icon}
            >
              <PlusSVG secondary />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobSearchScreen", {
                search: null,
              })
            }
            style={[styles.icon, { marginHorizontal: 10 }]}
          >
            <SearchSVG secondary />
          </TouchableOpacity>
        </View>
      </View>
      <JobTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.dark_orange,
          tabBarInactiveTintColor: colors.dark_blue,
          tabBarIndicatorStyle: {
            backgroundColor: colors.dark_orange,
          },
          tabBarLabelStyle: {
            fontSize: SCREEN_HEIGHT * 0.013,
            fontFamily: "HelveticaLight",
            lineHeight: 19,

            fontWeight: "bold",
          },
          tabBarStyle: { shadowColor: "white" },
          tabBarPressOpacity: "0.5",
        }}
      >
        <JobTabs.Screen
          options={{ title: "الوظائف المنشورة" }}
          name="MyListedJobs"
          component={MyListedJobs}
        />
        <JobTabs.Screen
          options={{ title: "الوظائف التي تقدمت إليها" }}
          name="AppliedJobsList"
          component={AppliedJobsList}
        />
      </JobTabs.Navigator>
    </SafeAreaView>
  );
}

const StoreStack = createStackNavigator();
function StoreNavigator() {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name="store" component={StoreScreen} />
      <StoreStack.Screen
        name="SingleProductScreen"
        component={SingleProductScreen}
      />
      <StoreStack.Screen name="MyOrdersScreen" component={OrdersTabs} />

      <StoreStack.Screen name="MyCartStack" component={CartNavigator} />
      <StoreStack.Screen name="MapScreen" component={MapScreen} />

      <StoreStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <StoreStack.Screen name="notifications" component={Notification} />

      <StoreStack.Screen name="FilterScreen" component={FilterScreen} />
      <StoreStack.Screen name="FilterResults" component={FilterResults} />

      <StoreStack.Screen
        name="StoreSearchScreen"
        component={StoreSearchScreen}
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 50 } },
            close: { animation: "timing", config: { duration: 150 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <StoreStack.Screen name="BestShops" component={BestShops} />
      <StoreStack.Screen name="SingleShop" component={SingleShop} />
      <StoreStack.Screen name="SingleOrder" component={SingleOrder} />

      <StoreStack.Screen name="AllShops" component={AllShops} />
    </StoreStack.Navigator>
  );
}

const CartStack = createStackNavigator();

function CartNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="MyCartStack" component={MyCart} />
    </CartStack.Navigator>
  );
}

const ClientStack = createStackNavigator();

function ClientsNavigator({ routeName, route }) {
  return (
    <ClientStack.Navigator screenOptions={{ headerShown: false }}>
      <ClientStack.Screen name="clientScreen" component={ClientScreen} />
      <ClientStack.Screen name="singleClient" component={SingleClient} />
      <ClientStack.Screen
        name="singleCaseScreen"
        component={SingleCaseScreen}
      />
      <ClientStack.Screen name="otherProfile" component={OtherProfileView} />

      <ClientStack.Screen name="PaymentGateWay" component={PaymentGateWay} />
      <ClientStack.Screen name="SingleJobScreen" component={SingleJobScreen} />
      <ClientStack.Screen name="MyShops" component={MyShops} />
      <ClientStack.Screen name="SingleOrder" component={SingleOrder} />

      <ClientStack.Screen name="MyOrdersScreen" component={OrdersTabs} />

      <ClientStack.Screen
        name="myCalendarScreen"
        component={MyCalendarScreen}
      />

      <ClientStack.Screen
        name="rejectCaseScreen"
        component={RejectCaseScreen}
      />
      <ClientStack.Screen
        name="UserQuestionsScreen"
        component={UserQuestionsScreen}
      />
      <ClientStack.Screen name="chatsList" component={ChatsList} />
      <ClientStack.Screen name="singleChat" component={SingleChat} />
      <ClientStack.Screen name="questionList" component={QuestionList} />
      <ClientStack.Screen name="notifications" component={Notification} />
    </ClientStack.Navigator>
  );
}

const ExpertStack = createStackNavigator();
function ExpertNavigator() {
  return (
    <ExpertStack.Navigator screenOptions={{ headerShown: false }}>
      <ExpertStack.Screen name="expertScreen" component={ExpertScreen} />
      <ExpertStack.Screen
        name="expertSingleScreen"
        component={ExpertSingleScreen}
      />
      <ExpertStack.Screen name="SingleJobScreen" component={SingleJobScreen} />
      <ExpertStack.Screen name="otherProfile" component={OtherProfileView} />

      <ExpertStack.Screen name="MyOrdersScreen" component={OrdersTabs} />

      <ExpertStack.Screen name="MyShops" component={MyShops} />

      <ExpertStack.Screen name="singleChat" component={SingleChat} />

      <ExpertStack.Screen
        name="expertPortfolio"
        component={ExpertPortfolioScreen}
      />
      <ExpertStack.Screen name="notifications" component={Notification} />
      <ExpertStack.Screen
        name="singleCaseScreen"
        component={SingleCaseScreen}
      />
      <ExpertStack.Screen
        name="UserQuestionsScreen"
        component={UserQuestionsScreen}
      />
      <ExpertStack.Screen name="chatsList" component={ChatsList} />
      <ExpertStack.Screen name="allExperts" component={AllExperts} />
      <ExpertStack.Screen name="calendarScreen" component={CalendarScreen} />
      <ExpertStack.Screen name="FormScreen" component={FormScreen} />
      <ExpertStack.Screen
        name="termsConditions"
        component={TermsConditionsScreen}
      />
      <ExpertStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ExpertStack.Screen name="ResultScreenScreen" component={ResultScreen} />
    </ExpertStack.Navigator>
  );
}

const ELearningStack = createStackNavigator();
function ELearniNgavigator() {
  return (
    <ELearningStack.Navigator name='ELearning' screenOptions={{ headerShown: false }}>
      <ELearningStack.Screen name="eLearningScreen" component={ELearningScreen} />
      <ELearningStack.Screen name="categoriesScreen" component={CategoriesScreen} />
      <ELearningStack.Screen name="tutorsScreen" component={TutorsScreen} />
      <ELearningStack.Screen name="filterScreen" component={FilterScreen} />
      <ELearningStack.Screen name="eLearningSearchScreen" component={ELearningSearchScreen} />
      <ELearningStack.Screen name="courseScreen" component={CourseScreen} />
      <ELearningStack.Screen name="courseCommentsScreen" component={CourseCommentsScreen} />
      <ELearningStack.Screen name="cartScreen" component={CartScreen} />
      <ELearningStack.Screen name="checkoutScreen" component={CheckoutScreen} />
      <ELearningStack.Screen name="myCoursesScreen" component={MyCoursesScreen} />
      <ELearningStack.Screen name="courseUnitsDetailsScreen" component={CourseUnitsDetailsScreen} />
      <ELearningStack.Screen name="testIntroScreen" component={TestIntroScreen} />
      <ELearningStack.Screen name="multipleAnswersTestScreen" component={MultipleAnswersTestScreen} />
      <ELearningStack.Screen name="testResultsScreen" component={TestResultsScreen} />
      <ELearningStack.Screen name="caseStudyScreen" component={CaseStudyScreen} />
      <ELearningStack.Screen name="caseStudyAnswersScreen" component={CaseStudyAnswersScreen} />
      <ELearningStack.Screen name="courseArticleScreen" component={CourseArticleScreen} />
      <ELearningStack.Screen name="articleCommentsScreen" component={ArticleCommentsScreen} />
      <ELearningStack.Screen name="coursePosterScreen" component={CoursePosterScreen} />
      <ELearningStack.Screen name="posterCommentsScreen" component={PosterCommentsScreen} />
      <ELearningStack.Screen name="courseCertificateScreen" component={CourseCertificateScreen} />
      <ELearningStack.Screen name="courseCompletionCertificateScreen" component={CourseCompletionCertificateScreen} />
      <ELearningStack.Screen name="allCoursesScreen" component={AllCoursesScreen} />
      <ELearningStack.Screen name="videoCommentsScreen" component={VideoCommentsScreen} />
    </ELearningStack.Navigator>
  )
}

const ProfileStack = createStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="profileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="myCases" component={CasesListScreen} />
      <ProfileStack.Screen
        name="singleCaseScreen"
        component={SingleCaseScreen}
      />
      <ProfileStack.Screen name="AllApications" component={AllApications} />
      <ProfileStack.Screen name="SingleResume" component={ResumeScreen} />

      <ProfileStack.Screen
        name="SingleUserScreen"
        component={SingleUserScreen}
      />
      <ProfileStack.Screen name="otherProfile" component={OtherProfileView} />
      <ProfileStack.Screen name="singleFunding" component={Funding} />
      <ProfileStack.Screen name="SingleJobScreen" component={SingleJobScreen} />

      <ProfileStack.Screen name="SingleShop" component={SingleShop} />

      <ProfileStack.Screen name="SingleOrder" component={SingleOrder} />

      <ProfileStack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <ProfileStack.Screen name="MapScreen" component={MapScreen} />
      <ProfileStack.Screen name="MyOrdersScreen" component={OrdersTabs} />
      <ProfileStack.Screen name="AddShopForm" component={AddShopForm} />
      <ProfileStack.Screen name="ShopProducts" component={ShopProducts} />
      <ProfileStack.Screen name="SingleProduct" component={SingleProduct} />
      <ProfileStack.Screen
        name="StoreSearchScreen"
        component={StoreSearchScreen}
      />
      <ProfileStack.Screen name="AddProductForm" component={AddProductForm} />

      <ProfileStack.Screen name="JobNavigator" component={JobNavigator} />

      <ProfileStack.Screen name="EditHours" component={EditHours} />
      <ProfileStack.Screen name="workList" component={WorkList} />
      <ProfileStack.Screen
        name="FundUserInfoForm"
        component={FundUserInfoForm}
      />
      <ProfileStack.Screen name="MyShops" component={MyShops} />
      <ProfileStack.Screen name="PostJobForm" component={PostJobForm} />

      <ProfileStack.Screen name="ReportScreen" component={ReportScreen} />
      <ProfileStack.Screen
        name="WithdrawalHistory"
        component={WithdrawalHistory}
      />
      <ProfileStack.Screen name="DonateScreen" component={DonateScreen} />
      <ProfileStack.Screen
        name="FundBusinessForm"
        component={FundBusinessForm}
      />
      <ProfileStack.Screen name="JobSearchScreen" component={JobSearchScreen} />

      <ProfileStack.Screen
        name="search"
        component={SearchScreen}
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 50 } },
            close: { animation: "timing", config: { duration: 150 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <ProfileStack.Screen
        name="FundingSingleScreen"
        component={FundingSingleScreen}
      />
      <ProfileStack.Screen name="chatsList" component={ChatsList} />
      <ProfileStack.Screen
        name="UserQuestionsScreen"
        component={UserQuestionsScreen}
      />
      <ProfileStack.Screen name="singleChat" component={SingleChat} />
      <ProfileStack.Screen
        name="SingleQuestionScreen"
        component={SingleQuestionScreen}
      />
      <ProfileStack.Screen name="FormScreen" component={FormScreen} />
      <ProfileStack.Screen
        name="myCalendarScreen"
        component={MyCalendarScreen}
      />
      <ProfileStack.Screen name="questionList" component={QuestionList} />
      <ProfileStack.Screen name="myEventsScreen" component={MyEventsScreen} />
      <ProfileStack.Screen
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 250 } },
            close: { animation: "timing", config: { duration: 250 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
        name="SingleEvent"
        component={SingleEvent}
      />
      <ProfileStack.Screen name="EventsForm" component={EventsForm} />
      <ExpertStack.Screen name="ratings" component={RatingScreen} />
    </ProfileStack.Navigator>
  );
}
const MenuStack = createStackNavigator();
function MenuNavigator() {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="menu" component={MenuScreen} />
      <MenuStack.Screen name="settings" component={SettingsScreen} />
      <MenuStack.Screen name="chooseLang" component={ChooseLangScreen} />
      <ExpertStack.Screen name="allExperts" component={AllExperts} />
      <ExpertStack.Screen
        name="expertSingleScreen"
        component={ExpertSingleScreen}
      />
      <MenuStack.Screen name="PaymentGateWay" component={PaymentGateWay} />

      <BottomTab.Screen
        initialRouteName="Expert"
        name="Expert"
        component={ExpertNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ExpertSVG focused={focused} />,
          tabBarActiveTintColor: colors.focused,
        }}
      />
      <MenuStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <MenuStack.Screen
        name="RefundPolicyScreen"
        component={RefundPolicyScreen}
      />
      <MenuStack.Screen
        name="TermsConditionScreen"
        component={TermsConditionScreen}
      />
      <MenuStack.Screen name="ContactUsScreen" component={ContactUsScreen} />

      <MenuStack.Screen name="AboutScreen" component={AboutScreen} />
      <MenuStack.Screen name="ProfileStack" component={ProfileNavigator} />
      <MenuStack.Screen name="EventStack" component={EventsNavigator} />
      <MenuStack.Screen
        name="search"
        component={SearchScreen}
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 50 } },
            close: { animation: "timing", config: { duration: 150 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <MenuStack.Screen name="Events" component={MyTabs} />
      <MenuStack.Screen
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 250 } },
            close: { animation: "timing", config: { duration: 250 } },
          },
        })}
        name="SingleEvent"
        component={SingleEvent}
      />
      <MenuStack.Screen name="EventsForm" component={EventsForm} />
      <MenuStack.Screen name="Funding" component={FundingNavigator} />
      <MenuStack.Screen name="Updates" component={UpdatesNavigator} />
      <MenuStack.Screen
        name="ELearning"
        component={ELearniNgavigator} />
    </MenuStack.Navigator>
  );
}

const FundingStack = createSharedElementStackNavigator();
function FundingNavigator() {
  return (
    <FundingStack.Navigator screenOptions={{ headerShown: false }}>
      <FundingStack.Screen name="singleFunding" component={Funding} />
      <FundingStack.Screen
        name="FundingSearchScreen"
        component={FundingSearchScreen}
      />
      <FundingStack.Screen
        name="FundingSingleScreen"
        component={FundingSingleScreen}
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 250 } },
            close: { animation: "timing", config: { duration: 250 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />

      <FundingStack.Screen
        name="FundUserInfoForm"
        component={FundUserInfoForm}
      />

      <FundingStack.Screen name="DonateScreen" component={DonateScreen} />
      <FundingStack.Screen
        name="FundBusinessForm"
        component={FundBusinessForm}
      />
    </FundingStack.Navigator>
  );
}

const UpdatesStack = createSharedElementStackNavigator();
function UpdatesNavigator() {
  return (
    <UpdatesStack.Navigator screenOptions={{ headerShown: false }}>
      <UpdatesStack.Screen name="Updates" component={Updates} />
      <UpdatesStack.Screen
        name="UpdatesSingleScreen"
        component={SinglePageUpdate}
      />
      <UpdatesStack.Screen name="UpdateSearch" component={UpdateSearch} />
    </UpdatesStack.Navigator>
  );
}

const EventsStack = createSharedElementStackNavigator();
function EventsNavigator() {
  return (
    <EventsStack.Navigator screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="Events" component={MyTabs} />
      <EventsStack.Screen
        options={() => ({
          transitionSpec: {
            open: { animation: "timing", config: { duration: 250 } },
            close: { animation: "timing", config: { duration: 250 } },
          },
        })}
        name="SingleEvent"
        component={SingleEvent}
      />
      <EventsStack.Screen name="EventsForm" component={EventsForm} />
    </EventsStack.Navigator>
  );
}

const ordersTab = createMaterialTopTabNavigator();

function OrdersTabs({ navigation }) {
  const { userData } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.order}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.pop()}>
          <ArrowSVG
            fill={colors.dark_blue}
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Typography
              content="طلباتي"
              size={20}
              color={colors.dark_blue}
              align="left"
              bold
            />
          </View>
        </TouchableOpacity>
      </View>
      <ordersTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.focused,
          tabBarInactiveTintColor: colors.dark_blue,
          tabBarIndicatorStyle: {
            backgroundColor: colors.focused,
          },
          tabBarLabelStyle: {
            fontSize: SCREEN_HEIGHT * 0.013,
            fontFamily: "HelveticaLight",
            lineHeight: 19,

            fontWeight: "bold",
          },
          tabBarStyle: { shadowColor: "white" },
          tabBarPressOpacity: "0.5",
        }}
      >
        <ordersTab.Screen
          options={{ title: "الطلبات المقدمة" }}
          name="requestedOrders"
          component={RequestedOrders}
        />
        {userData?.has_shop == 1 && (
          <ordersTab.Screen
            options={{ title: "الطلبات المستلمة" }}
            name="received"
            component={ReceivedOrders}
          />
        )}
      </ordersTab.Navigator>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();
function MyTabs({ navigation }) {
  const { userData, fixedTitles } = useContext(AppContext);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.28 }}
          source={{
            uri:fixedTitles.events['header-image'].formatted_image
          }}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View>
            <ArrowSVG />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Typography
              content={fixedTitles.events["events"].title}
              color={colors.white}
              size={20}
              bold={true}
              align="left"
            />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 10 }}>
            {userData?.is_expert == 1 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EventsForm", {
                    editMode: false,
                  })
                }
                style={styles.icon}
              >
                <PlusSVG />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => navigation.navigate("search", { cases: false })}
            >
              <SearchSVG secondary />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.focused,
          tabBarInactiveTintColor: colors.dark_blue,
          tabBarIndicatorStyle: {
            backgroundColor: colors.focused,
          },
          tabBarLabelStyle: {
            fontSize: SCREEN_HEIGHT * 0.013,
            fontFamily: "HelveticaLight",
            lineHeight: 19,
            fontWeight: "bold",
          },
          tabBarStyle: { shadowColor: "white" },
        }}
      >
        <Tab.Screen
          options={{ title: fixedTitles.events["top-events"].title }}
          name="TopEvents"
          component={TopEvents}
        />
        <Tab.Screen
          options={{ title: fixedTitles.events["upcoming-events"].title }}
          name="upcomingEvents"
          component={UpcomingEvents}
        />
        <Tab.Screen
          options={{ title: fixedTitles.events["past-events"].title }}
          name="pastEvents"
          component={PastEvents}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  top: {
    position: "absolute",
    top: Platform.OS == "ios" ? 48 : 12,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  order: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
