import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { globalStyles } from "../../../../globals/globaStyles";
import { CourseUnitsAndTestsStyles as styles } from "./CourseUnitsAndTestsStyles";
import { CustomPageHeader } from "../../../../components/CustomPageHeader/CustomPageHeader";
import { colors } from "../../../../globals/colors";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";

const longText = `صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحر


صفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، 
هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)هنا يوجد ف)هنا يوجد `;

export const TestIntroScreen = ({ navigation }) => {
  function goToTest() {
    navigation.push("multipleAnswersTestScreen");
  }

  return (
    <ScrollView style={[globalStyles.body, globalStyles.backgrounWhite]}>
      <CustomPageHeader
        navigation={navigation}
        title="اختبار"
        showShare={false}
        showNotification={false}
        color={colors.blue}
      />

      <View style={[styles.mainPageContainer]}>
        <Text>{longText}</Text>

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
