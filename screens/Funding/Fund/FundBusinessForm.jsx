import React, { useState, useContext, useEffect } from "react";
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
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { Header } from "../../../components/Header/Header";
import ModalDropdown from "react-native-modal-dropdown";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { colors } from "../../../globals/colors";
import Typography from "../../../components/Typography/Typography";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";
import { Formik } from "formik";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import { addFunding, updateFunding } from "../../../api/Funding/Funding";
import AppContext from "../../../appContext/AppContext";
import AttachmentSVG from "../../../SVGR/Globals/Attachment";
import * as ImagePicker from "expo-image-picker";
import { TextInputMask } from "react-native-masked-text";
import { resizeImageHandler } from "../../../utils/ImageResizer";

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
  button,
  press,
  image,
  number,
  fundingMedia,
  multiImage,
}) => {
  return (
    <>
      {!button ? (
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
      ) : (
        <TouchableOpacity
          onPress={() => press()}
          style={[styles.textinput, styles.imagebutton]}
        >
          {!multiImage ? (
            <View>
              {!fundingMedia ? (
                <Text style={styles.text}>
                  {image ? "Image Selected" : placeholder}
                </Text>
              ) : (
                <Text style={styles.text}>
                  {fundingMedia ? "Video Selected" : placeholder}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.text}>
              {multiImage ? "Image Selected" : placeholder}
            </Text>
          )}
          <View>
            <AttachmentSVG />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export const FundBusinessForm = ({ navigation, route }) => {
  const mediaLibraryAsync = async (media) => {
    if (media == "media") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setFundingMedia(result.uri);
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setImage(await resizeImageHandler(result.uri));
      }
    }
  };

  const multipleImages = async (media) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setSupportImages(await resizeImageHandler(result.uri));
    }
  };

  const {
    formdata,

    editMode,
    editData,
    id,
  } = route.params;

  const { fixedTitles } = useContext(AppContext);

  const [aboutCompany, setAboutCompany] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const aboutArray = ["test", "test2"];
  const [loading, setLoading] = useState(false);

  const [projectTypeId, setProjectTypeId] = useState(
    editMode ? editData.project_type_id : ""
  );
  const [companyDomainId, setCompanyDomainId] = useState(
    editMode ? editData?.company_domain_id : null
  );
  const [companyTypeId, setCompanyTypeId] = useState(
    editMode ? editData?.company_type_id : null
  );
  const [image, setImage] = useState(
    editMode ? editData?.image_absolute_url : null
  );
  const [fundingMedia, setFundingMedia] = useState(null);
  const [governatesId, setGovernatesId] = useState(
    editMode ? editData?.governate_id : null
  );
  const [districtsId, setDistrictsId] = useState(
    editMode ? editData?.district_id : null
  );

  const [targetMoney, setTargetMoney] = useState(
    editMode ? editData?.target_amount : ""
  );

  const [projectTypeError, setProjectTypeError] = useState(null);
  const [companyDomainError, setCompanyDomainError] = useState(null);
  const [companyTypeError, setCompanyTypeError] = useState(null);
  const [governatesError, setGovernatesError] = useState(null);
  const [districtsError, setDistrictsError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  let projectTypeOptions = [];
  let companyDomainOptions = [];
  let companyTypeOptions = [];

  let governatesOptions = [];
  let districtsOptions = [];

  let projectTypeID = [];
  let companyDomainID = [];
  let companyTypeID = [];

  let governatesID = [];
  let districtsID = [];

  let grantOptions = [];
  let grandOptionsId = [];

  const [grantTypeId, setGrantTypeId] = useState(null);

  const [grantIdError, setGrantIdError] = useState(null);

  const [supportImages, setSupportImages] = useState(null);

  useEffect(() => {
    fixedTitles.grant.map((data) => {
      grantOptions.push(data.title);
      grandOptionsId.push(data.id);
    });

    fixedTitles.projectType.map((data) => {
      projectTypeOptions.push(data.title);
      projectTypeID.push(data.id);
    });
    fixedTitles.companyDomain.map((data) => {
      companyDomainOptions.push(data.title);
      companyDomainID.push(data.id);
    });
    fixedTitles.companyType.map((data) => {
      companyTypeOptions.push(data.title);
      companyTypeID.push(data.id);
    });

    fixedTitles.governates.map((data) => {
      governatesOptions.push(data.title);
      governatesID.push(data.id);
      data.districts.map((res) => {
        if (governatesId === res.governate_id) {
          districtsOptions.push(res.title);
          districtsID.push(res.id);
        }
      });
    });
  }, [
    projectTypeOptions,
    companyTypeId,
    companyDomainId,
    districtsOptions,
    governatesId,
    districtsId,
  ]);

  const closeHandler = () => {
    setModalVisible(false);
    navigation.navigate("singleFunding");
  };

  const addFundingHandler = (
    name,
    company,
    about,
    village,
    address,
    experience,
    emplyeesCount,
    moneyUse,
    products,
    errors
  ) => {
    setLoading(true);

    formdata.append("company_type_id", companyTypeId);
    formdata.append("company_domain_id", companyDomainId);
    formdata.append("project_type_id", projectTypeId);
    formdata.append("years_of_experience", experience);
    formdata.append("village", village);
    formdata.append("target_amount", targetMoney);
    formdata.append("products", products);
    formdata.append("purpose_of_grant", moneyUse);
    formdata.append("company_type_id", companyTypeId);
    formdata.append("company_domain_id", companyDomainId);
    formdata.append("project_type_id", projectTypeId);
    formdata.append("governate_id", governatesId);
    formdata.append("district_id", districtsId);
    formdata.append("about", about);
    formdata.append("address", address);
    formdata.append("company", company);
    formdata.append("name", name);
    formdata.append("employees_number", emplyeesCount);

    formdata.append("grant_use_id", grantTypeId);
    if (fundingMedia) {
      formdata.append("video", {
        name: "name.mp4",
        uri: fundingMedia,
        type: "video/mp4",
      });
    }
    if (image) {
      formdata.append("image", {
        uri: image,
        name: "Image",
        type: "Image/jpg",
      });
    }
    if (supportImages) {
      formdata.append("supporting_documents[]", {
        uri: supportImages,
        name: "Image",
        type: "Image/jpg",
      });
    }

    if (!editMode) {
      setLoading(true);
      setGrantIdError(null);
      addFunding(formdata)
        .then((res) => {
          setModalVisible(true);
        })
        .catch((err) => {
          if (err.response.data.errors.name) {
            errors.name = err.response.data.errors.name;
          }
          if (err.response.data.errors.company) {
            errors.company = err.response.data.errors.company;
          }
          if (err.response.data.errors.about) {
            errors.about = err.response.data.errors.about;
          }
          if (err.response.data.errors.employees_number) {
            errors.emplyeesCount = err.response.data.errors.employees_number;
          }
          if (err.response.data.errors.purpose_of_grant) {
            errors.purpose_of_grant = err.response.data.errors.purpose_of_grant;
          }
          if (err.response.data.errors.products) {
            errors.products = err.response.data.errors.products;
          }
          if (err.response.data.errors.years_of_experience) {
            errors.experience = err.response.data.errors.years_of_experience;
          }
          if (err.response.data.errors.village) {
            errors.village = err.response.data.errors.village;
          }
          if (err.response.data.errors.target_amount) {
            errors.targetMoney = err.response.data.errors.target_amount;
          }
          if (err.response.data.errors.address) {
            errors.address = err.response.data.errors.address;
          }
          if (err.response.data.errors.governate_id) {
            setGovernatesError(err.response.data.errors.governate_id);
          }
          if (err.response.data.errors.district_id) {
            setDistrictsError(err.response.data.errors.district_id);
          }
          if (err.response.data.errors.company_domain_id) {
            setCompanyDomainError(err.response.data.errors.company_domain_id);
          }
          if (err.response.data.errors.company_type_id) {
            setCompanyTypeError(err.response.data.errors.company_type_id);
          }
          if (err.response.data.errors.project_type_id) {
            setProjectTypeError(err.response.data.errors.project_type_id);
          }
          if (err.response.data.errors.image) {
            setImageError(err.response.data.errors.image);
          }
          if (err.response.data.errors.video) {
            setVideoError(err.response.data.errors.video);
          }
          if (err.response.data.errors.grant_use_id) {
            setGrantIdError(err.response.data.errors.grant_use_id);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (editMode) {
      setLoading(true);

      updateFunding(id, formdata)
        .then((res) => {
          setModalVisible(true);
        })
        .catch((err) => {
          if (err.response.data.errors.name) {
            errors.name = err.response.data.errors.name;
          }
          if (err.response.data.errors.company) {
            errors.company = err.response.data.errors.company;
          }
          if (err.response.data.errors.about) {
            errors.about = err.response.data.errors.about;
          }
          if (err.response.data.errors.employees_number) {
            errors.emplyeesCount = err.response.data.errors.employees_number;
          }

          if (err.response.data.errors.products) {
            errors.products = err.response.data.errors.products;
          }
          if (err.response.data.errors.years_of_experience) {
            errors.experience = err.response.data.errors.years_of_experience;
          }
          if (err.response.data.errors.village) {
            errors.village = err.response.data.errors.village;
          }
          if (err.response.data.errors.target_amount) {
            errors.targetMoney = err.response.data.errors.target_amount;
          }
          if (err.response.data.errors.address) {
            errors.address = err.response.data.errors.address;
          }
          if (err.response.data.errors.governate_id) {
            setGovernatesError(err.response.data.errors.governate_id);
          }
          if (err.response.data.errors.district_id) {
            setDistrictsError(err.response.data.errors.district_id);
          }
          if (err.response.data.errors.company_domain_id) {
            setCompanyDomainError(err.response.data.errors.company_domain_id);
          }
          if (err.response.data.errors.company_type_id) {
            setCompanyTypeError(err.response.data.errors.company_type_id);
          }
          if (err.response.data.errors.project_type_id) {
            setProjectTypeError(err.response.data.errors.project_type_id);
          }
          if (err.response.data.errors.image) {
            setImageError(err.response.data.errors.image);
          }
          if (err.response.data.errors.video) {
            setVideoError(err.response.data.errors.video);
          }
          if (err.response.data.errors.grant_use_id) {
            setGrantIdError(err.response.data.errors.grant_use_id);
          }
          if (err.response.data.errors.purpose_of_grant) {
            errors.purpose_of_grant = err.response.data.errors.purpose_of_grant;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <Header
          title={fixedTitles.funding["about-the-work"].title}
          red
          navigation={navigation}
        />
        <Formik
          initialValues={{
            name: editMode ? editData?.name : "",
            company: editMode ? editData?.company : "",
            about: editMode ? editData.about : "",
            companyAdress: editMode ? editData?.address : "",
            experience: editMode ? editData?.years_of_experience : "",
            emplyeesCount: editMode ? editData?.employees_number : "",
            products: editMode ? editData?.products : "",
            money_use: editMode ? editData?.money_use : "",
            village: editMode ? editData?.village : "",
            address: editMode ? editData?.address : "",
            about: editMode ? editData?.about : "",
            targetMoney: editMode ? editData?.target_amount : "",
          }}
        >
          {({ handleChange, values, errors, resetForm }) => (
            <ScrollView
              scrollEnabled={loading == true ? false : true}
              pointerEvents={loading ? "none" : "auto"}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 60 }}
            >
              <View style={[styles.loader, loading && { width: "100%" }]}>
                <ActivityIndicator
                  color={colors.dark_blue}
                  animating={loading}
                  size="large"
                />
              </View>
              <>
                <Input
                  placeholder={fixedTitles.funding["activity-name"].title}
                  value={values.name}
                  handleChange={handleChange("name")}
                />
                {errors.name && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.name}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["company-name"].title}
                  value={values.company}
                  handleChange={handleChange("company")}
                />
                {errors.company && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.company}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={companyTypeOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={fixedTitles.funding["company-type"].title}
                  onSelect={(item) => {
                    setCompanyTypeId(companyTypeID[item]);
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
                {companyTypeError && (
                  <View style={styles.error}>
                    <Typography
                      content={companyTypeError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={companyDomainOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={fixedTitles.funding["company-domain"].title}
                  onSelect={(item) => {
                    setCompanyDomainId(companyDomainID[item]);
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
                {companyDomainError && (
                  <View style={styles.error}>
                    <Typography
                      content={companyDomainError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <ModalDropdown
                  options={projectTypeOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={fixedTitles.funding["project-type"].title}
                  onSelect={(item) => {
                    setProjectTypeId(projectTypeID[item]);
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
                {projectTypeError && (
                  <View style={styles.error}>
                    <Typography
                      content={projectTypeError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["about-project"].title}
                  multi
                  value={values.about}
                  handleChange={handleChange("about")}
                />
                {errors.about && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.about}
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
                  defaultValue={fixedTitles.funding["governates"].title}
                  onSelect={(item) => {
                    setGovernatesId(governatesID[item]);
                    setDistrictsId(null);
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
                {governatesError && (
                  <View style={styles.error}>
                    <Typography
                      content={governatesError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
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
                  defaultValue={fixedTitles.funding["districts"].title}
                  onSelect={(item) => {
                    setDistrictsId(districtsID[item]);
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
                {districtsError && (
                  <View style={styles.error}>
                    <Typography
                      content={districtsError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["village"].title}
                  value={values.village}
                  handleChange={handleChange("village")}
                />
                {errors.village && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.village}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["address"].title}
                  value={values.address}
                  handleChange={handleChange("address")}
                />
                {errors.address && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.address}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  number
                  placeholder={fixedTitles.funding["experience"].title}
                  value={values.experience}
                  handleChange={handleChange("experience")}
                />
                {errors.experience && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.experience}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  number
                  placeholder={fixedTitles.funding["employees-count"].title}
                  value={values.emplyeesCount}
                  handleChange={handleChange("emplyeesCount")}
                />
                {errors.emplyeesCount && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.emplyeesCount}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  multi
                  placeholder={fixedTitles.funding["about-your-products"].title}
                  value={values.products}
                  handleChange={handleChange("products")}
                />
                {errors.products && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.products}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                {/* <Input
                  number
                  placeholder="ما هو المبلغ الذي انت بحاجة إليه"
                  value={values.targetMoney}
                  handleChange={handleChange("targetMoney")}
                /> */}
                <MaskedInput
                  placeholder={fixedTitles.funding["target-money"].title}
                  value={targetMoney}
                  mask={"money"}
                  options={{
                    precision: 0,
                    separator: ",",
                    delimiter: ",",
                    unit: "$",
                    suffixUnit: "",
                  }}
                  setAmount={setTargetMoney}
                />
                {errors.targetMoney && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.targetMoney}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["upload-a-picture"].title}
                  button
                  image={image}
                  press={() => mediaLibraryAsync()}
                />
                {imageError && (
                  <View style={styles.error}>
                    <Typography
                      content={imageError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.funding["upload-a-video"].title}
                  button
                  fundingMedia={fundingMedia}
                  press={() => mediaLibraryAsync("media")}
                />
                {videoError && (
                  <View style={styles.error}>
                    <Typography
                      content={videoError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <Input
                placeholder={
                  fixedTitles.funding["upload-supporting-documents"].title
                }
                button
                multiImage={supportImages}
                press={() => multipleImages()}
              />
              <>
                <ModalDropdown
                  options={grantOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={
                    fixedTitles.funding["why-you-need-the-funding"].title
                  }
                  onSelect={(item) => {
                    setGrantTypeId(grandOptionsId[item]);
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
                {grantIdError && (
                  <View style={styles.error}>
                    <Typography
                      content={grantIdError}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>
              <>
                <Input
                  multi
                  placeholder={fixedTitles.funding["money-use"].title}
                  value={values.money_use}
                  handleChange={handleChange("money_use")}
                />
                {errors.purpose_of_grant && (
                  <View style={styles.error}>
                    <Typography
                      content={errors.purpose_of_grant}
                      color="red"
                      size={12}
                      align="left"
                    />
                  </View>
                )}
              </>

              <View>
                <TouchableOpacity
                  onPress={() =>
                    addFundingHandler(
                      values.name,
                      values.company,
                      values.about,
                      values.village,
                      values.address,
                      values.experience,
                      values.emplyeesCount,

                      values.money_use,
                      values.products,
                      errors
                    )
                  }
                  style={styles.button}
                >
                  <Typography
                    content={fixedTitles.funding["submit"].title}
                    color={colors.white}
                    size={16}
                    align="center"
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
        <CenteredModal
          visible={modalVisible}
          loading={false}
          red
          funding
          editMode
          close={() => closeHandler()}
          messageSent={true}
          messageJSX={
            editMode
              ? fixedTitles.funding["editing-waiting-approval"].title
              : fixedTitles.funding["we-will-get-back-to-you-about-ur-funding"]
                  .title
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

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
    height: 137,
    textAlignVertical: "top",
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
    alignSelf: "center",
    zIndex: 1000,
    elevation: 10,
    top: "70%",
  },
  error: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  text: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
  },
  imagebutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
