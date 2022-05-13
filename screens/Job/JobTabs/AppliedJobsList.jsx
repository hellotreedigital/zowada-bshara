import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AppContext from "../../../appContext/AppContext";
import JobBox from "../../../components/Boxes/JobBox";
import { myAppliedJobs, myPostedJobs, singleJob } from "../../../api/Jobs";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
export const AppliedJobsList = ({ navigation }) => {
  const { setCanAdd } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCanAdd(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    myAppliedJobs()
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
      <View style={styles.container}>
        <View
          style={[
            styles.list,
            { alignSelf: data?.length == 1 ? "flex-start" : "center" },
          ]}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data}
            ListEmptyComponent={() => (
              <Typography
                align="center"
                color={colors.dark_blue}
                content={loading ? "" : "Empty list"}
              />
            )}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <JobBox
                  jobName={item.job_name}
                  spacing
                  onPress={() => singleJobHandler(item.id)}
                  item={item}
                  company
                  location
                  application={item.applications[0].status}
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
