import React, { useState, useEffect, useContext } from "react";
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import Cart from "../../../components/Cart/Cart";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import SearchSVG from "../../../SVGR/Globals/SearchSVG";
import CachedImage from "react-native-expo-cached-image";
import CartSVG from "../../../SVGR/Globals/Cart";
import numeral from "numeral";
import {
  addToCart,
  getCart,
  getFilteredProducts,
  getFilteredShops,
  singleProduct,
} from "../../../api/Shop";
import { HalfCard } from "../StoreCards/HalfCard";
import AppContext from "../../../appContext/AppContext";
import NotificationSVG from "../../../SVGR/Home/Notification";
import { AddToCartModal } from "../../../components/Modals/Cart/AddToCartModal";
import { ErrorModal } from "../../Profile/MyShops/Modal/ErrorModal";
import { useIsFocused } from "@react-navigation/native";

export const SingleShop = ({ navigation, route }) => {
  const {
    productName,
    name,
    offers,
    products,
    image,
    id,
    deliveryFees,
    deliveryDuration,
    shopType,
    village,
    about,
  } = route.params;

  useEffect(() => {
    setStoreDelivery(deliveryFees);
  }, []);

  const [activeFilter, setActiveFilter] = useState([0]);
  const listRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const {
    fixedTitles,
    setStoreDelivery,
    cartNumber,
    setCartNumber,
    setCartStatus,
    cartStatus,
  } = useContext(AppContext);
  const [productsData, setProductsData] = useState(products?.data);
  const [filterData, setFilterData] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  let filterArr = [];
  useEffect(() => {
    let allObj = {
      id: 0,
      title: "all items",
      slug: "all items",
    };

    fixedTitles.productTypes.map((data) => {
      filterArr.push(data);
    });
    setFilterData([allObj, ...filterArr]);
  }, []);

  const filterHandler = (filter_id) => {
    setActiveFilter([filter_id]);

    if (activeFilter?.includes(filter_id)) {
      setActiveFilter([0]);
      setProductsData(products.data);
    } else {
      if (filter_id == 0) {
        setProductsData(products.data);
      } else {
        setFilterLoading(true);
        getFilteredProducts(filter_id, id)
          .then((res) => {
            setProductsData(res.data.products.data);
          })
          .catch((err) => {})
          .finally(() => {
            setFilterLoading(false);
          });
      }
    }
  };
  const singleProductHandler = (item) => {
    setLoading(true);
    singleProduct(item.shop_id, item.id)
      .then((res) => {
        navigation.navigate("SingleProductScreen", {
          price: res.data.product.price_per_unit,
          image: res.data.product.formatted_image,
          isOffer: res.data.product.is_offer,
          name: res.data.product.name,
          p_id: res.data.product.id,
          id: res.data.product.shop_id,
          size: res.data.product.size.title,
          stock: res.data.product.quantity_in_stock,
          desc: res.data.product.description,
          faqs: res.data.product.faqs,
          releated: res.data.product.related_products,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [cartPrice, setCartPrice] = useState("");

  const [errorModal, setErrorModal] = useState(false);

  const [prodId, setProdId] = useState(null);

  const closeModal = () => {
    // setCartPrice(price);
    setCartNumber(1);
    setModalVisible(false);
  };

  const getCartStatusHandler = async () => {
    getCart()
      .then((res) => {
        setCartStatus(res.data.cart);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCartStatusHandler();
  }, [isFocused]);

  const addToCartHandler = (item) => {
    setProdId(item.id);
    if (cartStatus && cartStatus.length > 0) {
      if (cartStatus[0]?.shop_id == item.shop_id) {
        setModalVisible(false);
        let formdata = new FormData();
        formdata.append("product_id", item.id);
        addToCart(formdata)
          .then((res) => {
            getCartStatusHandler().then((res) => {
              if (cartStatus.length > 0) {
                if (cartStatus[0]?.shop_id == item.shop_id) {
                  navigation.navigate("MyCartStack");
                } else {
                  setErrorModal(true);
                }
              } else {
                navigation.navigate("MyCartStack");
              }
            });
          })
          .catch((err) => {});
      } else {
        setErrorModal(true);
      }
    } else {
      let cartData = new FormData();

      cartData.append("product_id", item.id);

      addToCart(cartData)
        .then((res) => {
          getCartStatusHandler().then((res) => {
            if (cartStatus.length > 0) {
              if (cartStatus[0]?.shop_id == item.shop_id) {
                navigation.navigate("MyCartStack");
              } else {
                setErrorModal(true);
              }
            } else {
              navigation.navigate("MyCartStack");
            }
          });
          // navigation.navigate("MyCartStack");
        })
        .catch((err) => {});
    }
  };

  const handleErrorModal = () => {
    setErrorModal(false);
    let cartData = new FormData();

    cartData.append("product_id", prodId);

    addToCart(cartData)
      .then((res) => {
        navigation.navigate("MyCartStack");
      })
      .catch((err) => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.focused}
          anima
          animating={loading}
        />
      </View>
      <SingleProductHeader productName={name} navigation={navigation} />
      <ScrollView>
        <ShopType
          deliveryFees={deliveryFees}
          deliveryDuration={deliveryDuration}
          shopType={shopType}
          village={village}
          image={image}
          about={about}
          fixedTitles={fixedTitles}
        />
        <OffersList
          setLoading={setLoading}
          loading={loading}
          data={offers}
          navigation={navigation}
          addToCartHandler={(item) => addToCartHandler(item)}
        />
        <View style={styles.filterWrapper}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            ref={listRef}
            data={filterData}
            renderItem={({ item }) => (
              <RenderFilter
                item={item}
                filterHandler={(id) => filterHandler(id)}
                activeFilter={activeFilter}
              />
            )}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <FlatList
            //refreshing={refreshing} onRefresh={onRefresh}
            refreshControl={<RefreshControl refreshing={filterLoading} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            data={productsData}
            numColumns={2}
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                press={() => singleProductHandler(item)}
                closeModal={() => closeModal()}
                navigation={navigation}
                cartNumber={cartNumber}
                setCartNumber={setCartNumber}
                setCartStatus={setCartStatus}
                cartStatus={cartStatus}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addToCartHandler={(item) => addToCartHandler(item)}
                setCartPrice={setCartPrice}
                cartPrice={cartPrice}
                productsData={productsData}
              />
            )}
          />
        </View>
      </ScrollView>
      <ErrorModal
        visible={errorModal}
        close={() => setErrorModal(false)}
        submit={() => handleErrorModal()}
      />
    </SafeAreaView>
  );
};

const RenderItem = ({
  item,
  press,
  closeModal,
  navigation,
  cartNumber,
  setCartNumber,
  setCartStatus,
  cartStatus,
  modalVisible,
  setModalVisible,
  addToCartHandler,
  index,
  cartPrice,
  setCartPrice,
  productsData,
}) => {
  return (
    <TouchableOpacity onPress={() => press()} style={styles.card}>
      <View>
        <CachedImage
          source={{ uri: item.formatted_image }}
          style={styles.boxImage}
        />
      </View>
      <View style={{ paddingHorizontal: 2, width: "95%" }}>
        <Typography
          hide
          content={`${item.name} - ${numeral(item.price_per_unit).format(
            "0,0"
          )} LBP`}
          align="left"
          color={colors.dark_blue}
          size={11}
          fit={true}
          lines={2}
        />
      </View>
      {item.quantity_in_stock > 0 && (
        <TouchableOpacity
          onPress={() => addToCartHandler(item)}
          style={styles.cart}
        >
          <CartSVG />
        </TouchableOpacity>
      )}

      {/* <AddToCartModal
        // cartHandler={(type) => cartHandler(type)}
        name={item.name}
        price={item.price_per_unit}
        stock={item.quantity_in_stock}
        // checkoutHandler={() => checkoutHandler()}
        image={item.formatted_image}
        cartNumber={cartNumber}
        setCartNumber={setCartNumber}
        cartPrice={cartPrice}
        setCartPrice={setCartPrice}
        isVisible={modalVisible}
        close={() => closeModal()}
        navigation={navigation}
      /> */}
    </TouchableOpacity>
  );
};

const RenderFilter = ({ item, filterHandler, activeFilter }) => {
  return (
    <TouchableOpacity onPress={() => filterHandler(item.id)}>
      <View
        style={[
          styles.inactivefilter,
          activeFilter.includes(item.id) && styles.activeFilter,
        ]}
      >
        <Typography
          content={item.title}
          align="center"
          color={activeFilter.includes(item.id) ? colors.dark_blue : "#CFD9DC"}
          size={13}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.65,

    elevation: 1,
  },
  topBox: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    flexDirection: "row",
  },
  topBoxBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#CFD9DC",
  },
  offres: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 15,
  },
  boxImage: {
    height: SCREEN_HEIGHT * 0.142,
    width: SCREEN_WIDTH * 0.434,
    borderRadius: 10,
  },
  card: {
    marginHorizontal: 3,
  },
  inactivefilter: {
    minWidth: SCREEN_WIDTH * 0.2,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F5F6",
    marginHorizontal: SCREEN_WIDTH * 0.02,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  filterWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  activeFilter: {
    borderColor: colors.dark_blue,
    backgroundColor: "white",
    borderWidth: 1,
  },
  seperator: {
    marginHorizontal: 10,
    borderColor: "#CFD9DC",
    borderRightWidth: 1,
    height: "60%",
  },
  cart: {
    position: "absolute",
    backgroundColor: "white",
    height: SCREEN_HEIGHT * 0.03,
    width: SCREEN_HEIGHT * 0.03,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (SCREEN_HEIGHT * 0.03) / 2,
    right: 10,
    top: 5,
    zIndex: 10,
    elevation: 2,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
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
});

function SingleProductHeader({ productName, navigation }) {
  const { notificationsCounter, cartStatus } = useContext(AppContext);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.row} onPress={() => navigation.pop()}>
        <View>
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
        </View>
        <View
          style={{
            marginLeft: 8,
          }}
        >
          <Typography
            content={productName}
            color={colors.dark_blue}
            size={20}
            align="left"
            bold
          />
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyCartStack")}
          style={[styles.icon, { marginRight: 10 }]}
        >
          <Cart />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StoreSearchScreen", {
              favShops: false,
            })
          }
          style={styles.icon}
        >
          <SearchSVG secondary />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("notifications")}
          style={[styles.icon, { marginLeft: 10 }]}
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

function ShopType({
  shopType,
  village,
  image,
  deliveryFees,
  deliveryDuration,
  about,
  fixedTitles,
}) {
  return (
    <View style={styles.topBoxBorder}>
      <View style={styles.topBox}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: 82,
            height: 57,
            borderRadius: 10,
            overflow: "hidden",
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            marginLeft: 8,
          }}
        >
          <Typography
            content={shopType}
            align="left"
            size={14}
            color={colors.dark_blue}
          />
          <View
            style={{
              top: -SCREEN_HEIGHT * 0.009,
            }}
          >
            <Typography
              content={village}
              align="left"
              size={14}
              color={colors.dark_blue}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: SCREEN_WIDTH - 40,
          alignSelf: "center",
          marginBottom: 15,
        }}
      >
        <Typography
          size={12}
          color={colors.dark_blue}
          align="left"
          content={about}
        />
        <Typography
          content={fixedTitles.shopTitles["delivery-service"].title}
          color={colors.focused}
          align="left"
          size={16}
          bold
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Typography
              content={`${
                fixedTitles.shopTitles["delivery-service"].title
              }: ${numeral(deliveryFees).format("0,0")} LBP`}
              color={colors.dark_blue}
              align="left"
              size={12}
            />
          </View>
          <View style={styles.seperator} />
          <View>
            <Typography
              content={`${fixedTitles.shopTitles["approx-delivery-to-location"].title}: ${deliveryDuration} ساعة`}
              color={colors.dark_blue}
              align="left"
              size={12}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function OffersList({
  data,
  navigation,
  setLoading,
  addToCartHandler,
  loading,
}) {
  const singleProductHandler = (item) => {
    setLoading(true);
    singleProduct(item.shop_id, item.id)
      .then((res) => {
        navigation.navigate("SingleProductScreen", {
          price: res.data.product.price_per_unit,
          image: res.data.product.formatted_image,
          isOffer: res.data.product.is_offer,
          name: res.data.product.name,
          p_id: res.data.product.id,
          id: res.data.product.shop_id,
          size: res.data.product.size.title,
          stock: res.data.product.quantity_in_stock,
          desc: res.data.product.description,
          faqs: res.data.product.faqs,
          releated: res.data.product.related_products,
          link: res.data.product.share_link,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.offres}>
      <View
        style={{
          marginBottom: 5,
        }}
      >
        <Typography
          content="عروضات"
          align="left"
          color={colors.dark_blue}
          size={16}
          bold
        />
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                alignSelf: "center",
                width: SCREEN_WIDTH - 40,
              }}
            >
              <Typography
                content="No offers at the moment comeback later"
                align="center"
                color={colors.dark_blue}
                size={12}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          data={data}
          horizontal
          renderItem={({ item }) => (
            <RenderItem
              addToCartHandler={(item) => addToCartHandler(item)}
              item={item}
              press={() => singleProductHandler(item)}
            />
          )}
        />
      </View>
    </View>
  );
}
