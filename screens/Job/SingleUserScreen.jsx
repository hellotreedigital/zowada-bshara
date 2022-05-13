import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import { rejectApplicant, singleJob, underReview } from "../../api/Jobs";
import AppContext from "../../appContext/AppContext";
import { JobModal } from "../../components/JobModal";

import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import ArrowSVG from "../../SVGR/Globals/Arrow";

export const SingleUserScreen = ({ navigation, route }) => {
  const { data } = route.params;

  const { fixedTitles } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);

  const userData = [
    {
      id: 0,
      title: fixedTitles.jobFixedTitles["email-address"].title,
      content: data.application?.email,
    },
    {
      id: 1,
      title: fixedTitles.jobFixedTitles["phone-number"].title,
      content: data.application?.phone,
    },
    {
      id: 2,
      title: fixedTitles.jobFixedTitles["address"].title,
      content: data.application?.address,
    },
    {
      id: 3,
      title: fixedTitles.jobFixedTitles["experience-domain"].title,
      content: data.application?.experience_domain?.title,
    },
    {
      id: 4,
      title: fixedTitles.jobFixedTitles["experience-background"].title,
      content: data.application.educational_background,
    },
    {
      id: 5,
      title: fixedTitles.jobFixedTitles["resume"].title,
      content: data.application?.cv.split("/")[1],
    },
    {
      id: 6,
      title: fixedTitles.jobFixedTitles["job-package"].title,
      content: data.application?.motivation,
    },
  ];

  const [loading, setLoading] = useState(false);

  const singleJobHandler = () => {
    setLoading(true);
    singleJob(data.application.job_id)
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
  const rejectHandler = (id) => {
    setLoading(true);
    setModalVisible(false);
    rejectApplicant(id)
      .then((res) => {
        singleJobHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reviewHandler = (id) => {
    setLoading(true);
    underReview(id)
      .then((res) => {
        singleJobHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatus = () => {
    if (data.application.rejected_at !== null) {
      return "Rejected";
    } else if (data.application.review_started_at !== null) {
      return "Under Review";
    } else {
      return "New";
    }
  };

  const canShowButtons = () => {
    if (data.application.rejected_at !== null) {
      return false;
    } else if (data.application.review_started_at !== null) {
      return 2;
    } else {
      return true;
    }
  };

  const resumeHandler = (singleData) => {
    console.log(singleData.id);
    if (singleData.id !== 5) return;

    navigation.navigate("SingleResume", {
      file: data.application.absolute_cv_url,
      name: data.application.full_name,
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
          color={colors.dark_orange}
          size="large"
        />
      </View>
      <SafeAreaView
        style={[
          styles.container,
          { paddingTop: Platform.OS == "android" ? 20 : 0 },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.header}
        >
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.dark_orange}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.aboutUser}>
            <Image
              style={styles.image}
              source={{
                uri: data.application.user.image_absolute_url,
              }}
            />
            <View>
              <Typography
                content={data?.application?.full_name}
                align="center"
                bold
                size={16}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={getStatus()}
                align="center"
                bold
                size={12}
                color={`#CFD9DC`}
              />
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.1 }}
          style={{ marginHorizontal: 20 }}
        >
          {userData?.map((data, index) => {
            console.log(index);
            return (
              <View key={data.id.toString()}>
                <View style={{ width: "95%" }}>
                  <Typography
                    content={data.title}
                    align="left"
                    color={colors.dark_orange}
                    bold
                    size={16}
                  />
                  <TouchableOpacity
                    onPress={() => resumeHandler(data)}
                    activeOpacity={data.id == 5 ? 0.8 : 1}
                  >
                    <Typography
                      underline={data.id == 5 ? true : false}
                      content={data.content}
                      align="left"
                      color={colors.dark_blue}
                      size={14}
                      fit={true}
                      lines={index == 6 ? 10 : 1}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          {canShowButtons() == true && (
            <View style={styles.buttonWrapper}>
              <View>
                <TouchableOpacity
                  onPress={() => reviewHandler(data.application.id)}
                  style={[
                    styles.smallButton,
                    { backgroundColor: colors.dark_blue },
                  ]}
                >
                  <Typography
                    content={fixedTitles.jobFixedTitles["review"].title}
                    size={16}
                    color={colors.white}
                    align="center"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.smallButton}
                >
                  <Typography
                    content={fixedTitles.jobFixedTitles["reject"].title}
                    size={16}
                    color={colors.white}
                    align="center"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {canShowButtons() == 2 && (
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.smallButton}
              >
                <Typography
                  content={fixedTitles.jobFixedTitles["reject"].title}
                  size={16}
                  color={colors.white}
                  align="center"
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View>
          <JobModal
            visible={modalVisible}
            close={() => setModalVisible(false)}
            title="هل أنت متأكد أنك تريد الرفض"
            hasButton
            submit={() => rejectHandler(data.application.id)}
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
  header: {
    marginHorizontal: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  aboutUser: {
    alignSelf: "center",
  },
  smallButton: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
});
