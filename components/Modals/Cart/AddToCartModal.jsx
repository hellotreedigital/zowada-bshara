import React, { useCallback, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
import Typography from "../../Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";

import AppContext from "../../../appContext/AppContext";
import { CartButton } from "../../CartButton/CartButton";
import numeral from "numeral";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import PagerView from "react-native-pager-view";
import { Navigation } from "../../../navigation";

export const AddToCartModal = ({
  image,
  bottomSheetModalRef,
  checkoutHandler,
  stock,
  name,
  price,
  cartNumber,
  setCartNumber,
  cartHandler,
  cartPrice,
  setCartPrice,
  isVisible,
  close,
  modalViewRef,
  checkout,
  totalPrice,
  checkoutPress,
  navigation,
}) => {
  // renders

  const { fixedTitles } = useContext(AppContext);

  return (
    <Modal
      animationType="slide"
      animationOut={"slideOutDown"}
      isVisible={isVisible}
      hasBackdrop={true}
      onModalWillHide={() => close()}
      onSwipeComplete={() => close()}
      swipeDirection={"down"}
    >
      <View style={styles.modalView}>
        <PagerView
          ref={modalViewRef}
          style={{ flex: 1 }}
          initialPage={checkout ? 1 : 0}
          scrollEnabled={false}
        >
          <View key="0" style={styles.contentContainer}>
            <View>
              <View>
                <Typography
                  align="center"
                  color={colors.dark_blue}
                  content={fixedTitles.shopTitles["add-to-cart"].title}
                  size={20}
                  bold
                />
              </View>
              <View>
                <View style={styles.cartProduct}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image style={styles.image} source={{ uri: image }} />
                      <View>
                        <View>
                          <Typography
                            content={name}
                            align="left"
                            color={colors.dark_blue}
                            size={12}
                            bold
                            fit={true}
                            lines={1}
                          />
                        </View>
                        <View>
                          <Typography
                            content={numeral(cartPrice).format("0,0") + " LBP "}
                            align="left"
                            color={colors.focused}
                            size={10}
                            fit={true}
                            lines={1}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ right: 15 }}>
                      <CartButton
                        cartHandler={(type) => cartHandler(type)}
                        stock={stock}
                        cartNumber={cartNumber}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => checkoutHandler()}
                  >
                    <Typography
                      content={fixedTitles.shopTitles["go-to-cart"].title}
                      align="center"
                      size={16}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer, { marginTop: 10 }]} key="1">
            <View>
              <View
                style={[
                  styles.row,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: SCREEN_WIDTH - 40,
                  },
                ]}
              >
                <View>
                  <Typography
                    content={fixedTitles.shopTitles["total"].title}
                    align="left"
                    size={16}
                    bold
                    color={colors.dark_blue}
                  />
                </View>
                <View>
                  <Typography
                    content={`${numeral(totalPrice).format("0,0")} L.L`}
                    align="left"
                    size={16}
                    bold
                    color={colors.focused}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: SCREEN_WIDTH - 40,
                  },
                ]}
              >
                <View>
                  <Typography
                    content={fixedTitles.shopTitles["delivery"].title}
                    align="left"
                    size={16}
                    color={colors.dark_blue}
                  />
                </View>
                <View>
                  <Typography
                    content="10,000 L.L"
                    align="left"
                    size={16}
                    color={colors.focused}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => checkoutPress()}
                  style={styles.button}
                >
                  <Typography
                    content={fixedTitles.shopTitles["checkout"].title}
                    color={colors.white}
                    align="center"
                    size={16}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("store")}
                  style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}
                >
                  <Typography
                    content="مواصلة التسوق"
                    color={colors.dark_blue}
                    align="center"
                    size={14}
                    bold
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PagerView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  modalView: {
    height: 300,
    position: "relative",
    paddingBottom: 20,
    bottom: Platform.OS == "ios" ? -30 : -32,
    marginTop: "auto",
    backgroundColor: "white",
    width: SCREEN_WIDTH,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.46,
    borderRadius: 25,
    elevation: 9,
  },
  blurContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
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
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    marginTop: 30,
    bottom: 0,
    elevation: 5,
  },
});
