import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { resetPassword } from "../../api/Auth/ResetPassword/ResetPassword";
import { WhiteButton } from "../../buttons/WhiteButton";
import { RNTextInput } from "../../components/Textinput/TextInput";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";

import { Formik } from "formik";

export const NewPassword = ({ navigation, route }) => {
  const { formdata } = route.params;
  const [newPassLoading, setNewPassLoading] = useState(false);
  const [errorObject, setErrorObject] = useState({
    errorVisible: false,
    passwordError: null,
    confirmPasswordError: null,
  });
  const newPasswordHandler = (password, confirmPassword) => {
    setNewPassLoading(true);
    formdata.append("password", password);
    formdata.append("password_confirmation", confirmPassword);
    resetPassword(formdata)
      .then((res) => {
        setNewPassLoading(false);

        navigation.navigate("login");
      })
      .catch((err) => {
        setNewPassLoading(false);

        let error = err.response.data;
        setErrorObject({
          errorVisible: true,
          passwordError: error.errors.password && error.errors.password[0],
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
                animating={newPassLoading}
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
              </View>
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                onSubmit={(values) => console.log(values)}
              >
                {({ handleChange, values }) => (
                  <View style={styles.body}>
                    <View style={styles.title}>
                      <Typography
                        content="تغيير كلمة المرور"
                        color={colors.white}
                        size={20}
                        bold={true}
                      />
                    </View>
                    <View style={styles.subtitle}>
                      <Typography
                        content="أدخل كلمة مرور جديدة"
                        color={colors.white}
                        size={16}
                      />
                    </View>
                    <View>
                      <RNTextInput
                        placeholder="كلمة السر"
                        type="default"
                        password={true}
                        value={values.password}
                        handleChange={handleChange("password")}
                        isError={errorObject.errorVisible}
                        error={errorObject.passwordError}
                      />
                    </View>
                    <View style={{ marginVertical: 15 }}>
                      <RNTextInput
                        password={true}
                        placeholder="تأكيد كلمة السر"
                        type="default"
                        value={values.confirmPassword}
                        handleChange={handleChange("confirmPassword")}
                      />
                    </View>
                    <View style={styles.submit}>
                      <WhiteButton
                        size={16}
                        content="ثبت"
                        onPress={() =>
                          newPasswordHandler(
                            values.password,
                            values.confirmPassword
                          )
                        }
                      />
                    </View>
                  </View>
                )}
              </Formik>
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
  },
  body: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    height: SCREEN_HEIGHT - 300,
    justifyContent: "center",
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 30,
  },
  submit: {
    marginTop: 30,
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
