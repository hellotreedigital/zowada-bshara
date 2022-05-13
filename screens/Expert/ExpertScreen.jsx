import React, { useContext, useState } from "react";
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
  ActivityIndicator,
  Animated,
  Image
} from "react-native";
import AppContext from "../../appContext/AppContext";
import { AccordationList } from "../../components/AccordationList/AccordationList";
import { FullBox } from "../../components/Boxes/FullBox";
import { ImageBox } from "../../components/Boxes/ImageBox";
import { SmallBox } from "../../components/Boxes/SmallBox";
import { HomeCarousel } from "../../components/Carousel/HomeCarousel";
import { ExpertCard } from "../../components/ExpertsCard/ExpertCard";
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
import { FilterModal } from "../../components/Modals/FilterModal";
import { expertSearch, getExperts } from "../../api/Expert/Expert";
import ArrowSVG from "../../SVGR/Globals/Arrow";
export const ExpertScreen = ({ navigation }) => {
  const {
    appLanguage,
    userName,
    token,
    bestExperts,
    setBestExperts,
    fixedTitles,
    notificationsCounter,
    chatsCounter,
    setChatsCounter,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchString, setSearchString] = useState("");
  const expertDetailsHandler = (data) => {
    navigation.navigate("expertSingleScreen", {
      data: data,
      search: false,
    });
  };

  const searchHandler = () => {
    setLoading(true);
    expertSearch(searchString)
      .then((res) => {
        setLoading(false);
        navigation.navigate("ResultScreenScreen", {
          data: res.data.experts.data,
          fees: false,
          search: true,
          query: searchString,
        });
        setSearchString(null);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const viewAllExpertsHandler = () => {
    // setLoading(true);
    // getExperts()
    // 	.then((res) => {
    // 		setLoading(false);
    //
    // 		navigation.navigate("allExperts", {
    // 			data: res.data.experts,
    // 		});
    // 	})
    // 	.catch((err) => {
    // 		setLoading(false);
    //
    // 	});
    navigation.navigate("allExperts", {
      allExpertsMode: true,
    });
  };
  const Header = ({
    navigation,
    fixedTitles,
    userData,
    setSearchString,
    searchString,
    setModalVisible,
    navigaation,
    searchHandler,
    notificationsCounter,
    chatsCounter,
  }) => {
    return (
      <View style={styles.header}>
        <View style={styles.imageView}>
          <Image
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.3 }}
            source={{ uri: fixedTitles.expertsTitles["expert-image"].formatted_image }}
          />
          <View style={styles.overlay} />
        </View>
      </View>
        
    )
  };
  
  return (
    <Animated.ScrollView
      nestedScrollEnabled={true}
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_blue}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.carousel}>
            <Header navigation={navigation} fixedTitles={fixedTitles} />
          </View>
        </View>
        <View style={styles.status}>
          <TouchableOpacity
            style={[
              styles.left,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            {/* <View style={{ marginRight: 10 }}>
              <ArrowSVG />
            </View> */}
            <Typography
              content={fixedTitles.expertsTitles["experts"].title}
              color={colors.white}
              size={22}
              bold={true}
              lh={26}
              align="left"
            />
          </TouchableOpacity>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("chatsList", {
                  title: "chats",
                  chat: true,
                })
              }
              style={styles.icon}
            >
              <ShareSVG />
              {chatsCounter > 0 && (
                <View style={styles.notification}>
                  <View style={{ top: -SCREEN_HEIGHT * 0.0026 }}>
                    <Text style={[styles.smallText, { lineHeight: 14 }]}>
                      {chatsCounter}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("notifications")}
              style={styles.icon}
            >
              <NotificationSVG />
              {notificationsCounter > 0 && (
                <View style={styles.notification}>
                  <View style={{ top: -SCREEN_HEIGHT * 0.001 }}>
                    <Text style={styles.smallText}>{notificationsCounter}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBox}>
          <SearchBox
            filterEnabled={true}
            onPress={() => setModalVisible(true)}
            onSearchPress={() => searchHandler()}
            searchString={searchString}
            setSearchString={setSearchString}
            placeholder={fixedTitles.expertsTitles["search"].title}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={[styles.about, styles.spacing]}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              color={colors.dark_yellow}
              size={16}
              content={fixedTitles.expertsTitles["best-experts"]?.title}
              align="left"
            />
          </View>

          <TouchableOpacity
            onPress={() => viewAllExpertsHandler()}
            style={styles.aboutRight}
          >
            <Typography
              color={colors.dark_blue}
              size={14}
              content={fixedTitles.expertsTitles["show-all"].title}
              align="left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {bestExperts?.map((data, index) => {
              return (
                <ExpertCard
                  onPress={() => expertDetailsHandler(data)}
                  data={data}
                  key={data.id}
                  index={index}
                />
              );
            })}
          </ScrollView>
          {/* <FlatList
            data={bestExperts}
            renderItem={({ item }) => {
              return (
                <ExpertCard
                  onPress={() => expertDetailsHandler(data)}
                  data={item}

                  // index={index}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignSelf: "center" }}>
                  <Typography
                    content="no best experts"
                    color={colors.dark_blue}
                    size={12}
                  />
                </View>
              );
            }}
          /> */}
        </View>
        <View style={[styles.about]}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              align="left"
              color={colors.dark_yellow}
              size={16}
              content={fixedTitles.expertsTitles["faq"].title}
            />
          </View>
        </View>
        <View>
          <AccordationList />
        </View>
      </View>
      <FilterModal
        navigation={navigation}
        visible={modalVisible}
        close={() => setModalVisible(false)}
        loadingResults={loading}
        setLoadingResults={setLoading}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    zIndex: 10000,
    // marginHorizontal: 24,
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
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037,
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
    bottom: -SCREEN_HEIGHT * 0.024,
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
  },
  list: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.011,
    // paddingBottom: 20,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.012,
  },
  loader: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    zIndex: 10000,
    elevation: 1000,
  },
  notification: {
    backgroundColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.013,
    width: SCREEN_HEIGHT * 0.013,
    borderRadius: (SCREEN_HEIGHT * 0.013) / 2,
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    color: colors.white,
    fontSize: 8,
    lineHeight: 12,
  },
});
