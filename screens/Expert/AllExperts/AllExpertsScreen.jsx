import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  I18nManager,
  FlatList,
} from "react-native";
import { getBestExperts } from "../../../api/Expert/Expert";
import { ExpertCard } from "../../../components/ExpertsCard/ExpertCard";
import Typography from "../../../components/Typography/Typography";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";

const AllExperts = ({ navigation, route }) => {
  const { data } = route.params;

  const [allExperts, setAllExperts] = useState(data);
  const [offset, setOffset] = useState(2);
  const getAllExperts = () => {
    getBestExperts(offset)
      .then((res) => {
        setOffset(offset + 1);
        setAllExperts([...allExperts, ...res.data.experts.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => null;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.arrow}>
          <TouchableOpacity
            style={{
              width: 20,
              height: 40,
              justifyContent: "center",
              paddingTop: 12,
            }}
            onPress={() => navigation.pop()}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
              fill={"#E8AF2E"}
            />
          </TouchableOpacity>
          <View>
            <Typography
              content="الخبراء"
              size={20}
              bold={true}
              color="#E8AF2E"
            />
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={allExperts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpertCard
                data={item}
                onPress={() =>
                  navigation.navigate("expertSingleScreen", {
                    data: item,
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={getAllExperts}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AllExperts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  arrow: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  list: {
    height: SCREEN_HEIGHT * 0.8,
  },
});
