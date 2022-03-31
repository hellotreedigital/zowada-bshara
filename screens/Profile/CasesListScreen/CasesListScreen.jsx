import React from "react";
import {
  FlatList,
  I18nManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { Navigation } from "../../../navigation";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import SearchSVG from "../../../SVGR/Globals/Search";

const data = [
  {
    id: "0",
    caseName: "اسم القضية",
    name: "اسم الخبير",
  },
  {
    id: "1",
    caseName: "اسم القضية",
    name: "اسم الخبير",
  },
  {
    id: "2",
    caseName: "اسم القضية",
    name: "اسم الخبير",
  },
  {
    id: "3",
    caseName: "اسم القضية",
    name: "اسم الخبير",
  },
];

const RenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("singleCaseScreen", {
          data: item,
        });
      }}
      style={styles.casesCard}
    >
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View>
          <Typography
            content={item.caseName}
            size={14}
            bold={true}
            color={colors.dark_blue}
          />
        </View>
        <View>
          <Typography
            content="تم تأكيد"
            size={14}
            roman={true}
            color={"#CFD9DC"}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ top: -10 }}>
          <Typography
            content={item.name}
            size={14}
            roman={true}
            color={"#CFD9DC"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CasesListScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.spacing}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
              fill={colors.dark_yellow}
            />
          </TouchableOpacity>
          <View>
            <Typography
              content="القضايا"
              size={20}
              bold={true}
              color={colors.dark_yellow}
              align="left"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.icon}>
          <SearchSVG />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CasesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    // backgroundColor: "red",
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  spacing: {
    marginRight: 12,
    paddingBottom: 6,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.65,

    elevation: 1,
  },
  list: {
    marginTop: SCREEN_HEIGHT * 0.024,
    height: SCREEN_HEIGHT - 100,
  },
  casesCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.08,
    marginBottom: SCREEN_HEIGHT * 0.008,
    marginTop: SCREEN_HEIGHT * 0.008,
    paddingHorizontal: 15,
    paddingTop: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5.65,

    elevation: 5,
  },
});
