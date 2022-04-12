import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import Modal from "react-native-modal";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";
import {globalStyles} from "../../globals/globaStyles"


export const ImagePopUpModal = ({visible, imageUrl, ...props}) =>{

    function continueWithCourse(){
        props.continueWithCourse();
    }
    
    return(
        <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut" style={styles.modal}>
            <View style={[globalStyles.body, styles.screenCover]}>
                <TouchableOpacity
                        onPress={() => props.closeBtnHandler()}
                        style={styles.modalHeader}
                    >
                        <CloseSVG stroke={props.closeBtnColor ? props.closeBtnColor : "#ffffff"} />
                    </TouchableOpacity>

                    <ImageBackground
                        style={[
                            styles.image,
                            { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 },
                        ]}
                        resizeMode="cover"
                        source={{ uri: imageUrl }}
                    />

                    <View style={styles.buttonContainer}>
                        <PrimaryButton type="larger" content="استمر" onPress={() => continueWithCourse()}/>
                    </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal:{
        padding:0,
        margin:0
    },
    screenCover:{
        height:SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor:"#000",
        position:"relative",
        display:"flex",
        flexDirection:"column",
        justifyContent:'center',
    },
    modalHeader:{
        position:"absolute",
        top:25,
        width:25,
        height:25,
        left:20
    },
    buttonContainer:{
        position:'absolute',
        display:'flex',
        flexDirection:'row',
        width:'100%',
        paddingHorizontal: 25,
        bottom: 75
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