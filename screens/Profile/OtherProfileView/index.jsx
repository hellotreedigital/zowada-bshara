import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  I18nManager,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { colors } from "../../../globals/colors";
import AppContext from "../../../appContext/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import Typography from "../../../components/Typography/Typography";
import { AirbnbRating } from "react-native-ratings";
import { ContactBox } from "../../../components/ContactBox/ContactBox";
import LocationBox from "../../../components/LocationBox/LocationBox";

export const OtherProfileView = ({ navigation, route }) => {
  const { data } = route.params;

  const [profileData, setProfileData] = useState(null);

  const { userData, fixedTitles } = useContext(AppContext);
  const isFocused = useIsFocused();

  const profileDataHandler = () => {
    if (userData?.is_expert == 1 && userData.id == data.case?.expert.id) {
      setProfileData(data.user);
    } else {
      setProfileData(data.expert);
    }
  };

  // useEffect(() => {
  //   profileDataHandler();
  // }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => navigation.pop()}
        >
          <ArrowSVG
            style={{
              marginHorizontal: 20,
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.focused}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SCREEN_HEIGHT * 0.024,
            marginHorizontal: 20,
          }}
        >
          <View>
            <Image
              style={styles.avatar}
              source={{ uri: data?.user.image_absolute_url }}
            />
          </View>
          <View
            style={{
              marginLeft: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ top: SCREEN_HEIGHT * 0.004 }}>
              <Typography
                content={data.user?.full_name}
                bold
                size={16}
                color={colors.dark_blue}
              />
            </View>

            <View style={{ top: -SCREEN_HEIGHT * 0.002 }}>
              <AirbnbRating
                count={5}
                isDisabled={true}
                showRating={false}
                size={10}
                defaultRating={data.user?.rating}
              />
            </View>
          </View>
        </View>
        <View>
          {userData?.about !== null && (
            <View style={[styles.about, { marginBottom: 0 }]}>
              <View style={styles.title}>
                <Typography
                  size={14}
                  bold={true}
                  content={fixedTitles.profileTitles["about"].title}
                  color={colors.focused}
                  align="left"
                />
              </View>
              <View style={[styles.value, { top: -15 }]}>
                <Typography
                  size={14}
                  align="left"
                  color={colors.dark_blue}
                  content={data.user?.about}
                />
              </View>
            </View>
          )}
        </View>
        <View>
          <ContactBox
            title={fixedTitles.profileTitles["contact"].title}
            userData={data.user}
            phoneTitle={fixedTitles.profileTitles["phone-number"].title}
            emailTitle={fixedTitles.profileTitles["email-address"].title}
          />
        </View>
        <View>
          <LocationBox />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  avatar: {
    width: SCREEN_WIDTH * 0.24,
    height: SCREEN_WIDTH * 0.24,
    borderRadius: (SCREEN_WIDTH * 0.24) / 2,
  },
  about: {
    width: SCREEN_WIDTH * 0.9,
    // minHeight: SCREEN_HEIGHT * 0.16,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 15,
    elevation: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: SCREEN_HEIGHT * 0.026,
  },
  title: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.013,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  value: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
});
