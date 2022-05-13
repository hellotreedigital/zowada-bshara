import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  I18nManager,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../../components/Header/Header";
import { TextInputMask } from "react-native-masked-text";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import ModalDropdown from "react-native-modal-dropdown";
import AppContext from "../../../appContext/AppContext";
import Typography from "../../../components/Typography/Typography";
import ExpoCheckbox from "expo-checkbox";
import { requestWithdrawal } from "../../../api/Profile/Profile";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";

const Input = ({ value, setValue, placeholder, multi }) => {
  return (
    <TextInput
      style={[styles.textinput, multi && styles.multi]}
      placeholder={placeholder}
      value={value}
      placeholderTextColor={colors.dark_blue}
      multiline={multi ? true : false}
      onChangeText={(text) => setValue(text)}
    />
  );
};
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

const WithdrawScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { fixedTitles } = useContext(AppContext);
  let paymentArray = [];
  let paymentIds = [];
  useEffect(() => {
    fixedTitles.withdrawalTitles.map((data) => {

      paymentArray.push(data.title);
      paymentIds.push(data.id);
    });
  }, [paymentArray]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [about, setAbout] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [amountError, setAmountError] = useState(null);
  const [termsError, setTermsError] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const closeHandler = () => {
    setModalVisible(false);
    navigation.pop();
  };

  const resetState = () => {
    setAmountError(null);
    setTermsError(null);
    setPaymentError(null);
  };

  const withdrawHandler = () => {
    setLoading(true);
    resetState();
    let formdata = new FormData();

    formdata.append("withdrawal_payment_type_id", paymentMethod);
    formdata.append("withdrawal_account_type_id", id);
    formdata.append("information", about);
    formdata.append("terms", termsAccepted === true ? 1 : 0);
    formdata.append("amount", amount);
    requestWithdrawal(formdata)
      .then((res) => {
        setModalVisible(true);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        setAmountError(
          err.response.data?.errors?.amount && err.response.data.errors.amount
        );
        setPaymentError(
          err.response.data.errors?.withdrawal_account_type_id &&
            err.response.data.errors?.withdrawal_account_type_id
        );
        setTermsError(
          err.response.data.errors?.terms && err.response.data.errors.terms
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header red navigation={navigation} title="طلب السحب" />
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 10 : 0, elevation: loading ? 10 : 0 },
        ]}
      >
        <ActivityIndicator
          color={colors.dark_blue}
          size="large"
          animating={loading}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <MaskedInput
            value={amount}
            mask={"money"}
            options={{
              precision: 0,
              separator: ",",
              delimiter: ",",
              unit: id == 1 ? "USD " : " LBP ",
              suffixUnit: "",
            }}
            placeholder="المبلغ"
            setAmount={setAmount}
          />
          <View style={styles.error}>
            {amountError && (
              <Typography
                content={amountError}
                color={colors.focused}
                size={12}
                align="left"
              />
            )}
          </View>
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
              console.log(paymentIds)
              setPaymentMethod(paymentIds[item]);
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
          <View style={styles.error}>
            {paymentError && (
              <Typography
                content={paymentError}
                color={colors.focused}
                size={12}
                align="left"
              />
            )}
          </View>
        </>
        <Input
          placeholder="معلومات عن السحب"
          multi
          value={about}
          setValue={setAbout}
        />
        <>
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={styles.row}
          >
            <View style={styles.checkBox}>
              <ExpoCheckbox
                style={styles.checkbox}
                value={termsAccepted}
                color={colors.dark_blue}
                onValueChange={setTermsAccepted}
              />
            </View>
            <View style={{ width: "90%" }}>
              <Typography
                align="left"
                size={12}
                color={colors.dark_blue}
                content="تسجيل الدخول إلى هذا التطبيق يعني أنك توافق على على شروط الخدمة كما يعنني موافقتك على تمكين أعضاء التطبيق من معالجة بياناتك الشخصية بموجب سياسة الخصوصية "
              />
            </View>
          </TouchableOpacity>
          <View style={styles.error}>
            {termsError && (
              <Typography
                content={termsError}
                color={colors.focused}
                size={12}
                align="left"
              />
            )}
          </View>
        </>
        <View>
          <TouchableOpacity
            onPress={() => withdrawHandler()}
            style={styles.button}
          >
            <Typography
              content="إرسل"
              color={colors.white}
              align="center"
              size={16}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CenteredModal
        visible={modalVisible}
        loading={false}
        red
        messageSent={true}
        messageJSX={
          fixedTitles.profileTitles["withdrawal-waiting-approval"].title
        }
        funding
        editMode
        close={() => closeHandler()}
      />
    </SafeAreaView>
  );
};

export default WithdrawScreen;

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
  row: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 10,
  },
  checkBox: {
    marginRight: 0,
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
    marginTop: 20,
  },
  error: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    zIndex: 10,
    elevation: 10,
    width: "100%",
    height: "100%",
  },
});
