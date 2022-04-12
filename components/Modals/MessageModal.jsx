import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";

const MessageModal = ({ visible, message, ...props }) => {
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
        <View style={styles.center}>
          <>
            {!props.expert && (
              <View style={{ height: SCREEN_HEIGHT * 0.17 }}>
                <TouchableOpacity
                  onPress={() => props.close()}
                  style={styles.modalHeader}
                >
                  <CloseSVG stroke={"#E8AF2E"} />
                </TouchableOpacity>
                <View style={styles.message}>
                  <Typography
                    content={message}
                    color={colors.dark_orange}
                    align="center"
                    bold={true}
                    size={20}
                  />
                </View>
              </View>
            )}
            <>
              {props.expert && (
                <View>
                  {props.showCloseBtn && 
                    <TouchableOpacity
                    onPress={() => props.closeBtnHandler()}
                    style={styles.modalHeader}
                  >
                    <CloseSVG stroke={props.closeBtnColor ? props.closeBtnColor : "#E8AF2E"} />
                  </TouchableOpacity>}
                  <View style={styles.title}>
                    <Typography
                      content={props.title}
                      color={props.textColor ? props.textColor :"#E54C2E"}
                      size={props.textSize ? props.textSize : 20}
                      bold={true}
                    />
                  </View>
                  <View>
                    <Typography
                      content={props.desc}
                      align="center"
                      size={16}
                      color={colors.dark_blue}
                    />
                  </View>
                  {props.withButton && (
                    <View style={styles.btn}>
                      <SecondaryButton
                        content={props.buttonText ? props.buttonText :"تم"}
                        onPress={() => props.close()}
                      />
                    </View>
                  )}
                </View>
              )}
            </>
          </>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  center: {
    minHeight: SCREEN_HEIGHT * 0.17,
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
    padding: 20,
  },
  message: {
    height: "100%",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.019,
  },
  title: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT * 0.0015,
  },
  btn: {
    marginTop: SCREEN_HEIGHT * 0.037,

    alignItems: "center",
  },
});
