import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { myPostedJobs, singleJob } from "../../../api/Jobs";
import AppContext from "../../../appContext/AppContext";
import JobBox from "../../../components/Boxes/JobBox";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";

export const MyListedJobs = ({ navigation }) => {
  const { setCanAdd, data, setData } = useContext(AppContext);
  // const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCanAdd(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    myPostedJobs()
      .then((res) => {
        console.log(res.data);
        setData(res.data.jobs.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const singleJobHandler = (id) => {
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
      <View style={styles.container}>
        <View
          style={[
            styles.list,
            { alignSelf: data?.length == 1 ? "flex-start" : "center" },
          ]}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Typography
                content={loading ? "" : "Empty list"}
                color={colors.dark_blue}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data}
            numColumns={2}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <JobBox
                  spacing
                  onPress={() => singleJobHandler(item.id)}
                  item={item}
                  location
                  status
                  jobName={item.job_name}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  loader: {
    height: SCREEN_HEIGHT - SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
});
