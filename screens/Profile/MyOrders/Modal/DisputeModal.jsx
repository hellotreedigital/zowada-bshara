import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  I18nManager,
  Animated,
  TouchableOpacity,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import Typography from "../../../../components/Typography/Typography";
import { colors } from "../../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import { useKeyboard } from "../../../../hooks/useKeyboard";
import CloseSVG from "../../../../SVGR/Globals/CloseSVG";
const DisputeModal = ({
  visible,
  loading,
  string,
  setString,
  submit,
  ...props
}) => {
  const keyboardHeight = useKeyboard();
  const translate = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (Platform.OS == "ios") {
      Animated.spring(translate, {
        toValue: keyboardHeight - 70,
        duration: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [keyboardHeight]);
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <Animated.View style={[styles.center, { marginBottom: translate }]}>
        <View style={styles.loader}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={colors.dark_yellow}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.body}>
            <TouchableOpacity onPress={() => props.close()}>
              <CloseSVG stroke={colors.focused} />
            </TouchableOpacity>
            <View>
              <Typography
                content="سوف يتمل تواصل معك"
                color={colors.focused}
                align="center"
                size={20}
                bold
              />
              <View style={{ top: -10 }}>
                <Typography
                  content="الرجاء حدد ما حدث."
                  color={colors.focused}
                  align="center"
                  size={20}
                  bold
                />
              </View>
            </View>
            <View>
              <TextInput
                style={styles.textinput}
                placeholder="أضف السبب هنا"
                multiline
                value={string}
                onChangeText={(text) => setString(text)}
              ></TextInput>
            </View>
            <View>
              <TouchableOpacity onPress={() => submit()} style={styles.button}>
                <Typography
                  content="إرسل"
                  color={colors.white}
                  size="16"
                  align="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default DisputeModal;

const styles = StyleSheet.create({
  center: {
    height: 142,
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    shadowColor: "#00000030",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
  },
  body: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
    padding: 10,
    borderRadius: 10,
  },
  textinput: {
    width: "100%",
    backgroundColor: "#F2F5F6",
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.dark_blue,
    textAlignVertical: "top",
    height: 100,
    marginBottom: 10,
  },
  button: {
    width: SCREEN_WIDTH * 0.4,
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
    marginTop: 10,
  },
});
