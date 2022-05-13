import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useContext } from "react";
import {
  I18nManager,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppContext from "../../appContext/AppContext";

import { JobModal } from "../../components/JobModal";
import { JobUserBox } from "../../components/JobUserBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import PenSVG from "../../SVGR/Globals/Pen";
import RemoveSVG from "../../SVGR/Globals/Remove";
import numeral from "numeral";
import {
  applications,
  closeJob,
  jobs,
  removeJob,
  jobApplicant,
  promotedJobs,
  myPostedJobs,
} from "../../api/Jobs";
export const SingleJobScreen = ({ navigation, route }) => {
  const {
    userData,
    setJobList,
    fixedTitles,
    setAllJobsData,
    allJobsdata,
    setPromotedJobs,
    data,
    setData,
  } = useContext(AppContext);

  const { item } = route.params;

  const DATA = [
    {
      id: 0,
      title: fixedTitles.jobFixedTitles["job-type"].title,
      about: item.job?.job_type?.title,
    },
    {
      id: 1,
      title: fixedTitles.jobFixedTitles["company-name"].title,
      about: item.job?.company_name,
    },
    {
      id: 2,
      title: fixedTitles.jobFixedTitles["job-location"].title,
      about: item.job?.district?.title,
    },
    {
      id: 3,
      title: fixedTitles.jobFixedTitles["monthly-salary"].title,
      about: item.job?.salary
        ? numeral(item.job?.salary).format("0,00 $")
        : "Not defined",
    },
    {
      id: 4,
      title: fixedTitles.jobFixedTitles["end-date"].title,
      about: item.job?.end_application_date,
    },
    {
      id: 5,
      title: fixedTitles.jobFixedTitles["about-job"].title,
      about: item.job?.description,
    },
  ];

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

  const getJobsHandler = () => {
    setLoading(true);
    setModalVisible(false);
    promotedJobs()
      .then((res) => {
        setJobList(res.data.jobs);
        setPromotedJobs(res.data.jobs);
        // navigation.pop();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmRemoveJobHandler = (id) => {



    let formdata = new FormData()
    formdata.append("hired_through_zowada",id)

    setAllJobsData(allJobsdata?.filter((x) => x.id !== item.job.id));
    setModalVisible(false);
    setLoading(true);
    removeJob(item.job?.id,formdata)
      .then((res) => {
        getJobsHandler();
        getMyPostedJobs();
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {});
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType,setModalType]=useState(null)


  const [loading, setLoading] = useState(false);

  const removeJobHandler = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalButtonPress = (id) => {




    switch (modalType) {
      case 'remove':
        confirmRemoveJobHandler(id);
        break;
      case 'job':
        let formdata = new FormData()
        formdata.append("hired_through_zowada",id)
         setLoading(true);
    closeJob(item.job.id,formdata)
      .then((res) => {
        getJobsHandler();
        getMyPostedJobs();
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {});
        break;
      default:
        break;
    }
  };

  const getMyPostedJobs = async () => {
    myPostedJobs()
      .then((res) => {
        setData(res.data.jobs.data);
        navigation.pop();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeJobHandler = () => {
    setModalType("job")
    setModalVisible(true)
    // setLoading(true);
    // closeJob(item.job.id)
    //   .then((res) => {
    //     getJobsHandler();
    //     getMyPostedJobs();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {});
  };

  const allApplicantsHandler = () => {
    setLoading(true);
    jobApplicant(item.job.id)
      .then((res) => {
        navigation.navigate("AllApications", {
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

 const  removeJobModalHandler = ()=>{
   setModalType('remove')
   setModalVisible(true)
 }


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
          color={colors.dark_orange}
          animating={loading}
        />
      </View>
      <View style={styles.container}>
        <SafeAreaView style={[styles.row]}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[styles.left, { top: -10 }]}
          >
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{ marginRight: 10 }}
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
              <View>
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={{ top: SCREEN_HEIGHT * 0.017 }}
                >
                  <Typography
                    content={item.job?.job_name}
                    align="left"
                    color={colors.dark_orange}
                    bold
                    size={20}
                  />
                </TouchableOpacity>
                <View style={{ top: SCREEN_HEIGHT * 0.005 }}>
                  <Typography
                    content={`Posted on ${item.job?.published_date}`}
                    align="left"
                    color={`#CFD9DC`}
                    bold
                    size={12}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {userData?.id !== item.job.user_id && (
            <View>
              <Typography
                content={item.job.status}
                color={colors.dark_orange}
                bold
                align="right"
              />
            </View>
          )}
          {userData?.id == item.job.user_id && (
            <View
              style={{ flexDirection: "row", alignItems: "center", top: -10 }}
            >
              <TouchableOpacity
                onPress={() => removeJobModalHandler()}
                style={styles.icon}
              >
                <RemoveSVG secondary />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostJobForm", {
                    editMode: true,
                    editData: item,
                  })
                }
                style={styles.icon}
              >
                <PenSVG secondary />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, marginTop: 20 }}
        >
          <View style={styles.list}>
            {DATA.map((data) => (
              <View key={data.id}>
                <View>
                  <Typography
                    content={data.title}
                    align="left"
                    color={colors.dark_orange}
                    bold
                    size={16}
                  />
                </View>
                <View>
                  <Typography
                    content={data.about}
                    align="left"
                    color={colors.dark_blue}
                    size={14}
                  />
                </View>
              </View>
            ))}

            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  marginHorizontal: 0,
                  marginTop: 15,
                },
              ]}
            >
              {userData?.id == item.job.user_id && (
                <View style={{ marginTop: 10 }}>
                  <Typography
                    content={
                      fixedTitles.jobFixedTitles["recent-applicant"].title
                    }
                    color={colors.dark_orange}
                    size={16}
                    bold
                  />
                </View>
              )}
              {userData?.id == item.job.user_id && (
                <TouchableOpacity onPress={() => allApplicantsHandler()}>
                  <Typography
                    content={fixedTitles.jobFixedTitles["view-all"].title}
                    color={colors.dark_blue}
                    size={14}
                  />
                </TouchableOpacity>
              )}
            </View>
            {userData?.id == item.job.user_id && (
              <View>
                {item?.applicants.map((data, index) => {
                  return (
                    <View key={index.toString()}>
                      <JobUserBox
                        onPress={() => singleApplicantHandler(data)}
                        item={data}
                        statusId={data?.status}
                      />
                    </View>
                  );
                })}
              </View>
            )}
            {item?.applicants && item?.applicants?.length == 0 && (
              <Typography
                content={
                  fixedTitles.jobFixedTitles["there-is-no-new-applicants"].title
                }
                color={colors.dark_orange}
                align="center"
              />
            )}
            {userData?.id == item.job.user_id && (
              <>
                {item.job.closed_at == null && (
                  <View>
                    <TouchableOpacity
                      onPress={() => closeJobHandler()}
                      style={styles.button}
                    >
                      <Typography
                        content={fixedTitles.jobFixedTitles["close"].title}
                        align="center"
                        size={16}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
          {/* apply button */}
          <>
            {userData?.id !== item.job.user_id && (
              <>
                {item.job.closed_at == null && item.applied !== 1 && (
                  <View style={{ alignSelf: "center" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ApplyForm", {
                          id: item.job.id,
                          data: item,
                        })
                      }
                      style={styles.button}
                    >
                      <Typography
                        content={fixedTitles.jobFixedTitles["apply-now"].title}
                        align="center"
                        size={16}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
            {item.applied == 1 && (
              <View style={[styles.button, { alignSelf: "center" }]}>
                <Typography
                  content={fixedTitles.jobFixedTitles["applied"].title}
                  align="center"
                  size={16}
                  color={colors.white}
                />
              </View>
            )}
          </>
        </ScrollView>
        <JobModal
          title={
            fixedTitles.jobFixedTitles[
              "are-you-sure-you-want-to-remove-this-job"
            ].title
          }
          visible={modalVisible}
          close={() => closeModal()}
          hasButton
          submit={(id) => modalButtonPress(id)}

          type={modalType}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list: {
    marginHorizontal: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
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

    elevation: 5,
    marginVertical: 20,
  },
  loader: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
