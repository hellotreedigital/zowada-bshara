import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { userFundings } from "../../api/Funding/Funding";

import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_WIDTH } from "../../globals/globals";

const RenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() =>
        navigation.navigate("FundingSingleScreen", {
          data: item,
        })
      }
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <ImageBackground
            source={{ uri: item.image_absolute_url }}
            style={styles.image}
          />
          <View>
            <View style={{ top: 10 }}>
              <Typography
                content={item.name}
                size={14}
                bold
                align="left"
                color={colors.dark_blue}
              />
            </View>
            <View style={{ top: 0 }}>
              <Typography
                align="left"
                content={item.about}
                size={14}
                color={"#CFD9DC"}
              />
            </View>
          </View>
        </View>
        <View style={{ top: 5 }}>
          <Typography
            align="right"
            content={item.final_approved_at != null ? "Approved " : "Pending"}
            size={14}
            color={"#CFD9DC"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WorkList = ({ navigation }) => {
  const data = [
    {
      id: 0,
      name: "test",
      about: "test about",
      image:
        "https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 1,
      name: "test",
      about: "test about",
      image:
        "https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];
  const [userFunding, setUserFunding] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    userFundingsHandler();
  }, []);

  const userFundingsHandler = () => {
    setLoading(true);
    userFundings()
      .then((res) => {
        setUserFunding(res.data.projects);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="أعمالي" red navigation={navigation} />
      <View style={styles.list}>
        <FlatList
          data={userFunding}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          ListEmptyComponent={() => {
            return (
              <View style={{ alignSelf: "center" }}>
                {!loading ? (
                  <Typography
                    content="Empty list"
                    size={12}
                    align="center"
                    color={colors.dark_blue}
                  />
                ) : (
                  <ActivityIndicator
                    color={colors.dark_blue}
                    size="large"
                    animating={loading}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  list: {
    flexGrow: 1,
  },
});
