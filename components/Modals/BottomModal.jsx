import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const BottomModal = ({
  visible,
  navigation,
  cameraHandler,
  imageHandler,
  profilePic,
  ...props
}) => {
  return (
    <Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.modalView}>
          <View style={styles.list}>
            <TouchableOpacity
              disabled={!profilePic ? true : false}
              style={[styles.box]}
            >
              <Typography
                content="ازل الصوره الحاليه"
                color={profilePic ? colors.dark_blue : "gray"}
                roman={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => cameraHandler()}
              style={styles.box}
            >
              <Typography
                content="تصوير"
                color={colors.dark_blue}
                roman={true}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => imageHandler()} style={styles.box}>
              <Typography
                content="اختيار من الصور"
                color={colors.dark_blue}
                roman={true}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.close()} style={styles.box}>
              <Typography
                content="إلغاء"
                color={colors.dark_blue}
                roman={true}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modalView: {
    height: SCREEN_HEIGHT * 0.35,
    position: "relative",
    bottom: Platform.OS == "ios" ? -30 : 0,
    marginTop: "auto",
    backgroundColor: "white",
    width: SCREEN_WIDTH,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.46,

    elevation: 9,
  },
  blurContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  box: {
    paddingVertical: SCREEN_HEIGHT * 0.019,
    alignItems: "center",
  },
});
