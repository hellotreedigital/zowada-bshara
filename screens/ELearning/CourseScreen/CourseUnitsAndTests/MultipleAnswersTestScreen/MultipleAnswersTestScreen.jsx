import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { globalStyles } from "../../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { CustomPageHeaderWithProgress } from "../../../../../components/CustomPageHeader/CustomPageHeaderWithProgress";
import { colors } from "../../../../../globals/colors";
import { SecondaryButton } from "../../../../../buttons/SecondaryButton";
import {TestQuestionTemplate} from './TestQuestionTemplate'
import { answerExam } from "../../../../../api/ELearning/ELearning";



export const MultipleAnswersTestScreen = ({ navigation, route }) => {

    let [allQuestions, setAllQuestions] = useState([]);

    const { data, courseId, isLastLesson } = route.params;

    useEffect(() => {
        let questions = data.questions;
        questions.forEach(q =>{
            q.answers.forEach(a =>{
                a.isSelected = false
            })
        })
        setAllQuestions(questions);
    }, [])
    
    
    function onAnswerSelected(qi,ai){
        let allQ = [...allQuestions];
        allQ[qi].answers.forEach((a, i) => {
            if(i !== ai) allQ[qi].answers[i].isSelected = false;
        })
        allQ[qi].answers[ai].isSelected = true;

        setAllQuestions(allQ);
    }

    async function getExamResults(){
        let allQ = [...allQuestions];
        let answerss={};
        let correctAnswers = 0
        allQ.forEach((q) =>{
            q.answers.forEach((a) => {
                if(a.isSelected){
                    answerss[a.exam_question_id] = a.id.toString();
                    if(q.correct_answer_id === a.id) correctAnswers++
                }
            })
        })
        let screenData = {
            correctAnswers: correctAnswers,
            passing_answers_number: data.passing_answers_number,
            numberOfQuestions: allQ.length,
            allQuestions: allQuestions,
            isLast: data.isLast,
            isLastLesson: isLastLesson
        }
        //if(correctAnswers >= data.passing_answers_number) 
        await answerExam(courseId, data.lesson_id, {answers:answerss});
        navigation.push('testResultsScreen', {data: screenData});
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
      <View style={[globalStyles.verticalTopSpacer20]}><SecondaryButton content="استمر" fullWidth={true} onPress={()=> {getExamResults()}}/></View>
      </View>

    </ScrollView>
  );
};
