import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
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
} from "react-native";
import Pusher from "pusher-js/react-native";

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
let pusherSubscribed = false;
import { useIsFocused } from "@react-navigation/native";
import { getShopsById } from "../../api/Shop";
import JobBox from "../../components/Boxes/JobBox";
import { singleJob } from "../../api/Jobs";
import { getFundingsById } from "../../api/Funding/Funding";
import { fixedTitles } from "../../api/FixedTitles/FixedTitles";
import { searchLanding } from "../../api/Landing";
export const HomeScreen = ({ navigation }) => {
  const [searchString, setSearchString] = React.useState("");
  const {
    appLanguage,
    userName,
    token,
    experts,
    setExperts,
    userData,
    isNotification,
    notificationsCounter,
    chatsCounter,
    setChatsCounter,
    setPusher,
    setStoreModalVisible,
    cartStatus,
    landingData,
    fixedTitles,
  } = useContext(AppContext);
  const isFocused = useIsFocused();

  const data = [
    {
      id: "0",
      name: "اسم المحل",
      address: "موقع",
      topRanked: true,
      formatted_image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "1",
      name: "اسم المحل",
      address: "موقع",
      topRanked: true,
      formatted_image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "2",
      name: "اسم المحل",
      address: "موقع",
      topRanked: true,
      formatted_image:
        "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
  ];

  // StatusBar.setHidden(true);

  const getPusher = async () => {
    let newPusher = new Pusher("84d9ddc6fdac8fe0feab", {
      cluster: "ap2",
      appId: "1348656",
      restServer: "https://staging.zowada-backend.hellotree.dev/api",
      authEndpoint:
        "https://staging.zowada-backend.hellotree.dev/broadcasting/auth",
      encrypted: true,
      auth: {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    });
    setPusher(newPusher);
  };

  useEffect(() => {
    if (cartStatus?.length > 0) {
      setStoreModalVisible(true);
    }
  }, []);

  useEffect(() => {
    getPusher();
  }, [token]);

  const [loading, setLoading] = React.useState(false);

  const singleShopHandler = (id) => {
    setLoading(true);
    getShopsById(id)
      .then((res) => {
        navigation.navigate("SingleShop", {
          name: res.data.shop.name,
          offers: res.data.offers,
          products: res.data.products,
          image: res.data.shop.formatted_image,
          id: res.data.shop.id,
          deliveryFees: res.data.shop.delivery_fee,
          deliveryDuration: res.data.shop.delivery_duration,
          shopType: res.data.shop.shop_type.title,
          village: res.data.shop.address,
          about: res.data.shop.about,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const singleJobHandler = (id) => {
    console.log(id);
    setLoading(true);
    singleJob(id)
      .then((res) => {
        navigation.navigate("SingleJobScreen", {
          item: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSingleFunding = (id) => {
    setLoading(true);

    getFundingsById(id)
      .then((res) => {
        navigation.navigate("FundingSingleScreen", { data: res.data.project });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const homeSearchHandler = ()=>{
    searchLanding(searchString).then((res)=>{
      console.log(res)
      navigation.navigate("HomeSearchScreen",{
        data:res.data
      })
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{})
  }

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_blue}
        />
      </View>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.carousel}>
              <HomeCarousel
                singleShopHandler={(id) => singleShopHandler(id)}
                singleJobHandler={(id) => singleJobHandler(id)}
              />
            </View>
          </View>
          <View style={styles.status}>
            <View style={styles.left}>
              <Typography
                content={`${fixedTitles.landingTitles["welcome"].title} ${
                  userName?.split(" ")[0] || ""
                }!`}
                color={colors.white}
                size={22}
                bold={true}
                lh={26}
                fit={true}
                lines={1}
              />
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("chatsList", {
                    title: "chat",
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
                <View>
                  <NotificationSVG />
                </View>
                {notificationsCounter > 0 && (
                  <View style={styles.notification}>
                    <View style={{ top: -SCREEN_HEIGHT * 0.001 }}>
                      {/* <Typography
                      content={notificationsCounter}
                      color={colors.white}
                      size={7}
                      bold={true}
                    /> */}
                      <Text style={[styles.smallText, { lineHeight: 11 }]}>
                        {notificationsCounter}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchBox}>
            <SearchBox
              searchString={searchString}
              setSearchString={setSearchString}
              placeholder={fixedTitles.landingTitles["search"].title}
              filterEnabled
              hideFilter
              onSearchPress={()=>homeSearchHandler()}
            />
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
                content={fixedTitles.landingTitles["shops"].title}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Store")}
              style={styles.aboutRight}
            >
              <Typography
                color={colors.dark_blue}
                size={14}
                align="right"
                content={fixedTitles.landingTitles["view-more"].title}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item, index }) => (
                <FullBox
                  item={item}
                  myCards={true}
                  press={() => singleShopHandler(item.id)}
                  addToFavorites={() => toogleFavoritesHandler(item.id, index)}
                />
              )}
              data={landingData.shops}
              keyExtractor={(item) => item.id}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
          <View style={styles.about}>
            <View style={styles.aboutLeft}>
              <Typography
                bold={true}
                color={"#1F9B89"}
                size={16}
                align="left"
                content={fixedTitles.landingTitles["e-learning"].title}
              />
            </View>
            <TouchableOpacity style={styles.aboutRight}>
              <Typography
                color={colors.dark_blue}
                size={14}
                content={fixedTitles.landingTitles["view-more"].title}
                align="right"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => {
                return (
                  <ImageBox
                    item={item}
                    image={item.formatted_image}
                    name={item.title}
                  />
                );
              }}
              data={landingData.courses}
              keyExtractor={(item) => item.id}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
          <View style={styles.about}>
            <View style={styles.aboutLeft}>
              <Typography
                color={"#E8AF2E"}
                bold={true}
                size={16}
                content={fixedTitles.landingTitles["experts"].title}
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
                content={fixedTitles.landingTitles["view-more"].title}
                align="right"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
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
              data={landingData.experts}
              keyExtractor={(item) => item.id}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
          <View style={styles.about}>
            <View style={styles.aboutLeft}>
              <Typography
                color={"#F27E30"}
                bold={true}
                size={16}
                content={fixedTitles.landingTitles["jobs"].title}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Jobs")}
              style={styles.aboutRight}
            >
              <Typography
                color={colors.dark_blue}
                size={14}
                content={fixedTitles.landingTitles["view-more"].title}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <JobBox
                  location
                  company
                  jobName={item.job_name}
                  spacing
                  item={item}
                  onPress={() => singleJobHandler(item.id)}
                />
              )}
              data={landingData.jobs}
              keyExtractor={(item) => item.id}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.about}>
            <View style={styles.aboutLeft}>
              <Typography
                bold={true}
                color={colors.focused}
                size={16}
                align="left"
                content={fixedTitles.landingTitles["crowdfunding"].title}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Funding")}
              style={styles.aboutRight}
            >
              <Typography
                color={colors.dark_blue}
                size={14}
                content={fixedTitles.landingTitles["view-more"].title}
                align="right"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <ImageBox
                  item={item}
                  image={item.image_absolute_url}
                  name={item.name}
                  singleFunding={() => getSingleFunding(item.id)}
                />
              )}
              data={landingData.crowdfundings}
              keyExtractor={(item) => item.id}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
        </View>
      </ScrollView>
    </>
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
    elevation: 5,
  },
  body: {
    paddingTop: 24,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    zIndex: -1,
  },
  about: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  list: {
    paddingLeft: 20,
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.025,
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
    lineHeight: 14,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
  },
});
