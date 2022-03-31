import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  I18nManager,
} from "react-native";
import AppContext from "../../appContext/AppContext";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

const ChooseLangScreen = ({ navigation }) => {
  let arrOReng = I18nManager.isRTL === false ? 1 : 0;

  const { appLanguage, setAppLanguage, fixedTitles } = useContext(AppContext);

  const data = [
    {
      id: 0,
      title: "عربى",
    },
    {
      id: 1,
      title: "English",
    },
  ];

  const switchLanguges = async (id) => {
    if (appLanguage !== id) {
      try {
        await AsyncStorage.setItem("@lang", JSON.stringify(id));
        // setAppLanguage(id);
        // await I18nManager.forceRTL(id == "1" ? true : false);
        await Updates.reloadAsync();
      } catch (error) {
        console.log("couldnt update the app language");
      }
    }
  };

  const navigatorHandler = (slug) => {
    switch (slug) {
      case 0:
        switchLanguges(slug);
        break;
      case 1:
        switchLanguges(slug);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowSVG
                fill="#E54C2E"
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
              />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Typography
                size={20}
                bold={true}
                lh={32}
                content={fixedTitles.settingsTitles["languages"].title}
                align="left"
                color={colors.focused}
              />
            </View>
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigatorHandler(item.id)}>
                  <View
                    style={[
                      arrOReng === item.id ? styles.pressed : styles.notPressed,
                    ]}
                  >
                    <Typography
                      size={16}
                      lh={arrOReng === item.id ? 22 : 19}
                      content={item.title}
                      align={arrOReng === item.id ? "center" : "left"}
                      color={arrOReng === item.id ? "white" : colors.dark_blue}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChooseLangScreen;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    marginHorizontal: 24,
    marginTop: STATUS_BAR_HEIGHT,
  },
  list: {
    height: SCREEN_HEIGHT,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 14,
  },
  pressed: {
    backgroundColor: colors.dark_blue,
    width: 90,
    borderRadius: 10,
    paddingHorizontal: 12,
    // paddingVertical: 6,
    paddingBottom: 2,
  },
  notPressed: {
    // backgroundColor: colors.dark_blue,
    width: 90,
    borderRadius: 10,
    paddingHorizontal: 12,
    // paddingVertical: 6,
    paddingBottom: 2,
  },
});
