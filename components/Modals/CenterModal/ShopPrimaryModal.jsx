import React from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
import Typography from "../../Typography/Typography";
export const ShopPrimaryModal = ({ visible, hideBtn, ...props }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: SCREEN_WIDTH - 40,
            borderRadius: 10,
            height: "auto",
          }}
        >
          <TouchableOpacity
            onPress={() => props.close()}
            style={styles.closeIcon}
          >
            <CloseSVG stroke={colors.focused} />
          </TouchableOpacity>
          <View style={{ width: "95%" }}>
            <Typography
              content={props.message}
              align="center"
              color={colors.focused}
              size={20}
              bold
              fit={true}
              lines={2}
            />
          </View>
          {!hideBtn ? (
            <View>
              <TouchableOpacity style={styles.button}>
                <Typography
                  content={props.buttonMessage}
                  align="center"
                  size={16}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ height: 40 }} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    padding: 20,
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
    marginVertical: 20,
    elevation: 5,
    alignSelf: "center",
  },
});
