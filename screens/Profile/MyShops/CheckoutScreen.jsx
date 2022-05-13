import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import BlueAlertSVG from "../../../SVGR/Globals/BlueAlert";
import TimeFrameSVG from "../../../SVGR/Globals/TimeFrame";
import { createOrder, getCart, getVillages } from "../../../api/Shop";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import AppContext from "../../../appContext/AppContext";
let villageOptions = [];
let villageOptionsId = [];
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
          multiline={multi}
          placeholderTextColor={colors.dark_blue}
          style={[styles.textinput, multi && styles.multi]}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleChange(text)}
          autoCorrect={false}
          keyboardType={number ? "number-pad" : "default"}
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
export const CheckoutScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const { fixedTitles, userData, setCartStatus, cartStatus, deliveryDuration } =
    useContext(AppContext);

  const [name, setName] = useState(userData?.full_name || null);
  const [email, setEmail] = useState(userData?.email || null);
  const [phone, setPhone] = useState(userData?.phone_number || null);
  const [village, setVillage] = useState(null);
  const [address, setAddress] = useState(null);
  const [about, setAbout] = useState(null);
  const [governatesId, setGovernatesId] = useState(null);
  const [districtsId, setDistrictsId] = useState(null);

  const [governateIdError, setGovernateIdError] = useState(null);
  const [districtIdError, setDistrictIdError] = useState(null);

  const [villageError, setVillageError] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  let governatesOptions = [];
  let governatesOptionsId = [];
  let districtsOptions = [];
  let districtsOptionsId = [];

  useEffect(() => {
    fixedTitles.governates.map((data) => {
      governatesOptions.push(data.title);
      governatesOptionsId.push(data.id);
      data.districts.map((res) => {
        if (governatesId === res.governate_id) {
          districtsOptions.push(res.title);
          districtsOptionsId.push(res.id);
        }
      });
    });
  }, [districtsOptionsId, governatesOptionsId]);

  const getCartStatusHandler = async () => {
    getCart()
      .then((res) => {
        setCartStatus(res.data.cart);
      })
      .catch((err) => {});
  };

  const [villageId, setVillageId] = useState();

  const villageHandler = (id) => {
    getVillages(id)
      .then((res) => {
        res.data.villages?.map((data) => {
          villageOptions.push(data.title);
          villageOptionsId.push(data.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckout = () => {
    setVillageError(null);
    setGovernateIdError(null);
    setDistrictIdError(null);
    let fd = new FormData();
    if (name) {
      fd.append("name", name);
    }
    if (email) {
      fd.append("email", email);
    }
    if (phone) {
      fd.append("phone", phone);
    }
    fd.append("governate_id", governatesId);
    fd.append("district_id", districtsId);
    if (villageId) {
      fd.append("village_id", villageId);
    }
    if (address) {
      fd.append("address", address);
    }
    fd.append("note", about);

    setLoading(true);
    createOrder(fd)
      .then((res) => {
        getCartStatusHandler().then(() => {
          navigation.navigate("store");
        });
      })
      .catch((err) => {
        if (err.response.data.errors.district_id) {
          setDistrictIdError(err.response.data.errors.district_id);
        }
        if (err.response.data.errors.governate_id) {
          setGovernateIdError(err.response.data.errors.governate_id);
        }
        if (err.response.data.errors.address) {
          setAddressError(err.response.data.errors.address);
        }
        if (err.response.data.errors.village_id) {
          setVillageError(err.response.data.errors.village_id);
        }

        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name);
        }
        if (err.response.data.errors.phone) {
          setPhoneError(err.response.data.errors.phone);
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let hours = fixedTitles?.shopTitles["checkout-delivery-alert"]?.title;
  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 10 : 0, elevation: loading ? 10 : 0 },
        ]}
      >
        <ActivityIndicator
          color={colors.focused}
          size="large"
          animating={loading}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <Header title="الخروج" blue navigation={navigation} />
            <View style={{ marginHorizontal: 20 }}>
              <Typography
                content="تفاصيل"
                color={colors.focused}
                align="left"
                size={16}
                bold
              />
              <>
                <Input
                  placeholder="الاسم الكامل"
                  value={name}
                  handleChange={(text) => setName(text)}
                />
                {nameError && (
                  <Typography content={nameError} color="red" align="left" />
                )}
              </>
              <>
                <Input
                  placeholder="البريد الإلكتروني"
                  value={email}
                  handleChange={(text) => setEmail(text)}
                />
                {emailError && (
                  <Typography content={emailError} color="red" align="left" />
                )}
              </>
              <>
                <Input
                  placeholder="الهاتف"
                  value={phone}
                  handleChange={(text) => setPhone(text)}
                  number
                />
                {phoneError && (
                  <Typography content={phoneError} color="red" align="left" />
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
                  defaultValue={fixedTitles.shopTitles["governorate"].title}
                  onSelect={(item) => {
                    setGovernatesId(governatesOptionsId[item]);
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
                {districtIdError && (
                  <Typography
                    content={districtIdError}
                    color="red"
                    align="left"
                  />
                )}
              </>
              <>
                <ModalDropdown
                  disabled={governatesId == null ? true : false}
                  options={districtsOptions}
                  dropdownStyle={styles.dropdownStyles}
                  isFullWidth
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.containerStyles,
                    // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                  ]}
                  textStyle={styles.label}
                  defaultValue={fixedTitles.shopTitles["shop-district"].title}
                  onSelect={(item) => {
                    villageHandler(districtsOptionsId[item]);
                    setDistrictsId(districtsOptionsId[item]);
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
                {governateIdError && (
                  <Typography
                    content={governateIdError}
                    color="red"
                    align="left"
                  />
                )}
              </>
              <>
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
                  defaultValue={"village"}
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
                {villageError && (
                  <Typography content={villageError} color="red" align="left" />
                )}
              </>
              <>
                <Input
                  placeholder={fixedTitles.shopTitles["shop-location"].title}
                  value={address}
                  handleChange={(text) => setAddress(text)}
                />
                {addressError && (
                  <Typography content={addressError} color="red" align="left" />
                )}
              </>
              <Input
                placeholder={fixedTitles.shopTitles["notes"].title}
                multi
                value={about}
                handleChange={(text) => setAbout(text)}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: 10 }}>
                  <BlueAlertSVG />
                </View>
                <View>
                  <Typography
                    align="left"
                    content={
                      fixedTitles.shopTitles[
                        "shop-owner-is-responsible-for-the-delivery"
                      ].title
                    }
                    color={colors.dark_blue}
                    size={16}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: 10 }}>
                  <BlueAlertSVG />
                </View>
                <View>
                  <Typography
                    align="left"
                    content={
                      fixedTitles.shopTitles[
                        "shop-owner-will-get-back-to-you-to-confirm-your-order"
                      ].title
                    }
                    color={colors.dark_blue}
                    size={16}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: 10 }}>
                  <TimeFrameSVG />
                </View>
                <View style={{ width: "80%" }}>
                  <Typography
                    align="left"
                    content={hours.replace("HOURS", deliveryDuration)}
                    color={colors.focused}
                    size={16}
                    fit
                    lines={1}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCheckout()}
                >
                  <Typography
                    content={fixedTitles.shopTitles["buy-now"].title}
                    color={colors.white}
                    size={16}
                    align="center"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
    height: 157,
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
    marginTop: 20,

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
