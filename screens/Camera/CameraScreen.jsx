import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { Camera } from "expo-camera";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import AppContext from "../../appContext/AppContext";
import FlashSVG from "../../SVGR/Camera/Flash";
import ArrowSVG from "../../SVGR/Globals/Arrow";

import TakeImageSVG from "../../SVGR/Camera/TakeImage";
import FlipCameraSVG from "../../SVGR/Camera/FlipCamera";
import AddImageSVG from "../../SVGR/Camera/AddImage";
import AuthContext from "../../appContext/AuthContext";
import { Navigation } from "../../navigation";
const CameraScreen = ({ navigation, route }) => {
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [camera, setCamera] = useState(null);
  const { setProfilePic } = useContext(AuthContext);
  const { setIsCamera } = useContext(AppContext);
  const flashModeHandler = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();

      setProfilePic(data.uri);
      navigation.navigate("confirmSelfie", {
        image: data.uri,
      });
    }
  };

  const backHandler = () => {
    setIsCamera(null);
    setTimeout(() => {
      navigation.navigate("Profile");
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <SafeAreaView style={styles.row}>
          <TouchableOpacity
            onPress={() => flashModeHandler()}
            style={styles.icon}
          >
            <FlashSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => backHandler()} style={styles.icon}>
            <ArrowSVG />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <Camera
        ref={(ref) => setCamera(ref)}
        flashMode={flash}
        style={styles.camera}
        type={type}
      />
      <View style={styles.bottomBar}>
        <View style={styles.row}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              style={styles.icon}
            >
              <FlipCameraSVG />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <TouchableOpacity onPress={() => takePicture()}>
              <TakeImageSVG />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <TouchableOpacity>
              <AddImageSVG />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  topBar: {
    height: SCREEN_HEIGHT * 0.134,
    backgroundColor: "#104251",
    width: SCREEN_WIDTH,
  },
  row: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  bottomBar: {
    height: SCREEN_HEIGHT * 0.22,
    backgroundColor: "#104251",
    paddingHorizontal: SCREEN_WIDTH * 0.066,
    paddingBottom: SCREEN_HEIGHT * 0.04,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_HEIGHT * 0.05,
    borderRadius: (SCREEN_HEIGHT * 0.05) / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff16",
  },
});
