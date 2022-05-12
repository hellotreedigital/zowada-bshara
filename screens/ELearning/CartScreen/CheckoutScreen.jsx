import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import {globalStyles} from '../../../globals/globaStyles';
import {cartStyles as styles} from './CartStyles';
import {CustomPageHeader} from '../../../components/CustomPageHeader/CustomPageHeader';
import {colors} from '../../../globals/colors';
import { SCREEN_HEIGHT } from "../../../globals/globals";
import { Formik } from "formik";
import { CheckoutForm } from '../../../components/RegisterForm/CheckoutForm'
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import MessageModal from "../../../components/Modals/MessageModal";
import { buyCourses } from '../../../api/ELearning/ELearning';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const CheckoutScreen = ({navigation}) => {

  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [user, setUser] = useState(false);
  const formikRef = useRef();

  useEffect(() => {
    (async () => {
      let userr = await AsyncStorage.getItem("@user");
      let parsed = JSON.parse(userr)
      setUser(userr);
      if(formikRef.current){
        formikRef.current.setFieldValue('fullName', parsed.full_name);
        formikRef.current.setFieldValue('email', parsed.email);
        formikRef.current.setFieldValue('phoneNumber', parsed.phone_number);
        formikRef.current.setFieldValue('creditCard', '5555555555555555');
      }
    })();
  }, [formikRef]);


//

    const [errorObject, setErrorObject] = useState({
        errorVisible: false,
        emailError: 'خطأ',
        fullNameError: 'خطأ',
        passwordError: 'خطأ',
        mobileError: 'خطأ',
        termsConditionError: 'خطأ',
        experienceTypeError: 'خطأ',
        experienceError: 'خطأ',
        birthdayError: 'خطأ',
      });

      const modalHandler = () => {
            navigation.pop(4);
      };

      const closeModal = () =>{
        navigation.pop(4);
        navigation.push("myCoursesScreen");
      }

      function buyCourse(){
        (async () => {
          await buyCourses();
          setCheckoutModalVisible(true);
      })()
      }


    return(
        <View style={[globalStyles.body, globalStyles.backgrounWhite]}>
            <CustomPageHeader navigation={navigation} title="التسجيل" showShare={false} showNotification={false} color={colors.blue} spaceHorizontally={true}/>

            <View style={[styles.mainPageContainer]}>
            <Formik
            innerRef={formikRef}
        initialValues={{
          fullName: user?.full_name,
          email: user?.email,
          phoneNumber: user?.phone_number,
          creditCard: "5555555555555555"
        }}
      >
        {({ handleChange, values }) => (
            <SafeAreaView>
              <ScrollView
                style={{ height: SCREEN_HEIGHT }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 64,
                }}
              >
                <View style={styles.loader}>
                </View>
                <KeyboardAvoidingView
                  keyboardVerticalOffset={-120}
                  behavior={Platform.OS === "ios" ? "position" : "padding"}
                >
                  <View style={styles.content}>
                    <View style={styles.form}>
                    <CheckoutForm 
                        handleChange={handleChange}
                        values={values}
                        errorObject={errorObject}
                    />
                    </View>
                  </View>
                  <>
                    <View style={styles.button}>
                      <View style={styles.submit}>
                        <SecondaryButton
                          size={16}
                          content={'التسجيل'}
                          onPress={() => {buyCourse()}}
                          fullWidth={true}
                        />
                      </View>
                    </View>
                  </>
                </KeyboardAvoidingView>
              </ScrollView>
            </SafeAreaView>
        )}
      </Formik>
      <MessageModal
        visible={checkoutModalVisible}
        message={''}
        title={"لقد تسجلت ب“اسم الدورة التدريبية” بنجاح"}
        withButton={true}
        buttonText='واصل البحث'
        expert={true}
        textColor={colors.blue}
        textSize={18}
        closeBtnColor={colors.blue}
        showCloseBtn={true}
        closeBtnHandler={closeModal}
        close={() => modalHandler()}
      />

            </View>
        </View>
    )
}