import React, { useContext } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from "@react-navigation/stack";
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
import { AllCoursesScreen } from "../screens/ELearning/AllCoursesScreen/AllCoursesScreen";
import { VideoCommentsScreen } from "../screens/ELearning/CourseScreen/CourseUnitsAndTests/Video/VideoCommentsScreen";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = ({ navigation, route }) => {
  const { fixedTitles, bottomBarVisible } = useContext(AppContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          borderRadius: 10,
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
          title: fixedTitles.bottomBarText["menu"].title,
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
    </HomeStack.Navigator>
  );
}

const JobStack = createStackNavigator();
function JobsNavigator() {
  return (
    <JobStack.Navigator screenOptions={{ headerShown: false }}>
      <JobStack.Screen name="jobScreen" component={JobScreen} />
    </JobStack.Navigator>
  );
}
const StoreStack = createStackNavigator();
function StoreNavigator() {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name="store" component={StoreScreen} />
    </StoreStack.Navigator>
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
      <ExpertStack.Screen
        name="expertPortfolio"
        component={ExpertPortfolioScreen}
      />
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
      {/* <ProfileStack.Screen name="cameraScreen" component={CameraScreen} /> */}
      <ProfileStack.Screen name="myCases" component={CasesListScreen} />
      <ProfileStack.Screen
        name="singleCaseScreen"
        component={SingleCaseScreen}
      />
      <ProfileStack.Screen
        name="UserQuestionsScreen"
        component={UserQuestionsScreen}
      />
      <ProfileStack.Screen
        name="SingleQuestionScreen"
        component={SingleQuestionScreen}
      />
      <ProfileStack.Screen name="FormScreen" component={FormScreen} />
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
      <MenuStack.Screen name="AboutScreen" component={AboutScreen} />
      <MenuStack.Screen
        name="ELearning"
        component={ELearniNgavigator} />
    </MenuStack.Navigator>
  );
}
