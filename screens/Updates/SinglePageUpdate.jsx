import React from "react";
import {
  FlatList,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Share,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";

import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import ShareSVG from "../../SVGR/Globals/Share";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

const CustomHeader = ({ navigation, item }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.left}>
        <View>
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Typography
            content={item.title}
            size={20}
            bold
            color={colors.focused}
            align="left"
          />
        </View>
      </TouchableOpacity>
      <View />
    </View>
  );
};

const RenderItem = ({ item }) => {
  return (
    <View>
      <ImageBackground style={styles.image} source={{ uri: item }} />
    </View>
  );
};

export const SinglePageUpdate = ({ navigation, route }) => {
  const updates = [
    {
      id: 0,
      image:
        "https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
  ];
  const { item } = route.params;
  let text =
    "<p>TES TEST TEST ابصورة أكثر عقلانية ومننستشعرها بصورة أكثر عقلانية ومن</p>";
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader item={item} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={styles.body}
      >
        <View>
          <ImageBackground
            style={styles.bodyImage}
            source={{ uri: item.formatted_thumbnail }}
          />
        </View>
        {/* webview */}

        <View style={styles.list}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return (
                <View style={styles.bodyText}>
                  <RenderHTML
                    source={{ html: item.content }}
                    contentWidth={SCREEN_WIDTH}
                    tagsStyles={{
                      p: {
                        fontFamily: "HelveticaLight",
                        fontSize: SCREEN_HEIGHT * 0.019,
                        color: colors.dark_blue,
                        textAlign: I18nManager.isRTL ? "left" : "right",
                        lineHeight: 24,
                      },
                    }}
                    systemFonts={systemFonts}
                  />
                </View>
              );
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
            numColumns={2}
            data={item.formatted_images}
            renderItem={RenderItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.white,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS == "android" ? 20 : 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  icon: {
    height: SCREEN_HEIGHT * 0.042,
    width: SCREEN_HEIGHT * 0.042,
    backgroundColor: colors.focused,
    borderRadius: (SCREEN_HEIGHT * 0.042) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyImage: {
    height: SCREEN_HEIGHT * 0.19,
    borderRadius: 10,
    overflow: "hidden",
  },
  body: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  image: {
    height: SCREEN_HEIGHT * 0.142,
    width: SCREEN_WIDTH * 0.43,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 20,
    marginBottom: 20,
  },
  list: {
    marginTop: 20,
    flexGrow: 1,
  },
});
