import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Video as RNVideo } from "expo-av";
import { SCREEN_WIDTH } from "../../globals/globals";

export const Video = (props) => {
  return (
    <View style={styles.box}>
      <RNVideo
        ref={props.videoRef}
        style={styles.video}
        source={{
          uri: props.link,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => props.setStatus(() => status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  video: {
    alignSelf: "center",
    width: "100%",

    height: 160,
  },
});
