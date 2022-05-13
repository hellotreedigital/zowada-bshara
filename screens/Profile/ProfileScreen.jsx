import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import DummyGirlSVG from "../../SVGR/DummyGirl";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import EditProfileSVG from "../../SVGR/Profile/EditProfile";
import ShopSVG from "../../SVGR/Profile/Shop";
import { Card } from "./roundedCard/Card";
import { STATUS_BAR_HEIGHT } from "../../globals/globals";
import MyOrdersSVG from "../../SVGR/Profile/MyOrders";
import MyCasesSVG from "../../SVGR/Profile/MyCases";
import MyCousesSVG from "../../SVGR/Profile/MyCourses";
import MyJobsSVG from "../../SVGR/Profile/MyJobs";
import AppContext from "../../appContext/AppContext";
import BottomModal from "../../components/Modals/BottomModal";
import Avatar from "../../components/Avatar/Avatar";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AuthContext from "../../appContext/AuthContext";
import {
  editImage,
  getCasesList,
  getQuestionList,
} from "../../api/Profile/Profile";
import { ContactBox } from "../../components/ContactBox/ContactBox";
import LocationBox from "../../components/LocationBox/LocationBox";
import RatingsSVG from "../../SVGR/Globals/Ratings";
import CalendarSVG from "../../SVGR/Profile/Calendar";
import MyShopsSVG from "../../SVGR/Profile/MyShop";
import MyClientsSVG from "../../SVGR/Profile/MyClients";
import MyChatsSVG from "../../SVGR/Profile/MyChats";
import MyCalendarSVG from "../../SVGR/Profile/MyCalendar";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getExpertEvents } from "../../api/Events/Events";
import numeral from "numeral";
import { useIsFocused } from "@react-navigation/native";
import { resizeImageHandler } from "../../utils/ImageResizer";

export const ProfileScreen = ({ navigation }) => {
  const {
    token,
    setToken,
    userName,
    isCamera,
    setIsCamera,
    userData,
    fixedTitles,
    setQuestionList,
    setCasesList,
    availabilityHours,
    intervals,
    cartStatus,
    setStoreModalVisible,
  } = useContext(AppContext);
  const { setProfilePic, profilePic } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    if (token === true) {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (cartStatus?.length > 0) {
      setStoreModalVisible(true);
    }
  }, []);

  const expertData = [
    {
      id: 4,
      title: fixedTitles.profileTitles["my-shops"].title,
      color: colors.dark_blue,
      icon: <MyShopsSVG />,
    },
    {
      id: 5,
      title: fixedTitles.profileTitles["my-clients"].title,
      color: "#E8AF2E",
      icon: <MyClientsSVG />,
    },
    {
      id: 6,
      title: fixedTitles.profileTitles["my-events"].title,
      color: colors.dark_orange,
      icon: <MyChatsSVG />,
    },
    {
      id: 7,
      title: fixedTitles.profileTitles["my-calendar"].title,
      color: "#1F9B89",
      icon: <MyCalendarSVG />,
    },
  ];

  const data = [
    {
      id: 0,
      title: fixedTitles.profileTitles["my-orders"].title,
      color: colors.dark_blue,
      icon: <MyOrdersSVG />,
    },
    {
      id: 1,
      title: fixedTitles.profileTitles["my-cases"].title,
      color: "#E8AF2E",
      icon: (
        <MyCasesSVG
          width={SCREEN_HEIGHT * 0.08}
          height={SCREEN_HEIGHT * 0.08}
        />
      ),
    },
    {
      id: 2,
      title: fixedTitles.profileTitles["my-applications"].title,
      color: "#F27E30",
      icon: (
        <MyJobsSVG width={SCREEN_HEIGHT * 0.08} height={SCREEN_HEIGHT * 0.08} />
      ),
    },
    {
      id: 3,
      title: fixedTitles.profileTitles["my-courses"].title,
      color: "#1F9B89",
      icon: (
        <MyCousesSVG
          width={SCREEN_HEIGHT * 0.08}
          height={SCREEN_HEIGHT * 0.08}
        />
      ),
    },
  ];

  const EDIT_PROFILE_DATA = [
    {
      id: "0",
      placeholder: userName,
      multi: false,
      slug: "userName",
    },
    {
      id: "1",
      placeholder: userData?.email,
      multi: false,
      slug: "email",
      editable: false,
    },
    {
      id: "2",
      placeholder: userData?.phone_number,
      multi: false,
      slug: "mobile",
      editable: false,
    },
    {
      id: "3",
      placeholder: userData?.about || "حول",
      multi: true,
      slug: "about",
    },
    {
      id: "4",
      placeholder: fixedTitles.profileTitles["old-password"].title,
      multi: false,
      slug: "oldPassword",
      secure: true,
    },
    {
      id: "5",
      placeholder: fixedTitles.profileTitles["new-password"].title,
      multi: false,
      slug: "password",
      secure: true,
    },
    {
      id: "6",
      placeholder: fixedTitles.profileTitles["confirm-password"].title,
      multi: false,
      slug: "newPassword",
      secure: true,
    },
  ];

  const questions = [
    {
      id: "0",
      name: "اسم الخبير",
      subtitle: "هناك حقيقة مثبتة منذ زمن طويل",
      image: "https://picsum.photos/200",
    },
    {
      id: "1",
      name: "اسم الخبير",
      subtitle: "هناك حقيقة مثبتة منذ زمن طويل",
      image: "https://picsum.photos/200",
    },
    {
      id: "2",
      name: "اسم الخبير",
      subtitle: "هناك حقيقة مثبتة منذ زمن طويل",
      image: "https://picsum.photos/200",
    },
    {
      id: "3",
      name: "اسم الخبير",
      subtitle: "هناك حقيقة مثبتة منذ زمن طويل",
      image: "https://picsum.photos/200",
    },
  ];

  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
  }

  const editImageHandler = (image) => {
    setLoader(true);
    let data = new FormData();
    const uriArray = image.split(".");
    const fileExtension = uriArray[uriArray.length - 1]; // e.g.: "jpg"
    const fileTypeExtended = `${image.type}/${fileExtension}`;

    data.append("image", {
      uri: image,
      name: "profile pic",
      type: fileTypeExtended,
    });

    editImage(data)
      .then((res) => {
        setProfilePic(image);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    setModalVisible(false);

    if (!result.cancelled) {
      editImageHandler(await resizeImageHandler(result.uri));
      setProfilePic(await resizeImageHandler(result.uri));
    }
  };

  const cameraHandler = () => {
    setIsCamera(true);
    setModalVisible(false);
  };

  const casesNavigationHandler = () => {
    getCasesListHandler();
  };

  const myEventsHandler = () => {
    setDataLoader(true);
    getExpertEvents()
      .then((res) => {
        navigation.navigate("myEventsScreen", {
          data: res.data.events.data,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoader(false);
      });
  };

  const navigationHandler = (id) => {
    switch (id) {
      case 0:
        navigation.navigate("MyOrdersScreen");
        break;
      case 1:
        casesNavigationHandler();
        break;
      case 2:
        navigation.navigate("JobNavigator");
        break;
      case 5:
        navigation.navigate("Clients");
        break;
      case 7:
        navigation.navigate("myCalendarScreen");
        break;
      case 6:
        myEventsHandler();
        break;
      case 4:
        navigation.navigate("MyShops");
        break;
      default:
        break;
    }
  };

  const getQuestionListHandler = () => {
    // setDataLoader(true);
    // getQuestionList()
    //   .then((res) => {
    //     setQuestionList(res.data.questions.data);
    //     setDataLoader(false);
    //     navigation.navigate("UserQuestionsScreen", {
    //       data: questions,
    //       title: fixedTitles.profileTitles["all-questions"].title,
    //     });
    //   })
    //   .catch((err) => {
    //     setDataLoader(false);
    //
    //   });
    navigation.navigate("UserQuestionsScreen", {
      title: fixedTitles.profileTitles["all-questions"].title,
    });
  };

  const getCasesListHandler = () => {
    setDataLoader(true);
    getCasesList()
      .then((res) => {
        setCasesList(res.data.cases);
        setDataLoader(false);

        navigation.navigate("myCases");
      })
      .catch((err) => {
        setDataLoader(false);
      });
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.07 }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color={colors.dark_blue}
            animating={dataLoader}
          />
        </View>
        <View style={styles.header}>
          <View
            style={[
              styles.right,
              { alignItems: I18nManager.isRTL ? "flex-start" : "flex-end" },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FormScreen", {
                  editProfile: true,
                  profileForm: EDIT_PROFILE_DATA,
                })
              }
              style={[styles.shadow, styles.editImagePos]}
            >
              <EditProfileSVG />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.user}>
          <View style={styles.dp}>
            <Avatar profilePic={profilePic} loader={loader} name={userName} />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.editImage, { marginBottom: SCREEN_HEIGHT * 0.015 }]}
          >
            <EditProfileSVG />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.name}>
              <Typography
                size={16}
                bold={true}
                content={userName}
                color={colors.dark_blue}
                align="left"
                fit={true}
                lines={1}
              />
            </View>
            {userData?.is_expert == 1 && (
              <>
                <View style={{ top: -SCREEN_HEIGHT * 0.012, paddingLeft: 20 }}>
                  <Typography
                    content={userData?.experience_domain.title}
                    color={colors.dark_blue}
                    size={12}
                    align="left"
                  />
                </View>

                <View style={{ top: -SCREEN_HEIGHT * 0.024, paddingLeft: 20 }}>
                  <Typography
                    content={userData?.experience_type.title}
                    color={colors.dark_blue}
                    size={12}
                    align="left"
                  />
                </View>
              </>
            )}
            <View style={styles.name}>
              <View
                style={[
                  styles.ratingWrapper,
                  {
                    alignSelf: "flex-start",
                    height: 1,
                    top:
                      userData?.is_expert == 1
                        ? -SCREEN_HEIGHT * 0.04
                        : -SCREEN_HEIGHT * 0.015,
                    right: 5,
                  },
                ]}
              >
                {userData?.is_expert === 1 && (
                  <AirbnbRating
                    count={5}
                    isDisabled={true}
                    size={10}
                    defaultRating={userData?.rating}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        {userData?.is_expert == 1 && (
          <>
            <View style={styles.indicator}>
              <View style={styles.leftIndicator}>
                <Typography
                  content={fixedTitles.profileTitles["working-hours"].title}
                  color={colors.focused}
                  align="left"
                  size={14}
                  bold={true}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditHours")}
                style={styles.rightIndicator}
              >
                <Typography
                  content={fixedTitles.profileTitles["edit"].title}
                  color={colors.dark_blue}
                  size={14}
                  align="right"
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.orderBox,
                {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  paddingHorizontal: 15,
                },
              ]}
            >
              {availabilityHours?.availability?.map((data, index) => {
                return (
                  <View key={index.toString()}>
                    <Typography
                      color={colors.dark_blue}
                      align="left"
                      content={data.days}
                      bold
                      size={16}
                    />
                    <View style={{ top: -SCREEN_HEIGHT * 0.006 }}>
                      <Typography
                        align="left"
                        color={colors.dark_blue}
                        content={data.hours}
                        size={14}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
        <View style={styles.indicator}>
          <View style={styles.leftIndicator}>
            <Typography
              content={fixedTitles.profileTitles["my-reports"].title}
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReportScreen", {
                title: fixedTitles.profileTitles["my-reports"].title,
              })
            }
            style={styles.rightIndicator}
          >
            <Typography
              content={fixedTitles.profileTitles["show-all"].title}
              color={colors.dark_blue}
              size={14}
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.orderBox}>
          <View style={styles.boxFlex}>
            <View style={[styles.col, { marginRight: SCREEN_WIDTH * 0.112 }]}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.shop_orders}
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["total-orders"].title}
                  align="left"
                />
              </View>
            </View>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.monthly_shop_orders}
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["monthly-orders"].title}
                  align="left"
                />
              </View>
            </View>
          </View>
          <View style={{ marginRight: SCREEN_WIDTH * 0.04 }}>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.009 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={numeral(userData?.shop_total_amount).format("0,0")}
                  align="left"
                />
              </View>
              <View style={{ width: "100%", top: -5 }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["total-amount"].title}
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          {userData?.is_expert == 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate("MyShops")}
              style={styles.myshop}
            >
              <View style={styles.shopContent}>
                <View>
                  <ShopSVG />
                </View>
                <View style={styles.text}>
                  <Typography
                    content={fixedTitles.profileTitles["my-shops"].title}
                    color={colors.white}
                    align="right"
                    size={14}
                    bold={true}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {userData?.is_expert == 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate("myCalendarScreen")}
              style={[styles.myshop, { backgroundColor: "#1F9B89" }]}
            >
              <View style={styles.shopContent}>
                <View>
                  <CalendarSVG />
                </View>
                <View style={styles.text}>
                  <Typography
                    content={fixedTitles.profileTitles["my-calendar"].title}
                    color={colors.white}
                    align="right"
                    size={14}
                    bold={true}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={({ item }) => (
              <Card item={item} onPress={() => navigationHandler(item.id)} />
            )}
            horizontal
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width:
                    Platform.OS === "android"
                      ? SCREEN_WIDTH * 0.05
                      : SCREEN_WIDTH * 0.06,
                }}
              />
            )}
          />
        </View>
        {userData?.is_expert == 1 && (
          <View style={styles.list}>
            <FlatList
              renderItem={({ item }) => (
                <Card item={item} onPress={() => navigationHandler(item.id)} />
              )}
              horizontal
              data={expertData}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width:
                      Platform.OS === "android"
                        ? SCREEN_WIDTH * 0.05
                        : SCREEN_WIDTH * 0.06,
                  }}
                />
              )}
            />
          </View>
        )}

        <View style={[styles.indicator, styles.spacing]}>
          <View style={styles.leftIndicator}>
            <Typography
              content={fixedTitles.profileTitles["my-jobs"].title}
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("workList")}
            style={styles.rightIndicator}
          >
            <Typography
              content={fixedTitles.profileTitles["show-all"].title}
              color={colors.dark_blue}
              size={14}
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.orderBox]}>
          <View style={styles.boxFlex}>
            <View style={[styles.col, { marginRight: SCREEN_WIDTH * 0.08 }]}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.total_crowdfunding}
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["total-orders"].title}
                  align="left"
                />
              </View>
            </View>

            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.monthly_crowdfunding}
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["monthly-orders"].title}
                  align="left"
                />
              </View>
            </View>
          </View>
          <View style={{ marginRight: SCREEN_WIDTH * 0.05 }}>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={numeral(userData?.total_crowdfunding_amount).format(
                    "0,0"
                  )}
                  align="left"
                />
              </View>
              <View style={{ width: "100%", top: -5 }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["total-amount"].title}
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.indicator, styles.spacing]}>
          <View style={styles.leftIndicator}>
            <Typography
              content={fixedTitles.profileTitles["my-questions"].title}
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => getQuestionListHandler()}
            style={styles.rightIndicator}
          >
            <Typography
              content={fixedTitles.profileTitles["show-all"].title}
              color={colors.dark_blue}
              size={14}
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.orderBox, { marginBottom: 0 }]}>
          <View style={styles.boxFlex}>
            <View style={[styles.col, { marginRight: SCREEN_WIDTH * 0.112 }]}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.total_free_questions}
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={fixedTitles.profileTitles["all-questions"].title}
                  align="left"
                />
              </View>
            </View>

            <View style={styles.col}>
              <View style={{ width: "100%" }}></View>
            </View>
          </View>
          <View style={{ marginRight: SCREEN_WIDTH * 0.3 }}>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content={userData?.total_experts_free_questions}
                  align="left"
                />
              </View>
              <View style={{ width: "100%", top: -5 }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content={
                    userData?.is_expert == 1
                      ? fixedTitles.profileTitles["all-clients"].title
                      : fixedTitles.profileTitles["all-experts"].title
                  }
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>

        {userData?.about !== null && (
          <View style={[styles.about, { marginBottom: 0 }]}>
            <View style={styles.title}>
              <Typography
                size={14}
                bold={true}
                content={fixedTitles.profileTitles["about"].title}
                color={colors.focused}
                align="left"
              />
            </View>
            <View style={[styles.value, { top: -15 }]}>
              <Typography
                size={14}
                align="left"
                color={colors.dark_blue}
                content={userData?.about}
              />
            </View>
          </View>
        )}

        <View>
          <ContactBox
            title={fixedTitles.profileTitles["contact"].title}
            userData={userData}
            phoneTitle={fixedTitles.profileTitles["phone-number"].title}
            emailTitle={fixedTitles.profileTitles["email-address"].title}
          />
        </View>
        {userData?.is_expert == 1 && (
          <View style={{ flexDirection: "row", marginHorizontal: 0 }}>
            <View
              style={[
                {
                  marginHorizontal: 20,
                  backgroundColor: "white",
                  width: SCREEN_WIDTH * 0.42,
                  marginTop: 15,
                  borderRadius: 10,
                  padding: 10,
                  height: 127,
                },
                styles.shadow,
              ]}
            >
              <View style={{ top: 0 }}>
                <Typography
                  content={fixedTitles.profileTitles["rate"].title}
                  align="left"
                  size={14}
                  bold
                  color={colors.focused}
                />
              </View>
              <View style={{ top: -SCREEN_HEIGHT * 0.03 }}>
                <Typography
                  content={userData?.rating}
                  align="left"
                  size={43}
                  bold
                  color={colors.dark_blue}
                />
              </View>
            </View>
            <View
              style={[
                {
                  backgroundColor: "white",
                  width: SCREEN_WIDTH * 0.42,
                  marginTop: 15,
                  borderRadius: 10,
                  padding: 10,
                  height: 127,
                },
                styles.shadow,
              ]}
            >
              <View style={{ top: 0 }}>
                <Typography
                  content={fixedTitles.profileTitles["price"].title}
                  align="left"
                  size={14}
                  bold
                  color={colors.focused}
                />
              </View>
              <View style={{ top: -SCREEN_HEIGHT * 0.01 }}>
                <Typography
                  content={
                    numeral(userData?.consultancy_fee).format("0,0") + "L.L"
                  }
                  fit
                  lines={1}
                  align="left"
                  size={25}
                  bold
                  color={colors.dark_blue}
                />
              </View>
              <View style={{ top: -SCREEN_HEIGHT * 0.02 }}>
                <Typography
                  content={fixedTitles.profileTitles["per-hour"].title}
                  align="left"
                  size={14}
                  color={"#CFD9DC"}
                />
              </View>
            </View>
          </View>
        )}
        <View>
          <LocationBox
            userData={userData}
            location={{
              latitude: userData?.location?.split(",")[0],
              longitude: userData?.location?.split(",")[1],
            }}
          />
        </View>
      </ScrollView>
      <BottomModal
        profilePic={profilePic}
        navigation={navigation}
        visible={modalVisible}
        close={() => setModalVisible(false)}
        cameraHandler={() => cameraHandler()}
        imageHandler={() => pickImage()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    height: SCREEN_HEIGHT,
    paddingTop: Platform.OS === "ios" ? STATUS_BAR_HEIGHT : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    alignSelf: "center",
    height: 40,
  },
  left: {
    height: 39,
    width: 39,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  right: {
    marginHorizontal: 20,

    width: SCREEN_WIDTH - 20,
    alignSelf: "center",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  user: {
    marginTop: SCREEN_HEIGHT * 0.026,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    height: SCREEN_HEIGHT * 0.11,
  },
  name: {
    width: SCREEN_WIDTH * 0.5,
    marginLeft:
      Platform.OS == "ios" ? SCREEN_WIDTH * 0.05 : SCREEN_WIDTH * 0.07,
  },
  dp: {
    position: "relative",
  },
  editImage: {
    // position: "relative",
    // left: 50,
    right: Platform.OS == "android" ? 20 : 35,
    bottom: Platform.OS === "android" ? -30 : -40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.84,

    elevation: 20,
  },
  indicator: {
    height: 40,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.01,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderBox: {
    minHeight: SCREEN_HEIGHT * 0.08,
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 1,
    marginBottom: 12,
  },
  col: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.04,
    paddingBottom: 10,
  },
  myshop: {
    minHeight: SCREEN_HEIGHT * 0.074,
    width: SCREEN_WIDTH * 0.42,
    backgroundColor: colors.dark_blue,

    alignSelf: "center",
    borderRadius: 10,
  },
  shopContent: {
    flexDirection: "row",
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.074,
    width: "100%",
    marginHorizontal: 15,
  },
  text: {
    marginHorizontal: 15,
    top: 2,
  },
  list: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.018,

    // height: 90,
  },
  about: {
    width: SCREEN_WIDTH * 0.9,
    // minHeight: SCREEN_HEIGHT * 0.16,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 15,
    elevation: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: SCREEN_HEIGHT * 0.026,
  },
  title: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.013,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  value: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.015,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 1,
    // marginTop: Platform.OS == "android" ? 25 : 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userInfo: {
    right: 35,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    elevation: 10,
    zIndex: 10,
  },
  editImagePos: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    alignItems: "flex-end",
  },
});
