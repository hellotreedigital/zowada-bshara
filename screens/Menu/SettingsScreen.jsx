import React, { useContext } from "react";
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppContext from "../../appContext/AppContext";
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
      title: fixedTitles.settingsTitles["terms--conditions"].title,
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
                content={fixedTitles.settingsTitles["settings"].title}
                align="left"
                color={colors.focused}
              />
            </View>
          </View>
        </View>
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
    width: SCREEN_WIDTH * 0.9,
    marginHorizontal: SCREEN_WIDTH * 0.064,
    marginTop: STATUS_BAR_HEIGHT,
  },
  list: {
    height: SCREEN_HEIGHT,
    marginTop: SCREEN_HEIGHT * 0.037,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: SCREEN_WIDTH * 0.037,
  },
});
