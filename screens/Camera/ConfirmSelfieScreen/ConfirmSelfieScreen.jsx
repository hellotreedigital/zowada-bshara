import React, { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import AppContext from "../../../appContext/AppContext";
import AuthContext from "../../../appContext/AuthContext";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { editImage } from "../../../api/Profile/Profile";
export const ConfirmSelfieScreen = ({ navigation, route }) => {
  const { image } = route.params;
  const [loading, setLoading] = useState(false);
  const { setProfilePic } = useContext(AuthContext);
  const { setIsCamera } = useContext(AppContext);
  const updateUserImage = async () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("image", {
      uri: image,
      type: "image",
      name: "Profile Pic",
    });
    editImage(formdata)
      .then((res) => {
        setProfilePic(image);
        setIsCamera(null);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(er.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <ActivityIndicator animating={loading} color={colors.dark_blue} />
      </View>
      <View style={styles.box}>
        <View>
          <ImageBackground
            style={styles.image}
            source={{ uri: image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.text}>
          <Typography
            content="ستظهر صورة ملفك الشخصي في موجز النشاط اليومي وفي ملفك الشخصي."
            align="center"
            size={12}
            color={colors.dark_blue}
          />
        </View>
        <View style={styles.row}>
          <View>
            <SecondaryButton onPress={() => updateUserImage()} content="حفظ" />
          </View>
          <View>
            <PrimaryButton
              onPress={() => navigation.pop()}
              content="إعادة التقاط الصورة"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
  },
  image: {
    height: SCREEN_HEIGHT * 0.22,
    width: SCREEN_HEIGHT * 0.22,
    borderRadius: (SCREEN_HEIGHT * 0.22) / 2,
    overflow: "hidden",
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  text: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: SCREEN_HEIGHT * 0.06,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
  },
  indicator: {
    position: "absolute",
    zIndex: 10000,
  },
});
