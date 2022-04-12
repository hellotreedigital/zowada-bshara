import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {globalStyles} from '../../../../globals/globaStyles';
import {CourseUnitsAndTestsStyles as styles} from './CourseUnitsAndTestsStyles';
import {CustomPageHeader} from '../../../../components/CustomPageHeader/CustomPageHeader';
import {colors} from '../../../../globals/colors';
import {CourseUnitTemplate} from './CourseUnitTemplate'

const data=[
    {
        id: "0",
        title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
        name: 'فلان الفلاني',
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        id: "1",
        title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
        name: 'فلان الفلاني',
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        id: "2",
        title: "العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور ",
        name: 'فلان الفلاني',
        location: "موقع",
        topRanked: true,
        price: '89.00$',
        image:
            "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    }
    ]

export const CourseUnitsDetailsScreen = ({navigation}) => {

    function deleteCartItem(){}

    function continueWithCourse(){
      navigation.push("testIntroScreen");
    }

    return(
        <View style={[globalStyles.body, globalStyles.backgrounWhite]}>
            <CustomPageHeader navigation={navigation} title="عنوان الوحدة الأولى" showShare={false} showNotification={false} color={colors.blue}/>

            <View style={[styles.mainPageContainer]}>
            <FlatList
                        renderItem={(item) => {
                            return(
                                <CourseUnitTemplate item={item} handleClickEvent={deleteCartItem} continueWithCourse={continueWithCourse}/>
                            )
                        }}
                        data={data}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

            </View>

        </View>
    )
};

const UnitItem = ({ content, isFirst, isLast, ind, navigation }) => {
    return (
      <TouchableOpacity
        style={[
          styles.syllabusItemContainer,
          isFirst && styles.firstItemBorder,
          isLast && styles.lastItemBorder,
        ]}
        onPress={() => {navigation.push('courseUnitsDetailsScreen')}}
      >
        <View style={[styles.rows]}>
          <View style={[styles.columns]}>
            <Text style={[globalStyles.icon, globalStyles.backgrounWhite, globalStyles.iconBorder]}>{ind + 1}</Text>
          </View>
          <View style={styles.columns}>
            <Text style={globalStyles.textBlue}>{content.title}</Text>
            <Text>{content.text}</Text>
          </View>
        </View>
  
        <View style={[styles.columns]}>
        {content.isPassed ? <View style={[globalStyles.icon, globalStyles.backgrounWhite, styles.columns]}>
            <Image resizeMode="cover" source={image} style={styles.imagee} /> 
          </View>: 
          <View style={globalStyles.icon}>
              <ArrowSVG
              style={{
                  transform: [
                      { rotateY: I18nManager.isRTL ? "180deg" : "0deg" },
                  ]
              }}
              fill={colors.blue}
          /></View>}
        </View>
      </TouchableOpacity>
    );
  };