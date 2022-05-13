import React, { useState, useEffect, useContext } from "react";
import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import ArrowSVG from "../../SVGR/Globals/Arrow";

import { TextInputMask } from "react-native-masked-text";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import Checkbox from "expo-checkbox";

import { JobModal } from "../../components/JobModal";
import { createJob, updateJob } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import WheelPicker from "../../components/WheelPicker/WheelPicker";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { resizeImageHandler } from "../../utils/ImageResizer";
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

  number,
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

export const PostJobForm = ({ navigation, route }) => {
  const [dateModal, setDateModal] = useState();

  const [endDateModal, setEndDateModal] = useState();
  const { editMode, editData } = route.params;

  console.log(editData);

  const { fixedTitles } = useContext(AppContext);
  const [hasPrice, setHasPrice] = useState(
    editMode ? (editData?.job.salary ? true : false) : false
  );
  const [salary, setSalary] = useState(editMode ? editData.job.salary : null);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(
    editMode ? editData.job?.job_name.toString() : null
  );
  const [companyName, setCompanyName] = useState(
    editMode ? editData.job?.company_name.toString() : null
  );
  const [jobTypeId, setJobTypeId] = useState(
    editMode ? editData.job.job_type_id : null
  );
  const [locationId, setLocationId] = useState(
    editMode ? editData.job.district_id : null
  );

  const [startingDate, setStartingDate] = useState(
    editMode ? editData.job.published_date : null
  );
  const [endingDate, setEndingDate] = useState(
    editMode ? editData?.job.end_application_date : null
  );
  const [about, setAbout] = useState(
    editMode ? editData.job.description : null
  );

  const [image, setImage] = useState(
    editMode ? editData.job.formatted_image : null
  );

  const [nameError, setNameError] = useState(null);
  const [companyNameError, setCompanyNameError] = useState(null);

  const [jobTypeIdError, setJobTypeIdError] = useState();
  const [startingDateError, setStartingDateError] = useState();
  const [endingDateError, setEndingDateError] = useState();
  const [aboutError, setAboutError] = useState(null);

  const [salaryError, setSalaryError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jobModalVisible, setJobModalVisible] = useState(false);

  let jobTypeOptions = [];
  let jobTypeOptionsId = [];

  let districtsOptions = [];
  let districtsOptionId = [];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(await resizeImageHandler(result.uri));
    }
  };

  useEffect(() => {
    fixedTitles.districts?.map((data) => {
      districtsOptions.push(data.title);
      districtsOptionId.push(data.id);
    });

    fixedTitles.jobTitles.map((data) => {
      jobTypeOptions.push(data.title);
      jobTypeOptionsId.push(data.id);
    });
  }, [districtsOptions, jobTypeId]);

  const closeModalHandler = () => {
    setModalVisible(false);
    navigation.pop();
  };

  const resetState = () => {
    setNameError(null);
    setCompanyNameError(null);
    setJobTypeIdError(null);
    setLocationError(null);
    setSalaryError(null);
    setStartingDateError(null);
    setEndingDateError(null);
    setAboutError(null);
    setImageError(null);
  };

  const createJobHandler = () => {
    resetState();
    setLoading(true);
    let formdata = new FormData();
    if (name) {
      formdata.append("job_name", name);
    }
    if (companyName) {
      formdata.append("company_name", companyName);
    }
    formdata.append("district_id", locationId);
    if (hasPrice == 1) {
      formdata.append("salary", salary);
    }
    formdata.append("published_date", startingDate);
    formdata.append("end_application_date", endingDate);
    formdata.append("description", about);
    formdata.append("job_type_id", jobTypeId);
    formdata.append("has_salary", hasPrice == false ? 0 : 1);
    if (image) {
      formdata.append("image", {
        uri: image,
        name: "Image",
        type: "Image/jpg",
      });
    }
    console.log(formdata);

    createJob(formdata)
      .then((res) => {
        setLoading(false);
        setModalVisible(true);

        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        if (err.response.data.errors.company_name) {
          setCompanyNameError(err.response.data.errors.company_name);
        }
        if (err.response.data.errors.description) {
          setAboutError(err.response.data.errors.description);
        }
        if (err.response.data.errors.district_id) {
          setLocationError(err.response.data.errors.district_id);
        }
        if (err.response.data.errors.end_application_date) {
          setEndingDateError(err.response.data.errors.end_application_date);
        }
        if (err.response.data.errors.job_name) {
          setNameError(err.response.data.errors.job_name);
        }

        if (err.response.data.errors.job_type_id) {
          setJobTypeIdError(err.response.data.errors.job_type_id);
        }
        if (err.response.data.errors.published_date) {
          setStartingDateError(err.response.data.errors.published_date);
        }
        if (err.response.data.errors.salary) {
          setSalaryError(err.response.data.errors.salary);
        }
        if (err.response.data.errors.image) {
          setImageError(err.response.data.errors.image);
        }
      });
  };

  const editJobHandler = () => {
    let formdata = new FormData();
    if (name) {
      formdata.append("job_name", name);
    }
    if (companyName) {
      formdata.append("company_name", companyName);
    }
    formdata.append("district_id", locationId);
    if (hasPrice == 1) {
      formdata.append("salary", salary);
    }
    formdata.append("published_date", startingDate);
    formdata.append("end_application_date", endingDate);

    formdata.append("description", about);

    formdata.append("job_type_id", jobTypeId);
    formdata.append("has_salary", hasPrice == false ? 0 : 1);

    formdata.append("image", {
      uri: image,
      type: "Image/jpg",
      name: "job Pic",
    });

    setLoading(true);
    updateJob(editData.job.id, formdata)
      .then((res) => {
        setJobModalVisible(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeJobModalHandler = () => {
    setJobModalVisible(false);
    navigation.pop();
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
          color={colors.dark_orange}
          animating={loading}
          size="large"
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <View style={[styles.row, styles.mh20]}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={[styles.row]}
            >
              <ArrowSVG
                fill={colors.dark_orange}
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Typography
                  content={
                    !editMode
                      ? fixedTitles.jobFixedTitles["share-a-job"].title
                      : fixedTitles.jobFixedTitles["edit-a-job"].title
                  }
                  align="left"
                  color={colors.dark_orange}
                  size={20}
                  bold
                />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!editMode && (
              <View style={styles.mh20}>
                <Typography
                  content={fixedTitles.jobFixedTitles["post-job-desc"].title}
                  align="left"
                  color={colors.dark_blue}
                  size={14}
                />
              </View>
            )}

            <View style={styles.mh20}>
              <>
                <Input
                  placeholder={fixedTitles.jobFixedTitles["job-name"].title}
                  value={name}
                  handleChange={(text) => setName(text)}
                />
                {nameError && (
                  <View>
                    <Typography content={nameError} color="red" align="left" />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.jobFixedTitles["company-name"].title}
                  value={companyName}
                  handleChange={(text) => setCompanyName(text)}
                />
                {companyNameError && (
                  <View>
                    <Typography
                      content={companyNameError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={jobTypeOptions}
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
                      ? editData.job?.job_type.title
                      : fixedTitles.jobFixedTitles["job-type"].title
                  }
                  onSelect={(item) => {
                    setJobTypeId(jobTypeOptionsId[item]);
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
              </>
              {jobTypeIdError && (
                <View>
                  <Typography
                    content={jobTypeIdError}
                    color="red"
                    align="left"
                  />
                </View>
              )}

              <>
                <ModalDropdown
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
                      ? editData.job?.district.title
                      : fixedTitles.jobFixedTitles["job-location"].title
                  }
                  onSelect={(item) => {
                    setLocationId(districtsOptionId[item]);
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
                {locationError && (
                  <View>
                    <Typography
                      content={locationError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <View style={styles.row}>
                <View>
                  <Checkbox
                    style={styles.checkbox}
                    value={hasPrice}
                    onValueChange={setHasPrice}
                    color={colors.dark_blue}
                  />
                </View>
                <View>
                  <Typography
                    content={fixedTitles.jobFixedTitles["salary"].title}
                    color={colors.dark_blue}
                    align="left"
                    size={14}
                  />
                </View>
              </View>
              <>
                {hasPrice && (
                  <MaskedInput
                    placeholder={fixedTitles.jobFixedTitles["salary"].title}
                    value={salary}
                    mask={"money"}
                    options={{
                      precision: 0,
                      separator: ",",
                      delimiter: ",",
                      unit: "$",
                      suffixUnit: "",
                    }}
                    setAmount={setSalary}
                  />
                )}
                {salaryError && (
                  <View>
                    <Typography
                      content={salaryError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </>
              <View>
                <TouchableOpacity
                  onPress={() => setDateModal(true)}
                  style={styles.textinput}
                >
                  <View style={{ top: SCREEN_HEIGHT * 0.0037 }}>
                    <Typography
                      content={
                        startingDate ||
                        fixedTitles.jobFixedTitles["publish-date"].title
                      }
                      align="left"
                      color={colors.dark_blue}
                      size={14}
                    />
                  </View>
                </TouchableOpacity>
                {startingDateError && (
                  <View>
                    <Typography
                      content={startingDateError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setEndDateModal(true)}
                  style={styles.textinput}
                >
                  <View style={{ top: SCREEN_HEIGHT * 0.0037 }}>
                    <Typography
                      content={
                        endingDate ||
                        fixedTitles.jobFixedTitles["end-date"].title
                      }
                      align="left"
                      color={colors.dark_blue}
                      size={14}
                    />
                  </View>
                </TouchableOpacity>
                {endingDateError && (
                  <View>
                    <Typography
                      content={endingDateError}
                      color="red"
                      align="left"
                    />
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={styles.textinput}
                >
                  <View style={{ op: SCREEN_HEIGHT * 0.0037 }}>
                    <Typography
                      content={
                        image
                          ? "Image Selected"
                          : fixedTitles.jobFixedTitles["upload-an-image"].title
                      }
                      align="left"
                      color={colors.dark_blue}
                      size={14}
                    />
                  </View>
                </TouchableOpacity>
                {imageError && (
                  <View>
                    <Typography content={imageError} color="red" align="left" />
                  </View>
                )}
              </View>
              <View>
                <Input
                  placeholder={fixedTitles.jobFixedTitles["about-job"].title}
                  multi
                  value={about}
                  handleChange={(text) => setAbout(text)}
                />
                {aboutError && (
                  <View>
                    <Typography content={aboutError} color="red" align="left" />
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={
                    editMode ? () => editJobHandler() : () => createJobHandler()
                  }
                  style={styles.button}
                >
                  <Typography
                    content={
                      editMode
                        ? fixedTitles.jobFixedTitles["edit"].title
                        : fixedTitles.jobFixedTitles["share"].title
                    }
                    align="center"
                    color={colors.white}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View>
          <JobModal visible={modalVisible} close={() => closeModalHandler()} />
        </View>
        <View>
          <WheelPicker
            currentDate
            present
            setSelectedStartDate={setStartingDate}
            visible={dateModal}
            close={() => setDateModal(false)}
          />
        </View>
        <View>
          <WheelPicker
            currentDate
            present
            setSelectedStartDate={setEndingDate}
            visible={endDateModal}
            close={() => setEndDateModal(false)}
          />
        </View>
        <View>
          <JobModal
            visible={jobModalVisible}
            close={() => closeJobModalHandler()}
            title={fixedTitles.jobFixedTitles["we-call-you-soon"].title}
          />
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
    height: SCREEN_HEIGHT * 0.018,
    width: SCREEN_HEIGHT * 0.018,
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
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
