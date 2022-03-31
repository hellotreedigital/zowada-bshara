import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  requestOTP,
  resetPassword,
} from "../../api/Auth/ResetPassword/ResetPassword";
import { WhiteButton } from "../../buttons/WhiteButton";
import { RNTextInput } from "../../components/Textinput/TextInput";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { Formik } from "formik";
import AppContext from "../../appContext/AppContext";
import MessageModal from "../../components/Modals/MessageModal";

export const ForgetPassowrd = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const { fixedTitles } = useContext(AppContext);

  const [errorObject, setErrorObject] = useState({
    errorVisible: false,
    errorMessage: null,
  });
  const [loadingForgetPassword, setLoadingForgetPassword] = useState(false);
  const resetPasswordHandler = (mail) => {
    setLoadingForgetPassword(true);
    var formdata = new FormData();
    formdata.append("email_or_phone", mail);
    requestOTP(formdata)
      .then((res) => {
        setLoadingForgetPassword(false);

        console.log("otp sent to:", mail);
        navigation.navigate("otp", {
          email: mail,
          mobile: null,
          sendOtp: false,
          phoneVerification: false,
          formdata: formdata,
          resetPassword: true,
        });
      })
      .catch((err) => {
        setLoadingForgetPassword(false);
        let error = err.response.data;
        console.log(err.response.data);
        setErrorObject({
          errorVisible: true,
          errorMessage:
            error.errors.email_or_phone && error.errors.email_or_phone[0],
        });
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#104251",
          "#12515A",
          "#197A74",
          "#1F9B89",
          "#419E79",
          "#6DA265",
          "#93A654",
          "#B2A946",
          "#C9AC3B",
          "#DAAD33",
          "#E4AE2F",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
        ]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1.5 }}
        style={styles.background}
      >
        <SafeAreaView>
          <ScrollView style={{ height: SCREEN_HEIGHT }}>
            <View style={styles.loader}>
              <ActivityIndicator
                animating={loadingForgetPassword}
                color={colors.dark_blue}
                size="large"
                hidesWhenStopped={true}
              />
            </View>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              keyboardVerticalOffset={0}
              behavior={"position"}
            >
              <View style={styles.logo}>
                <ImageBackground
                  style={{ width: 125, height: 105 }}
                  source={require("../../assets/LOGO.png")}
                  resizeMode="contain"
                />
                <View style={styles.arrow}>
                  <TouchableOpacity
                    style={{ width: 40, height: 40 }}
                    onPress={() => navigation.pop()}
                  >
                    <ArrowSVG
                      style={{
                        transform: [
                          { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                        ],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Formik initialValues={{ email: "" }}>
                {({ handleChange, values, handleBlur }) => (
                  <View style={styles.body}>
                    <View style={styles.title}>
                      <Typography
                        content={
                          fixedTitles.authTitles["forget-your-password"].title
                        }
                        color={colors.white}
                        size={20}
                        bold={true}
                      />
                    </View>
                    <View style={styles.subtitle}>
                      <Typography
                        content={
                          fixedTitles.authTitles["forget-password"].title
                        }
                        color={colors.white}
                        size={16}
                        align="center"
                      />
                    </View>
                    <View>
                      <RNTextInput
                        placeholder={
                          fixedTitles.authTitles["email-address"].title
                        }
                        type="email-address"
                        value={values.email}
                        handleChange={handleChange("email")}
                        isError={errorObject.errorVisible}
                        error={errorObject.errorMessage}
                      />
                    </View>
                    <View style={styles.submit}>
                      <WhiteButton
                        content={fixedTitles.authTitles["submit"].title}
                        onPress={() => resetPasswordHandler(values.email)}
                        size={16}
                      />
                    </View>
                  </View>
                )}
              </Formik>
              <MessageModal
                visible={modalVisible}
                message={errMessage}
                close={() => {
                  setModalVisible(false);
                }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: 32,
    zIndex: 99999,
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  body: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    height: SCREEN_HEIGHT - 300,
    justifyContent: "center",
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 30,
    width: SCREEN_WIDTH * 0.9,
  },
  submit: {
    marginTop: 30,
  },
  arrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? 0 : 14,
    right: 22,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.95,
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
