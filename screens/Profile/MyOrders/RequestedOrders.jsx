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
  buyerOrders,
  confirmOrder,
  sellerOrders,
  singleOrder,
  rejectOffer,
  orderActions,
  buyerActions,
  rateOrder,
  disputeOrder,
} from "../../../api/Orders";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";

import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { AirbnbRating, Rating } from "react-native-ratings";
import { RatingModal } from "../../../components/Modals/RatingModal";
import DisputeModal from "./Modal/DisputeModal";
export const RequestedOrders = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const buyerOrdersHandler = () => {
    setLoading(true);
    buyerOrders()
      .then((res) => {
        setData(res.data.orders.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const [actionLoader, setActionLoader] = useState(false);
  const [ratingComment, setRatingComment] = useState("");
  const [rating, setRating] = useState("");

  const [ratingLoading, setRatingLoading] = useState(false);

  const [ratingID, setRatingID] = useState(null);

  const [disputeModalVisible, setDisputeModalVisible] = useState(false);

  const [disputeString, setDisputString] = useState("");

  const [disputeLoading, setDisputeLoading] = useState(false);

  useEffect(() => {
    if (!isFocused) return;

    buyerOrdersHandler();
  }, []);

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
    confirmOrder(id)
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
    rejectOffer(id)
      .then((res) => {
        buyerOrdersHandler();

        setActionLoader(false);
      })
      .catch((err) => {
        setActionLoader(false);
      });
  };

  const sellerOrderHandler = (type, id) => {
    setRatingID(id);
    if (type == "dispute") {
      setDisputeModalVisible(true);
    } else {
      setActionLoader(true);
      buyerActions(type, id)
        .then((res) => {
          buyerOrdersHandler();
        })
        .catch((err) => {})
        .finally(() => {
          setActionLoader(false);
        });
    }
  };

  const ratingHandler = (item) => {
    setRatingID(item.id);

    setRatingModalVisible(true);
  };

  const submitRating = () => {
    setRatingLoading(true);

    let formdata = new FormData();

    formdata.append("rating", rating);
    formdata.append("rating_text", ratingComment);

    rateOrder(ratingID, formdata)
      .then((res) => {
        buyerOrdersHandler();
        setActionLoader(true);
      })
      .catch((err) => {})
      .finally(() => {
        setRatingLoading(false);
        setRatingModalVisible(false);
        setActionLoader(false);
      });
  };

  const handleDispute = () => {
    setDisputeLoading(true);
    const formdata = new FormData();

    formdata.append("dispute_reason", disputeString);

    disputeOrder(ratingID, formdata)
      .then((res) => {
        buyerOrdersHandler();
      })
      .catch((err) => {})
      .finally(() => {
        setActionLoader(false);
        setDisputeModalVisible(false);
        setDisputeLoading(false);
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
                accpetOrderHandler={() => accpetOrderHandler(item.id)}
                rejectOrderHandler={() => rejectOrderHandler(item.id)}
                sellerOrderHandler={(type, id) =>
                  sellerOrderHandler(type, item.id)
                }
                ratingHandler={(item) => ratingHandler(item)}
                ratingComment={ratingComment}
                setRatingComment={setRatingComment}
              />
            )}
          />
        </View>
      </ScrollView>
      <RatingModal
        ratingComment={ratingComment}
        setRatingComment={setRatingComment}
        visible={ratingModalVisible}
        ratingLoading={ratingLoading}
        setRatingLoading={setRatingLoading}
        rating={rating}
        setRating={setRating}
        close={() => setRatingModalVisible(false)}
        submitRating={() => submitRating()}
      />
      <DisputeModal
        loading={disputeLoading}
        visible={disputeModalVisible}
        close={() => setDisputeModalVisible(false)}
        submit={() => handleDispute()}
        string={disputeString}
        setString={setDisputString}
      />
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
    justifyContent: "space-between",
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
  sellerOrderHandler,
  ratingHandler,
  ratingComment,
  setRatingComment,
}) {
  return (
    <>
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

          {item.seller_delivered_at !== null &&
            item.buyer_reception_confirmed_at == null &&
            item.dispute_requested_at == null && (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => sellerOrderHandler("confirm", item.id)}
                  style={[styles.button]}
                >
                  <Typography
                    content="تم الاستلام"
                    size={14}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sellerOrderHandler("dispute", item.id)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.dark_blue,
                    },
                  ]}
                >
                  <Typography
                    content="لم يتم الاستلام"
                    size={14}
                    align="center"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}

          {item.seller_delivered_at !== null &&
            item.buyer_reception_confirmed_at !== null && (
              <View
                style={{
                  position: "absolute",
                  right: 20,
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{ zIndex: 1000 }}
                  onPress={() => ratingHandler(item)}
                  disabled={item?.rating !== null ? true : false}
                >
                  <AirbnbRating
                    showRating={false}
                    count={5}
                    defaultRating={item?.rating == null ? 0 : item?.rating}
                    size={12}
                    isDisabled
                  />
                </TouchableOpacity>
              </View>
            )}
        </TouchableOpacity>
      </View>
    </>
  );
}
