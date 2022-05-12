import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  I18nManager,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  aspectRatio,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../globals/globals";
import { SafeAreaView } from "react-native-safe-area-context";
import ZowadaSVG from "../../SVGR/Logo/Zowada";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import FacebookSVG from "../../SVGR/Socials/Facebook";
import GoogleSVG from "../../SVGR/Socials/Google";
import AppleSVG from "../../SVGR/Socials/Apple";
import { RNTextInput } from "../../components/Textinput/TextInput";
import { ScrollView } from "react-native-gesture-handler";
import { WhiteButton } from "../../buttons/WhiteButton";
import { useKeyboard } from "../../hooks/useKeyboard";
import { Formik } from "formik";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID } from "@env";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import AppContext from "../../appContext/AppContext";
import { signInUser } from "../../api/Auth/SignIn";
import MessageModal from "../../components/Modals/MessageModal";
import {
  checkAuth,
  googleAuthAndLogin,
} from "../../api/Auth/Socials/CheckAuth";
import AuthContext from "../../appContext/AuthContext";
export const Login = ({ navigation, setToken }) => {
  const {
    expoPushToken,
    fixedTitles,
    setVerificationTypes,
    verificationTypes,
    setUserName,
    userName,
  } = useContext(AppContext);

  const { setAuthState, user, setUser } = useContext(AuthContext);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userVerification, setUserVerification] = useState({
    emailVerified: null,
    phoneVeried: null,
  });
  WebBrowser.maybeCompleteAuthSession();

  const [errorObject, setErrorObject] = useState({
    errorVisible: false,
    mailError: null,
    passwordError: null,
  });

  const signUpHandler = () => {
    navigation.navigate("signupType");
  };
  const keyboardHeight = useKeyboard();

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("@token", token);
      await AsyncStorage.setItem("@onboardingStatus", JSON.stringify(false));
    } catch (e) {
      // saving error
    }
  };

  const facebookAuthHandler = async () => {
    try {
      setLoadingLogin(true);
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
        behavior: "web",
      });
      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`
        )
          .then((res) => res.json())
          .then((data) => {
            let access_token = token;
            let facebook_id = data.id;
            let email = data.email;
            let name = data.name;
            var formdata = new FormData();
            formdata.append("access_token", access_token);
            formdata.append("facebook_id", facebook_id);
            formdata.append("notification_token", expoPushToken);
            checkAuth("facebook-auth", formdata)
              .then((res) => {
                setErrorObject({
                  errorVisible: false,
                });
                console.log(res);

                if (res.data.token) {
                  setUserName(res.data.user.full_name);
                  setToken(res.data.token);
                  AsyncStorage.setItem(
                    "@token",
                    JSON.stringify(res.data.token)
                  );
                } else {
                  setLoadingLogin(true);
                  navigation.navigate("continueSignup", {
                    email,
                    expoPushToken,
                    name,
                    facebook_id,
                    access_token,
                    formdata,
                  });
                }
              })
              .catch((err) => {
                console.log(`err login : ${err.response.data}`);
                setLoadingLogin(false);
                let error = err.response.data;
                if (
                  error.errors["phone-verified"] &&
                  error.errors["phone-verified"][0] === false
                ) {
                  navigation.navigate("otp", {
                    sendOtp: true,
                    phoneVerification: false,
                    email: facebook_id,
                    facebookLogin: true,
                    formdata: formdata,
                  });
                } else {
                  setErrorMessage(err.response.data.errors["email_or_phone"]);
                  setModalVisible(true);
                }
              })
              .finally(() => setLoadingLogin(false));
          });
      } else {
        setLoadingLogin(false);
      }
    } catch ({ message }) {
      setLoadingLogin(false);
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  const loginHandler = async (email, password) => {
    setLoadingLogin(true);
    var formdata = new FormData();
    formdata.append("email_or_phone", email);
    formdata.append("password", password);
    formdata.append("notification_token", expoPushToken);
    signInUser(formdata)
      .then((res) => {
        console.log("User logged in ");

        storeToken(res.data.token);
        setToken(res.data.token);
        AsyncStorage.setItem("@token", JSON.stringify(res.data.token));
        AsyncStorage.setItem("@userId", JSON.stringify(res.data.user.id));
        AsyncStorage.setItem("@user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        console.log("USER DATA :", res.data.user, 'fdghjkmnbvfgjklbnvfghyu');
        setUserName(res.data.user.full_name);
        setErrorObject({
          errorVisible: false,
        });
        setLoadingLogin(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingLogin(false);

        if (
          err.response.data.errors.phone &&
          err.response.data.errors.phone[0] &&
          !err.response.data.errors[`phone-verified`]
        ) {
          setModalVisible(true);
          setErrorMessage(
            err.response.data.errors.phone && err.response.data.errors.phone[0]
          );
        }
        if (
          err.response.data.errors["phone-verified"] &&
          err.response.data.errors["phone-verified"][0] === false
        ) {
          navigation.navigate("otp", {
            email: email,
            sendOtp: true,
            formdata: formdata,
            phoneVerification: true,
            facebookLogin: false,
            googleLogin: false,
            appleLogin: false,
            googleAuth: false,
            googleId: null,
            appleLogin: null,
            appleId: null,
            resetPassword: false,
          });
          setModalVisible(false);
          setErrorObject({
            errorVisible: false,
          });
        } else {
          setErrorObject({
            errorVisible: true,
            mailError:
              err.response.data.errors.email_or_phone &&
              err.response.data.errors.email_or_phone[0],

            passwordError:
              err.response.data.errors.password &&
              err.response.data.errors.password[0],
          });
        }
      });
  };

  const appleAuthHandler = async () => {
    try {
      setLoadingLogin(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      let body = {
        identity_token: credential.identityToken,
        user_id: credential.user,
      };
      var appleFormdata = new FormData();
      appleFormdata.append("id_token", credential.identityToken);
      appleFormdata.append("user_id", credential.user);
      appleFormdata.append("notification_token", expoPushToken);
      if (body) {
        checkAuth("apple-auth", appleFormdata)
          .then((data) => {
            console.log(data.data);
            setLoadingLogin(false);
            if (data.data.token) {
              setUserName(data.data.user.full_name);
              setToken(data.data.token);
              AsyncStorage.setItem("@token", JSON.stringify(res.data.token));
            } else {
              navigation.navigate("continueSignup", {
                apple_id: body.user_id,
                email: body.email,
                authToken: credential.identityToken,
                token: expoPushToken,
                formdata: appleFormdata,
                appleLogin: true,
                idToken: credential.identityToken,
                clientId: credential.user,
                googleAuth: false,
                sendOtp: false,
              });
            }
          })
          .catch((err) => {
            let error = err?.response?.data;

            if (err.response.data.errors["email_or_phone"]) {
              setErrorMessage(err.response.data.errors["email_or_phone"][0]);
              setModalVisible(true);
            } else {
              let appleId = err.response.data.errors["apple_id"][0];

              if (
                error.errors["phone-verified"] &&
                error.errors["phone-verified"][0] === false
              ) {
                navigation.navigate("otp", {
                  apple_id: body.user_id,
                  email: body.email,
                  authToken: credential.identityToken,
                  token: expoPushToken,
                  formdata: appleFormdata,
                  appleLogin: true,
                  idToken: credential.identityToken,
                  clientId: credential.user,
                  googleAuth: false,
                  appleId: err.response.data.errors["apple_id"][0],
                  sendOtp: true,
                });
              } else if (error.errors["account"]) {
                setModalVisible(true);
                setErrorMessage(error.errors["account"][0]);
              } else if (error.errors["email_or_phone"]) {
                setModalVisible(true);
                setErrorMessage(error.errors["email_or_phone"][0]);
              } else {
                console.log("err");
              }
            }
          })
          .finally(() => {
            setLoadingLogin(false);
          });
      } else {
        setLoadingLogin(false);

        console.log("Apple signup error");
      }
    } catch (e) {
      setLoadingLogin(false);

      if (e.code === "ERR_CANCELED") {
        console.log("appleLogin err: ", e.code);
      } else {
        if (e.code == "ERR_APPLE_AUTHENTICATION_UNAVAILABLE") {
          setModalTitle(e.code);
          setModalVisible(true);
          return setCompatibilityAlert(true);
        }
      }
    }
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "790761510394-pqrof43a2ojr6l32cukeqfujri6p5nc5.apps.googleusercontent.com",
    iosClientId:
      "790761510394-pqrof43a2ojr6l32cukeqfujri6p5nc5.apps.googleusercontent.com",
    androidClientId:
      "790761510394-7crbvqe7anf54kt5h3ke08b4c9ipqhmt.apps.googleusercontent.com",

    webClientId:
      "790761510394-pqrof43a2ojr6l32cukeqfujri6p5nc5.apps.googleusercontent.com",
  });
  const googleAuthHandler = async () => {
    setLoadingLogin(true);
    let res = await promptAsync();

    if (res?.type === "success") {
      let id_token = res.params.id_token;
      let client_id = request.clientId;

      var formdata = new FormData();
      formdata.append("id_token", id_token);
      formdata.append("client_id", client_id);
      formdata.append("notification_token", expoPushToken);

      googleAuthAndLogin(formdata)
        .then((res) => {
          setErrorObject({
            errorVisible: false,
          });
          console.log(res);

          if (res.data.token) {
            setUserName(res.data.user.full_name);
            setToken(res.data.token);
            AsyncStorage.setItem("@token", JSON.stringify(res.data.token));
          } else {
            setLoadingLogin(true);
            navigation.navigate("continueSignup", {
              expoPushToken,
              formdata: formdata,
              isExpert: false,
              googleAuth: true,
              idToken: id_token,
              clientId: client_id,
              googleId: res.google_id,
            });
          }
        })
        .catch((err) => {
          let error = err?.response?.data;
          console.log(error);

          if (err.response.data.errors["email_or_phone"]) {
            setErrorMessage(err.response.data.errors["email_or_phone"][0]);
            setModalVisible(true);
          } else {
            let googleId = error.errors["google_id"][0];
            if (
              error.errors["phone-verified"] &&
              error.errors["phone-verified"][0] === false
            ) {
              navigation.navigate("otp", {
                sendOtp: true,
                phoneVerification: true,
                email: client_id,
                facebookLogin: false,
                formdata: formdata,
                continueSignUp: true,
                googleLogin: true,
                googleId: googleId,
              });
            } else if (error.errors["account"]) {
              setModalVisible(true);
              setErrorMessage(error.errors["account"][0]);
            } else if (error.errors["email_or_phone"]) {
              setModalVisible(true);
              setErrorMessage(error.errors["email_or_phone"][0]);
            } else {
              console.log("err");
            }
          }
        })
        .finally(() => {
          setLoadingLogin(false);
        });
    } else {
      console.log("Google signup unsuccessful!");
      setLoadingLogin(false);
    }
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              height: SCREEN_HEIGHT,
            }}
          >
            <View style={styles.loader}>
              <ActivityIndicator
                animating={loadingLogin}
                color={colors.dark_blue}
                size="large"
                hidesWhenStopped={true}
              />
            </View>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              keyboardVerticalOffset={0}
              behavior={Platform.OS === "ios" ? "padding" : "padding"}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    height:
                      aspectRatio < 2
                        ? SCREEN_HEIGHT - 80
                        : SCREEN_HEIGHT - 150,
                  }}
                >
                  <View style={styles.logo}>
                    {/* <ZowadaSVG /> */}
                    <ImageBackground
                      style={{ width: 125, height: 105 }}
                      source={require("../../assets/LOGO.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.title}>
                      <Typography
                        content={fixedTitles.authTitles["sign-in-with"]?.title}
                        color={colors.white}
                        bold={true}
                        size={20}
                      />
                    </View>

                    <View style={styles.row}>
                      {Platform.OS === "ios" && (
                        <TouchableOpacity
                          onPress={() => appleAuthHandler()}
                          style={styles.icon}
                        >
                          <AppleSVG />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        onPress={() => googleAuthHandler()}
                        style={[styles.icon, { marginHorizontal: 30 }]}
                      >
                        <GoogleSVG />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => facebookAuthHandler()}
                        style={styles.icon}
                      >
                        <FacebookSVG />
                      </TouchableOpacity>
                      {Platform.OS === "android" && (
                        <View
                          style={[
                            styles.icons,
                            { marginHorizontal: I18nManager.isRTL ? 0 : 30 },
                          ]}
                        ></View>
                      )}
                    </View>
                  </View>
                  <View>
                    <Typography
                      content={fixedTitles.authTitles["sign-in-or"]?.title}
                      color={colors.white}
                      size={16}
                      lh={19}
                      align="center"
                    />
                  </View>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                      <>
                        <View style={styles.input}>
                          <RNTextInput
                            password={false}
                            placeholder={
                              fixedTitles.authTitles["phone-emailaddress"]
                                ?.title
                            }
                            value={values.email}
                            handleChange={handleChange("email")}
                            error={errorObject.mailError}
                            isError={errorObject.errorVisible}
                          />
                        </View>
                        <View style={styles.input}>
                          <RNTextInput
                            password={true}
                            placeholder={
                              fixedTitles.authTitles["password"]?.title
                            }
                            value={values.password}
                            handleChange={handleChange("password")}
                            error={errorObject.passwordError}
                            isError={errorObject.errorVisible}
                          />
                        </View>
                        <View style={styles.forgetPassword}>
                          <TouchableOpacity
                            style={{ marginHorizontal: 24, marginTop: 0 }}
                            onPress={() =>
                              navigation.navigate("forgetPassword")
                            }
                          >
                            <Typography
                              content={
                                fixedTitles.authTitles["forget-password"]?.title
                              }
                              color={colors.white}
                              size={12}
                              roman={true}
                              align="right"
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.submitBtn}>
                          <WhiteButton
                            size={16}
                            content={fixedTitles.authTitles["login"]?.title}
                            onPress={() =>
                              loginHandler(values.email, values.password)
                            }
                          />
                        </View>
                      </>
                    )}
                  </Formik>
                  <Animated.View style={[styles.footer]}>
                    <View
                      style={[
                        styles.top,
                        { display: keyboardHeight === 0 ? "flex" : "none" },
                      ]}
                    >
                      <View style={styles.rowContent}>
                        <View style={styles.left}>
                          <Typography
                            content={
                              fixedTitles.authTitles["create-new-account"]
                                ?.title
                            }
                            color={colors.white}
                            size={16}
                            lh={SCREEN_HEIGHT * 0.023}
                            roman={true}
                            align="left"
                          />
                        </View>
                        <View style={styles.right}>
                          <TouchableOpacity onPress={() => signUpHandler()}>
                            <Typography
                              color={colors.white}
                              size={16}
                              lh={SCREEN_HEIGHT * 0.023}
                              bold={true}
                              align="left"
                              content={
                                fixedTitles.authTitles["dont-have-an-account"]
                                  ?.title
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.bottom,
                        { display: keyboardHeight === 0 ? "flex" : "none" },
                      ]}
                    >
                      <TouchableOpacity onPress={() => setToken(true)}>
                        <Typography
                          color={colors.white}
                          size={15}
                          bold={true}
                          align="left"
                          content={fixedTitles.authTitles["skip-login"]?.title}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </ScrollView>
          <MessageModal
            visible={modalVisible}
            close={() => setModalVisible(false)}
            message={errorMessage}
          />
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
    marginTop: SCREEN_HEIGHT * 0.04,
    zIndex: 99999,
  },
  title: {
    marginTop: SCREEN_HEIGHT * 0.08,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  content: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  icon: {
    backgroundColor: colors.white,
    width: SCREEN_HEIGHT * 0.05,
    height: SCREEN_HEIGHT * 0.05,
    borderRadius: (SCREEN_HEIGHT * 0.05) / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.43,
    shadowRadius: 7.51,

    elevation: 15,
  },
  row: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    marginBottom: SCREEN_HEIGHT * 0.02,
    position: "relative",
    right: Platform.OS !== "ios" ? 15 : 0,
  },
  input: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.021,
  },
  forgetPassword: {
    width: SCREEN_WIDTH,
  },
  submitBtn: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.039,
  },
  footer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    // position: "absolute",
    // bottom: aspectRatio < 2 ? 5 : -5,
    marginTop: 20,
  },
  rowContent: {
    flexDirection: "row",
  },
  right: {
    marginLeft: !I18nManager.isRTL ? 8 : 0,
  },
  left: {
    marginRight: I18nManager.isRTL ? 8 : 0,
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
