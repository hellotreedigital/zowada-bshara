import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AppContext from "../../appContext/AppContext";
import { colors } from "../../globals/colors";
import { SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";
export const JobModal = ({ visible, title, hasButton, submit,type, ...props }) => {
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
        <View style={styles.center}>
          <TouchableOpacity onPress={() => props.close()}>
            <CloseSVG stroke={colors.dark_orange} />
          </TouchableOpacity>
          <View>
            <Typography
              content={title || "سيتم التواصل معك قريبا"}
              color={colors.dark_orange}
              align="center"
              bold
              size={20}
            />
          </View>
          {hasButton && (
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity onPress={() => submit(1)} style={styles.button}>
                <Typography
                  content={fixedTitles.jobFixedTitles["yes"].title}
                  color={colors.white}
                  align="center"
                  size={16}
                />
              </TouchableOpacity>
            </View>
             <View >
             <TouchableOpacity onPress={() => submit(0)} style={styles.button}>
               <Typography
                 content={fixedTitles.jobFixedTitles["no"].title}
                 color={colors.white}
                 align="center"
                 size={16}
               />
             </TouchableOpacity>
           </View>
           </View>
          )}
        </View>

      </View>
    </Modal>
  );
};

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
  button: {
    width: SCREEN_WIDTH * 0.36,
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
    marginVertical: 10,
  },
});
