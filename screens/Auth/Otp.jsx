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
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { WhiteButton } from "../../buttons/WhiteButton";
import { RNTextInput } from "../../components/Textinput/TextInput";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { VerifyOTP, VerifySocialOTP } from "../../api/Auth/VerifyOtp";
import AppContext from "../../appContext/AppContext";
import MessageModal from "../../components/Modals/MessageModal";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { requestMailOTP, requestMobileOTP } from "../../api/Auth/RequestOtp";
import { signInUser } from "../../api/Auth/SignIn";
import { verifyOTP } from "../../api/Auth/ResetPassword/ResetPassword";
import { requestSocialOTP } from "../../api/Auth/RequestOtp";
import { authCheckAndLogin } from "../../api/Auth/Socials/Login";
export const Otp = ({ navigation, route }) => {
  const {
    email,
    mobile,
    sendOtp,
    phoneVerification,
    formdata,
    resetPassword,
    facebookLogin,
    phoneVerified,
    googleLogin,
    googleId,
    appleLogin,
    appleId,
    mailVerification,
  } = route.params;

  const { setToken, fixedTitles, setUserName } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState(null);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const resetPasswordHandler = () => {
    if (!resetPassword) return;
    setLoadingOtp(true);

    formdata.append("code", Number(code));
    verifyOTP(formdata)
      .then((res) => {
        setLoadingOtp(false);

        navigation.navigate("newpassword", {
          formdata: formdata,
        });
        console.log(res);
      })
      .catch((err) => {
        setLoadingOtp(false);
        if (err.response.data.errors.code) {
          setIsExpert(false);
          setErrorMessage(err.response.data.errors.code);
          setModalVisible(true);
        }
        console.log(err);
      });
  };

  const loginHandler = () => {
    setLoadingOtp(true);
    if (facebookLogin) {
      authCheckAndLogin("facebook-auth", formdata)
        .then((res) => {
          setLoadingOtp(false);

          setToken(res.data.token);
          console.log(`logged in`);
        })
        .catch((err) => {
          setLoadingOtp(false);
          setModalVisible(true);
          setErrorMessage(err.response.data.errors["email_or_phone"]);
          console.log(err.response.data);
        });
    } else {
      signInUser(formdata)
        .then((res) => {
          setLoadingOtp(false);

          setToken(res.data.token);
          console.log(res);
        })
        .catch((err) => {
          setLoadingOtp(false);
          let error = err.response.data.errors;
          console.log(err.response.data);
          setModalVisible(true);
          setErrorMessage(
            error["email_or_phone"] && error["email_or_phone"][0]
          );
        });
    }
  };

  const requestOtpHandler = () => {
    if (
      phoneVerification &&
      !facebookLogin &&
      !googleLogin &&
      !appleLogin &&
      !mailVerification
    ) {
      requestMobileOTP(email)
        .then((res) => {
          console.log("verify mobile otp has been sent to ", email);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else if (facebookLogin) {
      //email == facebook
      requestSocialOTP(email, "facebook")
        .then((res) => {
          console.log("OTp sent to ", email);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (googleLogin) {
      requestSocialOTP(googleId, "google")
        .then((res) => {
          console.log("OTp sent to ", googleId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (appleLogin) {
      console.log("sending apple otp");
      requestSocialOTP(appleId, "apple")
        .then((res) => {
          console.log("OTp sent to ", appleId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    if (!sendOtp) return;
    console.log("sending OTP");
    requestOtpHandler();
  }, []);

  const verifyOtpHandler = () => {
    if (!resetPassword) {
      setLoadingOtp(true);
      var formdata = new FormData();
      let otpCode = Number(code);

      if (
        !phoneVerification &&
        !facebookLogin &&
        !googleId &&
        !appleLogin &&
        !mailVerification
      ) {
        formdata.append("email_or_phone", email);
        formdata.append("phone_verification_token", otpCode);
      } else if (facebookLogin && !googleLogin && !appleLogin) {
        formdata.append("phone_verification_token", otpCode);
        formdata.append("facebook_id", email);
      } else if (googleLogin) {
        formdata.append("phone_verification_token", otpCode);
        formdata.append("google_id", googleId);
      } else if (appleLogin) {
        formdata.append("apple_id", appleId);
        formdata.append("phone_verification_token", otpCode);
      } else {
        formdata.append("email_or_phone", email);
        formdata.append("phone_verification_token", otpCode);
      }
      VerifyOTP(formdata, "phone")
        .then((res) => {
          // setLoadingOtp(false);
          otpCode = null;
          setCode(null);
          console.log(res.data);

          console.log(res.data.token);
          if (res.data.token) {
            if (res.data.user.is_expert === 1) {
              if (res.data.user.expert_approved !== null) {
                setToken(res.data.token);
              } else {
                setIsExpert(true);
                setModalVisible(true);
              }
            } else {
              setToken(res.data.token);
              setUserName(res.data.user.full_name);
            }
          }
        })
        .catch((err) => {
          setLoadingOtp(false);

          otpCode = null;
          setCode(null);
          setErrorMessage(
            (err.response.data.errors?.email_verification_token &&
              err.response.data.errors?.email_verification_token[0]) ||
              (err.response.data.errors?.phone_verification_token &&
                err.response.data.errors?.phone_verification_token[0])
          );

          setModalVisible(true);
          // console.log(err.response.data);
        });
    } else {
      console.log("Verifying OTP please wait !");
      resetPasswordHandler();
    }
  };

  const closeModalHandler = () => {
    setLoadingOtp(false);
    if (!isExpert) {
      setModalVisible(false);
    } else {
      setModalVisible(false);
      navigation.navigate("login");
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
          <ScrollView style={{ height: SCREEN_HEIGHT }}>
            <View style={styles.loader}>
              <ActivityIndicator
                animating={loadingOtp}
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
                  <TouchableOpacity onPress={() => navigation.pop()}>
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
              <View style={styles.body}>
                <View style={styles.title}>
                  <Typography
                    content={
                      fixedTitles.authTitles["enter-your-verification-token"]
                        .title
                    }
                    color={colors.white}
                    size={20}
                    bold={true}
                  />
                </View>
                <View style={styles.subtitle}>
                  <Typography
                    size={16}
                    content={fixedTitles.authTitles["otp-desc"].title}
                    color={colors.white}
                    align="center"
                  />
                </View>
                <View style={styles.otpBox}>
                  <OTPInputView
                    style={{ width: "70%", height: 140 }}
                    pinCount={4}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={(code) => {
                      setCode(code);
                    }}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                  />
                </View>
                <View style={styles.submit}>
                  <WhiteButton
                    size={16}
                    content={fixedTitles.authTitles["verify"].title}
                    onPress={() => verifyOtpHandler()}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
            <MessageModal
              visible={modalVisible}
              message={errorMessage || "Something went wrong"}
              close={() => closeModalHandler()}
              expert={isExpert}
              title="شكرا لك على التسجيل"
              desc="تم إنشاء ملف التعريف الخاص بك بنجاح. سوف يتم الرد عليك قريبا من قبل عملائنا."
              withButton={isExpert}
            />
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
    marginTop: SCREEN_HEIGHT * 0.04,
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
    marginBottom: SCREEN_HEIGHT * 0.014,
  },
  subtitle: {
    marginBottom: SCREEN_HEIGHT * 0.0365,
    width: SCREEN_WIDTH * 0.9,
  },
  submit: {
    marginTop: SCREEN_HEIGHT * 0.0365,
  },
  otpBox: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  underlineStyleBase: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_HEIGHT * 0.049,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    fontFamily: "HelveticaRegular",
    borderColor: "rgba(255,255,255,0.2)",
  },
  arrow: {
    position: "absolute",
    top: 0,
    right: 22,
    width: 40,
    height: 40,
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
