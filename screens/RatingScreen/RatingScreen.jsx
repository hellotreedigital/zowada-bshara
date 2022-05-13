import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { getRatings } from "../../api/Profile/Profile";
import { useFocusEffect } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { AirbnbRating } from "react-native-ratings";

const RatingBox = ({ item }) => {
  return (
    <View style={styles.ratingBox}>
      <View style={styles.top}>
        <View style={styles.row}>
          <View>
            <Image
              source={{ uri: item.user?.image_absolute_url }}
              style={styles.image}
            />
          </View>
          <View>
            <>
              <Typography
                color={colors.dark_blue}
                size={14}
                bold={true}
                content={item.user?.full_name}
                align="left"
              />
            </>
            <View
              style={[
                styles.ratingWrapper,
                {
                  alignSelf: "flex-start",
                  height: 1,
                  top: -SCREEN_HEIGHT * 0.012,
                  right: 5,
                },
              ]}
            >
              {/* <RatingsSVG rating={data.rating} /> */}
              <AirbnbRating
                count={5}
                isDisabled={true}
                defaultRating={11}
                size={10}
                defaultRating={item.rating}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Typography
            content={item.rating_comment}
            align="left"
            size={14}
            color={colors.dark_blue}
          />
        </View>
      </View>
    </View>
  );
};

const List = ({ ratings, loading, getRatingsHandler }) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 64 }}
        data={ratings}
        renderItem={({ item }) => <RatingBox item={item} />}
        keyExtractor={(item) => item.user_id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getRatingsHandler}
            tintColor={colors.dark_blue}
          />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  content="there is no ratings"
                  color={colors.dark_blue}
                  size={12}
                  align="center"
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export const RatingScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRatingsHandler = () => {
    setLoading(true);
    getRatings(id)
      .then((res) => {
        setRatings(res.data.ratings);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => getRatingsHandler();

      return unsubscribe();
    }, [id])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"التعليقات"} navigation={navigation} />
      <List
        getRatingsHandler={() => getRatingsHandler()}
        ratings={ratings}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ratingBox: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: SCREEN_HEIGHT * 0.04,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    paddingLeft: 10,
  },
  bottom: {
    marginLeft: 12,
    paddingTop: 5,
  },
});
