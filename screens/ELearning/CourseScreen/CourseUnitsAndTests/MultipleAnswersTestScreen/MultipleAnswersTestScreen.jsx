import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import {TestQuestionTemplate} from './TestQuestionTemplate'

const questions=[
    {
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    },{
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    },{
        questionText: `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
        إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى`,
        answers:[
            {
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            },{
                answerText: 'إجابه',
                isSelected: false
            }
        ]
    }
]

export const MultipleAnswersTestScreen = ({ navigation }) => {

    let [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
      setAllQuestions(questions);
    }, [])
    
    
    function onAnswerSelected(qi,ai){
        let allQ = allQuestions;
        allQ[qi].answers.forEach((a, i) => {
            if(i !== ai) allQ[qi].answers[i].isSelected = false;
        })
        allQ[qi].answers[ai].isSelected = true;

        setAllQuestions(allQ);
        
    }

  return (
    <ScrollView style={[globalStyles.body, globalStyles.backgrounWhite, styles.bottomPadding]}>
      <CustomPageHeaderWithProgress
        navigation={navigation}
        title="اختبار"
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <View style={[styles.mainPageContainer, styles.bottomPadding]}>
      {allQuestions.map((question, index) =>(
            <TestQuestionTemplate key={index} ind={index} question={question} onAnswerSelected={onAnswerSelected}/>
        ))}
      <View style={[globalStyles.verticalTopSpacer20]}><SecondaryButton content="استمر" fullWidth={true} onPress={()=> navigation.push('testResultsScreen')}/></View>
      </View>

    </ScrollView>
  );
};
