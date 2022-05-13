import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import JobBox from "../../components/Boxes/JobBox";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";

import { colors } from "../../globals/colors";
import { SCREEN_WIDTH } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { searchJobs, singleJob } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
export const JobSearchScreen = ({ navigation, route }) => {
  const { search, categories } = route.params;

  const { fixedTitles } = useContext(AppContext);

  const [searchString, setSearchString] = useState("");

  const [data, setData] = useState(search ? search : null);
  const [loading, setLoading] = useState(false);

  const searchHandler = () => {
    setLoading(true);
    searchJobs(searchString)
      .then((res) => {
        setData(res.data.jobs.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          animating={loading}
          size="large"
          color={colors.dark_orange}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView
          style={[
            styles.container,
            { paddingTop: Platform.OS == "android" ? 20 : 0 },
          ]}
        >
          <View style={[styles.mh20, styles.row]}>
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.pop()}
            >
              <ArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
                fill={colors.dark_orange}
              />
            </TouchableOpacity>
            <View>
              <SearchBox
                onSearchPress={() => searchHandler()}
                searchString={searchString}
                setSearchString={setSearchString}
                width={SCREEN_WIDTH * 0.8}
                filterEnabled
                hideFilter
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["job-types"].title}
                align="left"
                color={colors.dark_orange}
                bold
                size={16}
              />
            </View>
            <FlatList
              renderItem={({ item }) => (
                <JobBox
                  jobName={item.job_name}
                  company
                  location
                  spacing
                  onPress={() => singleJobTypesHandler(item.id)}
                  item={item}
                />
              )}
              data={categories.categories}
              horizontal
            />
          </View>
          <View
            style={{
              position: "relative",
              left: 20,
              top: -SCREEN_HEIGHT * 0.035,
              flexGrow: 1,
            }}
          >
            <Typography
              content={fixedTitles.jobFixedTitles["jobs"].title}
              align="left"
              color={colors.dark_orange}
              bold
              size={16}
            />
            <FlatList
              renderItem={({ item }) => (
                <JobBox
                  jobName={item.job_name}
                  company
                  location
                  spacing
                  onPress={() => singleJobHandler(item.id)}
                  item={item}
                />
              )}
              // ListEmptyComponent={() => (
              //   <View style={{ width: SCREEN_WIDTH }}>
              //     <Typography
              //       content={"emty list"}
              //       align="center"
              //       size={12}
              //       color={colors.dark_orange}
              //     />
              //   </View>
              // )}
              numColumns={2}
              data={data}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mh20: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
});
