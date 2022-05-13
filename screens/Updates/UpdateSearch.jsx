import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import AppContext from "../../appContext/AppContext";
import { colors } from "../../globals/colors";
import { SharedElement } from "react-navigation-shared-element";
import Typography from "../../components/Typography/Typography";

const UpdatesCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.renderBox}
      onPress={() => navigation.navigate("UpdatesSingleScreen", { item })}
    >
      <View>
        <ImageBackground
          source={{ uri: item.formatted_thumbnail }}
          style={styles.image}
        />
      </View>
      <View>
        <Typography
          content={item.title}
          align="left"
          color={colors.dark_blue}
          size={14}
        />
      </View>
    </TouchableOpacity>
  );
};

export const UpdateSearch = ({ navigation }) => {
  const { updates } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={[styles.spacing, styles.arrow]}
        >
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        {/* <View>
            <SearchBox
              height={Platform.OS == "android" && SCREEN_HEIGHT * 0.06}
              width={SCREEN_WIDTH * 0.84}
              searchString={searchString}
              setSearchString={setSearchString}
            />
          </View> */}
      </View>
      <View style={styles.list}>
        <>
          <FlatList
            numColumns={2}
            data={updates}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UpdatesCard item={item} navigation={navigation} />
            )}
            ListEmptyComponent={() => (
              <View style={{ alignSelf: "center" }}>
                <Typography content="Empty list" />
              </View>
            )}
          />
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.024,
    alignSelf: "center",
    zIndex: 100000000,
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  top: {
    position: "absolute",
    top: Platform.OS == "ios" ? STATUS_BAR_HEIGHT : 12,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  weatherBox: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.045,
  },
  weather: {
    borderWidth: 1,
    borderColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.0942,
    width: SCREEN_WIDTH * 0.125,
    borderLeftWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
  },
  first: {
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderLeftWidth: 1,
  },
  end: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  bodyBox: {
    marginTop: 20,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    height: SCREEN_HEIGHT * 0.142,
    width: SCREEN_WIDTH * 0.43,
    borderRadius: 10,
    overflow: "hidden",
  },
  renderBox: {
    // marginHorizontal: 10,
    width: "50%",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  list: {
    margin: 20,
    flexGrow: 1,
  },
  header: {
    marginHorizontal: 20,
  },
  arrow: {
    marginTop: Platform.OS == "ios" ? 12 : 12,
  },
});
