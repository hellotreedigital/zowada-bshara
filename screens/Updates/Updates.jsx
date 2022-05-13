import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  I18nManager,
  RefreshControl,
  ScrollView,
} from "react-native";

import AppContext from "../../appContext/AppContext";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import NotificationSVG from "../../SVGR/Home/Notification";
import ShareSVG from "../../SVGR/Home/Share";
import { useIsFocused } from "@react-navigation/native";
import { getUpdates, searchUpdate } from "../../api/Updates/Updates";
import * as Location from "expo-location";
import { weeklyWeather } from "../../api/WeatherDB/Weather";
const Header = ({
  navigation,
  fixedTitles,
  userData,
  setSearchString,
  searchString,
  setModalVisible,
  navigaation,
  searchHandler,
  notificationsCounter,
  chatsCounter,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.imageView}>
        <Image
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.28 }}
          source={{ uri: fixedTitles.updates["updates-image"].formatted_image }}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ marginRight: 10 }}>
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
            />
          </View>
          <Typography
            content={fixedTitles.updates["updates"].title}
            color={colors.white}
            size={20}
            bold={true}
            align="left"
          />
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
          <TouchableOpacity
            onPress={() => navigation.navigate("notifications")}
            style={styles.icon}
          >
            <NotificationSVG />

            {notificationsCounter > 0 && (
              <View style={styles.notification}>
                <View style={{ top: -SCREEN_HEIGHT * 0.002 }}>
                  <Text style={styles.smallText}>{notificationsCounter}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBox}>
        <SearchBox
          hideFilter
          filterEnabled
          filterEnabled={true}
          onPress={() => {}}
          onSearchPress={() => searchHandler()}
          searchString={searchString}
          setSearchString={setSearchString}
          placeholder={fixedTitles.updates["search"].title}
        />
      </View>
    </View>
  );
};

const Weather = ({
  data,
  displayOpenWeatherApiIcons,
  fixedTitles,
  location,
  getLocation,
}) => {
  const length = data.length;

  return (
    <View style={styles.weatherBox}>
      <Typography
        content={fixedTitles.updates["weather"].title}
        color={colors.focused}
        size={16}
        bold
        align="left"
      />
      <View style={styles.row}>
        {location &&
          data.map((res, index) => {
            const unixTime = res?.dt;
            const date = new Date(unixTime * 1000);
            if (index < 7) {
              return (
                <View
                  key={index}
                  style={[
                    styles.weather,
                    index == 0 && styles.first,
                    index == length - 2 && styles.end,
                  ]}
                >
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{
                        uri: displayOpenWeatherApiIcons(res.weather[0]?.icon),
                      }}
                      style={styles.weatherIcon}
                    />
                  </View>
                  <View style={{ top: -SCREEN_HEIGHT * 0.007 }}>
                    <Typography
                      content={Math.round(res.temp.day)}
                      color={colors.dark_blue}
                      align="center"
                      bold={true}
                      size={16}
                    />
                  </View>
                  <View style={{ top: -SCREEN_HEIGHT * 0.018 }}>
                    <Typography
                      content={date.toString().split(" ")[0]}
                      color={colors.dark_blue}
                      align="center"
                      bold={false}
                      size={12}
                    />
                  </View>
                </View>
              );
            }
          })}
      </View>
    </View>
  );
};

const RenderItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={styles.renderBox}
      onPress={() => navigation.navigate("UpdatesSingleScreen", { item })}
    >
      <View>
        <ImageBackground
          source={{ uri: item.formatted_thumbnail }}
          style={styles.image}
        />
      </View>
      <View style={{ width: "90%", marginBottom: 4 }}>
        <Typography
          content={item.title}
          align="left"
          color={colors.dark_blue}
          size={14}
          fit={true}
          lines={2}
        />
      </View>
    </TouchableOpacity>
  );
};

const UpdatesBody = ({ data, navigation, fixedTitles }) => {
  return (
    <View style={styles.bodyBox}>
      <View>
        <Typography
          content={fixedTitles.updates["top-updates"].title}
          align="left"
          color={colors.focused}
          size={16}
          bold
        />
      </View>
      <View>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          data={data}
          numColumns={2}
        /> */}
        <View style={styles.wrapper}>
          {data.map((data, index) => (
            <RenderItem key={index} item={data} navigation={navigation} />
          ))}
        </View>
      </View>
    </View>
  );
};

export const Updates = ({ navigation }) => {
  const {
    userData,
    fixedTitles,
    setUpdates,
    chatsCounter,
    notificationsCounter,
    location,
    weather,
    setLocation,
    setWeather,
  } = useContext(AppContext);

  const getExpoLocation = async () => {
    let res = await Location.requestForegroundPermissionsAsync();
    if (res.status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    getWeather(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    getExpoLocation();
  }, []);

  const getWeather = () => {
    weeklyWeather(location.coords.latitude, location.coords.longitude)
      .then((res) => {
        setWeather(res.data.daily);
      })
      .catch((err) => {});
  };
  const [searchString, setSearchString] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [updatesData, setUpdatesData] = useState([]);
  useEffect(() => {
    if (!isFocused) return;
    getUpdatesHandler();
  }, [isFocused]);

  const getUpdatesHandler = () => {
    setRefreshing(true);
    getUpdates()
      .then((res) => {
        setUpdatesData(res.data.updates.data);
      })
      .catch((err) => {})
      .finally(() => {
        setRefreshing(false);
      });
  };

  const searchHandler = () => {
    searchUpdate(searchString)
      .then((res) => {
        setUpdates(res.data.updates.data);
        navigation.navigate("UpdateSearch");
      })
      .catch((err) => {});
  };
  const displayOpenWeatherApiIcons = (iconId) => {
    var iconurl = "http://openweathermap.org/img/w/" + iconId + ".png";
    return iconurl;
  };
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} />}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <Header
        fixedTitles={fixedTitles}
        navigation={navigation}
        userData={userData}
        searchString={searchString}
        setSearchString={setSearchString}
        navigation={navigation}
        searchHandler={() => searchHandler()}
        chatsCounter={chatsCounter}
        notificationsCounter={notificationsCounter}
      />
      <Weather
        getLocation={() => getExpoLocation()}
        location={location}
        fixedTitles={fixedTitles}
        data={weather}
        displayOpenWeatherApiIcons={(icon) => displayOpenWeatherApiIcons(icon)}
      />
      <UpdatesBody
        fixedTitles={fixedTitles}
        data={updatesData}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.024,
    alignSelf: "center",
    zIndex: 100000000,
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
  weatherBox: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.045,
  },
  weather: {
    borderWidth: 1,
    borderColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.13,
    borderLeftWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
  },
  first: {
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderLeftWidth: 1,
  },
  end: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  bodyBox: {
    marginTop: 20,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    height: SCREEN_HEIGHT * 0.142,
    width: SCREEN_WIDTH * 0.43,
    borderRadius: 10,
    overflow: "hidden",
  },
  renderBox: {
    // marginHorizontal: 10,
    width: "50%",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  notification: {
    backgroundColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.013,
    width: SCREEN_HEIGHT * 0.013,
    borderRadius: (SCREEN_HEIGHT * 0.013) / 2,
    position: "absolute",
    top: 5,
    right: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    color: colors.white,
    fontSize: 8,
    lineHeight: 12,
  },
  weatherIcon: {
    height: "95%",
    width: "95%",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.034,
    width: "100%",
    marginTop: SCREEN_HEIGHT * 0.006,
  },
});
