import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import DummyGirlSVG from "../../SVGR/DummyGirl";
import { MenuCard } from "./MenuCard/MenuCard";
import AhdasSVG from "../../SVGR/Menu/Ahdas.jsx";
import ContactSVG from "../../SVGR/Menu/Contact";
import InfoSVG from "../../SVGR/Menu/Info";
import MostajedatSVG from "../../SVGR/Menu/Mostajedat";
import SettingsSVG from "../../SVGR/Menu/Settings";
import TamwilSVG from "../../SVGR/Menu/Tamwil";
import TaelimSVG from "../../SVGR/Menu/Taelim";
import { WhiteButton } from "../../buttons/WhiteButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../appContext/AppContext";
import ExpertSVG from "../../SVGR/BottomTabIcons/Expert";
import Avatar from "../../components/Avatar/Avatar";
import AuthContext from "../../appContext/AuthContext";

export const MenuScreen = ({ navigation }) => {
  const { setToken, fixedTitles, token, userName, setUserName } = useContext(
    AppContext
  );
  const MENU_DATA = [
    {
      id: 0,
      title: fixedTitles.menuTitle["experts"].title,
      icon: <ExpertSVG />,
    },
    {
      id: 0,
      title: fixedTitles.menuTitle["funding"].title,
      icon: <TamwilSVG />,
    },
    {
      id: 1,
      title: fixedTitles.menuTitle["news"].title,
      icon: <MostajedatSVG />,
    },
    {
      id: 2,
      title: fixedTitles.menuTitle["e-learning"].title,
      icon: <TaelimSVG />,
    },
    {
      id: 3,
      title: fixedTitles.menuTitle["events"].title,
      icon: <TaelimSVG />,
    },

    {
      id: 5,
      title: fixedTitles.menuTitle["about-us"].title,
      icon: <ContactSVG />,
    },
    {
      id: 6,
      title: fixedTitles.menuTitle["contact-us"].title,
      icon: <ContactSVG />,
    },
    {
      id: 4,
      title: fixedTitles.menuTitle["settings"].title,
      icon: <SettingsSVG />,
    },
  ];
  const { profilePic } = useContext(AuthContext);
  const signoutHandler = async () => {
    try {
      AsyncStorage.removeItem("@token");
      setToken(null);
      setUserName(null);
      console.log("Logged out");
    } catch (error) {
      console.log("cant sign u out try again later or refresh the app ");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#104251",
          "#12515A",
          "#197A74",
          "#1F9B89",
          "#419E79",
          "#6DA265",
          "#93A654",
          "#B2A946",
          "#C9AC3B",
          "#DAAD33",
          "#E4AE2F",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
          "#E8AF2E",
        ]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1.5 }}
        style={styles.background}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <Typography
              content={fixedTitles.menuTitle["menu"].title}
              align="left"
              color={colors.dark_orange}
              size={20}
              bold={true}
              lh={24}
            />
          </View>
          <View style={styles.userinfo}>
            {token !== true && (
              <TouchableOpacity style={styles.left}>
                <Avatar
                  profilePic={profilePic}
                  name={userName}
                  small={true}
                  loader={false}
                />
              </TouchableOpacity>
            )}

            <View style={styles.right}>
              {token !== true && (
                <>
                  <View style={styles.name}>
                    <Typography
                      content={userName || "مايا"}
                      size={16}
                      color={colors.white}
                      bold={true}
                      align="left"
                    />
                  </View>
                  <TouchableOpacity style={styles.subtitle}>
                    <Typography
                      content="عرض الصفحة الشخصية"
                      size={12}
                      bold={true}
                      color={colors.white}
                      align="left"
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View style={styles.list}>
            <FlatList
              data={MENU_DATA}
              renderItem={({ item }) => {
                return <MenuCard item={item} navigation={navigation} />;
              }}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: SCREEN_WIDTH * 0.05 }} />
              )}
              ListFooterComponent={() => {
                return (
                  <View style={styles.footer}>
                    {token !== true && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => signoutHandler()}
                      >
                        <Typography
                          content={fixedTitles.menuTitle["log-out"].title}
                          color={colors.dark_blue}
                          size={16}
                          lh={24}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  header: {
    marginBottom: SCREEN_HEIGHT * 0.0169,
    marginHorizontal: 22,
  },
  userinfo: {
    marginHorizontal: SCREEN_WIDTH * 0.053,
    flexDirection: "row",
  },
  left: {
    marginRight: SCREEN_WIDTH * 0.02,
  },
  list: {
    width: SCREEN_WIDTH,
    // backgroundColor: "red",
    // alignItems: "center",
    height: "100%",
    marginTop: SCREEN_HEIGHT * 0.02,
    // width: SCREEN_WIDTH * 0.9,
    // marginHorizontal: 12,
    height: SCREEN_HEIGHT - 50,
  },
  footer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: SCREEN_WIDTH * 0.05,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: SCREEN_HEIGHT * 0.048,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#00000016",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  subtitle: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.011,
  },
});
