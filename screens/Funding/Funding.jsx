import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import React, { useState, useContext, useEffect } from "react";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import Typography from "../../components/Typography/Typography";
import AppContext from "../../appContext/AppContext";
import { colors } from "../../globals/colors";
import NotificationSVG from "../../SVGR/Home/Notification";
import MyChatsSVG from "../../SVGR/Profile/MyChats";
import ShareSVG from "../../SVGR/Home/Share";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SharedElement } from "react-navigation-shared-element";
import { FundingFilterModal } from "../../components/Modals/FundingFilterModal";
import ArrowSVG from "../../SVGR/Globals/Arrow";

import {
  filterFundings,
  getAllFundings,
  searchFundings,
} from "../../api/Funding/Funding";
import CachedImage from "react-native-expo-cached-image";

const FundingCards = ({ item, navigation, fixedTitles }) => {
  return (
    <View style={styles.fundingBox}>
      <View>
        <SharedElement id={item.id}>
          <>
            <CachedImage
              style={[styles.image, { position: "relative" }]}
              resizeMode="cover"
              source={{
                uri: item.image_absolute_url,
              }}
            />
          </>
        </SharedElement>
      </View>
      <View style={styles.body}>
        <View style={{ width: "90%" }}>
          <Typography
            fit={true}
            hide
            lines={1}
            content={item.name}
            color={colors.dark_blue}
            size={14}
            align="left"
          />
        </View>
        <View style={{ top: -5 }}>
          <Typography
            content={item.about}
            color={`#CFD9DC`}
            size={12}
            align="left"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FundingSingleScreen", { data: item })
            }
            style={styles.button}
          >
            <Typography
              content={fixedTitles.funding["more"].title}
              align="center"
              color={"white"}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AddFunding = ({ navigation, fixedTitles }) => {
  return (
    <View style={styles.addBox}>
      <View>
        <View>
          <Typography
            color={colors.focused}
            size={14}
            bold
            content={fixedTitles.funding["add-business"].title}
            align="left"
          />
        </View>
        <View>
          <Typography
            color={colors.dark_blue}
            size={12}
            content={fixedTitles.funding["business-desc"].title}
            align="left"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FundUserInfoForm", {
                editMode: false,
                editData: null,
              })
            }
            style={[styles.button, { height: 40, marginBottom: 0 }]}
          >
            <Typography
              content={fixedTitles.funding["add-business"].title}
              color={colors.white}
              align="center"
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Header = ({
  navigation,
  fixedTitles,
  userData,
  setSearchString,
  searchString,
  setModalVisible,
  searchHandler,
  notificationsCounter,
  chatsCounter,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.imageView}>
        <Image
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.28 }}
          source={require("../../assets/FUNDING_BG.png")}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Typography
              content={fixedTitles.funding["crowdfundings"].title}
              color={colors.white}
              size={20}
              bold={true}
              align="left"
            />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("chatsList", {
                  title: "chat",
                  chat: true,
                })
              }
              style={styles.icon}
            >
              <ShareSVG />
              {chatsCounter > 0 && (
                <View style={styles.notification}>
                  <View style={{ top: -SCREEN_HEIGHT * 0.0026 }}>
                    <Text style={[styles.smallText, { lineHeight: 14 }]}>
                      {chatsCounter}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("notifications")}
            >
              <NotificationSVG />
              {notificationsCounter > 0 && (
                <View style={styles.notification}>
                  <View style={{ top: -SCREEN_HEIGHT * 0.001 }}>
                    <Text style={[styles.smallText, { lineHeight: 11 }]}>
                      {notificationsCounter}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.searchBox}>
        <SearchBox
          filterEnabled
          filterEnabled={true}
          onPress={() => setModalVisible(true)}
          onSearchPress={() => searchHandler()}
          searchString={searchString}
          setSearchString={setSearchString}
          placeholder={fixedTitles.funding["search"].title}
        />
      </View>
    </View>
  );
};

export const Funding = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const {
    userData,
    fixedTitles,
    setFundingSearch,
    fundingSearch,
    notificationsCounter,
    chatsCounter,
  } = useContext(AppContext);
  const [searchString, setSearchString] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [allFundings, setAllFundings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterLoader, setFilterLoader] = useState(false);
  useEffect(() => {
    if (!isFocused) return;
    getAllFundingsHandler();
  }, [isFocused]);

  let companyType = [];
  let companyDomain = [];
  let projectType = [];
  let projectTypeID = [];
  let companyTypeId = [];
  let companyDomainId = [];
  useEffect(() => {
    fixedTitles.companyType.map((data) => {
      companyType.push(data.title);
      companyTypeId.push(data.id);
    });
    fixedTitles.companyDomain.map((data) => {
      companyDomain.push(data.title);
      companyDomainId.push(data.id);
    });
    fixedTitles.projectType.map((data) => {
      projectType.push(data.title);
      projectTypeID.push(data.id);
    });
  });

  const searchHandler = () => {
    setLoading(true);

    searchFundings(searchString)
      .then((res) => {
        setFundingSearch(res.data.projects);
        navigation.navigate("FundingSearchScreen", {
          data: res.data.projects.data,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const filterHandler = (type) => {
    setModalVisible(false);
    setLoading(true);
    filterFundings(type)
      .then((res) => {
        setFundingSearch(res.data.projects);
        navigation.navigate("FundingSearchScreen", {
          data: res.data.projects,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllFundingsHandler = () => {
    setLoading(true);
    getAllFundings()
      .then((res) => {
        setAllFundings(res.data.projects.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Header
          fixedTitles={fixedTitles}
          navigation={navigation}
          userData={userData}
          searchString={searchString}
          setSearchString={setSearchString}
          setModalVisible={setModalVisible}
          searchHandler={() => searchHandler()}
          chatsCounter={chatsCounter}
          notificationsCounter={notificationsCounter}
        />
        <View style={styles.list}>
          <View style={styles.loader}>
            <ActivityIndicator
              color={colors.dark_blue}
              size="large"
              animating={filterLoader}
            />
          </View>

          <FlatList
            ListEmptyComponent={() => (
              <View>
                {!loading ? (
                  <Typography
                    content="there are no crowdfunding"
                    color={colors.dark_blue}
                    size={12}
                    align="center"
                  />
                ) : (
                  <View>
                    <ActivityIndicator color={colors.dark_blue} />
                  </View>
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <AddFunding fixedTitles={fixedTitles} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <FundingCards
                fixedTitles={fixedTitles}
                item={item}
                navigation={navigation}
              />
            )}
            data={allFundings}
          />
        </View>
        <FundingFilterModal
          isVisible={modalVisible}
          submit={(type) => filterHandler(type)}
          close={() => setModalVisible(false)}
          typeData={projectType}
          domainData={companyDomain}
          typeId={projectTypeID}
          domainId={companyDomainId}
          loading={filterLoader}
          setLoading={setFilterLoader}
          navigation={navigation}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  top: {
    position: "absolute",
    top: Platform.OS == "ios" ? STATUS_BAR_HEIGHT : 12,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.024,
    alignSelf: "center",
    zIndex: 100000000,
  },
  addBox: {
    backgroundColor: "white",
    // top: 40,
    width: SCREEN_WIDTH - 40,
    marginBottom: 20,
    marginTop: 10,

    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    paddingVertical: 14,
    elevation: 5,
    zIndex: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  list: {
    marginTop: SCREEN_HEIGHT * 0.04,
    flexGrow: 1,
    height: 200,
    // marginHorizontal: 20,
  },
  image: {
    height: SCREEN_HEIGHT * 0.14,
    width: SCREEN_WIDTH * 0.41,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 20,
    zIndex: 10,
    overflow: "hidden",
  },
  body: {
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
    marginLeft: 20,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.41,
  },
  fundingBox: {
    marginBottom: 10,
    height: SCREEN_HEIGHT * 0.28,
  },
  button: {
    width: SCREEN_WIDTH * 0.34,
    height: SCREEN_HEIGHT * 0.04,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
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
  loader: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 1000,
    elevation: 10,
    top: "50%",
  },
  smallText: {
    color: colors.white,
    fontSize: 8,
    lineHeight: 18,
    lineHeight: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
