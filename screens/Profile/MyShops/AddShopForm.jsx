import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  I18nManager,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ViewBase,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ModalDropdown from "react-native-modal-dropdown";
import AppContext from "../../../appContext/AppContext";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import Typography from "../../../components/Typography/Typography";
import AttachmentSVG from "../../../SVGR/Globals/Attachment";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";
import { ShopPrimaryModal } from "../../../components/Modals/CenterModal/ShopPrimaryModal";
import { useForm, Controller } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from "expo-image-picker";
import { createShop, editShop, getVillages } from "../../../api/Shop";
import { resizeImageHandler } from "../../../utils/ImageResizer";
let villageOptions = [];
let villageOptionsId = [];
("");
const Input = ({
  placeholder,
  multi,
  value,
  handleChange,
  button,
  press,
  image,
  number,
  readonly,
  fundingMedia,
}) => {
  return (
    <>
      {!button ? (
        <TextInput
          editable={!readonly}
          multiline={multi ? true : false}
          placeholderTextColor={colors.dark_blue}
          style={[styles.textinput, multi && styles.multi]}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleChange(text)}
          autoCorrect={false}
          keyboardType={number ? "number-pad" : "default"}
          autoCorrect={false}
        />
      ) : (
        <TouchableOpacity
          onPress={() => press()}
          style={[
            styles.textinput,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View>
            {!fundingMedia ? (
              <Text style={styles.inputText}>
                {image ? "Image Selected" : placeholder}
              </Text>
            ) : (
              <Text style={styles.inputText}>
                {fundingMedia ? "Video Selected" : placeholder}
              </Text>
            )}
          </View>
          <View>
            <AttachmentSVG />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const MaskedInput = ({
  placeholder,
  mask,
  options,
  small,
  value,
  handleChange,
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
      onChangeText={(text, rawText) => handleChange(rawText)}
    />
  );
};
export const AddShopForm = ({ navigation, route }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();

  const [image, setImage] = useState(editMode ? data?.formatted_image : null);
  const [loading, setLoading] = useState(false);
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

  const [governateError, setGovernateError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [shopTypeIdError, setShopTypeIdError] = useState(null);
  const [districtError, setDistrictError] = useState(null);

  const resetState = () => {
    setGovernateError(null);
    setPhoneError(null);
    setImageError(null);
    setShopTypeIdError(null);
    setDistrictError(null);
    setVillageError(null);
  };

  const onSubmit = ({
    name,
    phone,
    village,
    address,
    about,
    deliveryFees,
    deliveryDuration,
  }) => {
    resetState();
    setLoading(true);
    let fd = new FormData();
    if (name) {
      fd.append("name", name);
    }

    fd.append("governate_id", editMode ? data?.governate_id : governatesId);
    fd.append("district_id", editMode ? data?.district_id : districtsId);
    if (villageId) {
      fd.append("village_id", villageId);
    }
    if (address) {
      fd.append("address", address);
    }
    fd.append("shop_type_id", editMode ? data?.shop_type.id : shopTypeId);
    if (phone) {
      fd.append("phone", phone);
    }

    if (about) {
      fd.append("about", about);
    }
    fd.append("delivery_fee", deliveryFees);
    fd.append("delivery_duration", deliveryDuration);
    // if (customMap) {
    //   fd.append("latitude", editMode ? 1 : customMap?.latitude);
    //   fd.append("longitude", editMode ? 1 : customMap?.longitude);
    // }
    if (image) {
      fd.append("image", {
        uri: image,
        name: "Image",
        type: "Image/jpg",
      });
    }

    if (!editMode) {
      createShop(fd)
        .then((res) => {
          setModalVisible(true);
        })
        .catch((err) => {
          if (err.response.data.errors.name) {
            setError("name", {
              type: "manual",
              message: err.response.data.errors.name,
            });
          }
          if (err.response.data.errors.address) {
            setError("address", {
              type: "manual",
              message: err.response.data.errors.address,
            });
          }
          if (err.response.data.errors.delivery_duration) {
            setError("deliveryDuration", {
              type: "manual",
              message: err.response.data.errors.delivery_duration,
            });
          }
          if (err.response.data.errors.delivery_duration) {
            setError("deliveryFees", {
              type: "manual",
              message: err.response.data.errors.delivery_duration,
            });
          }
          if (err.response.data.errors.about) {
            setError("about", {
              type: "manual",
              message: err.response.data.errors.about,
            });
          }
          if (err.response.data.errors.phone) {
            setError("phone", {
              type: "manual",
              message: err.response.data.errors.phone,
            });
          }
          if (err.response.data.errors.village_id) {
            setVillageError(err.response.data.errors.village_id);
          }
          if (err.response.data.errors.district_id) {
            setDistrictError(err.response.data.errors.district_id);
          }
          if (err.response.data.errors.governate_id) {
            setGovernateError(err.response.data.errors.governate_id);
          }
          if (err.response.data.errors.shop_type_id) {
            setShopTypeIdError(err.response.data.errors.shop_type_id);
          }
          if (err.response.data.errors.image) {
            // setError("image", {
            //   type: "manual",
            //   message: err.response.data.errors.image,
            // });
            setImageError(err.response.data.errors.image);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      editShop(id, fd)
        .then((res) => {
          setModalVisible(true);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const { fixedTitles, shopLocationName, customMap } = useContext(AppContext);
  const { editMode, data, id } = route.params;
  let governatesOptions = [];
  let districtsOptions = [];

  let governatesID = [];
  let districtsID = [];
  let shopTypes = [];
  let shopTypesId = [];
  const [governatesId, setGovernatesId] = useState();
  const [districtsId, setDistrictsId] = useState();
  const [shopTypeId, setShopTypeId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    navigation.pop();
  };
  useEffect(() => {
    fixedTitles.shopTypes.map((data) => {
      shopTypes.push(data.title);
      shopTypesId.push(data.id);
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
  }, [districtsOptions, governatesId, districtsId]);

  const [villageId, setVillageId] = useState();
  const [villageError, setVillageError] = useState(null);
  const villageHandler = (id) => {
    getVillages(id)
      .then((res) => {
        console.log(res.data.villages);
        res.data.villages?.map((data) => {
          villageOptions.push(data.title);
          villageOptionsId.push(data.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={[styles.loader, !loading && { zIndex: 0, elevation: 0 }]}>
        <ActivityIndicator
          size="large"
          color={colors.dark_blue}
          animating={loading}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title={
            editMode
              ? fixedTitles.shopTitles["edit-shop"].title
              : fixedTitles.shopTitles["create-shop"].title
          }
          blue
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            defaultValue={data?.name || null}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder={fixedTitles.shopTitles["shop-name"].title}
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.name && (
              <Typography
                color={colors.focused}
                content={errors.name.message}
                align="left"
              />
            )}
          </View>

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
                  ? fixedTitles.governates[data?.governate_id].title
                  : fixedTitles.funding["governates"].title
              }
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
            <View style={{ marginHorizontal: 20 }}>
              {governateError && (
                <Typography
                  color={colors.focused}
                  content={governateError}
                  align="left"
                />
              )}
            </View>
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
              defaultValue={
                editMode
                  ? "District Selected"
                  : fixedTitles.funding["districts"].title
              }
              onSelect={(item) => {
                villageHandler(districtsID[item]);
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
            <View style={{ marginHorizontal: 20 }}>
              {districtError && (
                <Typography
                  color={colors.focused}
                  content={districtError}
                  align="left"
                />
              )}
            </View>
          </>
          <ModalDropdown
            options={villageOptions}
            dropdownStyle={styles.dropdownStyles}
            isFullWidth
            showsVerticalScrollIndicator={false}
            style={[
              styles.containerStyles,
              // { marginBottom: errorObject.errorVisible ? 0 : 15 },
            ]}
            textStyle={styles.label}
            disabled={districtsId == null}
            defaultValue={editMode ? data.village_id : "village"}
            onSelect={(item) => {
              setVillageId(villageOptionsId[item]);
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
          <View style={{ marginHorizontal: 20 }}>
            {errors.village && (
              <Typography
                color={colors.focused}
                content={errors.village.message}
                align="left"
              />
            )}
          </View>
          <Controller
            defaultValue={data?.address || null}
            control={control}
            name="address"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder={fixedTitles.shopTitles["address"].title}
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.address && (
              <Typography
                color={colors.focused}
                content={errors.address.message}
                align="left"
              />
            )}
          </View>
          <>
            <ModalDropdown
              options={shopTypes}
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
                  ? fixedTitles.shopTypes[data?.shop_type_id].title
                  : fixedTitles.shopTitles["shop-type"].title
              }
              onSelect={(item) => {
                setShopTypeId(shopTypesId[item]);
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
            <View style={{ marginHorizontal: 20 }}>
              {shopTypeIdError && (
                <Typography
                  color={colors.focused}
                  content={shopTypeIdError}
                  align="left"
                />
              )}
            </View>
          </>
          {/* <Input placeholder="موقع" readonly value={shopLocationName} /> */}
          {/* <View style={{ marginHorizontal: 20, marginBottom: 7 }}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
              <Text style={styles.text}>استخدام الموقع الحالي</Text>
            </TouchableOpacity>
          </View> */}
          <Controller
            defaultValue={data?.phone || null}
            control={control}
            name="phone"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder={fixedTitles.shopTitles["phone-number"].title}
                number={true}
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.phone && (
              <Typography
                color={colors.focused}
                content={errors.phone.message}
                align="left"
              />
            )}
          </View>
          <>
            <Input
              placeholder={fixedTitles.shopTitles["upload-an-image"].title}
              image={image}
              button
              press={() => mediaLibraryAsync()}
            />
            {imageError && (
              <View style={{ marginHorizontal: 20 }}>
                <Typography
                  color={colors.focused}
                  content={imageError}
                  align="left"
                />
              </View>
            )}
          </>
          <Controller
            defaultValue={data?.about || null}
            control={control}
            name="about"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder={fixedTitles.shopTitles["about"].title}
                multi
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.about && (
              <Typography
                color={colors.focused}
                content={errors.about.message}
                align="left"
              />
            )}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Typography
              content={fixedTitles.shopTitles["delivery-service"].title}
              align="left"
              size={16}
              bold
              color={colors.dark_blue}
            />
          </View>
          <Controller
            defaultValue={data?.delivery_fee || null}
            control={control}
            name="deliveryFees"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <MaskedInput
                mask={"money"}
                options={{
                  precision: 0,
                  separator: ",",
                  delimiter: ",",
                  unit: " LBP ",
                  suffixUnit: "",
                }}
                placeholder={fixedTitles.shopTitles["delivery-fees"].title}
                number={true}
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.deliveryFees && (
              <Typography
                color={colors.focused}
                content={errors.deliveryFees.message}
                align="left"
              />
            )}
          </View>
          <Controller
            defaultValue={data?.delivery_duration || null}
            control={control}
            name="deliveryDuration"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder={
                  editMode
                    ? Number(data?.delivery_duration).toString()
                    : fixedTitles.shopTitles["approx-delivery-to-location"]
                        .title
                }
                number={true}
                value={value}
                handleChange={(text) => onChange(text)}
              />
            )}
          />
          <View style={{ marginHorizontal: 20 }}>
            {errors.deliveryFees && (
              <Typography
                color={colors.focused}
                content={errors.deliveryDuration.message}
                align="left"
              />
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              <Typography
                content={
                  editMode
                    ? fixedTitles.shopTitles["update"].title
                    : fixedTitles.shopTitles["create"].title
                }
                align="center"
                size={16}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ShopPrimaryModal
          visible={modalVisible}
          message="سوف يتم الرد عليك قريبا من قبل عملائنا."
          buttonMessage="واصل التسوق"
          close={() => closeModal()}
          hideBtn={true}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddShopForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  arrowContainer: {
    position: "absolute",
    top: 0,
    alignItems: "flex-end",
    right: 10,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.focused,
    textAlign: !I18nManager.isRTL ? "right" : "left",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.focused,
  },
  inputText: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
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
    alignSelf: "center",
    elevation: 5,
    marginVertical: 20,
  },
  loader: {
    position: "absolute",
    zIndex: 10,
    alignSelf: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    elevation: 9,
    justifyContent: "center",
  },
});
