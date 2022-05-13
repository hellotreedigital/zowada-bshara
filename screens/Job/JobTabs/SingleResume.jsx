import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { Header } from "../../../components/Header/Header";
import PDFReader from "rn-pdf-reader-js";
import { colors } from "../../../globals/colors";

export const ResumeScreen = ({ route, navigation }) => {
  const { file, name } = route.params;
  const PdfReaders = ({ url: uri }) => (
    <WebView style={{ flex: 1 }} source={{ uri }} />
  );
  const [loader, setLoader] = useState(true);
  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loader ? 9 : 0, elevation: loader ? 9 : 0 },
        ]}
      >
        <ActivityIndicator color={colors.dark_orange} size="large" />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top:
              Platform.OS == "ios" ? SCREEN_HEIGHT * 0.055 : SCREEN_HEIGHT * 0,
            zIndex: 10,
          }}
        >
          <Header navigation={navigation} title={name} red />
        </View>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <PDFReader
            webviewStyle={{ width: SCREEN_WIDTH, zIndex: 10, elevation: 10 }}
            source={{
              uri: file,
            }}
            onLoad={() => setLoader(false)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
  },
});
