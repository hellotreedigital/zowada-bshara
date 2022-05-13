import React, { useEffect, useState } from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
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

  const closeModalHandler = () => {
    setModalVisible(false);
    navigation.navigate("expertScreen");
  };
  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CenteredModal
        close={() => closeModalHandler()}
        visible={modalVisible}
        list={false}
        loading={false}
      />
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
