import { useFocusEffect } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  I18nManager,
} from "react-native";
import { getExperts } from "../../api/Expert/Expert";
import AppContext from "../../appContext/AppContext";
import { FullBox } from "../../components/Boxes/FullBox";
import { ImageBox } from "../../components/Boxes/ImageBox";
import { SmallBox } from "../../components/Boxes/SmallBox";
import { HomeCarousel } from "../../components/Carousel/HomeCarousel";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import NotificationSVG from "../../SVGR/Home/Notification";
import ShareSVG from "../../SVGR/Home/Share";

export const HomeScreen = ({ navigation }) => {
  const { appLanguage, userName, token, experts, setExperts } = useContext(
    AppContext
  );

  const data = [
    {
      id: "0",
      title: "اسم المحل",
      location: "موقع",
      topRanked: true,
      image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "1",
      title: "اسم المحل",
      location: "موقع",
      topRanked: true,
      image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "2",
      title: "اسم المحل",
      location: "موقع",
      topRanked: true,
      image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
  ];

  // StatusBar.setHidden(true);
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.carousel}>
            <HomeCarousel />
          </View>
        </View>
        <View style={styles.status}>
          <View style={styles.left}>
            <Typography
              content={`مرحبا ${userName?.split(" ")[0] || ""}!`}
              color={colors.white}
              size={22}
              bold={true}
              lh={26}
            />
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.icon}>
              <ShareSVG />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <NotificationSVG />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBox}>
          <SearchBox />
        </View>
      </View>
      <View style={styles.body}>
        <View style={[styles.about, styles.spacing]}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              color={colors.dark_blue}
              size={16}
              align="left"
              content="المحلات التجارية"
            />
          </View>
          <TouchableOpacity style={styles.aboutRight}>
            <Typography
              color={colors.dark_blue}
              size={14}
              align="right"
              content="اظهار الكل"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={FullBox}
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
        <View style={styles.about}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              color={"#1F9B89"}
              size={16}
              align="left"
              content="التعليم الإلكتروني"
            />
          </View>
          <TouchableOpacity style={styles.aboutRight}>
            <Typography
              color={colors.dark_blue}
              size={14}
              content="اظهار الكل"
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={ImageBox}
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
        <View style={styles.about}>
          <View style={styles.aboutLeft}>
            <Typography
              color={"#E8AF2E"}
              bold={true}
              size={16}
              content="الخبراء"
              align="left"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Expert")}
            style={styles.aboutRight}
          >
            <Typography
              color={colors.dark_blue}
              size={14}
              content="اظهار الكل"
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={({ item }) => (
              <SmallBox
                item={item}
                onPress={() =>
                  navigation.navigate("homeSingleExpertScreen", {
                    data: item,
                  })
                }
              />
            )}
            data={experts}
            keyExtractor={(item) => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
        <View style={styles.about}>
          <View style={styles.aboutLeft}>
            <Typography
              color={"#F27E30"}
              bold={true}
              size={16}
              content="وظائف"
            />
          </View>
          <TouchableOpacity style={styles.aboutRight}>
            <Typography
              color={colors.dark_blue}
              size={14}
              content="اظهار الكل"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={SmallBox}
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    zIndex: 10000,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  left: {
    marginLeft: 24,
  },
  right: {
    marginRight: 24,
    flexDirection: "row",
  },
  header: {
    position: "relative",
  },
  icon: {
    width: SCREEN_HEIGHT * 0.04,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: SCREEN_HEIGHT * 0.04,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
  },
  container: {
    backgroundColor: "#fff",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.017,
    alignSelf: "center",
    zIndex: 100000000,
  },
  body: {
    paddingTop: 24,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    zIndex: -1,
  },
  about: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginBottom: 5,
  },
  list: {
    paddingLeft: SCREEN_WIDTH * 0.059,
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.025,
  },
});
