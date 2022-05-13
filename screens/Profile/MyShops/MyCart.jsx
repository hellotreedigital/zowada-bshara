import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import { useIsFocused } from "@react-navigation/native";
import { getCart, removeFromCart, updateCart } from "../../../api/Shop";
import Typography from "../../../components/Typography/Typography";
import numeral from "numeral";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { CartModal } from "../../../components/Modals/Cart/CartModal";
import AppContext from "../../../appContext/AppContext";
import { CartButton } from "../../../components/CartButton/CartButton";
import { useRoute } from "@react-navigation/native";

export const MyCart = ({ navigation, route }) => {
  const routes = useRoute();

  const {
    storeDelivery,
    setStoreDelivery,
    cartNumber,
    setCartNumber,
    fixedTitles,
    deliveryDuration,
    setDeliveryDuration,
    setStoreModalVisible,
    setCartStatus,
  } = useContext(AppContext);

  const isFocused = useIsFocused();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (!isFocused) return;
    setStoreDelivery(0);
    getCartHandler();

    return () => {
      setCart([]);
    };
  }, [isFocused]);

  const [loading, setLoading] = useState(false);

  const getCartStatusHandler = async () => {
    getCart()
      .then((res) => {
        console.log(res.data.cart);
        setCartStatus(res.data.cart);
      })
      .catch((err) => {});
  };

  const getCartHandler = () => {
    setLoading(true);
    getCart()
      .then((res) => {
        console.log(res.data.cart.length);

        // if (res.data.cart.length > 0) {
        //   setStoreModalVisible(true);
        // }

        setCart(res.data.cart);
        setDeliveryDuration(res.data.delivery_duration);
        setStoreDelivery(res.data.delivery_fee);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getCardPirce = () => {
    return cart?.reduce(function (acc, obj) {
      return acc + obj.product.price_per_unit * obj.quantity;
    }, 0);
  };
  getCardPirce();
  const [modalVisible, setModalVisible] = useState(true);
  const [cartPrice, setCartPrice] = useState(null);
  const checkoutHandler = () => {
    setModalVisible(false);
    navigation.navigate("CheckoutScreen");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          blue
          navigation={navigation}
          title={fixedTitles.shopTitles["shopping-cart"].title}
        />
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 350 }}
            data={cart}
            ListEmptyComponent={() => (
              <View style={{ alignSelf: "center" }}>
                <Typography
                  content={loading ? "Loading...." : "empty cart"}
                  size={12}
                  color={colors.dark_blue}
                  align="center"
                />
              </View>
            )}
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                cartNumber={cartNumber}
                setCartNumber={setCartNumber}
                setCartPrice={setCartPrice}
                cartPrice={cartPrice}
                index={index}
                setCart={setCart}
                cart={cart}
                getCartStatusHandler={() => getCartStatusHandler()}
              />
            )}
          />
        </View>
        <View style={{ position: "absolute", bottom: 0 }}>
          <CartModal
            isVisible={modalVisible}
            close={() => setModalVisible(false)}
            checkout
            totalPrice={getCardPirce()}
            checkoutPress={() => checkoutHandler()}
            navigation={navigation}
            deliveryFees={storeDelivery}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const RenderItem = ({
  item,
  cartNumber,
  setCartNumber,
  cartPrice,
  setCartPrice,
  index,
  cart,
  setCart,
  getCartStatusHandler,
}) => {
  const updateList = (type) => {
    let formdata = new FormData();
    let updatedArray = [...cart];
    if (type == "increment") {
      if (
        updatedArray[index].quantity <=
        updatedArray[index].product.quantity_in_stock - 1
      ) {
        updatedArray[index].quantity = updatedArray[index].quantity + 1;
        setCart(updatedArray);
        formdata.append("quantity", updatedArray[index].quantity);
        updateCart(item.product_id, formdata)
          .then((res) => {})
          .catch((err) => {});
      }
    } else {
      if (updatedArray[index].quantity == 1) {
        removeItemHandler(item.product_id);
      } else if (updatedArray[index].quantity > 1) {
        updatedArray[index].quantity = updatedArray[index].quantity - 1;
        setCart(updatedArray);
        formdata.append("quantity", updatedArray[index].quantity);
        updateCart(item.product_id, formdata)
          .then((res) => {})
          .catch((err) => {});
      }
    }
  };

  const cartHandler = (type, id) => {
    if (item.product_id == id) {
      if (type == "increment") {
        if (cartNumber >= item.product?.quantity_in_stock) return;

        updateList("increment");
      } else {
        updateList("decrement");
      }
    }
  };

  const removeItemHandler = (id) => {
    let arr = [...cart];
    arr = cart.filter((x) => x.product.id !== id);

    removeFromCart(id)
      .then((res) => {
        getCartStatusHandler();
        setCart(arr);
      })
      .catch((err) => {});
  };

  return (
    <View>
      <View style={styles.cartProduct}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.image}
              source={{ uri: item.product.formatted_image }}
            />
            <View>
              <Typography
                content={item.product.name}
                align="left"
                color={colors.dark_blue}
                size={12}
                bold
              />
              <Typography
                content={
                  numeral(
                    Number(item.product.price_per_unit) * Number(item.quantity)
                  ).format("0,0") + " LBP "
                }
                align="left"
                color={colors.focused}
                size={12}
              />
            </View>
          </View>
          <View></View>
          <View style={{ right: 15 }}>
            <CartButton
              cartHandler={(type) => cartHandler(type, item.product_id)}
              stock={item.product?.quantity_in_stock}
              cartNumber={item.quantity}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,

    elevation: 5,
  },
  image: {
    height: SCREEN_HEIGHT * 0.078,
    width: SCREEN_HEIGHT * 0.078,
    borderRadius: 10,
    marginRight: 10,
  },
  cartProduct: {
    width: SCREEN_WIDTH - 40,
    marginTop: 20,
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  list: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    flexGrow: 1,
  },
});
