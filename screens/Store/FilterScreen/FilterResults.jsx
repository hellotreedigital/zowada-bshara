import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

import { getShopsById, shopHome, toogleFavorite } from "../../../api/Shop";
import AppContext from "../../../appContext/AppContext";
import { Header } from "../../../components/Header/Header";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { HalfCard } from "../StoreCards/HalfCard";

export const FilterResults = ({ navigation, route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(data);

  const { setFavShops, setAllShops, fixedTitles } = useContext(AppContext);

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
    let mutatedList = [...filter];
    mutatedList[index].is_favorite = !mutatedList[index].is_favorite;
    setFilter(mutatedList);
    toogleFavorite(id)
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setLiked(!liked);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        fixedTitles={fixedTitles}
        navigation={navigation}
        blue
        title="Results"
      />
      <View style={styles.list}>
        <FlatList
          numColumns={2}
          data={filter}
          renderItem={({ item, index }) => (
            <HalfCard
              isLiked={item.is_favorite}
              item={item}
              onPress={() => singleShopHandler(item.id)}
              addToFavorites={() => toogleFavoritesHandler(item.id, index)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={{ alignSelf: "center" }}>
              <Typography
                content="Choose another filter"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flexGrow: 1,
    marginTop: 20,
    alignSelf: "center",
    width: SCREEN_WIDTH - 40,
  },
});
