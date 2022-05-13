import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  I18nManager,
  RefreshControl,
  FlatList
} from "react-native";
import Typography from "../../../components/Typography/Typography";

import { colors } from "../../../globals/colors";
import { SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import FilterSVG from "../../../SVGR/Globals/Filter";
import SearchSVG from "../../../SVGR/Globals/SearchSVG";
import { HalfCard } from "../StoreCards/HalfCard";
import {
  favShops,
  getShopsById,
  shopHome,
  toogleFavorite,
} from "../../../api/Shop";
import { useIsFocused } from "@react-navigation/native";

import { FullBox } from "../../../components/Boxes/FullBox";
import AppContext from "../../../appContext/AppContext";

export const BestShops = ({ navigation }) => {
  const isFocused = useIsFocused();

  const { setFavShops, setAllShops, fixedTitles } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const [liked, setLiked] = useState(false);
  const toogleFavoritesHandler = (id, index) => {
    let mutatedList = [...data];
    mutatedList[index].is_favorite = !mutatedList[index].is_favorite;
    setData(mutatedList);
    toogleFavorite(id)
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setLiked(!liked);
      });
  };

  useEffect(() => {
    if (!isFocused) return;
    getFavShopsHandler();
    getHomeShop();
  }, [isFocused, liked]);

  const getHomeShop = () => {
    shopHome()
      .then((res) => {
        setFavShops(res.data.favorite_shops);
        setAllShops(res.data.all_shops);
      })
      .catch((err) => {});
  };

  const getFavShopsHandler = () => {
    setLoading(true);
    favShops()
      .then((res) => {
        setLoading(false);
        setData(res.data.shops);
        setFavShops(res.data.shops);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header fixedTitles={fixedTitles} navigation={navigation} />
      <View style={styles.list}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getFavShopsHandler}
            />
          }
          data={data}
          renderItem={({ item, index }) => (
            <FullBox
              fullWidth
              isLiked={item.is_favorite}
              item={item}
              press={() => singleShopHandler(item.id)}
              addToFavorites={() => toogleFavoritesHandler(item.id, index)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          numColumns={1}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          ListEmptyComponent={() => (
            <View style={{ alignSelf: "center" }}>
              <Typography
                content={
                  !loading ? "Please add shops to favorite first" : "Loading..."
                }
                color={colors.dark_blue}
                align="center"
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BestShops;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
    flexGrow: 1,
  },
});

function Header({ navigation, fixedTitles }) {
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
            content={fixedTitles.shopTitles["favorites-shops"].title}
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
              favShops: "fav",
            })
          }
          style={styles.icon}
        >
          <SearchSVG secondary />
        </TouchableOpacity>
      </View>
    </View>
  );
}
