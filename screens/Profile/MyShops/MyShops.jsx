import React, { useState, useEffect, useContext } from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import {
  dropdownProducts,
  getShops,
  getShopsById,
  gettOwnerShops,
} from "../../../api/Shop";
import { FullBox } from "../../../components/Boxes/FullBox";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import PlusSVG from "../../../SVGR/Globals/Plus";
import SearchSVG from "../../../SVGR/Globals/SearchSVG";
import { useIsFocused } from "@react-navigation/native";
import AppContext from "../../../appContext/AppContext";

export const MyShops = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const { setRelated, related, fixedTitles } = useContext(AppContext);

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleShopLoading, setSingleShopLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [singleShop, setSingleShop] = useState([]);
  const getShopsHandler = () => {
    setLoading(true);
    gettOwnerShops()
      .then((res) => {
        setShops(res.data.shops);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isFocused) return;
    getShopsHandler();
  }, [isFocused]);

  const dropdownProductsHandler = async (id) => {
    dropdownProducts(id)
      .then((res) => {
        setRelated(res.data.related);
      })
      .catch((err) => {});
  };

  const singleShopHandler = (id) => {
    setSingleShopLoading(true);
    getShopsById(id)
      .then((res) => {
        dropdownProductsHandler(id);
        setSingleShop(res.data.shop);
        navigation.navigate("ShopProducts", {
          name: res.data.shop.name,
          offers: res.data.offers,
          products: res.data.products,
          image: res.data.shop.formatted_image,
          id: res.data.shop.id,
          deliveryFees: res.data.shop.delivery_fee,
          deliveryDuration: res.data.shop.delivery_duration,
          shopType: res.data.shop.shop_type.title,
          village: res.data.shop.village,
          data: res.data.shop,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setSingleShopLoading(false);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          {
            zIndex: singleShopLoading ? 9 : 0,
            elevation: singleShopLoading ? 9 : 0,
          },
        ]}
      >
        <ActivityIndicator
          color={colors.focused}
          size="large"
          animating={singleShopLoading}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          singleShop={singleShop}
          navigation={navigation}
          fixedTitles={fixedTitles}
        />
        <View style={styles.list}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View>
                  {!loading && (
                    <Typography
                      content="Empty list"
                      color={colors.dark_blue}
                      size={12}
                      align="center"
                    />
                  )}
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getShopsHandler}
              />
            }
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            data={shops}
            renderItem={({ item }) => (
              <FullBox
                press={() => singleShopHandler(item.id)}
                item={item}
                fullWidth
                setIsLiked={setIsLiked}
                isLiked={isLiked}
                myCards={true}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  list: {
    flexGrow: 1,
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "transparent",
    position: "absolute",
  },
});

function Header({ navigation, singleShop, fixedTitles }) {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            marginRight: 10,
          }}
        >
          <ArrowSVG
            fill={colors.dark_blue}
            style={{
              transform: [
                {
                  rotateY: I18nManager.isRTL ? "0deg" : "180deg",
                },
              ],
            }}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Typography
              bold
              size={20}
              content={fixedTitles.shopTitles["my-shops"].title}
              color={colors.dark_blue}
              align="left"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddShopForm", {
              editMode: false,
              singleShop: singleShop,
            })
          }
          style={[
            styles.iconBtn,
            {
              marginRight: 10,
            },
          ]}
        >
          <PlusSVG />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StoreSearchScreen", {
              favShops: "myShops",
            })
          }
          style={styles.iconBtn}
        >
          <SearchSVG secondary />
        </TouchableOpacity>
      </View>
    </View>
  );
}
