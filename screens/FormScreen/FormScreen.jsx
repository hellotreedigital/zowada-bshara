import React, { useContext } from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { editUser } from "../../api/Profile/Profile";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { Formik } from "formik";
import AppContext from "../../appContext/AppContext";

const CustomTextBox = ({
  placeholder,
  multiline,
  secure,
  editable,
  value,
  values,
  handleChange,
  slug,
  navigation,
  setUserName,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[
          styles.textinput,
          multiline && { height: SCREEN_HEIGHT * 0.19 },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.dark_blue}
        placeholderStyle={styles.placeholderStyle}
        multiline={multiline}
        secureTextEntry={secure}
        editable={editable}
        onChangeText={handleChange(value?.toString() || "userName")}
        value={values.value}
      />
    </View>
  );
};

const FormScreen = ({ navigation, route }) => {
  const { setUserName } = useContext(AppContext);
  const { bookingType, editProfile, profileForm } = route.params;
  const [loader, setLoader] = React.useState(false);
  const FREE_DATA = [
    {
      id: "0",
      placeholder: "الاسم القضية",
      multi: false,
      slug: "caseName",
    },
    {
      id: "1",
      placeholder: "البريد الإلكتروني",
      multi: false,
      slug: "email",
    },
    {
      id: "2",
      placeholder: "موضوع الاستفسار",
      multi: false,
      slug: "about",
    },
    {
      id: "3",
      placeholder: "وصف الاستفسار",
      multi: true,
      slug: "desc",
    },
  ];
  const PAID_DATA = [
    {
      id: "0",
      placeholder: "الاسم القضية",
      multi: false,
      slug: "caseName",
    },
    {
      id: "1",
      placeholder: "البريد الإلكتروني",
      multi: false,
      slug: "email",
    },
    {
      id: "2",
      Dropdown: true,
      placeholder: "نوع الاجتماع",
      multi: false,
      slug: "dropdown",
    },
    {
      id: "3",
      placeholder: "موقع",
      multi: false,
      slug: "location",
    },
    {
      id: "4",
      placeholder: "موضوع الاستفسار",
      multi: false,
      slug: "about",
    },
    {
      id: "5",
      placeholder: "وصف الاستفسار",
      multi: true,
      slug: "desc",
    },
  ];

  const editProfileHandler = (userName, about, oldPass, pass, newPass) => {
    setLoader(true);
    var formdata = new FormData();
    formdata.append("full_name", userName);
    formdata.append("old_password", oldPass);
    formdata.append("password", pass);
    formdata.append("password_confirmation", newPass);

    editUser(formdata)
      .then((res) => {
        setLoader(false);
        setUserName(userName);
        navigation.goBack();
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.data);
      });
  };

  const submitFormHandler = (userName, about, oldPass, pass, newPass) => {
    if (editProfile) {
      editProfileHandler(userName, about, oldPass, pass, newPass);
    } else {
      navigation.navigate("termsConditions");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ height: SCREEN_HEIGHT }}
      >
        <View style={styles.header}>
          <View style={styles.spacing}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowSVG
                fill={editProfile ? colors.focused : colors.dark_yellow}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Typography
              content={editProfile ? "تعديل الملف الشخصي" : "املأ قضيتك"}
              color={editProfile ? colors.focused : colors.dark_yellow}
              size={20}
              align="left"
              bold={true}
            />
          </View>
        </View>
        <Formik
          initialValues={{
            userName: "1231321",
            email: "",
            mobile: "",
            about: "",
            oldPassword: "",
            password: "",
            newPassword: "",
          }}
        >
          {({ handleChange, values }) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.loader}>
                <ActivityIndicator
                  animating={loader}
                  size="large"
                  color={colors.dark_blue}
                />
              </View>
              <View style={styles.form}>
                {!editProfile ? (
                  <>
                    {bookingType === "free" ? (
                      <>
                        {FREE_DATA.map((data, index) => (
                          <CustomTextBox
                            key={index.toString()}
                            multiline={data.multiline}
                            placeholder={data.placeholder}
                            multiline={data.multi}
                            handleChange={handleChange}
                            value={data.slug}
                            values={values}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {PAID_DATA.map((data, index) => (
                          <CustomTextBox
                            multiline={data.multiline}
                            key={index.toString()}
                            placeholder={data.placeholder}
                            multiline={data.multi}
                            handleChange={handleChange}
                            value={data.slug}
                            values={values}
                          />
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {profileForm.map((data, index) => (
                      <CustomTextBox
                        multiline={data.multiline}
                        key={index.toString()}
                        placeholder={data.placeholder}
                        multiline={data.multi}
                        secure={data.secure}
                        editable={data.editable}
                        value={data.slug}
                        values={values}
                        handleChange={handleChange}
                        navigation={navigation}
                        setUserName={setUserName}
                      />
                    ))}
                  </>
                )}
              </View>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    submitFormHandler(
                      values.userName,
                      values.about,
                      values.oldPassword,
                      values.password,
                      values.newPassword
                    );
                  }}
                >
                  <Typography
                    content={editProfile ? "حفظ" : "إرسل"}
                    align="center"
                    color={colors.dark_blue}
                    roman={true}
                    color={colors.white}
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT * 0.028,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  spacing: {
    marginRight: 10,
    marginBottom: 3,
  },
  textInputContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 15,
  },
  textinput: {
    width: "100%",
    backgroundColor: "#F2F5F6",
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.dark_blue,
  },
  placeholderStyle: {},
  wrapper: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    marginTop: 15,
    elevation: 5,
  },
  loader: {
    position: "absolute",
    right: "50%",
    zIndex: 10000,
    top: "40%",
  },
});
