import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import {
  deliveredOrder,
  cancelOrder,
  sellerOrders,
  singleOrder,
  confirmOrder,
  rejectOffer,
  buyerActions,
  sellerActions,
} from "../../../api/Orders";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";

import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
export const ReceivedOrders = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [actionLoader, setActionLoader] = useState(false);

  const buyerOrdersHandler = () => {
    setLoading(true);
    sellerOrders()
      .then((res) => {
        setData(res.data.orders.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isFocused) return;

    buyerOrdersHandler();
  }, [isFocused]);

  const singleOrderHandler = React.useCallback(
    (item) => () => {
      setActionLoader(true);
      singleOrder(item.id)
        .then((res) => {
          navigation.navigate("SingleOrder", {
            data: res.data,
          });
        })
        .catch((err) => {})
        .finally(() => {
          setActionLoader(false);
        });

      // handle item press
    },
    []
  );

  const accpetOrderHandler = (id) => {
    setActionLoader(true);
    deliveredOrder(id)
      .then((res) => {
        buyerOrdersHandler();

        setActionLoader(false);
      })
      .catch((err) => {
        setActionLoader(false);
      });
  };

  const handleConfirmOrder = (type, id) => {
    setActionLoader(true);
    sellerActions(type, id)
      .then((res) => {
        buyerOrdersHandler();
        setActionLoader(false);
      })
      .catch((err) => {
        setActionLoader(false);
      });
  };

  const handleCancelHandler = (id) => {
    setActionLoader(true);
    rejectOffer(id)
      .then((res) => {
        buyerOrdersHandler();

        setActionLoader(false);
      })
      .catch((err) => {
        setActionLoader(false);
      });
  };

  const rejectOrderHandler = (id) => {
    setActionLoader(true);
    cancelOrder(id)
      .then((res) => {
        buyerOrdersHandler();

        setActionLoader(false);
      })
      .catch((err) => {
        setActionLoader(false);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: actionLoader ? 10 : 0, elevation: actionLoader ? 10 : 0 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.dark_blue} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ width: SCREEN_WIDTH }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center" }}>
                {!loading && (
                  <Typography
                    content="Empty list"
                    color={colors.dark_blue}
                    align="center"
                  />
                )}
              </View>
            )}
            data={data}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                singleOrderHandler={singleOrderHandler(item)}
                accpetOrderHandler={(id) => accpetOrderHandler(id)}
                rejectOrderHandler={(id) => rejectOrderHandler(id)}
                handleConfirmOrder={(type, id) => handleConfirmOrder(type, id)}
                handleCancelHandler={(id) => handleCancelHandler(id)}
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
  },
  box: {
    backgroundColor: "#CFD9DC",
    borderRadius: 13,
    width: SCREEN_WIDTH * 0.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 5,
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#CFD9DC",
    paddingBottom: 20,
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.41,
    height: SCREEN_HEIGHT * 0.04,
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
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT - 300,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
});

function RenderItem({
  item,
  singleOrderHandler,
  accpetOrderHandler,
  rejectOrderHandler,
  handleCancelHandler,
  handleConfirmOrder,
}) {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <TouchableOpacity onPress={singleOrderHandler} style={styles.wrapper}>
        <Typography
          content={`طلب رقم ${item?.id} ${item?.name}`}
          align="left"
          color={colors.dark_blue}
          size={14}
          bold
        />
        <Typography
          content={moment(item?.created_at).format("MM-DD-YYYY hh:mm A")}
          align="left"
          size={12}
          color={colors.dark_blue}
        />
        {item?.status && (
          <View style={styles.box}>
            <Typography
              content={item?.status}
              align="left"
              color={colors.focused}
              size={12}
            />
          </View>
        )}
        {item.seller_confirmed_at == null && (
          <>
            {item.seller_rejected_at == null && (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => handleConfirmOrder("confirm", item.id)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.dark_blue,
                    },
                  ]}
                >
                  <Typography
                    content="قبول"
                    size={14}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleConfirmOrder("reject", item.id)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.dark_yellow,
                    },
                  ]}
                >
                  <Typography
                    content="رفض"
                    size={14}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {item.seller_confirmed_at !== null &&
          item.seller_delivered_at == null &&
          item.seller_cancelled_at == null && (
            <>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => rejectOrderHandler(item.id)}
                  style={[styles.button]}
                >
                  <Typography
                    content="إلغاء"
                    size={14}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleConfirmOrder("delivered", item.id)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.dark_blue,
                    },
                  ]}
                >
                  <Typography
                    onPress={() => handleConfirmOrder("delivered", item.id)}
                    size={14}
                    align="center"
                    color={colors.white}
                    content="تم تسليم"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
      </TouchableOpacity>
    </View>
  );
}
