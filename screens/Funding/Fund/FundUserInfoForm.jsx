import React, { useState, useContext } from "react";
import {
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ModalDropdown from "react-native-modal-dropdown";
import Typography from "../../../components/Typography/Typography";

import Checkbox from "expo-checkbox";
import { Avatar } from "react-native-gifted-chat";
import AppContext from "../../../appContext/AppContext";
import { Formik } from "formik";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import WheelPicker from "../../../components/WheelPicker/WheelPicker";
import { useEffect } from "react";
import { validatePersonalFunding } from "../../../api/Funding/Funding";
import EditProfileSVG from "../../../SVGR/Profile/EditProfile";
import BottomModal from "../../../components/Modals/BottomModal";
import PhonePicker from "../../../components/PhonePicker/PhonePicker";
import AttachmentSVG from "../../../SVGR/Globals/Attachment";
import { resizeImageHandler } from "../../../utils/ImageResizer";

<Input button={true} placeholder={"تاريخ الميلاد"} />;
const Input = ({
  placeholder,
  multi,
  value,
  handleChange,
  dob,
  button,
  submit,
  number,
  image,
  editMode,
  icon,
  dobText,
}) => {
  return (
    <>
      {!button ? (
        <TextInput
          placeholderTextColor={colors.dark_blue}
          style={[styles.textinput, multi && styles.multi]}
          placeholder={placeholder}
          multiline={multi ? true : false}
          value={value}
          onChangeText={handleChange}
          autoCorrect={false}
          keyboardType={number ? "number-pad" : "default"}
        />
      ) : (
        <TouchableOpacity
          onPress={() => submit()}
          style={[
            styles.textinput,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <>
            {image && (
              <Text style={styles.text}>
                {image ? "Image Selected" : placeholder}
              </Text>
            )}
            {dobText && (
              <Text style={styles.text}>{dob ? dob : placeholder}</Text>
            )}
            {icon && (
              <Text style={styles.text}>{image ? "" : placeholder}</Text>
            )}
            {icon && (
              <View>
                <AttachmentSVG />
              </View>
            )}
          </>
        </TouchableOpacity>
      )}
    </>
  );
};

const FundUserInfoForm = ({ navigation, route }) => {
  const { editMode, editData, id } = route.params;

  const [sex, setSex] = useState(null);
  const [governates, setGovernates] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [socialStatus, setSocialStatus] = useState(null);
  const [isParent, setIsParent] = useState(null);
  const [isNotParent, setIsNotParent] = useState(false);
  const [familyLeader, setFamilyLeader] = useState();
  const [isNotOnlyFamilyLeader, setIsNotOnlyFamilyLeader] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [dob, setDob] = useState(null);
  const { userData, fixedTitles, setIsCamera, isCamera, country } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  //error handlers

  const [nameError, setNameError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [socialError, setSocialError] = useState(null);
  const [villageError, setVillageError] = useState(null);
  const [aboutUserError, setAboutUserError] = useState(null);
  const [familyCountError, setFamilyCountError] = useState(null);
  const [governateError, setGovernateError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [childrenCountError, setChildrenCountError] = useState(null);
  const [cameraModal, setCameraModal] = useState(false);
  const [profilePic, setProfilePic] = useState(userData?.image_absolute_url);

  const [passport, setPassport] = useState(null);
  const [passportError, setPassportError] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    setCameraModal(false);

    if (!result.cancelled) {
      setProfilePic(await resizeImageHandler(result.uri));
    }
  };

  const passportHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    setCameraModal(false);

    if (!result.cancelled) {
      setPassport(await resizeImageHandler(result.uri));
    }
  };

  const cameraHandler = () => {
    setIsCamera(true);
    setCameraModal(false);
  };

  useEffect(() => {
    if (editMode) {
      setIsParent(editData.children == 0 ? false : true);
      setIsNotParent(editData.children == 0 ? true : false);
      setFamilyLeader(editData.only_supporter == 1 ? true : false);
      setIsNotOnlyFamilyLeader(editData.only_supporter == 0 ? true : false);
      setSocialStatus(editData?.social_status_id);
      setDob(editMode ? editData?.birthday : null);
      setSex(editMode ? editData?.gender_id : null);
      setDistricts(editMode ? editData?.applicant_district_id : null);
      setGovernates(editMode ? editData?.applicant_governate_id : null);
      setPassport(null);
    }
  }, [editMode]);

  const resetState = () => {
    setNameError(null);
    setGenderError(null);
    setAddressError(null);
    setBirthdayError(null);
    setAboutUserError(null);
    setVillageError(null);
    setSocialError(null);
    setEmailError(null);
    setFamilyCountError(null);
    setDistrictError(null);
    setGovernateError(null);
    setPhoneError(null);
    setChildrenCountError(null);
    setPassportError(null);
  };

  let sexOptions = [];
  let socialStatusOptions = [];
  let governatesOptions = [];
  let districtsOptions = [];

  useEffect(() => {
    fixedTitles.sex.map((data) => {
      sexOptions.push(data.title);
    });

    fixedTitles.socialStatus.map((data) => {
      socialStatusOptions.push(data.title);
    });
    fixedTitles.governates.map((data) => {
      governatesOptions.push(data.title);
      data.districts.map((res) => {
        if (governates === res.governate_id) {
          districtsOptions.push(res.title);
        }
      });
    });
  }, [
    governates,
    districts,
    governates,
    governatesOptions,
    districtsOptions,
    editMode,
  ]);

  let formdata = new FormData();
  const validateData = (
    name,
    phone,
    email,
    village,
    address,
    childCount,
    familyCount,
    aboutUser
  ) => {
    let mobile = country?.callingCode[0] + phone;

    setLoading(true);
    formdata.append("applicant_name", name);
    formdata.append("gender_id", sex);
    formdata.append("birthday", dob);
    formdata.append("phone_number", mobile);
    formdata.append("email", email);
    formdata.append("applicant_village", village);
    formdata.append("applicant_address", address);
    formdata.append("social_status_id", socialStatus);
    formdata.append("applicant_governate_id", governates);
    formdata.append("applicant_district_id", districts);
    formdata.append("only_supporter", familyLeader ? 1 : 0);
    formdata.append("number_of_dependents", familyCount);
    formdata.append("has_children", isParent ? 1 : 0);
    if (isParent) {
      formdata.append("number_of_children", childCount);
    }
    formdata.append("number_of_dependents", familyCount);
    formdata.append("about_applicant", aboutUser);

    if (profilePic) {
      formdata.append("applicant_image", {
        uri: profilePic,
        name: "Image",
        type: "Image/jpg",
      });
    }
    if (passport) {
      formdata.append("identification", {
        uri: passport,
        name: "Image",
        type: "Image/jpg",
      });
    }

    resetState();
    validatePersonalFunding(formdata)
      .then((res) => {
        navigation.navigate("FundBusinessForm", {
          formdata,

          editMode: editMode,
          editData: editData,
          id: id,
        });
      })
      .catch((err) => {
        if (err.response.data.errors.applicant_name) {
          setNameError(err.response.data.errors.applicant_name);
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email);
        }
        if (err.response.data.errors.gender_id) {
          setGenderError(err.response.data.errors.gender_id);
        }
        if (err.response.data.errors.applicant_village) {
          setVillageError(err.response.data.errors.applicant_village);
        }
        if (err.response.data.errors.social_status_id) {
          setSocialError(err.response.data.errors.social_status_id);
        }
        if (err.response.data.errors.about_applicant) {
          setAboutUserError(err.response.data.errors.about_applicant);
        }
        if (err.response.data.errors.applicant_address) {
          setAddressError(err.response.data.errors.applicant_address);
        }
        if (err.response.data.errors.number_of_dependents) {
          setFamilyCountError(err.response.data.errors.number_of_dependents);
        }
        if (err.response.data.errors.applicant_village) {
          setVillageError(err.response.data.errors.applicant_village);
        }
        if (err.response.data.errors.phone_number) {
          setPhoneError(err.response.data.errors.phone_number);
        }
        if (err.response.data.errors.applicant_district_id) {
          setDistrictError(err.response.data.errors.applicant_district_id);
        }
        if (err.response.data.errors.applicant_governate_id) {
          setGovernateError(err.response.data.errors.applicant_governate_id);
        }
        if (err.response.data.errors.number_of_children) {
          setChildrenCountError(err.response.data.errors.number_of_children);
        }
        if (err.response.data.errors.identification) {
          setPassportError(err.response.data.errors.identification);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <Header
          title={fixedTitles.funding["user-information"].title}
          navigation={navigation}
          red
        />
        <Formik
          initialValues={{
            userName: editMode ? editData?.applicant_name : "",
            phone: editMode ? editData?.phone_number : "",
            dob: editMode ? editData?.birthday : "",
            email: editMode ? editData.email : "",
            address: editMode ? editData.applicant_address : "",
            familyCount: editMode ? editData.number_of_dependents : "",
            childCount: editMode ? editData.number_of_children : "",
            aboutUser: editMode ? editData.about_applicant : "",
            village: editMode ? editData.village : "",
          }}
        >
          {({ handleChange, values }) => (
            <ScrollView
              scrollEnabled={loading == true ? false : true}
              pointerEvents={loading ? "none" : "auto"}
              showsVerticalScrollIndicator={false}
            >
              <View style={[styles.loader, loading && { width: "100%" }]}>
                <ActivityIndicator
                  color={colors.dark_blue}
                  size="large"
                  animating={loading}
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginVertical: 20,
                }}
              >
                <Image
                  style={[styles.profilePic, { position: "relative" }]}
                  source={{ uri: profilePic }}
                />
                <TouchableOpacity
                  onPress={() => setCameraModal(true)}
                  style={[
                    styles.editImage,
                    { marginBottom: SCREEN_HEIGHT * 0.015 },
                  ]}
                >
                  <EditProfileSVG />
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",

                    alignSelf: "center",
                  }}
                >
                  <ActivityIndicator color={colors.focused} />
                </View>
              </View>
              <>
                <Input
                  placeholder={fixedTitles.funding["name"].title}
                  value={values.userName}
                  handleChange={handleChange("userName")}
                  editMode
                />
                {nameError && (
                  <View style={styles.error}>
                    <Typography
                      content={nameError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={sexOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={
                    editData
                      ? "Gender Selected"
                      : fixedTitles.funding["gender"].title
                  }
                  onSelect={(item) => {
                    setSex(item + 1);
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
                {genderError && (
                  <View style={styles.error}>
                    <Typography
                      content={genderError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  editMode
                  button={true}
                  submit={() => setModalVisible(true)}
                  dob={dob}
                  dobText
                  placeholder={fixedTitles.funding["date-of-birth"].title}
                />
                {birthdayError && (
                  <View style={styles.error}>
                    <Typography
                      content={birthdayError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <View>
                  <Input
                    editMode
                    number
                    placeholder={fixedTitles.funding["phone"].title}
                    value={values.phone}
                    handleChange={handleChange("phone")}
                  />
                  <View style={{ position: "absolute", right: 20, top: 8 }}>
                    <PhonePicker />
                  </View>
                </View>
                {phoneError && (
                  <View style={styles.error}>
                    <Typography
                      content={phoneError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  editMode
                  placeholder={fixedTitles.funding["email-address"].title}
                  value={values.email}
                  handleChange={handleChange("email")}
                />
                {emailError && (
                  <View style={styles.error}>
                    <Typography
                      content={emailError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={governatesOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={
                    editMode
                      ? "Governate Selected"
                      : fixedTitles.funding["governates"].title
                  }
                  onSelect={(item) => {
                    setGovernates(item + 1);
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
                {governateError && (
                  <View style={styles.error}>
                    <Typography
                      content={governateError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <ModalDropdown
                disabled={governates == null ? true : false}
                options={districtsOptions}
                dropdownStyle={styles.dropdownStyles}
                isFullWidth
                showsVerticalScrollIndicator={false}
                style={[
                  styles.containerStyles,
                  // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                ]}
                textStyle={styles.label}
                defaultValue={
                  editMode
                    ? "District Selected"
                    : fixedTitles.funding["districts"].title
                }
                onSelect={(item) => {
                  setDistricts(item + 1);
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
              {districtError && (
                <View style={styles.error}>
                  <Typography
                    content={districtError}
                    color="red"
                    size={12}
                    align="left"
                  />
                </View>
              )}
              <>
                <Input
                  editMode
                  placeholder={fixedTitles.funding["village"].title}
                  value={values.village}
                  handleChange={handleChange("village")}
                />
                {villageError && (
                  <View style={styles.error}>
                    <Typography
                      content={villageError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  editMode
                  placeholder={fixedTitles.funding["address"].title}
                  value={values.address}
                  handleChange={handleChange("address")}
                />
                {addressError && (
                  <View style={styles.error}>
                    <Typography
                      content={addressError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={socialStatusOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={fixedTitles.funding["social-status"].title}
                  onSelect={(item) => {
                    setSocialStatus(item + 1);
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
                {socialError && (
                  <View style={styles.error}>
                    <Typography
                      content={socialError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <View style={styles.box}>
                <View style={styles.label}>
                  <Typography
                    content={fixedTitles.funding["do-you-have-kids"].title}
                    align="left"
                    color={colors.dark_blue}
                    size={14}
                  />
                </View>
                <View>
                  <View style={styles.row}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isParent}
                      onValueChange={setIsParent}
                      color={colors.dark_blue}
                      disabled={isNotParent ? true : false}
                    />
                    <View>
                      <Typography
                        content={fixedTitles.funding["yes"].title}
                        align="left"
                        color={colors.dark_blue}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isNotParent}
                      onValueChange={setIsNotParent}
                      color={colors.dark_blue}
                      disabled={isParent ? true : false}
                    />
                    <View>
                      <Typography
                        content={fixedTitles.funding["no"].title}
                        align="left"
                        color={colors.dark_blue}
                      />
                    </View>
                  </View>
                  {isParent && (
                    <>
                      <Input
                        editMode
                        number
                        value={values.childCount}
                        handleChange={handleChange("childCount")}
                        placeholder={
                          fixedTitles.funding["number-of-childs"].title
                        }
                      />
                      {childrenCountError && (
                        <View style={styles.error}>
                          <Typography
                            content={childrenCountError}
                            color="red"
                            size={12}
                            align="left"
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.label}>
                  <Typography
                    content={fixedTitles.funding["only-supporter"].title}
                    align="left"
                    color={colors.dark_blue}
                    size={14}
                  />
                </View>
                <View>
                  <View style={styles.row}>
                    <Checkbox
                      style={styles.checkbox}
                      value={familyLeader}
                      onValueChange={setFamilyLeader}
                      color={colors.dark_blue}
                      disabled={isNotOnlyFamilyLeader ? true : false}
                    />
                    <View>
                      <Typography
                        content={fixedTitles.funding["yes"].title}
                        align="left"
                        color={colors.dark_blue}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isNotOnlyFamilyLeader}
                      onValueChange={setIsNotOnlyFamilyLeader}
                      color={colors.dark_blue}
                      disabled={familyLeader ? true : false}
                    />
                    <View>
                      <Typography
                        content={fixedTitles.funding["no"].title}
                        align="left"
                        color={colors.dark_blue}
                      />
                    </View>
                  </View>
                  <>
                    <Input
                      editMode
                      number
                      placeholder={
                        fixedTitles.funding["amount-of-supporters"].title
                      }
                      value={values.familyCount}
                      handleChange={handleChange("familyCount")}
                    />
                    {familyCountError && (
                      <View style={styles.error}>
                        <Typography
                          content={familyCountError}
                          color="red"
                          size={12}
                          align="left"
                        />
                      </View>
                    )}
                  </>
                  <>
                    <Input
                      editMode
                      placeholder={
                        fixedTitles.funding["please-upload-a-passport"].title
                      }
                      button
                      image={passport}
                      submit={() => passportHandler()}
                      icon
                    />
                    {passportError && (
                      <View style={styles.error}>
                        <Typography
                          content={passportError}
                          color="red"
                          size={12}
                          align="left"
                        />
                      </View>
                    )}
                  </>
                  <>
                    <Input
                      editMode
                      multi
                      placeholder={fixedTitles.funding["about-me"].title}
                      value={values.aboutUser}
                      handleChange={handleChange("aboutUser")}
                    />
                    {aboutUserError && (
                      <View style={styles.error}>
                        <Typography
                          content={aboutUserError}
                          color="red"
                          size={12}
                          align="left"
                        />
                      </View>
                    )}
                  </>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  validateData(
                    values.userName,
                    values.phone,
                    values.email,
                    values.village,
                    values.address,
                    values.childCount,
                    values.familyCount,
                    values.aboutUser
                  )
                }
                style={styles.button}
              >
                <Typography
                  content={fixedTitles.funding["next"].title}
                  color={colors.white}
                  size={16}
                  align="center"
                />
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
        <WheelPicker
          visible={modalVisible}
          setSelectedStartDate={setDob}
          close={() => setModalVisible(false)}
        />
        <BottomModal
          funding
          profilePic={profilePic}
          navigation={navigation}
          visible={cameraModal}
          close={() => setCameraModal(false)}
          cameraHandler={() => cameraHandler()}
          imageHandler={() => pickImage()}
          fundingCameraHandler={() => fundingCameraHandler()}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FundUserInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  text: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    // textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
    alignSelf: "flex-start",
  },
  dropdownStyles: {
    backgroundColor: "white",
    height: 100,
    marginTop: 18,
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
  box: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  checkbox: {
    margin: SCREEN_HEIGHT * 0.012,
    marginLeft: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.018,
    width: SCREEN_HEIGHT * 0.018,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
    marginBottom: 30,
    marginTop: 20,
  },
  profilePic: {
    height: SCREEN_HEIGHT * 0.11,
    width: SCREEN_HEIGHT * 0.11,
    borderRadius: (SCREEN_HEIGHT * 0.11) / 2,
    overflow: "hidden",
    zIndex: 1000,
  },
  multi: {
    height: 137,
    textAlignVertical: "top",
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    alignItems: "flex-end",
    right: 10,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    position: "absolute",
    zIndex: 10,
    elevation: 10,
    justifyContent: "center",
    height: SCREEN_HEIGHT,

    top: "30%",
  },
  error: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  editImage: {
    bottom: Platform.OS === "android" ? 30 : 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 10000000,
    elevation: 24,
    shadowOpacity: 0.19,
    shadowRadius: 6.84,

    elevation: 20,
  },
});
