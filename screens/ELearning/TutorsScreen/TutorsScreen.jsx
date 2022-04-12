import React from "react";
import { eLearnineStyles as styles } from '../ELearningStyles';
import { ScrollView, Text } from "react-native";
import {globalStyles} from '../../../globals/globaStyles';

export const TutorsScreen = ({ navigation }) => {
    return (
        <ScrollView
            style={[styles.whiteBackground, globalStyles.body]}
            showsVerticalScrollIndicator={false}>
            <Text>Tutors</Text>
        </ScrollView>
    )
}