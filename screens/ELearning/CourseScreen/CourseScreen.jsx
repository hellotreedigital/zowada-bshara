import React, {useState} from "react";
import {View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from "../../../globals/colors";
import {AboutCourseScreen} from './AboutCourseScreen';
import {CourseSyllabusScreen} from './CourseSyllabusScreen';
import { PageHeadImageContainer } from "../../../components/PageHeadImageContainer/PageHeadImageContainer";
import {globalStyles} from '../../../globals/globaStyles';



const Tab = createMaterialTopTabNavigator();

export const CourseScreen = ({ navigation, route }) => {

  const [topImageUrl, setTopImageUrl] = useState("https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");


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
        name="CourseSyllabusScreen"
        component={AboutCourseScreen}
        options={{
          tabBarLabel: 'حول',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}  />
      <Tab.Screen
        name="AboutCourseScreen"
        component={CourseSyllabusScreen}
        options={{
          tabBarLabel: 'مواد',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
    </View>
    )
}