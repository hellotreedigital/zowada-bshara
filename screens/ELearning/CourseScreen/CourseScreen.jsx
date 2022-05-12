import React, { useContext, useState, useEffect } from "react";
import {View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from "../../../globals/colors";
import {AboutCourseScreen} from './AboutCourseScreen';
import {CourseSyllabusScreen} from './CourseSyllabusScreen';
import { PageHeadImageContainer } from "../../../components/PageHeadImageContainer/PageHeadImageContainer";
import {globalStyles} from '../../../globals/globaStyles';
import { getSingleCourse } from '../../../api/ELearning/ELearning';
import {CustomPageHeader} from '../../../components/CustomPageHeader/CustomPageHeader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../../appContext/AppContext";

const Tab = createMaterialTopTabNavigator();

export const CourseScreen = ({ navigation, route }) => {

  let [courseInfo, setCourseInfo] = useState();
  const [topImageUrl, setTopImageUrl] = useState("");

  const {
    fixedTitles
} = useContext(AppContext);

  useEffect(() => {
    (async () => {
        let singleCourseInfo = await getSingleCourse(route.params.data.id);
        let course = singleCourseInfo.data;
        if(course){
          const userId = await AsyncStorage.getItem("@userId");
          let prevPassed = false;
          course.course.lessons.forEach((lesson, index) => {
            let userPassed = false;
            lesson.passed_by.forEach(user => {
              if(user.id.toString() === userId.toString()) userPassed = true
            });
            prevPassed = index > 0 ? course.course.lessons[index - 1].is_passed : true
            lesson['is_passed'] = userPassed;
            lesson['isPrev_passed'] = prevPassed;
          });
        }
        setCourseInfo(course);
        setTopImageUrl(`${course.course.formatted_image}${course.course.background_image}`)
    })()
  }, [])



    return(
      <View style={[globalStyles.body]}>
        <CustomPageHeader  navigation={navigation} isAbsolute={true} showShare={false} showNotification={false} color={colors.white} spaceHorizontally={true} strokeW={4}/>
        <PageHeadImageContainer imageUrl={topImageUrl}  info={courseInfo?.course} registered={courseInfo?.registered}/>
        <Tab.Navigator
      initialRouteName="Feed"
      
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: colors.dark_blue,
        style: {
          backgroundColor: colors.light_grey,
          borderBottomColor: colors.light_blue,
          borderBottomWidth: 1,
          shadowColor: "transparent",
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: colors.blue,
          borderBottomWidth: 4,
          bottom: -2.5
        },
      }}>
      <Tab.Screen
        name="AboutCourseScreen"
        
        options={{
          tabBarLabel: fixedTitles.coursesTitles["about"].title,
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}>
        {() => (
                  <AboutCourseScreen name="AboutCourseScreen" navigation={navigation} courseInfo={courseInfo?.course} registered={courseInfo?.registered} />
                )}
          </Tab.Screen>
      <Tab.Screen
        name="CourseSyllabusScreen"
        options={{
          tabBarLabel: fixedTitles.coursesTitles["lessons"].title,
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }}>
          {() => (
                  <CourseSyllabusScreen name="CourseSyllabusScreen" navigation={navigation} courseInfo={courseInfo?.course} registered={courseInfo?.registered} />
                )}
        </Tab.Screen>
    </Tab.Navigator>
    </View>
    )
}