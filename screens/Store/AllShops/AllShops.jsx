import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import FilterSVG from "../../../SVGR/Globals/Filter";
import SearchSVG from "../../../SVGR/Globals/SearchSVG";
import NotificationSVG from "../../../SVGR/Home/Notification";
import { useIsFocused } from "@react-navigation/native";
import {
  getAllShops,
  getShopsById,
  shopHome,
  toogleFavorite,
} from "../../../api/Shop";
import { HalfCard } from "../StoreCards/HalfCard";
import AppContext from "../../../appContext/AppContext";

export const AllShops = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [offset, setOffset] = useState(1);

  const {
    notificationsCounter,
    setFavShops,
    setAllShops,
    fixedTitles,
  } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [singleShopLoading, setSingleShopLoading] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
    getBestShopsHandler(offset);
  }, [isFocused]);

  const getBestShopsHandler = () => {
    setLoading(true);
    getAllShops(offset)
      .then((res) => {
        setData([...data, ...res.data.shops.data]);
        setOffset(offset + 1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const singleShopHandler = (id) => {
    setSingleShopLoading(true);
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
        setSingleShopLoading(false);
      });
  };
  const getHomeShop = () => {
    shopHome()
      .then((res) => {
        setFavShops(res.data.favorite_shops);
        setAllShops(res.data.all_shops);
      })
      .catch((err) => {});
  };
  const [liked, setLiked] = useState(false);
  const toogleFavoritesHandler = (id, index) => {
    let mutatedList = [...data];
    mutatedList[index].is_favorite = !mutatedList[index].is_favorite;
    setData(mutatedList);
    toogleFavorite(id)
      .then((res) => {
        getHomeShop();
      })
      .catch((err) => {})
      .finally(() => {
        setLiked(!liked);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          {
            zIndex: singleShopLoading ? 10 : 0,
            elevation: singleShopLoading ? 10 : 0,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.focused}
          animating={singleShopLoading}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          notificationsCounter={notificationsCounter}
          navigation={navigation}
          fixedTitles={fixedTitles}
        />
        <View style={styles.list}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getBestShopsHandler}
              />
            }
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
            data={data}
            onEndReachedThreshold={0.5}
            onEndReached={getBestShopsHandler}
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
      </SafeAreaView>
    </>
  );
};
function Header({ navigation, notificationsCounter, fixedTitles }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.row}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.dark_blue}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Typography
            content={fixedTitles.shopTitles["all-shops"].title}
            size={20}
            bold
            align="left"
            color={colors.dark_blue}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StoreSearchScreen", {
              favShops: null,
            })
          }
          style={styles.icon}
        >
          <SearchSVG secondary />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FilterScreen")}
          style={[styles.icon, { marginHorizontal: 10 }]}
        >
          <FilterSVG />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("notifications")}
          style={styles.icon}
        >
          <NotificationSVG />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    alignSelf: "center",
    marginTop: 20,
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
    alignItems: "center",
    justifyContent: "center",
  },
});
