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
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { editUser } from "../../api/Profile/Profile";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { Formik } from "formik";
import AppContext from "../../appContext/AppContext";
import {
  validateNewCase,
  bookNewCase,
  reopenCase,
} from "../../api/Booking/Booking";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import { CenteredModal } from "../../components/Modals/CenterModal/CenteredModal";
import { getUserData } from "../../api/Userinfo/UserInformation";
import { useEffect } from "react";
import numeral from "numeral";
import LocationBox from "../../components/LocationBox/LocationBox";

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
  meetingType,
  caseNameError,
  emailError,
  aboutError,
  subjectError,
  locationError,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[
          styles.textinput,
          multiline && { height: SCREEN_HEIGHT * 0.19 },

          {
            display: meetingType == 1 && value == "location" ? "none" : "flex",
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.dark_blue}
        placeholderStyle={styles.placeholderStyle}
        multiline={multiline}
        secureTextEntry={secure}
        editable={editable}
        onChangeText={handleChange(value?.toString() || "userName")}
        value={values[value]}
        textAlignVertical={"top"}
      />
      {value === "email" && emailError && (
        <View>
          <Typography content={emailError} color="red" align="left" />
        </View>
      )}
      {value === "caseName" && caseNameError && (
        <View>
          <Typography content={caseNameError} color="red" align="left" />
        </View>
      )}
      {value === "about" && aboutError && (
        <View>
          <Typography content={aboutError} color="red" align="left" />
        </View>
      )}
      {value === "subject" && subjectError && (
        <View>
          <Typography content={subjectError} color="red" align="left" />
        </View>
      )}
      {value === "location" && locationError && (
        <View
          style={{
            display: meetingType == 1 && value == "location" ? "none" : "flex",
          }}
        >
          <Typography content={locationError} color="red" align="left" />
        </View>
      )}
    </View>
  );
};

const FormScreen = ({ navigation, route }) => {
  const {
    setUserName,
    temrsAccepted,
    setTermAccepted,
    fixedTitles,
    setCanBookForFree,
    userData,
    userName,
    setUserData,
    setProfilePic,
    price,
    setPrice,
    setUserId,
    customMap,
    address,
  } = useContext(AppContext);

  const {
    bookingType,
    editProfile,
    profileForm,
    date,
    time,
    expert_id,
    data,
    range,
    reopen,
    case_id,
  } = route.params;
  let hours = time?.[0]?.from?.split(":")[0];
  let mins = time?.[0].from?.split(":")[1];
  let toHours = time?.[0].to.split(":")[0];
  let toMins = time?.[0].to.split(":")[1];
  const [loader, setLoader] = React.useState(false);
  const [modalLoader, setModalLoader] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [approvedModal, setApprovedModal] = React.useState(false);
  const [booking, setBooking] = React.useState(false);
  const [Formatteddate, setFormattedDate] = React.useState(null);
  const [caseNameError, setCaseNameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [aboutError, setAboutError] = React.useState(null);
  const [subjectError, setSubjectError] = React.useState(null);
  const [showError, setShowError] = React.useState(null);
  const [locationError, setLocationError] = React.useState(null);
  //expertsTitles

  const FREE_DATA = [
    {
      id: "0",
      placeholder: fixedTitles.expertsTitles["case-name"].title,
      multi: false,
      slug: "caseName",
    },
    {
      id: "1",
      placeholder: fixedTitles.expertsTitles["email-address"].title,
      multi: false,
      slug: "email",
    },
    {
      id: "2",
      placeholder: fixedTitles.expertsTitles["about-the-case"].title,
      multi: false,
      slug: "about",
    },
    {
      id: "3",
      placeholder: fixedTitles.expertsTitles["subject"].title,
      multi: true,
      slug: "subject",
    },
  ];
  const PAID_DATA = [
    {
      id: "0",
      placeholder: fixedTitles.expertsTitles["case-name"].title,
      multi: false,
      slug: "caseName",
    },
    {
      id: "1",
      placeholder: fixedTitles.expertsTitles["email-address"].title,
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
      placeholder: fixedTitles.expertsTitles["location"].title,
      multi: false,
      slug: "location",
    },
    {
      id: "4",
      placeholder: fixedTitles.expertsTitles["about-reservation"].title,
      multi: false,
      slug: "about",
    },
    {
      id: "5",
      placeholder: fixedTitles.expertsTitles["subject"].title,
      multi: true,
      slug: "subject",
    },
  ];

  const resetState = () => {
    setEmailError(null);
    setCaseNameError(null);
    setSubjectError(null);
    setAboutError(null);
    setLocationError(null);
  };

  const submitCaseHandler = (caseName, email, about, subject, location) => {
    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
    resetState();
    let sortedTime = time.sort(dynamicSort("from"));
    let freeData = {
      date: date,
      time: sortedTime,
      expert_id: expert_id,
      name: caseName,
      email: email,
      details: about,
      subject: subject,
      is_free: 1,
      is_online: 1,
    };
    let paidData = {
      date: date,
      time: sortedTime,
      expert_id: expert_id,
      name: caseName,
      email: email,
      details: about,
      subject: subject,
      is_free: 0,
      is_online: meetingType === 0 ? 0 : 1,
    };

    let reopenData = {
      date: date,
      time: sortedTime,
      expert_id: expert_id,
      name: caseName,
      email: email,
      details: about,
      subject: subject,
      is_free: 0,
      is_online: meetingType === 0 ? 0 : 1,
      case_id: case_id,
    };

    if (meetingType === 0) {
      paidData["location"] = location;
    }
    if (bookingType === "paid") {
      // switch (range[0]) {
      //   case 15:
      //     setPrice(Number(data.consultancy_fee / 4));
      //     break;
      //   case 30:
      //     setPrice(Number(data.consultancy_fee / 2));
      //     break;
      //   case 60:
      //     if (time.length <= 1) {
      //       setPrice(Number(data.consultancy_fee));
      //     } else {
      //       setPrice(Number(data.consultancy_fee * 2));
      //     }
      //     break;
      //   default:
      //     break;
      // }
    }
    if (booking) {
      setModalLoader(true);
      if (!reopen) {
        bookNewCase(bookingType === "free" ? freeData : paidData)
          .then((res) => {
            setModalLoader(false);
            if (bookingType !== "free") {
              setModalLoader(false);
              setModalVisible(false);

              setTimeout(() => {
                navigation.navigate("PaymentScreen");
              }, 300);
            } else {
              setCanBookForFree(true);
              setModalVisible(false);
              setApprovedModal(true);

              navigation.navigate("expertScreen");
            }
          })
          .catch((err) => {
            setModalLoader(false);
          });
      } else {
        reopenCase(reopenData)
          .then((res) => {
            setModalVisible(false);
            navigation.navigate("PaymentScreen");
            setModalLoader(false);
          })
          .catch((err) => {})
          .finally(() => {
            setModalLoader(false);
          });
      }
    } else {
      setLoader(true);
      validateNewCase(bookingType == "free" ? freeData : paidData)
        .then((res) => {
          setLoader(false);

          if (temrsAccepted == 0 || temrsAccepted === null) {
            setBooking(true);

            navigation.navigate("termsConditions", {
              bookingType: bookingType,
              date: date,
              time: time,
              data: bookingType === "free" ? freeData : paidData,
              price: price,
            });
          } else {
            // setPrice(res,data);
            // alert(JSON.stringify(res.data.appointment));
            setPrice(res.data.appointment["cost"]);

            setFormattedDate(
              `${res.data.appointment["from"]}-${res.data.appointment["to"]}`
            );
            setBooking(true);
            setApprovedModal(true);
            setModalVisible(true);
          }
        })
        .catch((err) => {
          setLoader(false);

          if (err.response.data.errors?.email) {
            setEmailError(err.response.data.errors?.email);
          }
          if (err.response.data.errors?.name) {
            setCaseNameError(err.response.data.errors?.name);
          }
          if (err.response.data.errors?.subject) {
            setSubjectError(err.response.data.errors?.subject);
          }
          if (err.response.data.errors?.details) {
            setAboutError(err.response.data.errors?.details);
          }
          if (err.response.data.errors?.location) {
            setLocationError(err.response.data.errors?.location);
          }
        });
    }
  };
  console.log(customMap);
  const editProfileHandler = (userName, about, oldPass, pass, newPass) => {
    setLoader(true);
    var formdata = new FormData();
    formdata.append("full_name", userName);
    if (about !== "") {
      formdata.append("about", about);
    }
    if (address) {
      formdata.append("location_name", address);
    }
    if (oldPass) {
      formdata.append("old_password", oldPass);
    }
    if (pass) {
      formdata.append("password", pass);
    }
    if (newPass) {
      formdata.append("password_confirmation", newPass);
    }
    if (userData?.is_expert == 1) {
      console.log(userData);

      formdata.append("consultancy_fee", userData?.consultancy_fee);
      formdata.append(
        "educational_background",
        userData?.educational_background
      );
      formdata.append("experience_domain_id", userData?.experience_domain_id);
      formdata.append("experience_type_id", userData?.experience_type_id);
      formdata.append(
        "years_of_experience_id",
        userData?.years_of_experience_id || 1
      );
    }
    if (customMap) {
      formdata.append("latitude", customMap.latitude);
      formdata.append("longitude", customMap.longitude);
    }
    editUser(formdata)
      .then((res) => {
        setUserName(userName);
        getUserData()
          .then((res) => {
            setLoader(false);
            setUserData(res.data.user);
            setProfilePic(res.data.user.image_absolute_url);
            setUserName(res.data.user.full_name);
            setUserId(res.data.user.id);
            setTermAccepted(res.data.user.terms_conditions_accepted);
            navigation.goBack();
          })
          .catch((err) => {
            setLoader(false);
            console.error(err);
            // setLoader(false);
            navigation.goBack();
          });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.data);
      });
  };

  const closeModalHandler = () => {
    setBooking(false);
    setModalVisible(false);
    if (bookingType === "free") {
      navigation.navigate("expertScreen");
    }
  };

  const submitFormHandler = (
    userName,
    about,
    oldPass,
    pass,
    newPass,
    caseName,
    email,
    subject,
    location
  ) => {
    if (editProfile) {
      editProfileHandler(userName, about, oldPass, pass, newPass);
    } else {
      // navigation.navigate("termsConditions");
      submitCaseHandler(caseName, email, about, subject, location);
    }
  };
  let mettingDropdown = ["Location", "Online Metting"];
  const [meetingType, setMeetingType] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ height: SCREEN_HEIGHT }}
      >
        <KeyboardAvoidingView
          style={{ backgroundColor: "transparent", flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <Header
              navigation={navigation}
              title={
                editProfile
                  ? fixedTitles.profileTitles["edit-profile"].title
                  : fixedTitles.profileTitles["fill-your-case"].title
              }
            />
          </View>

          <Formik
            initialValues={{
              userName: userName,
              email: userData?.email,
              mobile: "",
              oldPassword: "",
              password: "",
              newPassword: "",
              caseName: "",
              about: "",
              subject: "",
              location: "",
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
                              placeholder={data.placeholder}
                              multiline={data.multi}
                              handleChange={handleChange}
                              value={data.slug}
                              values={values}
                              caseNameError={caseNameError}
                              emailError={emailError}
                              aboutError={aboutError}
                              subjectError={subjectError}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {PAID_DATA.map((data, index) => {
                            return (
                              <View key={index.toString()}>
                                <>
                                  {!data.Dropdown ? (
                                    <>
                                      <CustomTextBox
                                        meetingType={meetingType}
                                        key={index.toString()}
                                        placeholder={data.placeholder}
                                        multiline={data.multi}
                                        handleChange={handleChange}
                                        value={data.slug}
                                        values={values}
                                        caseNameError={caseNameError}
                                        emailError={emailError}
                                        aboutError={aboutError}
                                        subjectError={subjectError}
                                        locationError={locationError}
                                        setPrice={setPrice}
                                      />
                                    </>
                                  ) : (
                                    <View
                                      style={{
                                        marginTop: 15,
                                        marginBottom: 0,
                                      }}
                                    >
                                      <ModalDropdown
                                        options={mettingDropdown}
                                        dropdownStyle={styles.dropdownStyles}
                                        isFullWidth
                                        showsVerticalScrollIndicator
                                        style={[
                                          styles.containerStyles,
                                          {
                                            marginBottom: 0,
                                          },
                                        ]}
                                        textStyle={styles.label}
                                        defaultValue={"نوع الاجتماع"}
                                        onSelect={(item) => {
                                          setMeetingType(item);
                                        }}
                                        renderRowText={(item) => {
                                          return (
                                            <View>
                                              <Typography
                                                size={12}
                                                content={item}
                                                align="left"
                                                color={colors.dark_blue}
                                              />
                                            </View>
                                          );
                                        }}
                                        renderSeparator={() => <View />}
                                        renderRowComponent={TouchableOpacity}
                                        keyboardShouldPersistTaps="handled"
                                        renderRightComponent={() => {
                                          return (
                                            <View
                                              style={styles.arrowContainer}
                                            />
                                          );
                                        }}
                                      />
                                    </View>
                                  )}
                                </>
                              </View>
                            );
                          })}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {profileForm.map((data, index) => (
                        <CustomTextBox
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
                  {editProfile && (
                    <LocationBox editMode navigation={navigation} />
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      submitFormHandler(
                        values.userName,
                        values.about,
                        values.oldPassword,
                        values.password,
                        values.newPassword,
                        values.caseName,
                        values.email,
                        values.subject,
                        values.location
                      );
                    }}
                  >
                    <Typography
                      content={
                        editProfile
                          ? fixedTitles.profileTitles["save"].title
                          : "إرسل"
                      }
                      align="center"
                      roman={true}
                      color={colors.white}
                      size={14}
                    />
                  </TouchableOpacity>
                </View>
                <CenteredModal
                  navigation={navigation}
                  list={approvedModal}
                  visible={modalVisible}
                  close={() => closeModalHandler()}
                  submit={() =>
                    submitFormHandler(
                      values.userName,
                      values.about,
                      values.oldPassword,
                      values.password,
                      values.newPassword,
                      values.caseName,
                      values.email,
                      values.subject,
                      values.location
                    )
                  }
                  bookingType={bookingType}
                  date={date}
                  time={Formatteddate}
                  loading={modalLoader}
                  price={price + " LBP"}
                />
              </ScrollView>
            )}
          </Formik>
        </KeyboardAvoidingView>
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
    marginTop: Platform.OS == "android" ? 12 : 0,

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
    // marginBottom: 15,
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS == "ios" ? 0.16 : 0.45,
    shadowRadius: 3.84,
    marginTop: 15,
    elevation: 7,
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
    shadowColor: "#000",
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
    elevation: 23,
  },
  dropdownStyles: {
    height: 100,
    marginTop: Platform.OS == "ios" ? 18 : -25,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
    backgroundColor: "white",
    padding: 10,
  },
  containerStyles: {
    textAlign: "right",

    // alignItems: "flex-start",
    backgroundColor: "#F2F5F6",
    width: "auto",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 9,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS == "ios" ? 0.16 : 0.45,
    shadowRadius: 3.84,

    elevation: 7,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
  },
  arrowContainer: {
    width: SCREEN_WIDTH * 0.65,
    alignItems: "flex-end",
  },
});
