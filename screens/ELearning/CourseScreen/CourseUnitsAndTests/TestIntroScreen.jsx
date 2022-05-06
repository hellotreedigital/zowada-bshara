import React from "react";
import { ScrollView, View, Text } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";

export const TestIntroScreen = ({ navigation, route }) => {

  const { data, courseId } = route.params;


  function goToTest() {
    navigation.push(data.continueTo, {data: data.item, courseId: courseId});
  }

  return (
    <ScrollView style={[globalStyles.body, globalStyles.backgrounWhite]}>
      <CustomPageHeader
        navigation={navigation}
        title={data.backButtonTitle}
        showShare={false}
        showNotification={false}
        color={colors.blue}
        spaceHorizontally={true}
      />

      <View style={[styles.mainPageContainer]}>
        <Text>{data.contentText}</Text>

        <View style={globalStyles.verticalTopSpacer20}>
          <SecondaryButton
            fullWidth={true}
            content="تقدم للإختبار"
            onPress={() => goToTest()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
