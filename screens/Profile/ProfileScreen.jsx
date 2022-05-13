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
import { editImage } from "../../api/Profile/Profile";
import { ContactBox } from "../../components/ContactBox/ContactBox";
import LocationBox from "../../components/LocationBox/LocationBox";
import RatingsSVG from "../../SVGR/Globals/Ratings";
import CalendarSVG from "../../SVGR/Profile/Calendar";

export const ProfileScreen = ({ navigation }) => {
  const { token, setToken, userName, isCamera, setIsCamera } = useContext(
    AppContext
  );
  const { setProfilePic, profilePic } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  React.useEffect(() => {
    if (token === true) {
      setToken(null);
    }
  }, []);

  const data = [
    {
      id: 0,
      title: "طلباتي",
      color: colors.dark_blue,
      icon: <MyOrdersSVG />,
    },
    {
      id: 1,
      title: "حالاتي",
      color: "#E8AF2E",
      icon: (
        <MyCasesSVG
          width={SCREEN_HEIGHT * 0.073}
          height={SCREEN_HEIGHT * 0.073}
        />
      ),
    },
    {
      id: 2,
      title: "وظائفي",
      color: "#F27E30",
      icon: (
        <MyJobsSVG
          width={SCREEN_HEIGHT * 0.073}
          height={SCREEN_HEIGHT * 0.073}
        />
      ),
    },
    {
      id: 3,
      title: "دوراتي",
      color: "#1F9B89",
      icon: (
        <MyCousesSVG
          width={SCREEN_HEIGHT * 0.073}
          height={SCREEN_HEIGHT * 0.073}
        />
      ),
    },
  ];

  const EDIT_PROFILE_DATA = [
    {
      id: "0",
      placeholder: "الاسم الكامل",
      multi: false,
      slug: "userName",
    },
    {
      id: "1",
      placeholder: "البريد الإلكتروني",
      multi: false,
      slug: "email",
      editable: false,
    },
    {
      id: "2",
      placeholder: "الهاتف",
      multi: false,
      slug: "mobile",
      editable: false,
    },
    {
      id: "3",
      placeholder: "حول",
      multi: true,
      slug: "about",
    },
    {
      id: "4",
      placeholder: "كلمة سر قديمة",
      multi: false,
      slug: "oldPassword",
      secure: true,
    },
    {
      id: "5",
      placeholder: "كلمة السر الجديدة",
      multi: false,
      slug: "password",
      secure: true,
    },
    {
      id: "6",
      placeholder: "تأكيد كلمة السر",
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
  if (token === true) return;
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
    let formdata = new FormData();

    formdata.append("image", {
      uri: image,
      type: "image",
      name: "Profile Pic",
    });
    editImage(formdata)
      .then((res) => {
        console.log(res);
        setProfilePic(image);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setModalVisible(false);
    console.log(result);

    if (!result.cancelled) {
      editImageHandler(result.uri);
      // setProfilePic(result.uri);
    }
  };

  const cameraHandler = () => {
    setIsCamera(true);
    setModalVisible(false);
  };

  const navigationHandler = (id) => {
    switch (id) {
      case 1:
        navigation.navigate("myCases");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.07 }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FormScreen", {
                  editProfile: true,
                  profileForm: EDIT_PROFILE_DATA,
                })
              }
              style={styles.shadow}
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
            style={styles.editImage}
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
              />
            </View>
            <View style={styles.name}>
              <RatingsSVG red={true} />
            </View>
          </View>
        </View>
        <View style={styles.indicator}>
          <View style={styles.leftIndicator}>
            <Typography
              content="تقاريري"
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity style={styles.rightIndicator}>
            <Typography
              content="اظهار الكل"
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
                  content="5,000"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="جميع الطلبات"
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
                  content="500"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="الطلبات الشهرية"
                  align="left"
                />
              </View>
            </View>
          </View>
          <View style={{ marginRight: SCREEN_WIDTH * 0.04 }}>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content="897,000"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="الرصيد"
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.myshop}>
            <View style={styles.shopContent}>
              <View>
                <ShopSVG />
              </View>
              <View style={styles.text}>
                <Typography
                  content="متاجري"
                  color={colors.white}
                  align="right"
                  size={14}
                  bold={true}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.myshop, { backgroundColor: "#1F9B89" }]}
          >
            <View style={styles.shopContent}>
              <View>
                <CalendarSVG />
              </View>
              <View style={styles.text}>
                <Typography
                  content="تقويمي"
                  color={colors.white}
                  align="right"
                  size={14}
                  bold={true}
                />
              </View>
            </View>
          </TouchableOpacity>
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
              <View style={{ width: SCREEN_WIDTH * 0.088 }} />
            )}
          />
        </View>
        <View style={[styles.indicator, styles.spacing]}>
          <View style={styles.leftIndicator}>
            <Typography
              content="أعمالي"
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity style={styles.rightIndicator}>
            <Typography
              content="اظهار الكل"
              color={colors.dark_blue}
              size={14}
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.orderBox}>
          <View style={styles.boxFlex}>
            <View style={[styles.col, { marginRight: SCREEN_WIDTH * 0.08 }]}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content="15"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="جميع الاعمال"
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
                  content="5"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content=" الاعمال الشهرية"
                  align="left"
                />
              </View>
            </View>
          </View>
          <View style={{ marginRight: SCREEN_WIDTH * 0.05 }}>
            <View style={styles.col}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content="897,000"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="الرصيد"
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.indicator, styles.spacing]}>
          <View style={styles.leftIndicator}>
            <Typography
              content="أسئلتي"
              color={colors.focused}
              align="left"
              size={14}
              bold={true}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserQuestionsScreen", {
                data: questions,
              })
            }
            style={styles.rightIndicator}
          >
            <Typography
              content="اظهار الكل"
              color={colors.dark_blue}
              size={14}
              align="right"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.orderBox, { marginBottom: 0 }]}>
          <View style={styles.boxFlex}>
            <View style={[styles.col, { marginRight: SCREEN_WIDTH * 0.112 }]}>
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content="15"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="جميع الأسئلة"
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
              <View style={{ width: "100%", top: SCREEN_HEIGHT * 0.012 }}>
                <Typography
                  size={16}
                  bold={true}
                  color={colors.dark_blue}
                  content="15"
                  align="left"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Typography
                  size={14}
                  color={colors.dark_blue}
                  content="الخبراء"
                  align="left"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.about, { marginBottom: 0 }]}>
          <View style={styles.title}>
            <Typography
              size={14}
              bold={true}
              content="حول"
              color={colors.focused}
              align="left"
            />
          </View>
          <View style={styles.value}>
            <Typography
              size={14}
              align="left"
              color={colors.dark_blue}
              content="هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يتنصي” فتجعلها تبدو (أي الأحرف) "
            />
          </View>
        </View>
        <View>
          <ContactBox />
        </View>
        <View>
          <LocationBox />
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
    paddingTop: STATUS_BAR_HEIGHT,
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
    marginRight: 20,

    width: SCREEN_WIDTH - 20,
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
    marginLeft: SCREEN_WIDTH * 0.05,
  },
  dp: {
    position: "relative",
  },
  editImage: {
    position: "absolute",
    left: 70,
    bottom: -5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.84,

    elevation: 1,
  },
  indicator: {
    height: 40,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
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
    minHeight: SCREEN_HEIGHT * 0.16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6,

    elevation: 1,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: SCREEN_HEIGHT * 0.026,
    marginTop: 15,
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
    shadowRadius: 1,

    elevation: 1,
    marginTop: Platform.OS == "android" ? 25 : 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
