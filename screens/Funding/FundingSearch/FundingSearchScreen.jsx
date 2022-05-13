import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useContext } from "react";
import RedArrowSVG from "../../../SVGR/Globals/RedArrow";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import AppContext from "../../../appContext/AppContext";
import { colors } from "../../../globals/colors";
import { SharedElement } from "react-navigation-shared-element";
import Typography from "../../../components/Typography/Typography";

const FundingCards = ({ item, navigation }) => {
  return (
    <View style={styles.fundingBox}>
      <View>
        <SharedElement id={item.id}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: item.image_absolute_url,
            }}
          />
        </SharedElement>
      </View>
      <View style={styles.body}>
        <View>
          <Typography
            content={item.name}
            color={colors.dark_blue}
            size={14}
            align="left"
          />
        </View>
        <View style={{ top: -5 }}>
          <Typography
            content={item.about}
            color={`#CFD9DC`}
            size={12}
            align="left"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FundingSingleScreen", { data: item })
            }
            style={styles.button}
          >
            <Typography
              content="المزيد"
              align="center"
              color={"white"}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FundingSearchScreen = ({ navigation, route }) => {
  const { fundingSearch } = useContext(AppContext);

  const { data } = route.params;
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
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FundingCards item={item} navigation={navigation} />
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

export default FundingSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
  },
  spacing: {
    marginRight: 10,
  },
  list: {
    // height: "auto",

    paddingBottom: 60,
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  arrow: {
    width: 40,
    height: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.024,
    alignSelf: "center",
    zIndex: 100000000,
  },
  addBox: {
    backgroundColor: "white",
    // top: 40,
    width: SCREEN_WIDTH - 40,
    marginBottom: 20,
    marginTop: 10,

    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    paddingVertical: 14,
    elevation: 5,
    zIndex: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  list: {
    marginTop: SCREEN_HEIGHT * 0.02,
    flexGrow: 1,
    height: 200,
  },
  image: {
    height: SCREEN_HEIGHT * 0.14,
    width: SCREEN_WIDTH * 0.43,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 20,
  },
  body: {
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
    marginLeft: 20,
    paddingHorizontal: 10,
  },
  fundingBox: {
    marginBottom: 10,
  },
  button: {
    width: SCREEN_WIDTH * 0.37,
    height: SCREEN_HEIGHT * 0.04,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
  },
});
