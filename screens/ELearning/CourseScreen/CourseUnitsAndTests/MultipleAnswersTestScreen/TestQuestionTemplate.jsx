import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CourseUnitsAndTestsStyles as styles } from "../CourseUnitsAndTestsStyles";
import { globalStyles } from "../../../../../globals/globaStyles";

export const TestQuestionTemplate = ({ ind, question, onAnswerSelected }) => {

  return (
    <View
      style={[
        globalStyles.cardShadow,
        globalStyles.verticalTopSpacer20,
        styles.testText,
      ]}
    >
      <View style={[globalStyles.whiteCard]}>
        <View style={styles.textTextContainer}>
          <View style={styles.rows}>
            <View style={[styles.columns, styles.testQuestionCol1, styles.justifyTop]}>
              <Text
                style={[
                  globalStyles.icon,
                  globalStyles.backgrounWhite,
                  globalStyles.iconBorder,
                ]}
              >
                {ind + 1}
              </Text>
            </View>
            <Text style={[globalStyles.textDarkBlue,styles.columns, styles.testQuestionCol2, styles.testText]}>
                {question.question}
            </Text>
          </View>
          <View style={[styles.columns, styles.testQuestionCol1]}></View>
        </View>

                {question.answers.map((answer, index) => (
                    <AnswerItem key={`${ind}/${index}`} aind={index} qind={ind} answer={answer} onAnswerSelected={onAnswerSelected}/>
                ))}
      </View>
    </View>
  );
};



const AnswerItem = ({aind, qind, answer, onAnswerSelected}) =>{  

    return(
        <TouchableOpacity style={[styles.rows, styles.answerRow, answer.isSelected && styles.SelectedAnswer]} onPress={() => onAnswerSelected(qind, aind)}>
            <Text
                style={[
                  globalStyles.icon,
                  globalStyles.iconBorder,
                  answer.isSelected && globalStyles.backgrounLightGrey
                ]}
              >
                {aind + 1}
              </Text>
              <Text style={[styles.answerText, styles.testText]}>{answer.answer}</Text>
        </TouchableOpacity>
    )
}