import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  I18nManager,
  ActivityIndicator,
  FlatList
} from "react-native";

import { searchShop, shopHome } from "../../../api/Shop";
import { SearchBox } from "../../../components/SearchBox/SearchBox";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import { HalfCard } from "../StoreCards/HalfCard";
import {
  toogleFavorite,
  getShopsById,
  searchMyShops,
  searchFavorites,
} from "../../../api/Shop/index";
import AppContext from "../../../appContext/AppContext";
export const StoreSearchScreen = ({ navigation, route }) => {
  const { favShops } = route.params;
  const { setAllShops, setFavShops, fixedTitles } = useContext(AppContext);
  const [searchString, setSearchString] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [data, setData] = React.useState(null);
  const searchShopHandler = () => {
    setLoading(true);
    switch (favShops) {
      case "myShops":
        setLoading(true);
        searchMyShops(searchString)
          .then((res) => {
            setData(res.data.shops);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });

        break;

      case "fav":
        searchFavorites(searchString)
          .then((res) => {
            setData(res.data.shops);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });

        break;
      default:
        searchShop(searchString)
          .then((res) => {
            setLoading(false);
            setData(res.data.shops.data);
          })
          .catch((err) => {
            setLoading(false);
          });
        break;
    }
  };

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
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : -1, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.focused}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.dark_blue}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Typography
            size={20}
            bold
            content={fixedTitles.shopTitles["search"].title}
            align="left"
            color={colors.dark_blue}
          />
        </View>
      </TouchableOpacity>

      <View style={{ marginHorizontal: 20 }}>
        <SearchBox
          filterEnabled
          width={SCREEN_WIDTH - 40}
          hideFilter
          placeholder="اسم المحل"
          searchString={searchString}
          setSearchString={setSearchString}
          onSearchPress={() => searchShopHandler()}
        />
      </View>

      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <FlatList
          ListEmptyComponent={() => (
            <View>
              <Typography content="empty list" color={colors.dark_blue} />
            </View>
          )}
          data={data}
          renderItem={({ item, index }) => (
            <HalfCard
              isLiked={item.is_favorite}
              item={item}
              onPress={() => singleShopHandler(item.id)}
              addToFavorites={() => toogleFavoritesHandler(item.id, index)}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
    elevation: 0,
  },
});
