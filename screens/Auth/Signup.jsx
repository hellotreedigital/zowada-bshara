import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  I18nManager,
} from "react-native";

import { Form } from "../../components/RegisterForm/Form";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
  aspectRatio,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../globals/globals";
import AppleSVG from "../../SVGR/Socials/Apple";
import FacebookSVG from "../../SVGR/Socials/Facebook";
import GoogleSVG from "../../SVGR/Socials/Google";
import Checkbox from "expo-checkbox";
import { WhiteButton } from "../../buttons/WhiteButton";
import { ErrorMessage, useFormik } from "formik";
import { Formik } from "formik";
import { expertSignUp, signUpUser } from "../../api/Auth/SignUp";
import {
  checkAuth,
  googleAuthAndLogin,
} from "../../api/Auth/Socials/CheckAuth";
import * as Facebook from "expo-facebook";
import { FACEBOOK_APP_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import { ExpertForm } from "../../components/RegisterForm/ExpertForm";
import MessageModal from "../../components/Modals/MessageModal";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import * as AppleAuthentication from "expo-apple-authentication";
import AppContext from "../../appContext/AppContext";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Signup = ({ route, navigation }) => {
  const { setToken, setVerificationTypes, fixedTitles, country } =
    useContext(AppContext);

  const { isExpert, expoPushToken } = route.params;
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [experienceValue, setExperienceValue] = useState("");
  const [experienceType, setExperienceType] = useState("");
  const [expertModalVisible, setExpertModalVisible] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isCalendar, setIsCalendar] = useState(false);
  const [yearsOfExperience, setYearsOfExperience] = useState();
  const [errorObject, setErrorObject] = useState({
    errorVisible: false,
    emailError: null,
    fullNameError: null,
    passwordError: null,
    mobileError: null,
    termsConditionError: null,
    experienceTypeError: null,
    experienceError: null,
    birthdayError: null,
  });
  let experience = [];
  let expeienceType = [];
  let yearsOfExperienceArr = [];
  React.useEffect(() => {
    fixedTitles.experience.map((data) => {
      experience.push(data.title);
    });
    fixedTitles.experienceType.map((data) => {
      expeienceType.push(data.title);
    });
    fixedTitles.yearsExp.map((data) => {
      yearsOfExperienceArr.push(data.title);
    });
  }, [experience, experienceType, yearsOfExperienceArr]);

  WebBrowser.maybeCompleteAuthSession();

  const modalHandler = () => {
    if (!errModal) {
      setExpertModalVisible(false);
      navigation.navigate("login");
    } else {
      setExpertModalVisible(false);
    }
  };

  const facebookAuthHandler = async () => {
    try {
      setSignUpLoader(true);
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
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

                if (res.data.token) {
                  setToken(res.data.token);
                  AsyncStorage.setItem(
                    "@token",
                    JSON.stringify(res.data.token)
                  );
                } else {
                  setSignUpLoader(true);
                  navigation.navigate("continueSignup", {
                    email,
                    expoPushToken,
                    name,
                    facebook_id,
                    access_token,
                    formdata,
                    isExpert,
                  });
                }
              })
              .catch((err) => {
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
                } else if (err.response.data.errors["email_or_phone"]) {
                  setErrModal(true);
                  setExpertModalVisible(true);
                  setErrorMessage(
                    err.response.data.errors["email_or_phone"][0]
                  );
                } else {
                  setErrorMessage(err.response.data.errors["email_or_phone"]);
                  setErrModal(true);
                  // setExpertModalVisible(true);
                }
              })
              .finally(() => {
                setSignUpLoader(false);
              });
          });
      } else {
        setSignUpLoader(false);
      }
    } catch ({ message }) {
      setSignUpLoader(false);
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
    setSignUpLoader(true);
    let res = await promptAsync();

    if (res?.type === "success") {
      let id_token = res.params.id_token;
      let client_id = request.clientId;

      var googleFormdata = new FormData();
      googleFormdata.append("id_token", id_token);
      googleFormdata.append("client_id", client_id);
      googleFormdata.append("notification_token", expoPushToken);
      googleAuthAndLogin(googleFormdata)
        .then((res) => {
          setErrorObject({
            errorVisible: false,
          });
          if (res.data.token) {
            setToken(res.data.token);
            AsyncStorage.setItem("@token", JSON.stringify(res.data.token));
          } else {
            setSignUpLoader(true);
            navigation.navigate("continueSignup", {
              email: null,
              expoPushToken: expoPushToken,
              name: null,
              facebook_id: null,
              access_token: null,
              isExpert: isExpert,
              formdata: googleFormdata,
              idToken: id_token,
              clientId: client_id,
              googleAuth: true,
              appleLogin: false,
              facebookLogin: false,
              googleId: res.google_id,
            });
          }
        })
        .catch((err) => {
          if (err?.response.data) {
            if (
              err.response.data.errors["phone-verified"] &&
              err.response.data.errors["phone-verified"][0] === false
            ) {
              navigation.navigate("otp", {
                sendOtp: true,
                phoneVerification: true,
                email: client_id,
                facebookLogin: false,
                continueSignUp: true,
                googleLogin: true,
                googleId: err.response.data.errors["google_id"][0],
              });
            } else if (err.response.data.errors["email_or_phone"]) {
              setErrModal(true);
              setExpertModalVisible(true);
              setErrorMessage(err.response.data.errors["email_or_phone"][0]);
            } else {
              setExpertModalVisible(true);
              setErrorMessage(err.response.data.errors["account"][0]);
              setErrModal(true);
            }
          } else {
          }
        })
        .finally(() => {
          setSignUpLoader(false);
        });
    } else {
      setSignUpLoader(false);
    }
  };
  const appleAuthHandler = async () => {
    try {
      setSignUpLoader(true);
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
            setSignUpLoader(false);
            if (data.data.token) {
              setToken(data.data.token);
              AsyncStorage.setItem("@token", JSON.stringify(res.data.token));
            } else {
              navigation.navigate("continueSignup", {
                apple_id: body.user_id,
                email: body.email,
                authToken: credential.identityToken,
                token: expoPushToken,
                isExpert: isExpert,
                formdata: appleFormdata,
                appleLogin: true,
                idToken: credential.identityToken,
                clientId: credential.user,
              });
            }
          })
          .catch((err) => {
            if (err?.response.data) {
              if (
                err.response.data.errors["phone-verified"] &&
                err.response.data.errors["phone-verified"][0] === false
              ) {
                navigation.navigate("otp", {
                  sendOtp: true,
                  phoneVerification: true,
                  facebookLogin: false,
                  continueSignUp: true,
                  googleLogin: false,
                  appleLogin: true,
                  appleId: err.response.data.errors["apple_id"][0],
                });
              } else if (err.response.data.errors["email_or_phone"]) {
                setErrModal(true);
                setExpertModalVisible(true);
                setErrorMessage(err.response.data.errors["email_or_phone"][0]);
              } else {
                setExpertModalVisible(true);
                setErrorMessage(err.response.data.errors["account"][0]);
                setErrModal(true);
              }
            } else {
            }
          })
          .finally(() => {
            setSignUpLoader(false);
          });
      } else {
        setSignUpLoader(false);
      }
    } catch (e) {
      setSignUpLoader(false);

      if (e.code === "ERR_CANCELED") {
      } else {
        if (e.code == "ERR_APPLE_AUTHENTICATION_UNAVAILABLE") {
          setModalTitle(e.code);
          setModalVisible(true);
          return setCompatibilityAlert(true);
        }
      }
    }
  };

  const authHandler = (values) => {
    switch (isExpert) {
      case false:
        handleUserlogin(values);
        break;

      case true:
        handleExpertLogin(values);
        break;

      default:
        break;
    }
  };

  const handleUserlogin = (values) => {
    let mobile = country.callingCode[0] + values.mobile;
    setSignUpLoader(true);
    var formdata = new FormData();
    formdata.append("full_name", values.fullName);
    formdata.append("email", values.email);
    formdata.append("phone_number", mobile);
    formdata.append("password", values.password);
    formdata.append("password_confirmation", values.confirmPassword);
    formdata.append("address", values.location);
    formdata.append("birthday", values.dob);
    formdata.append("notification_token", expoPushToken);
    formdata.append("terms_conditions", toggleCheckBox);

    signUpUser(formdata)
      .then((res) => {
        let fd = new FormData();
        fd.append("email_or_phone", values.email);
        fd.append("password", values.password);
        fd.append("notification_token", expoPushToken);
        setErrorObject({
          errorVisible: false,
        });
        setVerificationTypes({
          email: true,
          phone: true,
        });
        navigation.navigate("otp", {
          email: values.email,
          mobile: values.mobile,
          formdata: fd,
          phoneVerification: true,
          facebookLogin: false,
        });
        setSignUpLoader(false);
      })
      .catch((err) => {
        setSignUpLoader(false);
        setErrorObject({
          errorVisible: true,
          birthdayError:
            err.response.data.errors.birthday &&
            err.response.data.errors.birthday,
          emailError:
            err.response.data.errors.email && err.response.data.errors.email[0],
          fullNameError:
            err.response.data.errors.full_name &&
            err.response.data.errors.full_name[0],
          passwordError:
            err.response.data.errors.password &&
            err.response.data.errors.password[0],
          mobileError:
            err.response.data.errors.phone_number &&
            err.response.data.errors.phone_number[0],
          termsConditionError:
            err.response.data.errors.terms_conditions &&
            err.response.data.errors.terms_conditions[0],
        });
      });
  };
  const handleExpertLogin = (values) => {
    let mobile = country.callingCode[0] + values.mobile;
    setSignUpLoader(true);
    var formdata = new FormData();
    if (values.fullName) {
      formdata.append("full_name", values.fullName);
    }
    if (values.email) {
      formdata.append("email", values.email);
    }
    if (values.mobile) {
      formdata.append("phone_number", mobile);
    }
    if (values.password) {
      formdata.append("password", values.password);
    }
    if (values.confirmPassword) {
      formdata.append("password_confirmation", values.confirmPassword);
    }

    if (experienceValue) {
      formdata.append("experience_domain_id", experienceValue);
    }

    if (experienceType) {
      formdata.append("experience_type_id", experienceType);
    }
    if (values.educationalBackground) {
      formdata.append("educational_background", values.educationalBackground);
    }

    if (yearsOfExperience) {
      formdata.append("years_of_experience_id", yearsOfExperience);
    }
    if (values.fees) {
      formdata.append(
        "consultancy_fee",
        Number(values.fees.split("LBP")[1].replaceAll(",", ""))
      );
    }
    formdata.append("consultancy_fee_currency_id", "1");
    formdata.append("notification_token", expoPushToken);
    formdata.append("terms_conditions", toggleCheckBox);

    expertSignUp(formdata)
      .then((res) => {
        setErrorObject({
          errorVisible: false,
          emailError: null,
          fullNameError: null,
          passwordError: null,
          mobileError: null,
          termsConditionError: null,
          experienceTypeError: null,
          experienceError: null,
          birthdayError: null,
          educationBgError: null,
          experienceYears: null,
          fees: null,
        });
        setSignUpLoader(false);
        setExpertModalVisible(true);
        setErrModal(false);
        // navigation.navigate("otp", {
        //   email: values.mobile,
        //   mobile: values.mobile,
        //   sendOtp: true,
        //   phoneVerification: false,
        //   formdata: formdata,
        //   resetPassword: false,
        //   facebookLogin: false,
        //   phoneVerified: false,
        //   googleLogin: false,
        //   googleId: null,
        //   appleLogin: false,
        //   appleId: false,
        //   mailVerification: true,
        // });

        // setExpertModalVisible(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSignUpLoader(false);
        setErrorObject({
          errorVisible: false,
          emailError:
            err.response.data.errors.email && err.response.data.errors.email[0],
          fullNameError:
            err.response.data.errors.full_name &&
            err.response.data.errors.full_name[0],
          passwordError:
            err.response.data.errors.password &&
            err.response.data.errors.password[0],
          mobileError:
            err.response.data.errors.phone_number &&
            err.response.data.errors.phone_number[0],
          termsConditionError:
            err.response.data.errors.terms_conditions &&
            err.response.data.errors.terms_conditions[0],
          experienceError:
            err.response.data.errors.experience_domain_id &&
            err.response.data.errors.experience_domain_id[0],
          experienceTypeError:
            err.response.data.errors.experience_type_id &&
            err.response.data.errors.experience_type_id[0],
          educationBgError:
            err.response.data.errors.educational_background &&
            err.response.data.errors.educational_background[0],
          experienceYears:
            err.response.data.errors.years_of_experience_id &&
            err.response.data.errors.years_of_experience_id[0],
          fees:
            err.response.data.errors.consultancy_fee &&
            err.response.data.errors.consultancy_fee[0],
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "position" : "height"}
    >
      <View style={styles.container}>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dob: "",
            location: "",
            mobile: "",
            fees: "",
            educationalBackground: "",
            experienceYears: "",
          }}
        >
          {({ handleChange, values }) => (
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
                  style={{ height: SCREEN_HEIGHT }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 64,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={styles.loader}>
                      <ActivityIndicator
                        animating={signUpLoader}
                        color={colors.dark_blue}
                        size="large"
                        hidesWhenStopped={true}
                      />
                    </View>
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
                                {
                                  rotateY: I18nManager.isRTL
                                    ? "0deg"
                                    : "180deg",
                                },
                              ],
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.title}>
                        <Typography
                          content={
                            isExpert
                              ? fixedTitles.authTitles["sign-up-expert"].title
                              : fixedTitles.authTitles["sign-up-user"].title
                          }
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
                              {
                                marginHorizontal: I18nManager.isRTL ? 0 : 20,
                              },
                            ]}
                          ></View>
                        )}
                      </View>
                      <View style={styles.or}>
                        <Typography
                          content={fixedTitles.authTitles["sign-in-or"].title}
                          color={colors.white}
                          size={16}
                          lh={19}
                          align="center"
                        />
                      </View>
                      <View style={styles.form}>
                        {!isExpert ? (
                          <Form
                            handleChange={handleChange}
                            values={values}
                            toggleCheckBox={toggleCheckBox}
                            setToggleCheckBox={setToggleCheckBox}
                            errorObject={errorObject}
                            selectedStartDate={selectedStartDate}
                            setSelectedStartDate={setSelectedStartDate}
                            isCalendar={isCalendar}
                            setIsCalendar={setIsCalendar}
                          />
                        ) : (
                          <ExpertForm
                            handleChange={handleChange}
                            values={values}
                            toggleCheckBox={toggleCheckBox}
                            setToggleCheckBox={setToggleCheckBox}
                            setExperienceValue={setExperienceValue}
                            setExperienceType={setExperienceType}
                            errorObject={errorObject}
                            experience={experience}
                            experienceType={expeienceType}
                            experienceValue={experienceValue}
                            yearsOfExperience={yearsOfExperience}
                            setYearsOfExperience={setYearsOfExperience}
                            yearsOfExperienceArr={yearsOfExperienceArr}
                          />
                        )}
                      </View>
                    </View>
                    <>
                      {errorObject.termsConditionError && (
                        <View
                          style={{
                            width: SCREEN_WIDTH * 0.9,
                            marginHorizontal: 24,
                            marginBottom: 15,
                          }}
                        >
                          <Typography
                            content={errorObject.termsConditionError}
                            color="red"
                            size={12}
                            align="left"
                          />
                        </View>
                      )}
                      <View style={[styles.policy]}>
                        <View>
                          <Checkbox
                            style={styles.checkbox}
                            value={toggleCheckBox}
                            onValueChange={setToggleCheckBox}
                            color={
                              toggleCheckBox
                                ? colors.dark_blue
                                : "rgba(255, 255, 255, 0.6)"
                            }
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => setToggleCheckBox(!toggleCheckBox)}
                          style={{ marginRight: 12 }}
                        >
                          <Typography
                            size={12}
                            color={colors.white}
                            align="left"
                            content={fixedTitles.authTitles["terms"].title}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.button}>
                        <View style={styles.submit}>
                          <WhiteButton
                            size={16}
                            content={fixedTitles.authTitles["sign-up"].title}
                            onPress={() => authHandler(values)}
                          />
                        </View>
                      </View>
                    </>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </LinearGradient>
          )}
        </Formik>
        <MessageModal
          visible={expertModalVisible}
          message={errorMessage}
          title={!errModal && "شكرا لك على التسجيل"}
          desc={
            !errModal &&
            "تم إنشاء ملف التعريف الخاص بك بنجاح. سوف يتم الرد عليك قريبا من قبل عملائنا."
          }
          withButton={errModal ? false : true}
          expert={errModal ? false : true}
          close={() => modalHandler()}
        />
      </View>
    </KeyboardAvoidingView>
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
    marginTop: aspectRatio < 2 ? 24 : SCREEN_HEIGHT * 0.039,
    zIndex: 99999,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginTop: SCREEN_HEIGHT * 0.04,
    marginBottom: 24,
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
    marginBottom: 22,
  },
  form: {
    width: SCREEN_WIDTH,
    flex: 0.2,
  },
  or: {
    marginBottom: 17,
  },
  checkbox: {
    margin: SCREEN_HEIGHT * 0.012,
    marginLeft: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.012,
    width: SCREEN_HEIGHT * 0.012,
    borderWidth: 1,
  },
  policy: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    // alignSelf: "center",
    marginTop: aspectRatio < 2 ? 140 : 24,
    marginHorizontal: 21,
  },
  submit: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginVertical: 24,
  },
  button: {
    width: SCREEN_WIDTH,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT,
    position: "absolute",
    width: SCREEN_WIDTH,
  },
  policy: {
    width: SCREEN_WIDTH * 0.92,
    // marginHorizontal: 12,
    flexDirection: "row",
  },
  arrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? 0 : 14,
    left: 22,
  },
});
