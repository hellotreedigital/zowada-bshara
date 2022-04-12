import React, { useState, useEffect } from "react";
import { ScrollView, View, Text,TouchableOpacity } from "react-native";
import { courseStyles as styles } from "./CourseStyles";
import {FeedbackCard} from '../../../components/Feedback/FeedbackCard';
import {FeedbackPersonCard} from '../../../components/Feedback/FeedbackPersonCard';
import { colors } from "../../../globals/colors";
import Typography from "../../../components/Typography/Typography";

import {globalStyles} from '../../../globals/globaStyles';
import { SecondaryButton } from "../../../buttons/SecondaryButton";


const personData = {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3744&q=80",
    full_name: "اسم",
    experience_domain:{
        title: 'اسم'
    }
}

const commentorData = {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3744&q=80",
    full_name: "اسم المعلم",
    experience_domain:{
    },
    comment: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد`
}

const List = [
    {
    id:0,
    text:"العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، "
},
    {
    id:1,
    text:"العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، "
},
    {
    id:2,
    text:"العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، "
},
    {
    id:3,
    text:"العنوان هنا فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، "
}
]

export const AboutCourseScreen = ({ navigation }) => {

    let [courseDescription, setCourseDescription] = useState([]);

    useEffect(() => {
      setCourseDescription(List);
    }, [])
    
    function personPressed(){}

    function goToCart(){
      navigation.push('cartScreen');
    }

  return (
    <ScrollView style={styles.paragraph} showsVerticalScrollIndicator={false}>
      <View style={[globalStyles.verticalTopSpacer20, globalStyles.verticalBottomSpacer20]}>
        <Text>
          صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
          الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم
          لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا
          يوجد محتوى نصي، هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد{" "}
        </Text>
      </View>
      <View style={[styles.rowContainer, globalStyles.verticalTopSpacer10]}>
        <Text>سعر الدورة:</Text>
        <Text style={[globalStyles.textBlue, styles.extraMargin]}>89.00$</Text>
      </View>

      <View style={[globalStyles.cardShadow, globalStyles.verticalTopSpacer20]}>
        <View style={[globalStyles.whiteCard]}>
          <Text style={globalStyles.textBlue}>ماذا ستتعلم</Text>

          {courseDescription.map(desc =>(
              <ListItem key={desc.id} content={desc.text} />
          ))}

          
        </View>

        
      </View>

        <View style={[globalStyles.verticalBottomSpacer20, globalStyles.verticalTopSpacer20]}>
        <Text style={[globalStyles.textBlue, styles.verticalTopSpacer10]}>المدرب</Text>
            <FeedbackPersonCard data={personData} size="large"/>
        </View>

      <View style={[styles.cardShadow, globalStyles.verticalTopSpacer20]}>
        <View style={[globalStyles.whiteCard]}>
        <View style={[styles.about, styles.spacing]}>
                    <View style={styles.aboutLeft}>
                        <Typography
                            bold={true}
                            align="left"
                            color={colors.blue}
                            size={16}
                            content="التعليقات"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.aboutRight}
                    >
                        <Typography
                            color={colors.dark_blue}
                            size={14}
                            content="عرض المزيد"
                            align="left"
                        />
                    </TouchableOpacity>
                </View>
            <FeedbackCard data={commentorData} onPress={personPressed} size="small"/>          
        </View>
        
      </View>


          <View style={[globalStyles.verticalTopSpacer20]}>
            <SecondaryButton content="تسجيل" fullWidth={true} onPress={() => {goToCart()}}/>
          </View>
        

          <View style={[globalStyles.verticalTopSpacer10, globalStyles.verticalBottomSpacer10]}/>
    </ScrollView>
  );
};


const ListItem = ({content}) => {
    return(
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Text style={{display: "flex"}}>{"\u002D"}</Text>
            <Text style={{ flex: 1}}> {content}</Text>
        </View>
    )
}