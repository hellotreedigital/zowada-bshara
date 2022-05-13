import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  I18nManager,
  Platform,
} from "react-native";
import { jobs, JobsType, singleJob } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import JobBox from "../../components/Boxes/JobBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import FilterSVG from "../../SVGR/Globals/Filter";
import SearchSVG from "../../SVGR/Globals/SearchSVG";

export const JobsCategory = ({ navigation, route }) => {
  const { setAllJobsData, allJobsdata, setMaxSalary, maxSalary } =
    useContext(AppContext);

  const [loading, setLoading] = useState();

  const { type, id } = route.params;

  const [offset, setOffset] = useState(8);

  const [scrollLoding, setScrollLoading] = useState(false);

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

  const getJobsHandler = () => {
    setLoading(true);
    console.log("fetching");
    jobs(offset)
      .then((res) => {
        setOffset(offset + 4);
        setMaxSalary(res.data.max_salary);
        setAllJobsData(res.data.jobs.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getMoreJobs = () => {
    if (!type) {
      setScrollLoading(true);
      console.log("fetching");
      jobs(offset)
        .then((res) => {
          setOffset(offset + 4);
          setMaxSalary(res.data.max_salary);
          setAllJobsData(res.data.jobs.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setScrollLoading(false);
        });
    } else {
      getTypesHandler();
    }
  };
  const getTypesHandler = () => {
    setLoading(true);
    JobsType(offset, id)
      .then((res) => {
        setOffset(offset + 4);
        setAllJobsData(res.data.jobs.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!type) {
      getJobsHandler();
    } else {
      getTypesHandler();
    }
    return () => {
      setAllJobsData(null);
    };
  }, []);

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 9 : 0, elevation: loading ? 9 : 0 },
        ]}
      >
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_orange}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.mh20,
            styles.row,
            {
              justifyContent: "space-between",
              marginTop: Platform.OS == "android" ? 12 : 0,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[styles.left, styles.row]}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <ArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
                fill={colors.dark_orange}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Typography
                // content="اسم التصنيف"
                color={colors.dark_orange}
                bold
                size={20}
                align="left"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("JobFilterScreen")}
              style={styles.icon}
            >
              <FilterSVG />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("JobSearchScreen", {
                  search: null,
                  categories: null,
                })
              }
              style={styles.icon}
            >
              <SearchSVG secondary />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.list,
            { alignSelf: allJobsdata?.length == 1 ? "flex-start" : "center" },
          ]}
        >
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Typography
                content={loading ? "" : "Empty List"}
                color={colors.dark_orange}
              />
            )}
            onEndReachedThreshold={0.2}
            onEndReached={getMoreJobs}
            data={allJobsdata}
            numColumns={2}
            renderItem={({ item }) => (
              <JobBox
                jobName={item.job_name}
                spacing
                onPress={() => singleJobHandler(item.id)}
                item={item}
                location
                company
              />
            )}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            zIndex: 1,
            elevation: 0,
            alignSelf: "center",
          }}
        >
          <ActivityIndicator
            animating={scrollLoding}
            color={colors.dark_orange}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {},
  mh20: {
    marginHorizontal: 20,
  },
  icon: {
    width: SCREEN_HEIGHT * 0.042,
    height: SCREEN_HEIGHT * 0.042,
    borderRadius: SCREEN_HEIGHT * 0.042,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list: {
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 20,
    flexGrow: 1,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
