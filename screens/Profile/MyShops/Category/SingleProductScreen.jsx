import React, { useContext, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Share,
  View,
   FlatList, TouchableOpacity
} from "react-native";
import { Header } from "../../../../components/Header/Header";
import Typography from "../../../../components/Typography/Typography";
import { colors } from "../../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import numeral from "numeral";
import { SecondaryButton } from "../../../../buttons/SecondaryButton";
import { PrimaryButton } from "../../../../buttons/PrimaryButton";

import { CartModal } from "../../../../components/Modals/Cart/CartModal";
import AppContext from "../../../../appContext/AppContext";
import {
  addToCart,
  getCart,
  singleProduct,
  updateCart,
} from "../../../../api/Shop";
import { AccordationList } from "../../../../components/AccordationList/AccordationList";
import CartSVG from "../../../../SVGR/cart";
import ShareSVG from "../../../../SVGR/Globals/Share";
import { AddToCartModal } from "../../../../components/Modals/Cart/AddToCartModal";
import { ErrorModal } from "../Modal/ErrorModal";
import { useIsFocused } from "@react-navigation/native";
import CloseBlueSVG from "../../../../SVGR/Globals/CloseBlue";

export const SingleProductScreen = ({ navigation, route }) => {
  const {
    bottomSheetModalRef,
    cartNumber,
    setCartNumber,
    setCartStatus,
    cartStatus,
    fixedTitles,
  } = useContext(AppContext);

  const [errorModal, setErrorModal] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCartStatusHandler();
  }, [isFocused]);

  const getCartStatusHandler = async () => {
    getCart()
      .then((res) => {
        setCartStatus(res.data.cart);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCartStatusHandler();
  }, []);

  // console.error(cartStatus[0]?.shop_id);

  const addToCartHandler = () => {
    if (cartStatus && cartStatus.length > 0) {
      if (cartStatus[0]?.shop_id == id) {
        getCartStatusHandler()
          .then(() => {
            cartStatus?.map((data) => {
              if (data.product.id == p_id) {
                let fd = new FormData();
                fd.append("quantity", data.quantity + 1);

                updateCart(data.product.id, fd).then((res) => {
                  setCartNumber(data.quantity + 1);
                  setModalVisible(true);
                });
              } else {
                addToCart(cartData)
                  .then((res) => {
                    setModalVisible(true);
                  })
                  .catch((err) => {});
              }
            });
          })
          .catch(() => {
            setCartNumber(1);
            let cartData = new FormData();
            cartData.append("product_id", p_id);
            addToCart(cartData)
              .then((res) => {
                setModalVisible(true);
              })
              .catch((err) => {});
          });
      } else {
        setErrorModal(true);
      }
    } else {
      let cartData = new FormData();
      cartData.append("product_id", p_id);
      addToCart(cartData)
        .then((res) => {
          setModalVisible(true);
        })
        .catch((err) => {});
    }
  };

  const checkoutHandler = () => {
    if (cartStatus && cartStatus.length > 0) {
      if (cartStatus[0]?.shop_id == id) {
        setModalVisible(false);
        let formdata = new FormData();
        formdata.append("product_id", p_id);
        addToCart(formdata)
          .then((res) => {
            navigation.navigate("MyCartStack");
          })
          .catch((err) => {});
      } else {
        setErrorModal(true);
      }
    } else {
      let cartData = new FormData();
      setModalVisible(false);
      cartData.append("product_id", p_id);

      addToCart(cartData)
        .then((res) => {
          navigation.navigate("MyCartStack");
        })
        .catch((err) => {});
    }
  };

  const relatedCheckoutHandler = (product_id) => {
    if (cartStatus && cartStatus.length > 0) {
      if (cartStatus[0]?.shop_id == id) {
        setModalVisible(false);
        let formdata = new FormData();
        formdata.append("product_id", product_id);
        addToCart(formdata)
          .then((res) => {
            navigation.navigate("MyCartStack");
          })
          .catch((err) => {});
      } else {
        // setErrorModal(true);
        navigation.navigate("MyCartStack");
      }
    } else {
      let cartData = new FormData();
      setModalVisible(false);
      cartData.append("product_id", product_id);

      addToCart(cartData)
        .then((res) => {
          navigation.navigate("MyCartStack");
        })
        .catch((err) => {});
    }
  };

  const priceHandler = () => {
    setCartPrice(Number(price) * cartNumber);
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const modalViewRef = React.useRef(null);
  const cartHandler = (type) => {
    let formdata = new FormData();
    if (type == "increment") {
      if (cartNumber >= stock) return;
      setCartNumber(Number(cartNumber) + 1);
      formdata.append("quantity", cartNumber + 1);
      setCartPrice(Number(price) * (cartNumber + 1));
    } else {
      if (cartNumber == 1) return;
      setCartNumber(cartNumber - 1);
      formdata.append("quantity", cartNumber - 2);
      setCartPrice(Number(price) * (cartNumber - 1));
    }

    updateCart(p_id, formdata)
      .then((res) => {
        setUpdate(true);
      })
      .catch((err) => {});
  };

  const goToCheckoutHandler = () => {
    setModalVisible(false);
    // let cartData = new FormData();

    // cartData.append("product_id", p_id);
    // addToCart(cartData)
    //   .then((res) => {
    navigation.navigate("MyCartStack");
    // getCartStatusHandler();
    // })
    // .catch((err) => {
    //
    // });

    // getCartStatusHandler();
  };

  const closeModal = () => {
    setCartPrice(price);
    setCartNumber(1);
    setModalVisible(false);
  };

  const handleErrorModal = () => {
    setCartNumber(1);
    setErrorModal(false);
    let cartData = new FormData();
    cartData.append("product_id", p_id);
    addToCart(cartData)
      .then((res) => {
        setModalVisible(true);
      })
      .catch((err) => {});
  };

  const {
    price,
    image,
    isOffer,
    name,
    p_id,
    id,
    desc,
    stock,
    size,

    releated,
    faqs,
    link,
  } = route.params;

  const [cartPrice, setCartPrice] = React.useState(price);
  const [loading, setLoading] = React.useState(false);
  const singleProductHandler = (item) => {
    setLoading(true);
    singleProduct(item.shop_id, item.id)
      .then((res) => {
        navigation.push("SingleProductScreen", {
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

  const shareHandler = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header blue navigation={navigation} title={name} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: image }} style={styles.image} />
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ maxWidth: "70%" }}>
                <Typography
                  content={`${numeral(price).format("0,0")} LBP`}
                  size={26}
                  bold
                  color={colors.focused}
                  align="left"
                  fit={true}
                  lines={1}
                />
              </View>
              <View style={{ top: -4 }}>
                <Text> - </Text>
              </View>
              <View>
                <Typography
                  content={`${size} `}
                  size={16}
                  color={colors.dark_blue}
                  align="left"
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.focused,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <TouchableOpacity onPress={() => shareHandler()}>
                <ShareSVG />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginTop: 15 }}>
              <Typography
                size={14}
                align="left"
                color={colors.dark_blue}
                content={desc}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <View>
                <TouchableOpacity
                  onPress={() => addToCartHandler()}
                  style={styles.button}
                  disabled={stock == 0}
                >
                  <Typography
                    content={
                      stock == 0
                        ? "Out of stock"
                        : fixedTitles.shopTitles["add-product-to-cart"].title
                    }
                    size={16}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => checkoutHandler()}
                  disabled={stock == 0}
                  style={[styles.button, { backgroundColor: colors.dark_blue }]}
                >
                  <Typography
                    content={fixedTitles.shopTitles["buy-now"].title}
                    size={16}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {faqs.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Typography
                  content={fixedTitles.shopTitles["how-to-use"].title}
                  size={20}
                  align="left"
                  color={colors.focused}
                  bold
                />
              </View>
            )}
            {faqs.length > 0 && (
              <View>
                <AccordationList data={faqs} />
              </View>
            )}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginTop: 10 }}>
              <Typography
                content={fixedTitles.shopTitles["related-products"].title}
                size={20}
                align="left"
                color={colors.focused}
                bold
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <FlatList
              data={releated}
              renderItem={({ item }) => (
                <RenderItem
                  item={item}
                  press={() => singleProductHandler(item)}
                  checkout={(id) => relatedCheckoutHandler(item.id)}
                />
              )}
              numColumns={2}
              ListEmptyComponent={() => (
                <View style={{ alignSelf: "center" }}>
                  <Typography
                    content="there is 0 releated products"
                    color={colors.dark_blue}
                    align="center"
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>

        <AddToCartModal
          modalViewRef={modalViewRef}
          cartHandler={(type) => cartHandler(type)}
          name={name}
          price={price}
          stock={stock}
          checkoutHandler={() => goToCheckoutHandler(id)}
          image={image}
          bottomSheetModalRef={bottomSheetModalRef}
          cartNumber={cartNumber}
          setCartNumber={setCartNumber}
          cartPrice={cartPrice}
          setCartPrice={setCartPrice}
          isVisible={modalVisible}
          close={() => closeModal()}
          navigation={navigation}
        />
        <ErrorModal
          visible={errorModal}
          close={() => setErrorModal(false)}
          submit={() => handleErrorModal()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    marginTop: 20,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: SCREEN_HEIGHT * 0.27,
    borderRadius: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxImage: {
    height: SCREEN_HEIGHT * 0.142,
    width: SCREEN_WIDTH * 0.434,
    borderRadius: 10,
  },
  card: {
    marginHorizontal: 4,
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
});

const RenderItem = ({ item, press, checkout }) => {
  return (
    <TouchableOpacity onPress={() => press()} style={styles.card}>
      <View>
        <Image source={{ uri: item.formatted_image }} style={styles.boxImage} />
      </View>
      <View style={{ paddingHorizontal: 2, width: "50%" }}>
        <Typography
          hide
          content={`${item.name} - ${numeral(item.price_per_unit).format(
            "0,0"
          )} LBP`}
          align="left"
          color={colors.dark_blue}
          size={12}
          fit={true}
          lines={2}
        />
      </View>
      <View style={styles.cart}>
        <TouchableOpacity onPress={() => checkout(item.id)}>
          <CartSVG />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
