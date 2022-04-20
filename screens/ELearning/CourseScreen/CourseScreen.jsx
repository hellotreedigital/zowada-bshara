import React, {useState, useEffect} from "react";
import {View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from "../../../globals/colors";
import {AboutCourseScreen} from './AboutCourseScreen';
import {CourseSyllabusScreen} from './CourseSyllabusScreen';
import { PageHeadImageContainer } from "../../../components/PageHeadImageContainer/PageHeadImageContainer";
import {globalStyles} from '../../../globals/globaStyles';
import { getSingleCourse } from '../../../api/ELearning/ELearning';



const Tab = createMaterialTopTabNavigator();

export const CourseScreen = ({ navigation, route }) => {

  let [courseInfo, setCourseInfo] = useState();
  const [topImageUrl, setTopImageUrl] = useState("");

  useEffect(() => {
    (async () => {
        let singleCourseInfo = await getSingleCourse(route.params.data.id);
        setCourseInfo(singleCourseInfo.data);
        setTopImageUrl(`${singleCourseInfo.data.course.formatted_image}${singleCourseInfo.data.course.background_image}`)
    })()
  }, [])



    return(
      <View style={[globalStyles.body]}>
        <PageHeadImageContainer imageUrl={topImageUrl}/>
        <Tab.Navigator
      initialRouteName="Feed"
      
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: colors.dark_blue,
        style: {
          backgroundColor: colors.light_grey,
          borderBottomColor: colors.light_blue,
          borderBottomWidth: 2,
          shadowColor: "transparent",
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: colors.blue,
          borderBottomWidth: 8,
          bottom: -5
        },
      }}>
      <Tab.Screen
        name="AboutCourseScreen"
        
        options={{
          tabBarLabel: 'حول',
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
          tabBarLabel: 'مواد',
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