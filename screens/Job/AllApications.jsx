import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  SectionList,
  I18nManager,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { applications } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import { JobUserBox } from "../../components/JobUserBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT } from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";

export const AllApications = ({ navigation, route }) => {
  const { fixedTitles } = useContext(AppContext);

  const { data } = route.params;
  const [rejected, setRejected] = useState();
  const [underReview, setUnderReview] = useState();
  const [newApplicants, setNewApplicants] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    rejectedHandler();
    underReviewHandler();
    newReviewsHandler();
  }, []);

  const singleApplicantHandler = (data) => {
    setLoading(true);
    applications(data.id)
      .then((res) => {
        navigation.navigate("SingleUserScreen", {
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const rejectedHandler = () => {
    setRejected(data.applicants.filter((x) => x.rejected_at !== null));
  };
  const underReviewHandler = () => {
    setUnderReview(
      data.applicants.filter(
        (x) => x.rejected_at == null && x.review_started_at !== null
      )
    );
  };
  const newReviewsHandler = () => {
    setNewApplicants(
      data.applicants.filter(
        (x) => x.review_started_at == null && x.rejected_at == null
      )
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 50,
        backgroundColor: "white",
        height: SCREEN_HEIGHT,
      }}
    >
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
      <SafeAreaView style={styles.container}>
        <View style={[styles.row, { marginHorizontal: 20 }]}>
          <TouchableOpacity onPress={() => navigation.pop()} style={styles.row}>
            <View style={{ marginRight: 10 }}>
              <ArrowSVG
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? "0deg" : "180deg" },
                  ],
                }}
                fill={colors.dark_orange}
              />
            </View>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["recent-applicant"].title}
                color={colors.dark_orange}
                align="left"
                size={20}
                bold
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <View>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["new-applicants"].title}
                align="left"
                bold
                size={16}
                color={colors.dark_orange}
              />
            </View>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={newApplicants}
                ListEmptyComponent={() => (
                  <View style={styles.borderBottom}>
                    <Typography
                      content="No applicants"
                      color={colors.dark_blue}
                      align="center"
                    />
                  </View>
                )}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <JobUserBox
                        onPress={() => singleApplicantHandler(item)}
                        item={item}
                        title={item}
                        statusId={item?.status}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["under-review"].title}
                align="left"
                bold
                size={16}
                color={colors.dark_orange}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={underReview}
              ListEmptyComponent={() => (
                <View style={styles.borderBottom}>
                  <Typography
                    content="No applicants"
                    color={colors.dark_blue}
                    align="center"
                  />
                </View>
              )}
              renderItem={({ item }) => {
                return (
                  <View>
                    <JobUserBox
                      onPress={() => singleApplicantHandler(item)}
                      item={item}
                      title={item}
                      statusId={item?.status}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View>
            <View>
              <Typography
                content={fixedTitles.jobFixedTitles["rejected"].title}
                align="left"
                bold
                size={16}
                color={colors.dark_orange}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={rejected}
              ListEmptyComponent={() => (
                <View style={styles.borderBottom}>
                  <Typography
                    content="No applicants"
                    color={colors.dark_blue}
                    align="center"
                  />
                </View>
              )}
              renderItem={({ item }) => {
                return (
                  <View>
                    <JobUserBox
                      onPress={() => singleApplicantHandler(item)}
                      item={item}
                      title={item}
                      statusId={item?.status}
                    />
                  </View>
                );
              }}
            />
          </View>
          {/* <SectionList
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 15 }}>
                  <JobUserBox
                    onPress={() => singleApplicantHandler(item)}
                    item={item}
                    title={item}
                    statusId={item?.status}
                  />
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={styles.borderBottom}>
                  <Typography
                    content={title}
                    align="left"
                    bold
                    size={16}
                    color={colors.dark_orange}
                  />
                </View>
              );
            }}
            sections={rejected ? DATA : []}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
          /> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    marginHorizontal: 20,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    justifyContent: "center",
    alignSelf: "center",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
  },
  borderBottom: {
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
  },
});
