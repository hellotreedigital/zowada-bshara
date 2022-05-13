import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { singleJob } from "../../api/Jobs";
import JobBox from "../../components/Boxes/JobBox";
import { Header } from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";

export const JobFilterResultScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState(false);
  const singleJobHandler = (id) => {
    console.log(id);
    setLoading(true);
    singleJob(id)
      .then((res) => {
        navigation.navigate("SingleJobScreen", {
          item: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.dark_orange} />
      </View>
      <SafeAreaView style={styles.container}>
        <Header title="Results" navigation={navigation} blue />
        <View
          style={[
            styles.list,
            { alignSelf: data?.length == 1 ? "flex-start" : "center" },
          ]}
        >
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data}
            ListEmptyComponent={() => (
              <Typography
                align="center"
                color={colors.dark_blue}
                content={"Empty list"}
              />
            )}
            numColumns={2}
            renderItem={({ item }) => (
              <JobBox
                spacing
                onPress={() => singleJobHandler(item.id)}
                item={item}
                location
                company
              />
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
    backgroundColor: "white",
  },
  list: {
    marginTop: 20,
  },
  loader: {
    height: SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
});
