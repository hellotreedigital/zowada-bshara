import React, { useContext } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";
import { colors } from "../../globals/colors";
import AppContext from "../../appContext/AppContext";

const BottomModal = ({
  visible,
  navigation,
  cameraHandler,
  imageHandler,
  profilePic,
  funding,
  ...props
}) => {
  const { fixedTitles } = useContext(AppContext);

  return (
    <Modal animationType="slide" isVisible={visible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.modalView}>
          <View style={styles.list}>
            {!funding && (
              <TouchableOpacity
                disabled={!profilePic ? true : false}
                style={[styles.box]}
              >
                <Typography
                  content={fixedTitles.profileTitles["remove-picture"].title}
                  color={profilePic ? colors.dark_blue : "gray"}
                  roman={true}
                />
              </TouchableOpacity>
            )}
            {!funding && (
              <TouchableOpacity
                onPress={() => cameraHandler()}
                style={styles.box}
              >
                <Typography
                  content={
                    fixedTitles.profileTitles["choose-from-camera"].title
                  }
                  color={colors.dark_blue}
                  roman={true}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => imageHandler()} style={styles.box}>
              <Typography
                content={fixedTitles.profileTitles["choose-from-gallery"].title}
                color={colors.dark_blue}
                roman={true}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.close()} style={styles.box}>
              <Typography
                content={fixedTitles.profileTitles["modal-close"].title}
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
    height: "auto",
    position: "relative",
    paddingBottom: 20,
    bottom: Platform.OS == "ios" ? 0 : 30,
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
