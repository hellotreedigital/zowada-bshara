import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { SearchBox } from "../SearchBox/SearchBox";
export const AnswerModal = ({
  visible,
  loading,
  asnwerString,
  setAnswerString,
  submit,
  ...props
}) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
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
        <KeyboardAvoidingView
          behavior={Platform.OS == "android" ? "height" : "padding"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 0}
        >
          <View style={[styles.center, { justifyContent: "center" }]}>
            <TouchableOpacity onPress={() => props.close()}>
              <CloseSVG />
            </TouchableOpacity>
            <View>
              <Typography
                content="أضف الإجابة"
                color={colors.dark_yellow}
                align="center"
                size={20}
                bold={true}
              />
            </View>
            <View style={{ marginTop: 25, marginBottom: 10, paddingRight: 8 }}>
              <Typography
                content={props.title}
                color={colors.dark_blue}
                align="right"
                size={14}
                bold={true}
              />
            </View>
            <View>
              <SearchBox
                multiline={true}
                width={SCREEN_WIDTH * 0.8}
                height={SCREEN_HEIGHT * 0.14}
                placeholder={"أضف الإجابة هنا"}
                searchString={asnwerString}
                setSearchString={setAnswerString}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => submit()} style={styles.button}>
                <Typography
                  content="إرسال"
                  color={colors.white}
                  size={16}
                  align="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
    padding: 20,
    borderRadius: 10,
  },
  button: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
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
    marginTop: 20,
    marginBottom: 20,
    elevation: 5,
  },
  loader: {
    position: "absolute",
    zIndex: 10,
    elevation: 10,
    alignSelf: "center",
  },
});
