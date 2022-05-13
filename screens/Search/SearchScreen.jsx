import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { Header } from "../../components/Header/Header";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { colors } from "../../globals/colors";
import { searchEvents } from "../../api/Events/Events";
import { EventsCard } from "../../components/EventsCard/EventsCard";
import Typography from "../../components/Typography/Typography";
import { getClientView, searchCasesList } from "../../api/Profile/Profile";
import * as Animatable from "react-native-animatable";
import AppContext from "../../appContext/AppContext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";

const RenderItem = ({
  item,
  index,
  navigation,
  clientViewHandler,
  fixedTitles,
}) => {
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  return (
    <Animatable.View animation={fadeIn} delay={250 * index}>
      <TouchableOpacity
        onPress={() => {
          clientViewHandler();
        }}
        style={styles.casesCard}
      >
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <Typography
              content={item.name}
              size={14}
              bold={true}
              color={colors.dark_blue}
            />
          </View>
          <View>
            <>
              <Typography
                content={item.status.title}
                size={14}
                roman={true}
                color="#CFD9DC"
              />
            </>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ top: -10 }}>
            <Typography
              content={item.details}
              size={14}
              roman={true}
              color={"#CFD9DC"}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export const SearchScreen = ({ navigation, route }) => {
  const { cases } = route.params;
  const { fixedTitles, userData } = useContext(AppContext);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchHandler = () => {
    setLoading(true);
    setSearching(true);
    if (!cases) {
      searchEvents(searchString)
        .then((res) => {
          setEvents(res.data.events.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
          setSearching(false);
        });
    } else {
      setLoading(true);
      setSearching(true);
      searchCasesList(searchString)
        .then((res) => {
          setEvents(res.data.cases.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
          setSearching(false);
        });
    }
  };
  const clientViewHandler = (case_id) => {
    setLoading(true);

    getClientView(case_id)
      .then((res) => {
        setLoading(false);

        navigation.navigate("singleCaseScreen", {
          data: res.data.case,
          location: res.data.case.appointments[0].location,
          notification: false,
          expertView: userData?.is_expert === 1 ? true : false,
          senderId: res.data.case.user.id,
          zoomLink: res.data.case.appointments[0].zoom_link,
          closed: res.data.case.closed == 1 ? true : false,
          clientName:
            userData?.is_expert == 1
              ? res.data.case.user.full_name
              : res.data.case.expert.full_name,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={colors.dark_blue}
          animating={loading}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.pop()} style={styles.arrow}>
          <ArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
            fill={colors.dark_yellow}
          />
        </TouchableOpacity>
        <SearchBox
          searchString={searchString}
          filterEnabled
          hideFilter
          setSearchString={setSearchString}
          onSearchPress={() => searchHandler()}
        />
      </View>
      <View style={styles.list}>
        {!cases ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignSelf: "center" }}>
                  {!loading && (
                    <Typography
                      content={searching ? "no results were  found" : ""}
                      color={colors.dark_blue}
                      size={12}
                      align="center"
                    />
                  )}
                </View>
              );
            }}
            data={events}
            renderItem={({ item, index }) => (
              <EventsCard navigation={navigation} item={item} index={index} />
            )}
          />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignSelf: "center" }}>
                  {!loading && (
                    <Typography
                      content={searching ? "no results were  found" : ""}
                      color={colors.dark_blue}
                      size={12}
                      align="center"
                    />
                  )}
                </View>
              );
            }}
            data={events}
            renderItem={({ item, index }) => (
              <RenderItem
                index={index}
                fixedTitles={fixedTitles}
                clientViewHandler={() => clientViewHandler(item.id)}
                item={item}
                navigation={navigation}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 0 : 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    width: 30,
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    elevation: 10,
    top: "50%",
  },
  list: {
    marginTop: 30,
  },
  casesCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.08,
    marginBottom: SCREEN_HEIGHT * 0.008,
    marginTop: SCREEN_HEIGHT * 0.008,
    paddingHorizontal: 15,
    paddingTop: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5.65,

    elevation: 5,
  },
});
