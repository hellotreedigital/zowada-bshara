import React, { useContext } from "react";
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import AppContext from "../../appContext/AppContext";
import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";

const SettingsScreen = ({ navigation }) => {
  const { fixedTitles } = useContext(AppContext);
  const DATA = [
    {
      id: 0,
      title: fixedTitles.settingsTitles["terms--conditions"].title,
    },
    {
      id: 1,
      title: fixedTitles.settingsTitles["privacy-policy"].title,
    },
    {
      id: 2,
      title: fixedTitles.settingsTitles["return-and-refund-policy"].title,
    },
    {
      id: 3,
      title: fixedTitles.settingsTitles["languages"].title,
    },
  ];

  const navigatorHandler = (slug) => {
    switch (slug) {
      case 0:
        navigation.navigate("TermsConditionScreen");
        break;
      case 1:
        navigation.navigate("PrivacyPolicyScreen");
        break;
      case 2:
        navigation.navigate("RefundPolicyScreen");
        break;
      case 3:
        navigation.navigate("chooseLang");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          red
          title={fixedTitles.settingsTitles["settings"].title}
          navigation={navigation}
        />
        <View style={styles.list}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigatorHandler(item.id)}>
                  <Typography
                    size={16}
                    lh={19}
                    content={item.title}
                    align="left"
                    color={colors.dark_blue}
                  />
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: SCREEN_HEIGHT * 0.03 }} />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    // marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  list: {
    height: SCREEN_HEIGHT,
    marginTop: SCREEN_HEIGHT * 0.009,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    // marginLeft: SCREEN_WIDTH * 0.037,
  },
});
