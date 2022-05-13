import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../Typography/Typography";

import AppContext from "../../appContext/AppContext";

const StoreModal = ({ visible, title, ...props }) => {
  const { fixedTitles } = useContext(AppContext);

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
          <View>
            <Typography
              content={title}
              color={colors.focused}
              size={20}
              bold
              align="center"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => props.close()}
              style={[styles.button, { backgroundColor: colors.dark_blue }]}
            >
              <Typography
                content={fixedTitles.shopTitles["continue-shopping"].title}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.cartHandler()}
              style={styles.button}
            >
              <Typography
                content={fixedTitles.shopTitles["go-to-cart"].title}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StoreModal;

const styles = StyleSheet.create({
  closeIcon: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 20,
  },
});
