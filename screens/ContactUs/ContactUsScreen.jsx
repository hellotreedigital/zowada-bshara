import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  I18nManager,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { MapStyle } from "../../components/LocationBox/MapStyle";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import AppContext from "../../appContext/AppContext";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { contactUs } from "../../api/infomativeApi";

const Input = ({
  placeholder,
  multi,
  value,
  handleChange,
  button,
  press,
  image,
  number,
  fundingMedia,
  multiImage,
}) => {
  return (
    <>
      <TextInput
        multiline={multi ? true : false}
        placeholderTextColor={colors.dark_blue}
        style={[styles.textinput, multi && styles.multi]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        autoCorrect={false}
        keyboardType={number ? "number-pad" : "default"}
      />
    </>
  );
};

export const ContactUsScreen = ({ navigation }) => {
  const { fixedTitles, userData } = useContext(AppContext);
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];

  const [fullName, setFullName] = useState(userData?.full_name);
  const [email, setEmail] = useState(userData?.email);

  const [about, setAbout] = useState(null);
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [aboutError, setAboutError] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const handleSubmit = () => {
    setNameError(null);
    setEmailError(null);
    setAboutError(null);
    setMessageError(null);

    setLoading(true);
    let formdata = new FormData();

    formdata.append("name", fullName);
    formdata.append("email", email);
    if (about) {
      formdata.append("subject", about);
    }
    if (message) {
      formdata.append("message", message);
    }
    contactUs(formdata)
      .then((res) => {
        console.log(res);
        navigation.pop();
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email);
        }
        if (err.response.data.errors.message) {
          setMessageError(err.response.data.errors.message);
        }
        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name);
        }
        if (err.response.data.errors.subject) {
          setAboutError(err.response.data.errors.subject);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.focused}
          animating={loading}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavio={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <Header
            navigation={navigation}
            title={fixedTitles.contactTitles["contact-us"].title}
            red
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View style={{ marginHorizontal: 20 }}>
              <View>
                <RenderHTML
                  source={{
                    html: fixedTitles.contactTitles["contact-us"].text,
                  }}
                  contentWidth={SCREEN_WIDTH}
                  tagsStyles={{
                    p: {
                      fontFamily: "HelveticaLight",
                      fontSize: SCREEN_HEIGHT * 0.019,
                      color: colors.dark_blue,
                      textAlign: "left",
                      lineHeight: 24,
                      paddingHorizontal: 20,
                    },
                  }}
                  systemFonts={systemFonts}
                />
              </View>
              <View pointerEvents="none" style={styles.mapBox}>
                <MapView
                  initialRegion={{
                    latitude: 33.7844816,
                    longitude: 35.4786915,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  customMapStyle={MapStyle}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                />
              </View>
              <View>
                <View>
                  <Typography
                    content={
                      fixedTitles.contactTitles["send-us-a-message"].title
                    }
                    align="left"
                    size={16}
                    bold
                    color={colors.focused}
                  />
                </View>
                <View>
                  <>
                    <Input
                      handleChange={(text) => setFullName(text)}
                      value={fullName}
                      placeholder={fixedTitles.contactTitles["full-name"].title}
                    />
                    {nameError && (
                      <View>
                        <Typography
                          content={nameError}
                          color="red"
                          align="left"
                        />
                      </View>
                    )}
                  </>
                  <>
                    <Input
                      handleChange={(text) => setEmail(text)}
                      value={email}
                      placeholder={
                        fixedTitles.contactTitles["email-address"].title
                      }
                    />
                    {emailError && (
                      <View>
                        <Typography
                          content={emailError}
                          color="red"
                          align="left"
                        />
                      </View>
                    )}
                  </>
                  <>
                    <Input
                      handleChange={(text) => setAbout(text)}
                      value={about}
                      placeholder={fixedTitles.contactTitles["about"].title}
                    />
                    {aboutError && (
                      <View>
                        <Typography
                          content={aboutError}
                          color="red"
                          align="left"
                        />
                      </View>
                    )}
                  </>
                  <>
                    <Input
                      handleChange={(text) => setMessage(text)}
                      value={message}
                      multi
                      placeholder={fixedTitles.contactTitles["message"].title}
                    />
                    {messageError && (
                      <View>
                        <Typography
                          content={messageError}
                          color="red"
                          align="left"
                        />
                      </View>
                    )}
                  </>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.button}
                >
                  <Typography
                    content={fixedTitles.contactTitles["send"].title}
                    size={16}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Typography
                  content={fixedTitles.contactTitles["follow-us"].title}
                  align="center"
                  color={colors.focused}
                  size={16}
                  bold
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    height: SCREEN_HEIGHT * 0.4,
  },
  mapBox: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 20,
  },
  textinput: {
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    top: 4,
  },
  multi: {
    height: 137,
    textAlignVertical: "top",
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 20,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});
