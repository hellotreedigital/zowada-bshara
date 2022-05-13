import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  I18nManager,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { TextInputMask } from "react-native-masked-text";
import Checkbox from "expo-checkbox";
import { CenteredModal } from "../../components/Modals/CenterModal/CenteredModal";
import ModalDropdown from "react-native-modal-dropdown";
import { Formik } from "formik";
import AppContext from "../../appContext/AppContext";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import {
  donateFunding,
  validateDonateFunding,
} from "../../api/Funding/Funding";
import PhonePicker from "../../components/PhonePicker/PhonePicker";

const Input = ({ placeholder, multi, value, handleChange, number, mobile }) => {
  return (
    <TextInput
      multiline={multi ? true : false}
      placeholderTextColor={colors.dark_blue}
      style={[styles.textinput, multi && styles.multi, mobile && styles.mobile]}
      placeholder={placeholder}
      autoCorrect={false}
      value={value}
      onChangeText={handleChange}
      keyboardType={number ? "number-pad" : "default"}
    />
  );
};

const MaskedInput = ({
  placeholder,
  mask,
  options,
  small,
  value,
  handleChange,
  normal,
  setAmount,
  amount,
}) => {
  return (
    <View>
      {!normal ? (
        <TextInputMask
          placeholderTextColor={colors.dark_blue}
          style={[styles.textinput, small && styles.small]}
          placeholder={placeholder}
          type={mask}
          options={options}
          value={value}
          onChangeText={handleChange}
        />
      ) : (
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
      )}
    </View>
  );
};

const CustomForm = ({
  setPaymentMehod,
  values,
  handleChange,
  paymentArray,
  paymentMethod,
  setAmount,
  amount,
  errors,
  paymentError,
  nameError,
  phoneError,
  emailError,
  amountError,
  paymentIds,
  fixedTitles,
  genderOptions,
  genderIdOptions,
  setGender,
  gender,
  nationIdOptions,
  nationOptions,
  setNation,
  genderError,
  nationError,
  ageError,
}) => {
  return (
    <View>
      <>
        <MaskedInput
          placeholder={fixedTitles.funding["price"].title}
          mask={"money"}
          options={{
            precision: 0,
            separator: ",",
            delimiter: ",",
            unit: "$",
            suffixUnit: "",
          }}
          value={amount}
          setAmount={setAmount}
          normal
        />
        {amountError && (
          <View style={styles.error}>
            <Typography
              content={amountError}
              color="red"
              size={12}
              align="left"
            />
          </View>
        )}
      </>
      <>
        <Input
          placeholder={fixedTitles.funding["full-name"].title}
          value={values.name}
          handleChange={handleChange("name")}
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
          options={genderOptions}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerStyles,
            // { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={"الجنس"}
          onSelect={(item) => {
            setGender(genderIdOptions[item]);
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
        <ModalDropdown
          options={nationOptions}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerStyles,
            // { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={"الجنسية"}
          onSelect={(item) => {
            setNation(nationIdOptions[item]);
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
        {nationError && (
          <View style={styles.error}>
            <Typography
              content={nationError}
              color="red"
              size={12}
              align="left"
            />
          </View>
        )}
      </>
      <>
        <Input
          placeholder={`العمر`}
          value={values.age}
          handleChange={handleChange("age")}
          number
        />
        {ageError && (
          <View style={styles.error}>
            <Typography content={ageError} color="red" size={12} align="left" />
          </View>
        )}
      </>
      <>
        <Input
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
        <View style={[styles.row, styles.phone]}>
          <Input
            number
            mobile
            placeholder={fixedTitles.funding["phone"].title}
            value={values.phone}
            handleChange={handleChange("phone")}
          />
          <>
            <PhonePicker />
          </>
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
        <ModalDropdown
          options={paymentArray}
          dropdownStyle={styles.dropdownStyles}
          isFullWidth
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerStyles,
            // { marginBottom: errorObject.errorVisible ? 0 : 15 },
          ]}
          textStyle={styles.label}
          defaultValue={fixedTitles.funding["payment-method"].title}
          onSelect={(item) => {
            setPaymentMehod(paymentIds[item]);
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
        {paymentError && (
          <View style={styles.error}>
            <Typography
              content={paymentError}
              color="red"
              size={12}
              align="left"
            />
          </View>
        )}
      </>
      <Input
        placeholder={fixedTitles.funding["message"].title}
        multi
        value={values.message}
        handleChange={handleChange("message")}
      />
    </View>
  );
};

const PaymentForm = ({
  navigation,
  setModalVisible,
  isAccepted,
  setIsAccepted,
  values,
  paymentMethod,
  id,
  amount,
  errors,
  nameError,
  setNameError,
  emailError,
  setEmailError,
  setPaymentError,
  paymentError,
  phoneError,
  setPhoneError,
  setAmountError,
  amountError,
  fixedTitles,
  gender,
  nation,
  setNationError,
  setGenderError,
  setAgeError,
  country,
}) => {
  const donateHandler = (values) => {
    // setModalVisible(true);

    // to be fixed later

    // only if card

    let mobile = country.callingCode[0] + values.phone;

    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("phone", mobile);
    formdata.append("payment_type_id", paymentMethod);
    formdata.append("message", values.message);
    formdata.append("amount", amount);
    formdata.append("nationality_id", nation);
    formdata.append("gender_id", gender);
    formdata.append("age", values.age);
    //reset state
    setAmountError(null);
    setEmailError(null);
    setNameError(null);
    setPhoneError(null);
    setPaymentError(null);
    setGenderError(null);
    setNationError(null);
    setAgeError(null);

    validateDonateFunding(id, formdata)
      .then((res) => {
        // setModalVisible(true);
        if (paymentMethod == 2) {
          navigation.navigate("PaymentGateWay", {
            formdata,
            id,
            endpoint: `donation/${id}/pay`,
            type: "donate",
          });
        } else {
          setModalVisible(true);
        }
      })
      .catch((err) => {
        if (err.response.data.errors.amount) {
          setAmountError(err.response.data.errors.amount);
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email);
        }
        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name);
        }
        if (err.response.data.errors.phone) {
          setPhoneError(err.response.data.errors.phone);
        }
        if (err.response.data.errors.payment_type_id) {
          setPaymentError(err.response.data.errors.payment_type_id);
        }
        if (err.response.data.errors.nationality_id) {
          setNationError(err.response.data.errors.nationality_id);
        }
        if (err.response.data.errors.gender_id) {
          setGenderError(err.response.data.errors.gender_id);
        }
        if (err.response.data.errors.age) {
          setAgeError(err.response.data.errors.age);
        }
      })
      .finally(() => {});
  };

  return (
    <View>
      <View style={[styles.row, styles.footer]}>
        <View>
          <Checkbox
            value={isAccepted}
            onValueChange={setIsAccepted}
            style={styles.checkbox}
            color={colors.dark_blue}
          />
        </View>
        <TouchableOpacity onPress={() => setIsAccepted(!isAccepted)}>
          <Typography
            content={fixedTitles.funding["accept-terms"].title}
            color={colors.dark_blue}
            align="left"
            size={14}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => donateHandler(values)}
          style={styles.button}
        >
          <Typography
            content={fixedTitles.funding["donate-now"].title}
            size={16}
            color={"white"}
            align="center"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const DonateScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentMethod, setPaymentMehod] = React.useState(null);
  const [isAccepted, setIsAccepted] = React.useState(null);
  const { id } = route.params;
  const { fixedTitles, country } = useContext(AppContext);
  const [amount, setAmount] = React.useState(null);

  const [amountError, setAmountError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [phoneError, setPhoneError] = React.useState(null);
  const [paymentError, setPaymentError] = React.useState(null);

  let paymentArray = [];
  let paymentIds = [];
  const closeModalHandler = () => {
    setModalVisible(false);
    navigation.navigate("singleFunding");
  };

  let genderOptions = [];
  let genderIdOptions = [];

  let nationOptions = [];
  let nationIdOptions = [];

  const [gender, setGender] = React.useState(null);

  const [nation, setNation] = React.useState(null);

  const [genderError, setGenderError] = React.useState(null);
  const [nationError, setNationError] = React.useState(null);

  const [ageError, setAgeError] = React.useState(null);

  useEffect(() => {
    fixedTitles.sex.map((data) => {
      genderOptions.push(data.title);
      genderIdOptions.push(data.id);
    });

    fixedTitles.nation.map((data) => {
      nationOptions.push(data.title);
      nationIdOptions.push(data.id);
    });

    fixedTitles.paymentType.map((data) => {
      paymentArray.push(data.title);
      paymentIds.push(data.id);
    });
  }, [paymentArray]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Header
          title={fixedTitles.funding["donate"].title}
          red
          navigation={navigation}
        />
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
            cardName: "",
            cardNumber: "",
            cardDate: "",
            cardCode: "",
            age: "",
          }}
        >
          {({ handleChange, values, errors }) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <CustomForm
                setPaymentMehod={setPaymentMehod}
                handleChange={handleChange}
                values={values}
                paymentArray={paymentArray}
                paymentMethod={paymentMethod}
                setAmount={setAmount}
                amount={amount}
                errors={errors}
                paymentError={paymentError}
                phoneError={phoneError}
                emailError={emailError}
                nameError={nameError}
                amountError={amountError}
                paymentIds={paymentIds}
                fixedTitles={fixedTitles}
                genderOptions={genderOptions}
                genderIdOptions={genderIdOptions}
                gender={gender}
                setGender={setGender}
                nationOptions={nationOptions}
                nationIdOptions={nationIdOptions}
                setNation={setNation}
                genderError={genderError}
                nationError={nationError}
                ageError={ageError}
              />
              <PaymentForm
                isAccepted={isAccepted}
                setIsAccepted={setIsAccepted}
                navigation={navigation}
                setModalVisible={setModalVisible}
                handleChange={handleChange}
                values={values}
                paymentMethod={paymentMethod}
                id={id}
                amount={amount}
                errors={errors}
                setPaymentError={setPaymentError}
                setPhoneError={setPhoneError}
                setEmailError={setEmailError}
                setNameError={setNameError}
                setAmountError={setAmountError}
                fixedTitles={fixedTitles}
                nation={nation}
                gender={gender}
                setGenderError={setGenderError}
                setAgeError={setAgeError}
                setNationError={setNationError}
                country={country}
              />
            </ScrollView>
          )}
        </Formik>
        <CenteredModal
          visible={modalVisible}
          loading={false}
          messageSent
          messageJSX={fixedTitles.funding["thanks-for-your-donation"].title}
          close={() => closeModalHandler()}
          red
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
  small: {
    width: SCREEN_WIDTH * 0.41,
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 15,
  },
  label: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  footer: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  checkbox: {
    marginVertical: SCREEN_HEIGHT * 0.012,
    marginRight: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.012,
    width: SCREEN_HEIGHT * 0.012,
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
    alignSelf: "center",
    elevation: 5,
    marginVertical: 25,
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
  formLabel: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  error: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  mobile: {
    width: SCREEN_WIDTH * 0.77,
  },
  phone: {
    justifyContent: "space-evenly",
  },
});
