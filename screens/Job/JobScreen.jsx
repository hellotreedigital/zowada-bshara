import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { jobs, promotedJobs, searchJobs, singleJob } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import JobBox from "../../components/Boxes/JobBox";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT } from "../../globals/globals";
import NotificationSVG from "../../SVGR/Home/Notification";

export const JobScreen = ({ navigation }) => {
  const [searchString, setSearchString] = useState("");
  const isFocused = useIsFocused();

  const {
    fixedTitles,
    jobList,
    promtedJobs,
    setPromotedJobs,
    notificationsCounter,
  } = useContext(AppContext);

  const getJobsHandler = () => {
    promotedJobs()
      .then((res) => {
        setPromotedJobs(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJobsHandler();
  }, [isFocused]);

  const [jobCategories, setJobCategories] = useState(fixedTitles.jobTitles);

  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(4);

  const allJobsHandler = () => {
    navigation.navigate("JobsCategory", {
      type: false,
      id: null,
    });
  };

  const jobSearchHandler = () => {
    searchJobs(searchString)
      .then((res) => {
        navigation.navigate("JobSearchScreen", {
          search: res.data.jobs.data,
          categories: res.data,
        });
        console.log(res.data.jobs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const singleJobTypesHandler = (id) => {
    navigation.navigate("JobsCategory", {
      type: true,
      id,
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
        <ActivityIndicator
          size="large"
          animating={loading}
          color={colors.dark_orange}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          style={[styles.container, { flex: 1 }]}
        >
          <View style={styles.container}>
            <View style={styles.bg}>
              <ImageBackground
                style={styles.headerImage}
                source={{
                  uri: "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
              >
                <View style={styles.overlay} />
              </ImageBackground>
              <View>
                <View
                  style={{
                    height: SCREEN_HEIGHT * 0.28,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      bottom: -SCREEN_HEIGHT * 0.022,
                      alignSelf: "center",
                      elevation: 10,
                      zIndex: 10,
                    }}
                  >
                    <SearchBox
                      searchString={searchString}
                      setSearchString={setSearchString}
                      placeholder={fixedTitles.jobFixedTitles["search"].title}
                      filterEnabled
                      hideFilter
                      onSearchPress={() => jobSearchHandler()}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.row,

                {
                  justifyContent: "space-between",
                  position: "absolute",
                  top: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.05 : 10,
                  width: SCREEN_WIDTH - 40,
                },
              ]}
            >
              <View>
                <Typography
                  content={fixedTitles.jobFixedTitles["jobs"].title}
                  color={colors.white}
                  bold
                  size={20}
                  algin="left"
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("notifications")}
                style={styles.icon}
              >
                <NotificationSVG />
                {notificationsCounter > 0 && (
                  <View style={styles.notification}>
                    <View style={{ top: -SCREEN_HEIGHT * 0.001 }}>
                      {/* <Typography
                      content={notificationsCounter}
                      color={colors.white}
                      size={7}
                      bold={true}
                    /> */}
                      <Text style={[styles.smallText, { lineHeight: 11 }]}>
                        {notificationsCounter}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.addJobBox}>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["share-a-job"].title}
                align="left"
                color={colors.dark_orange}
                bold
                size={14}
              />
            </View>
            <View>
              <Typography
                content={
                  fixedTitles.jobFixedTitles["share-a-job-description"].title
                }
                align="left"
                color={colors.dark_blue}
                size={12}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostJobForm", { editMode: false })
                }
                style={styles.button}
              >
                <Typography
                  content={fixedTitles.jobFixedTitles["share-a-job"].title}
                  align="center"
                  size={16}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.bar, { marginTop: 10 }]}>
            <Typography
              content={fixedTitles.jobFixedTitles["job-types"].title}
              align="left"
              color={colors.dark_orange}
              bold
              size={16}
            />
          </View>
          <View>
            {/* FLATLIST */}
            <View style={[styles.list]}>
              <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                ItemSeparatorComponent={() => (
                  <View style={{ width: SCREEN_WIDTH * 0.02 }} />
                )}
                data={jobCategories}
                horizontal
                renderItem={({ item }) => (
                  <JobBox
                    item={item}
                    onPress={() => singleJobTypesHandler(item.id)}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                marginHorizontal: 0,
                marginRight: 20,
              },
            ]}
          >
            <View style={[styles.bar, { marginTop: 10 }]}>
              <Typography
                content={fixedTitles.jobFixedTitles["jobs"].title}
                align="left"
                color={colors.dark_orange}
                bold
                size={16}
              />
            </View>
            <TouchableOpacity onPress={() => allJobsHandler()}>
              <Typography
                content={fixedTitles.jobFixedTitles["view-all"].title}
                align="left"
                color={colors.dark_blue}
                size={14}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={promtedJobs}
              ListEmptyComponent={() => (
                <Typography
                  content="No promoted jobs yet"
                  align="center"
                  color={colors.dark_blue}
                />
              )}
              numColumns={2}
              renderItem={({ item }) => (
                <JobBox
                  location
                  company
                  jobName={item.job_name}
                  spacing
                  item={item}
                  onPress={() => singleJobHandler(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.white,
  },
  headerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.28,
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  relative: {
    position: "relative",
    top: SCREEN_HEIGHT * 0.05,
  },
  icon: {
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
  },
  addJobBox: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    marginVertical: 15,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
  },
  button: {
    width: SCREEN_WIDTH * 0.4,
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: "center",
    elevation: 5,
  },
  bar: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  list: {
    marginHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    position: "relative",
    // left: 10,

    left: 3,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  notification: {
    backgroundColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.013,
    width: SCREEN_HEIGHT * 0.013,
    borderRadius: (SCREEN_HEIGHT * 0.013) / 2,
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    color: colors.white,
    fontSize: 8,
    lineHeight: 14,
  },
});
