import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AppContext from "../../../../appContext/AppContext";
import Typography from "../../../../components/Typography/Typography";
import { colors } from "../../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import CloseSVG from "../../../../SVGR/Globals/CloseSVG";
export const ErrorModal = ({ visible, submit, ...props }) => {
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
        <View style={styles.body}>
          <TouchableOpacity onPress={() => props.close()}>
            <CloseSVG stroke={colors.focused} />
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Typography
              content={fixedTitles.shopTitles["cart-taken"].title}
              color={colors.dark_blue}
              size={16}
              align="center"
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => submit()} style={styles.button}>
              <Typography
                content={fixedTitles.shopTitles["add-anyway"].title}
                color={colors.white}
                size={16}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderRadius: 10,
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
    alignSelf: "center",
    elevation: 5,
  },
});
