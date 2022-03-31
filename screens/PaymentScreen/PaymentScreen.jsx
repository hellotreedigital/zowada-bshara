import React, { useState } from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import { TextInputMask } from "react-native-masked-text";
import { CenteredModal } from "../../components/Modals/CenterModal/CenteredModal";

const CustomTextBox = ({
  placeholder,
  multiline,
  editable,
  small,
  mask,
  value,
  handleChange,
  options,
}) => {
  return (
    <View
      style={[
        styles.textInputContainer,
        { width: small && SCREEN_WIDTH * 0.426 },
      ]}
    >
      {mask && (
        <TextInputMask
          style={[
            { width: small ? SCREEN_WIDTH * 0.426 : SCREEN_WIDTH * 0.9 },
            styles.textinput,
            multiline && { height: SCREEN_HEIGHT * 0.19 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={"#BDC4CA"}
          placeholderStyle={styles.placeholderStyle}
          multiline={multiline}
          editable={editable}
          type={mask}
          options={options}
          value={value}
          onChangeText={(text) => handleChange(text)}
        />
      )}
      {!mask && (
        <TextInput
          style={[
            { width: small ? SCREEN_WIDTH * 0.426 : SCREEN_WIDTH * 0.9 },
            styles.textinput,
            multiline && { height: SCREEN_HEIGHT * 0.19 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={"#BDC4CA"}
          placeholderStyle={styles.placeholderStyle}
          multiline={multiline}
          editable={editable}
          type={mask}
          options={options}
        />
      )}
    </View>
  );
};

export const PaymentScreen = ({ navigation }) => {
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [debitName, setDebitName] = useState("");
  const [debitCard, setDebitCard] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.spacing}
        >
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            secondary={true}
          />
        </TouchableOpacity>
        <View>
          <Typography
            content="بيانات الدفع"
            color={colors.dark_blue}
            size={20}
            bold={true}
            align="left"
          />
        </View>
      </View>
      <View>
        <View style={styles.title}>
          <Typography
            content="طريقة الدفع"
            align="left"
            color={colors.focused}
            size={16}
            bold={true}
          />
        </View>
      </View>
      <View style={styles.form}>
        <View>
          <CustomTextBox editable={true} placeholder={"بطاقة ائتمان"} />
        </View>
        <View style={styles.box}>
          <View style={styles.label}>
            <Typography
              content="الاسم على البطاقة"
              color={colors.dark_blue}
              align="left"
            />
          </View>
          <View>
            <CustomTextBox />
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.label}>
            <Typography
              content="رقم البطاقة"
              color={colors.dark_blue}
              align="left"
            />
          </View>
          <View>
            <CustomTextBox
              mask={"credit-card"}
              options={{
                obfuscated: false,
                issuer: "visa-or-mastercard",
              }}
              placeholder={"ex. 0000 0000 0000 0000"}
              value={debitCard}
              handleChange={(text) => setDebitCard(text)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.smallBox}>
            <View style={styles.smalllabel}>
              <Typography
                content="تاريخ انتهاء الصلاحية"
                color={colors.dark_blue}
                align="left"
              />
            </View>
            <View>
              <CustomTextBox
                mask={"datetime"}
                options={{
                  format: "MM/YY",
                }}
                small={true}
                placeholder={"MM/YY"}
                value={expiryDate}
                handleChange={(text) => setExpiryDate(text)}
              />
            </View>
          </View>
          <View style={styles.smallBox}>
            <View style={styles.smalllabel}>
              <Typography content="CVV" color={colors.dark_blue} align="left" />
            </View>
            <View>
              <CustomTextBox
                small={true}
                placeholder={"000"}
                type={"money"}
                options={{
                  mask: "999",
                }}
                value={cvv}
                handleChange={(text) => setCvv(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <Typography
              color={colors.white}
              content={"ادفع الآن"}
              align="center"
              size={16}
            />
          </TouchableOpacity>
        </View>
        <CenteredModal visible={modalVisible} list={false} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 20,
  },
  spacing: {
    marginRight: 10,
  },
  title: {
    marginHorizontal: 12,
    marginBottom: 15,
  },
  textInputContainer: {
    marginRight: 13,
    alignSelf: "center",
    marginBottom: 15,
    width: SCREEN_WIDTH * 0.9,
  },
  textinput: {
    // width: "100%",
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
  label: {
    marginLeft: 13,
  },
  row: {
    // marginRight: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  smallBox: {
    width: SCREEN_WIDTH * 0.426,
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    alignSelf: "center",
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
    marginTop: 30,
    elevation: 5,
  },
});
