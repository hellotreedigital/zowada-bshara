import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WhiteButton } from "../../buttons/WhiteButton";
import { RNTextInput } from "../../components/Textinput/TextInput";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { Formik } from "formik";
import { signUpUser } from "../../api/Auth/SignUp";
import { expertAuth, userAuth } from "../../api/Auth/Socials/CheckAuth";
import ModalDropdown from "react-native-modal-dropdown";
import MessageModal from "../../components/Modals/MessageModal";
import AppContext from "../../appContext/AppContext";
import PhonePicker from "../../components/PhonePicker/PhonePicker";

export const ContinueSignup = ({ navigation, route }) => {
  const { fixedTitles, country } = useContext(AppContext);

  const Experience = ["test", "test2", "نوع الخبرة"];

  const {
    email,
    expoPushToken,
    name,
    facebook_id,
    access_token,
    isExpert,
    formdata,
    idToken,
    clientId,
    googleAuth,
    appleLogin,
    googleId,
  } = route.params;

  const [experienceValue, setExperienceValue] = React.useState(0);
  const [experienceType, setExperienceType] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [expertModalVisible, setExpertModalVisible] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorObject, setErrorObject] = React.useState({
    errorVisible: false,
    feeError: null,
    mobileError: null,
    educationError: null,
    experienceError: null,
  });

  const modalHandler = () => {
    if (!errModal) {
      setExpertModalVisible(false);
      navigation.navigate("login");
    } else {
      setExpertModalVisible(false);
      navigation.navigate("login");
    }
  };

  const continueSignupUser = (mobile, fullName) => {
    let phoneNumber = country.callingCode[0] + mobile;

    if (!googleAuth && !appleLogin) {
      setLoading(true);
      var formdata = new FormData();
      formdata.append("facebook_id", facebook_id);
      formdata.append("phone_number", phoneNumber);
      formdata.append("access_token", access_token);
      formdata.append("terms_conditions", true);
      formdata.append("notification_token", expoPushToken);
      userAuth("facebook-auth", formdata)
        .then((res) => {
          console.log(res);
          setLoading(false);
          navigation.navigate("otp", {
            email: facebook_id,
            phone: facebook_id,
            sendOtp: false,
            phoneVerification: true,
            formdata: formdata,
            resetPassword: false,
            facebookLogin: true,
            phoneVerified: false,
            continueSignUp: true,
          });
        })
        .catch((err) => {
          setLoading(false);
          if (
            err.response.data.errors["phone-verified"] &&
            err.response.data.errors["phone-verified"][0] === false
          ) {
            navigation.navigate("otp", {
              email: facebook_id,
              phone: facebook_id,
              sendOtp: true,
              phoneVerification: true,
              formdata: formdata,
              resetPassword: false,
              facebookLogin: true,
              phoneVerified: false,
              continueSignUp: true,
            });
          }

          setErrorObject({
            errorVisible: true,
            emailError:
              err.response.data.errors.email &&
              err.response.data.errors.email[0],
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
    } else if (googleAuth) {
      let phoneNumber = country.callingCode[0] + mobile;

      let googleFormData = new FormData();
      googleFormData.append("phone_number", phoneNumber);
      googleFormData.append("id_token", idToken);
      googleFormData.append("client_id", clientId);
      googleFormData.append("terms_conditions", true);

      googleFormData.append("notification_token", expoPushToken);
      userAuth("google-auth", googleFormData)
        .then((res) => {
          console.log(`res:`, res);
          setLoading(false);
          navigation.navigate("otp", {
            email: clientId,
            phone: clientId,
            sendOtp: false,
            phoneVerification: true,
            formdata: formdata,
            resetPassword: false,
            facebookLogin: false,
            phoneVerified: false,
            continueSignUp: true,
            googleLogin: true,
            googleId: res.data.user.google_id,
          });
        })
        .catch((err) => {
          if (
            err.response.data.errors["phone-verified"] &&
            err.response.data.errors["phone-verified"] === false
          ) {
            navigation.navigate("otp", {
              email,
              mobile,
              sendOtp: false,
              phoneVerification: true,
              formdata,
              resetPassword: false,
              facebookLogin: false,
              phoneVerified,
              googleLogin: true,
              appleLogin: false,
              appleId: false,
              mailVerification: false,
              googleId: err.response.data.errors["google_id"][0],
            });
          }

          setLoading(false);
          console.log(err.response.data);
          setErrorObject({
            errorVisible: true,
            emailError:
              err.response.data.errors.email &&
              err.response.data.errors.email[0],
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
          console.log(err);
        });
    } else if (appleLogin) {
      let phoneNumber = country.callingCode[0] + mobile;

      let appleFormdata = new FormData();
      appleFormdata.append("phone_number", phoneNumber);
      appleFormdata.append("id_token", idToken);
      appleFormdata.append("user_id", clientId);
      appleFormdata.append("full_name", fullName);
      appleFormdata.append("terms_conditions", true);

      appleFormdata.append("notification_token", expoPushToken);
      userAuth("apple-auth", appleFormdata)
        .then((res) => {
          console.log(res);
          setLoading(false);
          navigation.navigate("otp", {
            email: clientId,
            phone: clientId,
            sendOtp: false,
            phoneVerification: true,
            formdata: formdata,
            resetPassword: false,
            facebookLogin: false,
            phoneVerified: false,
            continueSignUp: true,
            googleLogin: false,
            appleLogin: true,
            appleId: res.data.user.apple_id,
          });
        })
        .catch((err) => {
          setErrorObject({
            errorVisible: true,
            fullNameError:
              err.response.data.errors.full_name &&
              err.response.data.errors.full_name[0],
            mobileError:
              err.response.data.errors.phone_number &&
              err.response.data.errors.phone_number[0],
          });
          console.log(err.repsonse.data);
        });
    }
  };

  const continueSignUpExpert = (
    mobile,
    fees,
    educationalBg,
    yearsOfExperience,
    fullName
  ) => {
    const [yearsOfExperienceID, setYearsOfExperienceId] = useState();

    setLoading(true);
    if (!googleAuth && !appleLogin) {
      let phoneNumber = country.callingCode[0] + mobile;

      setLoading(true);
      var formdata = new FormData();
      formdata.append("access_token", access_token);
      formdata.append("facebook_id", facebook_id);
      formdata.append("phone_number", phoneNumber);
      formdata.append("notification_token", expoPushToken);
      formdata.append("experience_domain_id", experienceValue);
      formdata.append("experience_type_id", experienceType);
      formdata.append("educational_background", educationalBg);
      formdata.append("years_of_experience_id", yearsOfExperienceID);
      formdata.append("consultancy_fee", fees);
      formdata.append("consultancy_fee_currency_id", "1");
      formdata.append("terms_conditions", true);
      expertAuth("facebook-auth", formdata)
        .then((res) => {
          setExpertModalVisible(true);
          setLoading(false);
          // navigation.navigate("otp", {
          //   email: facebook_id,
          //   phone: facebook_id,
          //   sendOtp: true,
          //   phoneVerification: false,
          //   formdata: formdata,
          //   resetPassword: false,
          //   facebookLogin: true,
          //   phoneVerified: null,
          // });
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.errors["email_or_phone"]) {
            setErrModal(true);
            setErrorMessage(err.response.data.errors["email_or_phone"][0]);
            setExpertModalVisible(true);
          }
          setErrorObject({
            errorVisible: true,
            feeError:
              err.response.data.errors["consultancy_fee"] &&
              err.response.data.errors["consultancy_fee"][0],
            fullNameError:
              err.response.data.errors.full_name &&
              err.response.data.errors.full_name[0],
            educationError:
              err.response.data.errors.educational_background &&
              err.response.data.errors.educational_background[0],
            mobileError:
              err.response.data.errors.phone_number &&
              err.response.data.errors.phone_number[0],
            experienceError:
              err.response.data.errors.years_of_experience_id &&
              err.response.data.errors.years_of_experience_id[0],
          });
          console.log(err.response.data);
        });
    } else if (googleAuth) {
      let phoneNumber = country.callingCode[0] + mobile;

      setErrorObject({
        errorVisible: false,
      });

      let googleFormData = new FormData();
      googleFormData.append("access_token", access_token);
      googleFormData.append("client_id", clientId);
      googleFormData.append("id_token", idToken);
      googleFormData.append("phone_number", phoneNumber);
      googleFormData.append("notification_token", expoPushToken);
      googleFormData.append("experience_domain_id", experienceValue);
      googleFormData.append("experience_type_id", experienceType);
      googleFormData.append("educational_background", educationalBg);
      googleFormData.append("years_of_experience_id", yearsOfExperienceID);
      googleFormData.append("terms_conditions", true);
      googleFormData.append("consultancy_fee", fees);
      googleFormData.append("consultancy_fee_currency_id", "1");
      expertAuth("google-auth", googleFormData)
        .then((res) => {
          setExpertModalVisible(true);
          setLoading(false);
          // navigation.navigate("otp", {
          //   email: clientId,
          //   phone: clientId,
          //   sendOtp: true,
          //   phoneVerification: true,
          //   formdata: formdata,
          //   resetPassword: false,
          //   facebookLogin: false,
          //   phoneVerified: false,
          //   continueSignUp: true,
          //   googleLogin: true,
          //   googleId: res.data.user.google_id,
          // });
        })
        .catch((err) => {
          if (err.response.data.errors["email_or_phone"]) {
            setErrModal(true);
            setErrorMessage(err.response.data.errors["email_or_phone"][0]);
            setExpertModalVisible(true);
          }

          setLoading(false);
          console.log(err.response.data);
          setErrorObject({
            errorVisible: true,
            feeError:
              err.response.data.errors["consultancy_fee"] &&
              err.response.data.errors["consultancy_fee"][0],
            fullNameError:
              err.response.data.errors.full_name &&
              err.response.data.errors.full_name[0],
            educationError:
              err.response.data.errors.educational_background &&
              err.response.data.errors.educational_background[0],
            mobileError:
              err.response.data.errors.phone_number &&
              err.response.data.errors.phone_number[0],
            experienceError:
              err.response.data.errors.years_of_experience_id &&
              err.response.data.errors.years_of_experience_id[0],
          });
        });
    } else if (appleLogin) {
      console.log("apple id ");
      let phoneNumber = country.callingCode[0] + mobile;

      let appleFormdata = new FormData();

      appleFormdata.append("id_token", idToken);
      appleFormdata.append("user_id", clientId);
      appleFormdata.append("full_name", fullName);
      appleFormdata.append("consultancy_fee", fees);
      appleFormdata.append("educational_background", educationalBg);
      appleFormdata.append("experience_domain_id", experienceValue);
      appleFormdata.append("experience_type_id", experienceType);
      appleFormdata.append("phone_number", phoneNumber);
      appleFormdata.append("years_of_experience_id", yearsOfExperienceID);
      appleFormdata.append("notification_token", expoPushToken);
      appleFormdata.append("terms_conditions", true);

      expertAuth("apple-auth", appleFormdata)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setExpertModalVisible(true);
          // navigation.navigate("otp", {
          //   email: clientId,
          //   phone: clientId,
          //   sendOtp: true,
          //   phoneVerification: true,
          //   formdata: appleFormdata,
          //   resetPassword: false,
          //   facebookLogin: false,
          //   phoneVerified: false,
          //   continueSignUp: true,
          //   googleLogin: false,
          //   appleLogin: true,
          //   appleId: res.data.user.apple_id,
          // });
        })
        .catch((err) => {
          setLoading(true);
          if (err.response.data.errors["email_or_phone"]) {
            setErrModal(true);
            setErrorMessage(err.response.data.errors["email_or_phone"][0]);
            setExpertModalVisible(true);
          }
          setErrorObject({
            errorVisible: true,
            fullNameError:
              err.response.data.errors.full_name &&
              err.response.data.errors.full_name[0],
            feeError:
              err.response.data.errors["consultancy_fee"] &&
              err.response.data.errors["consultancy_fee"][0],
            educationError:
              err.response.data.errors.educational_background &&
              err.response.data.errors.educational_background[0],
            mobileError:
              err.response.data.errors.phone_number &&
              err.response.data.errors.phone_number[0],
            experienceError:
              err.response.data.errors.years_of_experience_id &&
              err.response.data.errors.years_of_experience_id[0],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  let yearsOfExperienceArr = [];
  React.useEffect(() => {
    fixedTitles.yearsExp.map((data) => {
      yearsOfExperienceArr.push(data.title);
    });
  }, [experienceType, yearsOfExperienceArr]);

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
                animating={loading}
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
              <View style={styles.body}>
                {/* <View style={styles.title}>
                  <Typography
                    content="هل نسيت كلمة المرور؟"
                    color={colors.white}
                  />
                </View> */}
                <View style={styles.subtitle}>
                  <Typography
                    content={fixedTitles.authTitles["continue-sign-up"].title}
                    color={colors.white}
                    size={20}
                    bold={true}
                  />
                </View>
                <Formik
                  initialValues={{
                    mobile: "",
                    educationalBackground: "",
                    fees: "",
                    experienceYears: "",
                    fullName: "",
                  }}
                  onSubmit={(values) => console.log(values)}
                >
                  {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                      {!isExpert ? (
                        <>
                          <View>
                            {appleLogin && (
                              <View style={{ marginBottom: 15 }}>
                                <RNTextInput
                                  value={values.fullName}
                                  placeholder={
                                    fixedTitles.authTitles["full-name"].title
                                  }
                                  type="default"
                                  handleChange={handleChange("fullName")}
                                  isError={errorObject.errorVisible}
                                  error={errorObject.fullNameError}
                                />
                              </View>
                            )}
                            <>
                              <RNTextInput
                                value={values.mobile}
                                placeholder={
                                  fixedTitles.authTitles["phone-number"].title
                                }
                                type="number-pad"
                                handleChange={handleChange("mobile")}
                                isError={errorObject.errorVisible}
                                error={errorObject.mobileError}
                              />
                              <View style={{ position: "absolute", right: 0 }}>
                                <PhonePicker />
                              </View>
                            </>
                          </View>
                          <View style={styles.submit}>
                            <WhiteButton
                              size={16}
                              onPress={() =>
                                continueSignupUser(
                                  values.mobile,
                                  values.fullName
                                )
                              }
                              content={fixedTitles.authTitles["submit"].title}
                            />
                          </View>
                        </>
                      ) : (
                        <>
                          {appleLogin && (
                            <View style={{ marginBottom: 15 }}>
                              <RNTextInput
                                value={values.fullName}
                                placeholder={
                                  fixedTitles.authTitles["full-name"].title
                                }
                                type="default"
                                handleChange={handleChange("fullName")}
                                isError={errorObject.errorVisible}
                                error={errorObject.fullNameError}
                              />
                            </View>
                          )}
                          <View style={{ marginBottom: 15 }}>
                            <RNTextInput
                              value={values.mobile}
                              placeholder={
                                fixedTitles.authTitles["phone-number"].title
                              }
                              type="number-pad"
                              handleChange={handleChange("mobile")}
                              isError={errorObject.errorVisible}
                              error={errorObject.mobileError}
                            />
                          </View>
                          <ModalDropdown
                            options={Experience}
                            dropdownStyle={styles.dropdownStyles}
                            isFullWidth
                            showsVerticalScrollIndicator
                            style={styles.containerStyles}
                            textStyle={styles.label}
                            defaultValue={
                              fixedTitles.authTitles["experience"].title
                            }
                            onSelect={(item) => {
                              setExperienceValue(item);
                            }}
                            renderRowText={(item) => {
                              return (
                                <View
                                  style={{
                                    alignItems: "flex-start",
                                    paddingHorizontal: 6,
                                  }}
                                >
                                  <Typography
                                    size={12}
                                    content={item}
                                    align="right"
                                    color={colors.dark_blue}
                                  />
                                </View>
                              );
                            }}
                            renderSeparator={() => <View />}
                            renderRowComponent={TouchableOpacity}
                            keyboardShouldPersistTaps="handled"
                            renderRightComponent={() => {
                              return <View style={styles.arrowContainer} />;
                            }}
                          />
                          <ModalDropdown
                            options={Experience}
                            dropdownStyle={styles.dropdownStyles}
                            isFullWidth
                            showsVerticalScrollIndicator
                            style={styles.containerStyles}
                            textStyle={styles.label}
                            defaultValue={
                              fixedTitles.authTitles["experience-type"].title
                            }
                            onSelect={(item) => {
                              setExperienceType(item);
                            }}
                            renderRowText={(item) => {
                              return (
                                <View
                                  style={{
                                    alignItems: "flex-start",
                                    paddingHorizontal: 6,
                                  }}
                                >
                                  <Typography
                                    size={12}
                                    content={item}
                                    align="right"
                                    color={colors.dark_blue}
                                  />
                                </View>
                              );
                            }}
                            renderSeparator={() => <View />}
                            renderRowComponent={TouchableOpacity}
                            keyboardShouldPersistTaps="handled"
                            renderRightComponent={() => {
                              return <View style={styles.arrowContainer} />;
                            }}
                          />
                          <RNTextInput
                            placeholder={
                              fixedTitles.authTitles["fees15-mins"].title
                            }
                            spacing={true}
                            spacingVal={15}
                            type={"number-pad"}
                            password={false}
                            handleChange={handleChange("fees")}
                            value={values.fees}
                            isError={errorObject.errorVisible}
                            error={errorObject.feeError}
                          />
                          <RNTextInput
                            placeholder={
                              fixedTitles.authTitles["educational-background"]
                                .title
                            }
                            spacing={true}
                            spacingVal={15}
                            type={"default"}
                            password={false}
                            handleChange={handleChange("educationalBackground")}
                            value={values.educationalBackground}
                            error={errorObject.educationError}
                            isError={errorObject.errorVisible}
                          />
                          {/* <RNTextInput
                            placeholder={
                              fixedTitles.authTitles["years-of-experience"]
                                .title
                            }
                            spacing={true}
                            spacingVal={15}
                            type={"number-pad"}
                            password={false}
                            handleChange={handleChange("experienceYears")}
                            value={values.experienceYears}
                            error={errorObject.experienceError}
                            isError={errorObject.errorVisible}
                          /> */}
                          <>
                            <ModalDropdown
                              options={yearsOfExperienceArr}
                              dropdownStyle={styles.dropdownStyles}
                              isFullWidth
                              showsVerticalScrollIndicator={false}
                              style={styles.containerStyles}
                              textStyle={styles.label}
                              defaultValue={
                                fixedTitles.authTitles["years-of-experience"]
                                  .title
                              }
                              onSelect={(item) => {
                                setYearsOfExperienceId(item + 1);
                              }}
                              renderRowText={(item) => {
                                return (
                                  <View
                                    style={{
                                      alignItems: "flex-start",
                                      paddingHorizontal: 6,
                                    }}
                                  >
                                    <Typography
                                      size={12}
                                      content={item}
                                      align="right"
                                      color={colors.dark_blue}
                                    />
                                  </View>
                                );
                              }}
                              renderSeparator={() => <View />}
                              renderRowComponent={TouchableOpacity}
                              keyboardShouldPersistTaps="handled"
                              renderRightComponent={() => {
                                return <View style={styles.arrowContainer} />;
                              }}
                            />
                          </>
                          <View style={styles.submit}>
                            <WhiteButton
                              size={16}
                              onPress={() =>
                                continueSignUpExpert(
                                  values.mobile,
                                  values.fees,
                                  values.educationalBackground,
                                  values.experienceYears,
                                  values.fullName
                                )
                              }
                              content={fixedTitles.authTitles["submit"].title}
                            />
                          </View>
                        </>
                      )}
                    </>
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
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 30,
  },
  submit: {
    marginTop: 30,
  },
  dropdownStyles: {
    backgroundColor: "white",
    height: 70,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  containerStyles: {
    width: SCREEN_WIDTH * 0.9,
    textAlign: "right",
    // paddingLeft: 15,
    paddingBottom: 8,
    paddingTop: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginBottom: 14,
  },
  label: {
    color: colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT,
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
