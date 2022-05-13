import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import SearchSVG from "../../SVGR/Globals/SearchSVG";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { FullBox } from "../../components/Boxes/FullBox";
import { HalfCard } from "./StoreCards/HalfCard";
import Cart from "../../components/Cart/Cart";
import AppContext from "../../appContext/AppContext";
import { getShopsById, shopHome, toogleFavorite } from "../../api/Shop";
import NotificationSVG from "../../SVGR/Home/Notification";
import StoreModal from "../../components/Modals/StoreModal";
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export const StoreScreen = ({ navigation }) => {
  const {
    swiperData,
    favShops,
    allShops,
    setAllShops,
    setFavShops,
    fixedTitles,
    setSwiperData,
    cartStatus,
    setStoreModalVisible,
    storeModalVisible,
  } = useContext(AppContext);
  const routes = useRoute();

  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

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
  const bannerShopHandler = (item) => {
    if (item.external_link !== null) {
      Linking.openURL(item.external_link).catch((err) => {
        console.log(err);
      });
    } else {
      setLoading(true);
      getShopsById(item.shop_id)
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
    }
  };
  const [liked, setLiked] = useState(false);
  const toogleFavoritesHandler = (id, index) => {
    let mutatedList = [...allShops];
    mutatedList[index].is_favorite = !mutatedList[index].is_favorite;
    setAllShops(mutatedList);
    toogleFavorite(id)
      .then((res) => {
        getHomeShop();
      })
      .catch((err) => {})
      .finally(() => {
        setLiked(!liked);
      });
  };

  const [refresh, setRefresh] = useState(false);

  const getHomeShop = () => {
    setRefresh(true);
    shopHome()
      .then((res) => {
        setFavShops(res.data.favorite_shops);
        setAllShops(res.data.all_shops);
        setSwiperData(res.data.swiper);
      })
      .catch((err) => {})
      .finally(() => {
        setRefresh(false);
      });
  };

  useEffect(() => {
    getHomeShop();
  }, [liked]);

  // useEffect(() => {
  //   if (!isFocused) return;
  //   if (cartStatus.length > 0) {
  //     setStoreModalVisible(true);
  //   }
  // }, []);

  const cartHandler = () => {
    setStoreModalVisible(false);
    setTimeout(() => {
      navigation.navigate("MyCartStack");
    }, 200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.loader,
            { zIndex: loading ? 59 : 0, elevation: loading ? 9 : 0 },
          ]}
        >
          <ActivityIndicator
            size="large"
            color={colors.focused}
            animating={loading}
          />
        </View>
        <CustomHeader fixedTitles={fixedTitles} navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
            <List
              singleShopHandler={(item) => bannerShopHandler(item)}
              setActiveSlide={setActiveSlide}
              data={swiperData}
              fixedTitles={fixedTitles}
            />
            <AnimatedListDots
              data={swiperData}
              activeSlide={activeSlide}
              SCREEN_HEIGHT={SCREEN_HEIGHT}
            />
          </View>

          {favShops.length > 0 && (
            <Bar
              press={() => navigation.navigate("BestShops")}
              spacing
              left={fixedTitles.shopTitles["favorites-shops"].title}
              right={fixedTitles.shopTitles["view-all"].title}
            />
          )}
          <View style={styles.shopList}>
            <FlatList
              renderItem={({ item, index }) => (
                <FullBox
                  item={item}
                  press={() => singleShopHandler(item.id)}
                  addToFavorites={() => toogleFavoritesHandler(item.id, index)}
                />
              )}
              data={favShops}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
          <Bar
            spacing
            left={fixedTitles.shopTitles["all-shops"].title}
            right={fixedTitles.shopTitles["view-all"].title}
            press={() => navigation.navigate("AllShops")}
          />
          <View style={styles.allShops}>
            <FlatList
              data={allShops}
              numColumns={2}
              renderItem={({ item, index }) => (
                <HalfCard
                  isLiked={item.is_favorite}
                  item={item}
                  onPress={() => singleShopHandler(item.id)}
                  addToFavorites={() => toogleFavoritesHandler(item.id, index)}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StoreModal
        visible={storeModalVisible}
        close={() => setStoreModalVisible(false)}
        cartHandler={() => cartHandler()}
        title={
          fixedTitles.shopTitles[
            "you-have-items-in-cart-from-your-previous-time"
          ].title
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Clientcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconBtn: {
    height: SCREEN_HEIGHT * 0.037,
    width: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    borderRadius: (SCREEN_HEIGHT * 0.037) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  shopCarouselImage: {
    width: "100%",
    height: "100%",
  },
  list: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: SCREEN_HEIGHT * 0.16,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  dots: {
    position: "absolute",
    alignSelf: "center",
    top: SCREEN_HEIGHT * 0.145,
  },
  about: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.025,
  },
  shopList: {
    paddingHorizontal: 20,
  },
  allShops: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: "100%",

    alignItems: "center",
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_HEIGHT * 0.045,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  notification: {
    backgroundColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.014,
    width: SCREEN_HEIGHT * 0.014,
    borderRadius: (SCREEN_HEIGHT * 0.014) / 2,
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
});
function CustomHeader({ navigation, fixedTitles }) {
  const { notificationsCounter, cartStatus } = useContext(AppContext);

  return (
    <View style={styles.header}>
      <View>
        <Typography
          content={fixedTitles.shopTitles["e-shop"].title}
          align="left"
          size={20}
          bold
          color={colors.dark_blue}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyCartStack")}
          style={[styles.iconBtn, { marginRight: 10 }]}
        >
          <Cart />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StoreSearchScreen", {
              favShops: null,
            })
          }
          style={styles.iconBtn}
        >
          <SearchSVG secondary />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("notifications")}
          style={[styles.iconBtn, { marginLeft: 10 }]}
        >
          <NotificationSVG />
          {notificationsCounter > 0 && (
            <View style={styles.notification}>
              <View style={{ top: -SCREEN_HEIGHT * 0.001 }}>
                <Text style={[styles.smallText, { lineHeight: 11 }]}>
                  {notificationsCounter}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RenderItem({ item, onPress, fixedTitles }) {
  return (
    <View>
      <View
        style={{
          width: SCREEN_WIDTH - 40,
          height: SCREEN_HEIGHT * 0.16,
          overflow: "hidden",
        }}
      >
        <>
          <Image
            style={styles.shopCarouselImage}
            source={{
              uri: item.formatted_image,
            }}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </>
      </View>
      <View
        style={{
          position: "absolute",
          left: SCREEN_WIDTH * 0.05,
          top: SCREEN_HEIGHT * 0.04,
        }}
      >
        <Typography
          content={item.title}
          bold
          size={16}
          color={colors.white}
          align="left"
        />
        <View>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Typography
              content={fixedTitles.shopTitles["show-products"].title}
              align="center"
              color={colors.dark_blue}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function AnimatedListDots({ activeSlide, SCREEN_HEIGHT, data }) {
  return (
    <View style={styles.dots}>
      {data.length > 0 && (
        <AnimatedDotsCarousel
          length={data.length}
          interpolateOpacityAndColor={true}
          currentIndex={activeSlide}
          maxIndicators={4}
          inactiveIndicatorConfig={{
            color: "white",
            margin: 3,
            opacity: 1,
            size: SCREEN_HEIGHT * 0.007,
          }}
          activeIndicatorConfig={{
            color: colors.focused,
            margin: 3,
            opacity: 1,
            size: SCREEN_HEIGHT * 0.007,
          }}
          decreasingDots={[
            {
              config: {
                color: "white",
                margin: 3,
                opacity: 1,
                size: SCREEN_HEIGHT * 0.007,
              },
              quantity: 0.5,
            },
            {
              config: {
                color: "white",
                margin: 3,
                opacity: 0.5,
                size: 4,
              },
              quantity: 1,
            },
          ]}
        />
      )}
    </View>
  );
}

function List({ setActiveSlide, data, singleShopHandler, fixedTitles }) {
  return (
    <Animated.FlatList
      onMomentumScrollEnd={(event) => {
        const index = Math.floor(
          event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width
        );
        setActiveSlide(index);
      }}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      horizontal
      ListEmptyComponent={() => (
        <View style={{ alignSelf: "center", width: SCREEN_WIDTH - 40 }}>
          <Typography
            content="there is no featured stores right now"
            align="center"
            color={colors.dark_blue}
          />
        </View>
      )}
      data={data}
      pagingEnabled
      decelerationRate={"normal"}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <RenderItem
            onPress={() => singleShopHandler(item)}
            item={item}
            fixedTitles={fixedTitles}
          />
        );
      }}
    />
  );
}

function Bar({ left, right, spacing, press }) {
  return (
    <View style={[styles.about, spacing && styles.spacing]}>
      <View style={styles.aboutLeft}>
        <Typography
          bold={true}
          color={colors.dark_blue}
          size={16}
          align="left"
          content={left}
        />
      </View>
      <TouchableOpacity
        onPress={() => press && press()}
        style={styles.aboutRight}
      >
        <Typography
          color={colors.dark_blue}
          size={14}
          align="right"
          content={right}
        />
      </TouchableOpacity>
    </View>
  );
}
