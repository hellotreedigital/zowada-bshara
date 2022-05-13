import React, {useRef} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Modal from "react-native-modal";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import {globalStyles} from "../../globals/globaStyles";
import { Video } from 'expo-av';
import { setVideoWatched } from '../../api/ELearning/ELearning';


export const ImagePopUpModal = ({visible, imageUrl, courseId, video, ...props}) =>{
    const videoRef = useRef();
    
    function continueWithCourse(){
        props.continueWithCoursee();
    }

    async function checkIfFInished(status){
        if(status.didJustFinish) { 
            await setVideoWatched(courseId, video.lesson_id, video.id);
            console.log('watched')
         }
    }

    function onBuffer(){ /* TODO document why this function 'onBuffer' is empty */ }

    function videoError(){ /* TODO document why this function 'videoError' is empty */ }
    
    return(
        <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut" style={styles.modal}>
            <View style={[globalStyles.body, styles.screenCover]}>

                    <Video
                        ref={videoRef}
                        style={[
                            styles.image,                            
                            {width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 },
                        ]}
                        source={{
                        uri: imageUrl,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        onPlaybackStatusUpdate={status => checkIfFInished(status)}
                    />

                    {false
                     ? 
                    
                    <Video 
                        source={{uri: imageUrl}}   // Can be a URL or a local file.                                  // Store reference
                        onBuffer={onBuffer}                // Callback when remote video is buffering
                        onError={videoError}               // Callback when video cannot be loaded
                        style={[
                            styles.image,                            
                            {backgroundColor:'red', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 },
                        ]} />

                    :<ImageBackground
                        style={[
                            styles.image,
                            { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 },
                        ]}
                        resizeMode="cover"
                        source={{ uri: imageUrl }}
                    />}

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