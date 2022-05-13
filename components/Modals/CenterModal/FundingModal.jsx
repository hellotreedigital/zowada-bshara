import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
import Typography from "../../Typography/Typography";
const FundingModal = (props) => {
  return (
    <Modal
      isVisible={props.visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.loader}>
        <ActivityIndicator
          animating={props.loading}
          size="large"
          color={colors.dark_blue}
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
        <View style={[styles.center, { justifyContent: "center" }]}>
          <TouchableOpacity onPress={() => props.close()}>
            <CloseSVG stroke={colors.focused} />
          </TouchableOpacity>
          <View>
            <Typography
              bold
              size={20}
              align="center"
              content={props.message}
              color={colors.focused}
            />
          </View>
          {props.hidebtn == false && (
            <View>
              <TouchableOpacity
                onPress={() => props.submit()}
                style={styles.button}
              >
                <Typography content="نعم" align="center" color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FundingModal;

const styles = StyleSheet.create({
  center: {
    height: "auto",
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
  btnWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginRight: 10,
  },
  loader: {
    position: "absolute",
    zIndex: 10000,
    elevation: 10,
    alignSelf: "center",
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
    marginTop: SCREEN_HEIGHT * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
});
