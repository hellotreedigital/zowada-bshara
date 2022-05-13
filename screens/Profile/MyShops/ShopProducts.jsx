import React from "react";
import {
  ActivityIndicator,
  I18nManager,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList, TouchableOpacity
} from "react-native";

import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import PenSVG from "../../../SVGR/Globals/Pen";
import PlusSVG from "../../../SVGR/Globals/Plus";
import SearchSVG from "../../../SVGR/Globals/SearchSVG";
import numeral from "numeral";
import { getShopsById, singleProduct } from "../../../api/Shop";
import CachedImage from "react-native-expo-cached-image";
import { useIsFocused } from "@react-navigation/native";

export const ShopProducts = ({ navigation, route }) => {
  const { products, name, id, data } = route.params;

  const [loading, setLoading] = React.useState(null);
  const [productsData, setProductsData] = React.useState(products.data);
  const singleProductHandler = (p_id) => {
    setLoading(true);
    singleProduct(id, p_id)
      .then((res) => {
        navigation.navigate("SingleProduct", {
          desc: res.data.product.description,
          image: res.data.product.formatted_image,
          p_id,
          name: res.data.product.name,
          stock: res.data.product.quantity_in_stock,
          price: res.data.product.price_per_unit,
          size: res.data.product.size,
          data: res.data.product,
          id: id,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const [refresh, setRefresh] = React.useState(false);
  const isFocused = useIsFocused();

  const singleShopHandler = () => {
    setRefresh(true);
    getShopsById(id)
      .then((res) => {
        setProductsData(res.data.products.data);
      })
      .catch((err) => {})
      .finally(() => {
        setRefresh(false);
      });
  };

  React.useEffect(() => {
    if (!isFocused) return;
    singleShopHandler();
  }, [isFocused]);

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 10 : 0, elevation: loading ? 10 : 0 },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.focused}
          animating={loading}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <Header data={data} id={id} title={name} navigation={navigation} />
        <View style={{ marginTop: 0, flexGrow: 1 }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={singleShopHandler}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={productsData}
            renderItem={({ item }) => (
              <SingleProduct
                navigation={navigation}
                item={item}
                onPress={() => singleProductHandler(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <View>
                <Typography
                  color={colors.dark_blue}
                  align="center"
                  content="This shop has no products yet"
                />
              </View>
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
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
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
  image: {
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 10,
    marginRight: 10,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CFD9DC",
    flexDirection: "row",
    marginVertical: 10,
  },
  loader: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
});

function Header({ navigation, title, id, data }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.left}>
        <ArrowSVG
          style={{
            transform: [
              {
                rotateY: I18nManager.isRTL ? "0deg" : "180deg",
              },
            ],
          }}
          fill={colors.dark_blue}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Typography
            content={title}
            color={colors.dark_blue}
            align="left"
            bold
            size={20}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddShopForm", {
              editMode: true,
              data: data,
              id: id,
            })
          }
          style={styles.iconBtn}
        >
          <PenSVG />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddProductForm", {
              editMode: false,
              id: id,
            })
          }
          style={[
            styles.iconBtn,
            {
              marginHorizontal: 10,
            },
          ]}
        >
          <PlusSVG />
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
      </View>
    </View>
  );
}

function SingleProduct({ navigation, item, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.left}>
          <CachedImage
            style={styles.image}
            source={{
              uri: item.formatted_image,
            }}
          />
        </View>
        <View>
          <View>
            <View
              style={{
                top: SCREEN_HEIGHT * 0.006,
                width: "90%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "85%",
                }}
              >
                <View style={{ width: "35%" }}>
                  <Typography
                    hide
                    content={item.name}
                    size={14}
                    align="left"
                    bold
                    color={colors.dark_blue}
                    fit={true}
                    lines={1}
                  />
                </View>
                <View>
                  <Typography
                    content={`${numeral(item.price_per_unit).format(
                      "0,0.00"
                    )} L.L`}
                    size={13}
                    align="left"
                    bold
                    color={colors.focused}
                    fit={true}
                    lines={1}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                top: 0,
              }}
            >
              <Typography
                content={`${item.quantity_in_stock} كمية`}
                color={"#CFD9DC"}
                align="left"
                size={14}
              />
            </View>
            <View
              style={{
                top: -SCREEN_HEIGHT * 0.006,
                width: "70%",
              }}
            >
              <Typography
                content={item?.description}
                color={colors.dark_blue}
                align="left"
                size={14}
                fit={true}
                lines={2}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
