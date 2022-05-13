import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import ExpoCheckbox from "expo-checkbox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { TextInputMask } from "react-native-masked-text";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import AttachmentSVG from "../../SVGR/Globals/Attachment";
import { JobModal } from "../../components/JobModal";
import * as DocumentPicker from "expo-document-picker";
import { apply, singleJob } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
const MaskedInput = ({
  placeholder,
  mask,
  options,
  small,
  value,
  setAmount,
}) => {
  return (
    <TextInputMask
      placeholderTextColor={colors.dark_blue}
      style={[styles.textinput, small && styles.small]}
      placeholder={placeholder}
      type={mask}
      options={options}
      value={value}
      includeRawValueInChangeText
      onChangeText={(text, rawText) => setAmount(rawText)}
    />
  );
};

const Input = ({
  placeholder,
  multi,
  value,
  handleChange,
  disabled,
  number,
}) => {
  return (
    <>
      <TextInput
        editable={disabled ? false : true}
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

export const ApplyForm = ({ navigation, route }) => {
  const { id, data } = route.params;
  const { fixedTitles, userData } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userData?.full_name);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone_number);
  const [educationBg, setEducationBg] = useState(null);
  const [jobTypeId, setJobTypeId] = useState(null);
  const [experience, setExperience] = useState(null);
  const [experienceError, setExperienceError] = useState(null);
  const [resumeBinary, setResumeBinary] = useState();
  const [skills, setSkills] = useState(null);
  const [about, setAbout] = useState(null);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [educationBgError, setEducationBgError] = useState(null);
  const [jobTypeError, setJobTypeError] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const [skillsError, setSkillsError] = useState(null);
  const [aboutError, setAboutError] = useState(null);

  let experienceDomainOptions = [];
  let experienceDomainOptionsId = [];
  useEffect(() => {
    fixedTitles.jobExperience.map((data) => {
      experienceDomainOptions.push(data.title);
      experienceDomainOptionsId.push(data.id);
    });
  }, [experienceDomainOptions, experienceDomainOptionsId]);
  const [resumeName, setResumeName] = useState(null);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result) {
      setResumeName(result.name);
      setResumeBinary(result.uri);
    } else {
      console.log("err");
    }
  };

  const singleJobHandler = () => {
    singleJob(id)
      .then((res) => {
        closeModalHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitHandler = () => {
    resetState();
    setLoading(true);
    let formdata = new FormData();
    if (name) {
      formdata.append("full_name", name);
    }
    if (email) {
      formdata.append("email", email);
    }
    if (phone) {
      formdata.append("phone", phone);
    }

    if (location) {
      formdata.append("address", location);
    }
    if (educationBg) {
      formdata.append("educational_background", educationBg);
    }
    if (experience) {
      formdata.append("experience_domain_id", experience);
    }
    if (resumeBinary) {
      formdata.append("cv", {
        uri: resumeBinary,
        type: "image/Pdf",
        name: "job Pic",
      });
    }
    if (skills) {
      formdata.append("skills", skills);
    }
    if (about) {
      formdata.append("motivation", about);
    }
    formdata.append("using_default_cv", isUsingResume == false ? 0 : 1);
    apply(id, formdata)
      .then((res) => {
        setLoading(false);
        singleJobHandler();
        setModalVisible(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error(formdata);
        if (err.response.data.errors.address) {
          setLocationError(err.response.data.errors.address);
        }
        if (err.response.data.errors.cv) {
          setResumeError(err.response.data.errors.cv);
        }
        if (err.response.data.errors.educational_background) {
          setEducationBgError(err.response.data.errors.educational_background);
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email);
        }
        if (err.response.data.errors.experience_domain_id) {
          setExperienceError(err.response.data.errors.experience_domain_id);
        }
        if (err.response.data.errors.full_name) {
          setNameError(err.response.data.errors.full_name);
        }

        if (err.response.data.errors.motivation) {
          setAboutError(err.response.data.errors.motivation);
        }
        if (err.response.data.errors.phone) {
          setPhoneError(err.response.data.errors.phone);
        }
        if (err.response.data.errors.skills) {
          setSkillsError(err.response.data.errors.skills);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModalHandler = (data) => {
    setModalVisible(false);
    navigation.navigate("SingleJobScreen", {
      item: data,
    });
  };

  const [isUsingResume, setIsUsingResume] = useState(
    data.latest_cv.url == null ? false : true
  );

  const resetState = () => {
    setSkillsError(null);
    setPhoneError(null);
    setAboutError(null);
    setNameError(null);
    setExperienceError(null);
    setEmailError(null);
    setEducationBgError(null);
    setResumeError(null);
    setLocationError(null);
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
          animating={loading}
          color={colors.dark_orange}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.header}
          >
            <View>
              <ArrowSVG fill={colors.dark_orange} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Typography
                content={fixedTitles.jobFixedTitles["apply-form"].title}
                align="left"
                bold
                color={colors.dark_orange}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <>
                <Input
                  value={name}
                  handleChange={(text) => setName(text)}
                  placeholder="الاسم الكامل"
                  disabled
                />
                {nameError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography content={nameError} color="red" align="left" />
                  </View>
                )}
              </>
              <>
                <Input
                  value={email}
                  handleChange={(text) => setEmail(text)}
                  placeholder={
                    fixedTitles.jobFixedTitles["email-address"].title
                  }
                />
                {emailError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography content={emailError} color="red" align="left" />
                  </View>
                )}
              </>
              <>
                <Input
                  value={phone}
                  handleChange={(text) => setPhone(text)}
                  placeholder={fixedTitles.jobFixedTitles["phone-number"].title}
                  number
                />
                {phoneError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography content={phoneError} color="red" align="left" />
                  </View>
                )}
              </>
              <>
                <Input
                  value={location}
                  handleChange={(text) => setLocation(text)}
                  placeholder={fixedTitles.jobFixedTitles["location"].title}
                />
                {locationError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      content={locationError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  value={educationBg}
                  handleChange={(text) => setEducationBg(text)}
                  placeholder={
                    fixedTitles.jobFixedTitles["experience-background"].title
                  }
                />
                {educationBgError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      content={educationBgError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={experienceDomainOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={
                    fixedTitles.jobFixedTitles["experience-domain"].title
                  }
                  onSelect={(item) => {
                    setExperience(experienceDomainOptionsId[item]);
                  }}
                  renderRowText={(item) => {
                    return (
                      <View>
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
                    return (
                      <View style={styles.arrowContainer}>
                        <ArrowDownSVG />
                      </View>
                    );
                  }}
                />
                {experienceError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      content={experienceError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <View>
                <TouchableOpacity
                  onPress={() => pickDocument()}
                  style={[
                    styles.textinput,
                    styles.row,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View style={{ top: 3, width: "90%" }}>
                    {isUsingResume == null ||
                      (isUsingResume == false && (
                        <Typography
                          fit={true}
                          lines={1}
                          content={
                            resumeBinary
                              ? resumeName
                              : fixedTitles.jobFixedTitles["upload-a-resume"]
                                  .title
                          }
                          align="left"
                          color={colors.dark_blue}
                        />
                      ))}
                    {isUsingResume !== null && isUsingResume !== false && (
                      <Typography
                        fit={true}
                        lines={1}
                        content={data.latest_cv.name}
                        align="left"
                        color={colors.dark_blue}
                      />
                    )}
                  </View>
                  <View style={{ right: 2 }}>
                    <AttachmentSVG />
                  </View>
                </TouchableOpacity>
                {resumeError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      content={resumeError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </View>
              {data.latest_cv.url !== null && (
                <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
                  <View>
                    <ExpoCheckbox
                      style={styles.checkbox}
                      value={isUsingResume}
                      color={colors.dark_blue}
                      onValueChange={() => setIsUsingResume(!isUsingResume)}
                    />
                  </View>
                  <View>
                    <Typography
                      content={`use latest CV`}
                      color={colors.dark_blue}
                      size={14}
                    />
                  </View>
                </View>
              )}

              <>
                <Input
                  value={skills}
                  handleChange={(text) => setSkills(text)}
                  placeholder={fixedTitles.jobFixedTitles["skills"].title}
                />
                {skillsError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      content={skillsError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  value={about}
                  handleChange={(text) => setAbout(text)}
                  placeholder={
                    fixedTitles.jobFixedTitles["package-description"].title
                  }
                  multi
                />
                {aboutError && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography content={aboutError} color="red" align="left" />
                  </View>
                )}
              </>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => submitHandler()}
                style={styles.button}
              >
                <Typography
                  content={fixedTitles.jobFixedTitles["apply-now"].title}
                  color={colors.white}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View>
          <JobModal visible={modalVisible} close={() => closeModalHandler()} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mh20: {
    marginHorizontal: 20,
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
  dropdownStyles: {
    backgroundColor: "white",
    height: 100,
    marginTop: Platform.OS == "ios" ? 18 : 0,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "flex-start",
    padding: 10,
  },
  containerStyles: {
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
    height: 159,
    textAlignVertical: "top",
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    alignItems: "flex-end",
    right: 0,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    margin: SCREEN_HEIGHT * 0.012,
    marginLeft: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.028,
    width: SCREEN_HEIGHT * 0.028,
    borderWidth: 1,
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
    marginVertical: 20,
    elevation: 5,
    alignSelf: "center",
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },
  checkbox: {
    marginVertical: SCREEN_HEIGHT * 0.012,
    marginRight: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.016,
    width: SCREEN_HEIGHT * 0.016,
    borderWidth: 1,
  },
});
