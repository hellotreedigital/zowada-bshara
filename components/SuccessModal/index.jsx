import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import SuccessIconSVG from "../../SVGR/SuccessIcon";
import AppContext from "../../appContext/AppContext";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";

export const SuccessModal = ({ visible, close }) => {
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
            width: "100%",
            borderRadius: 15,
          }}
        >
          <TouchableOpacity onPress={() => close()} style={{ padding: 10 }}>
            <CloseSVG />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <SuccessIconSVG />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <Typography
              content={fixedTitles.profileTitles["payment-successful"]?.title}
              align="center"
              size={20}
              bold
              color={"#1F9B89"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
