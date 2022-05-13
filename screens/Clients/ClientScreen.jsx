import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  Image,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import { getClients, getClientsById } from "../../api/Clients/Clients";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import NotificationSVG from "../../SVGR/Home/Notification";
import ShareSVG from "../../SVGR/Home/Share";
import AppContext from "../../appContext/AppContext";
const Header = ({
  setSearchString,
  clients,
  setFiltredData,
  searchString,
  navigation,
  fixedTitles,
  isNotification,
  notificationsCounter,
  chatsCounter,
}) => {
  const handleSearch = (text) => {
    let value = text.toLowerCase();
    setSearchString(text);
    let result = [];
    result = clients.filter((data) => {
      return data.full_name.toLowerCase().search(value) != -1;
    });
    setFiltredData(result);
  };
  return (
    <View>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.pexels.com/photos/977213/pexels-photo-977213.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          }}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.top}>
        <View>
          <Typography
            content={fixedTitles.clients["clients"].title}
            color={colors.white}
            size={20}
            bold={true}
            align="left"
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("notifications")}
            style={styles.icon}
          >
            <NotificationSVG />
            {notificationsCounter > 0 && (
              <View style={styles.notification}>
                <View style={{ top: -SCREEN_HEIGHT * 0.003 }}>
                  <Text style={styles.smallText}>{notificationsCounter}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("chatsList", {
                title: "chat",
                chat: true,
              })
            }
            style={[styles.icon, { marginLeft: 10 }]}
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
      </View>
      <View style={styles.searchBox}>
        <SearchBox
          searchString={searchString}
          setSearchString={handleSearch}
          filterEnabled={true}
          onSearchPress={() => {}}
          hideFilter={true}
          placeholder={fixedTitles.funding["search"].title}
        />
      </View>
    </View>
  );
};

const ClientCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("singleClient", {
          id: item.id,
          data: item,
        })
      }
      style={styles.card}
    >
      <View>
        <Image
          style={styles.roundedImage}
          source={{ uri: item?.image_absolute_url }}
        />
        <View style={styles.imageloader}>
          <ActivityIndicator size="small" color={colors.dark_blue} />
        </View>
      </View>
      <View style={styles.text}>
        <Typography
          content={item.full_name}
          color={colors.dark_blue}
          size={14}
          bold={true}
          align="left"
        />
      </View>
    </TouchableOpacity>
  );
};
const emptyCard = () => {
  return (
    <View>
      <Typography
        content="You have no clients right now"
        color={colors.dark_blue}
        align="center"
        size={12}
      />
    </View>
  );
};

const loader = (props) => {
  return (
    <>
      <View style={[styles.card, styles.loader]}>
        <ContentLoader
          speed={2}
          width={SCREEN_WIDTH * 0.9}
          height={60}
          viewBox="0 0 780 124"
          backgroundColor="#f3f3f3"
          foregroundColor={colors.dark_blue}
          rtl={I18nManager.isRTL}
          {...props}
        >
          <Rect
            x="150"
            y={SCREEN_WIDTH * 0.15}
            rx="3"
            ry="3"
            width="200"
            height="8"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.16}
            cy={SCREEN_WIDTH * 0.16}
            r={SCREEN_WIDTH * 0.13}
          />
        </ContentLoader>
      </View>
      <View style={[styles.card, styles.loader]}>
        <ContentLoader
          speed={2}
          width={SCREEN_WIDTH * 0.9}
          height={60}
          viewBox="0 0 780 124"
          backgroundColor="#f3f3f3"
          foregroundColor={colors.dark_blue}
          rtl={I18nManager.isRTL}
          {...props}
        >
          <Rect
            x="150"
            y={SCREEN_WIDTH * 0.15}
            rx="3"
            ry="3"
            width="200"
            height="8"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.16}
            cy={SCREEN_WIDTH * 0.16}
            r={SCREEN_WIDTH * 0.13}
          />
        </ContentLoader>
      </View>
      <View style={[styles.card, styles.loader]}>
        <ContentLoader
          speed={2}
          width={SCREEN_WIDTH * 0.9}
          height={60}
          viewBox="0 0 780 124"
          backgroundColor="#f3f3f3"
          foregroundColor={colors.dark_blue}
          rtl={I18nManager.isRTL}
          {...props}
        >
          <Rect
            x="150"
            y={SCREEN_WIDTH * 0.15}
            rx="3"
            ry="3"
            width="200"
            height="8"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.16}
            cy={SCREEN_WIDTH * 0.16}
            r={SCREEN_WIDTH * 0.13}
          />
        </ContentLoader>
      </View>
      <View style={[styles.card, styles.loader]}>
        <ContentLoader
          speed={2}
          width={SCREEN_WIDTH * 0.9}
          height={60}
          viewBox="0 0 780 124"
          backgroundColor="#f3f3f3"
          foregroundColor={colors.dark_blue}
          rtl={I18nManager.isRTL}
          {...props}
        >
          <Rect
            x="150"
            y={SCREEN_WIDTH * 0.15}
            rx="3"
            ry="3"
            width="200"
            height="8"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.16}
            cy={SCREEN_WIDTH * 0.16}
            r={SCREEN_WIDTH * 0.13}
          />
        </ContentLoader>
      </View>
      <View style={[styles.card, styles.loader]}>
        <ContentLoader
          speed={2}
          width={SCREEN_WIDTH * 0.9}
          height={60}
          viewBox="0 0 760 124"
          backgroundColor="#f3f3f3"
          foregroundColor={colors.dark_blue}
          rtl={I18nManager.isRTL}
          {...props}
        >
          <Rect
            x="150"
            y={SCREEN_WIDTH * 0.15}
            rx="3"
            ry="3"
            width="200"
            height="8"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.16}
            cy={SCREEN_WIDTH * 0.16}
            r={SCREEN_WIDTH * 0.13}
          />
        </ContentLoader>
      </View>
    </>
  );
};

const List = ({ clients, fetchingData, navigation, clientsHandler }) => {
  return (
    <View style={styles.list}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={fetchingData}
            onRefresh={clientsHandler}
            tintColor={colors.dark_blue}
          />
        }
        onRefresh={clientsHandler}
        refreshing={fetchingData}
        data={clients}
        ListEmptyComponent={!fetchingData ? emptyCard : loader}
        renderItem={({ item }) => (
          <ClientCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export const ClientScreen = ({ navigation, route }) => {
  const {
    fixedTitles,
    isNotification,
    chatsCounter,
    notificationsCounter,
    setStoreModalVisible,
    cartStatus,
  } = useContext(AppContext);
  const isFocused = useIsFocused();

  const [fetchingData, setFetchingData] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFiltredData] = useState();

  useEffect(() => {
    if (cartStatus?.length > 0) {
      setStoreModalVisible(true);
    }
  }, [isFocused]);

  const clientsHandler = () => {
    setFetchingData(true);
    getClients()
      .then((res) => {
        setClients(res.data.users.data);
        setFiltredData(res.data.users.data);
      })
      .catch((err) => {})
      .finally(() => {
        setFetchingData(false);
      });
  };

  useEffect(() => {
    if (!isFocused) return;

    clientsHandler();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <Header
          isNotification={isNotification}
          fixedTitles={fixedTitles}
          clients={clients}
          setFiltredData={setFiltredData}
          searchString={searchString}
          setSearchString={setSearchString}
          navigation={navigation}
          chatsCounter={chatsCounter}
          notificationsCounter={notificationsCounter}
        />
      </View>
      <View style={{ flex: 1 }}>
        <List
          clientsHandler={() => clientsHandler()}
          navigation={navigation}
          fetchingData={fetchingData}
          clients={filteredData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: SCREEN_HEIGHT * 0.287,
    width: SCREEN_WIDTH,
    borderBottomLeftRadius: SCREEN_HEIGHT * 0.03,
    borderBottomRightRadius: SCREEN_HEIGHT * 0.03,
    overflow: "hidden",
    position: "relative",
  },
  searchBox: {
    position: "absolute",
    bottom: -SCREEN_HEIGHT * 0.023,
    zIndex: 1000,
    elevation: 10,
    // width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  list: {
    top: SCREEN_HEIGHT * 0.04,
    flexGrow: 1,
  },
  roundedImage: {
    height: SCREEN_WIDTH * 0.16,
    width: SCREEN_WIDTH * 0.16,
    borderRadius: (SCREEN_WIDTH * 0.16) / 2,
    overflow: "hidden",
    zIndex: 10,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3,
    marginBottom: 7,
    marginTop: 7,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    marginLeft: 24,
  },
  loader: {
    paddingHorizontal: 0,
    marginBottom: 7,
    marginTop: 7,
  },
  imageloader: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  top: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    top: Platform.OS == "ios" ? 48 : 12,
  },
  icon: {
    width: SCREEN_HEIGHT * 0.05,
    height: SCREEN_HEIGHT * 0.05,
    borderRadius: SCREEN_HEIGHT * 0.05,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderBottomLeftRadius: SCREEN_HEIGHT * 0.03,
    borderBottomRightRadius: SCREEN_HEIGHT * 0.03,
  },
  notification: {
    backgroundColor: colors.dark_blue,
    height: SCREEN_HEIGHT * 0.014,
    width: SCREEN_HEIGHT * 0.014,
    borderRadius: (SCREEN_HEIGHT * 0.014) / 2,
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    color: colors.white,
    fontSize: 8,
    lineHeight: 18,
    lineHeight: 12,
  },
});
