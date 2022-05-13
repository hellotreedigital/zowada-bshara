import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  I18nManager,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  expertSearch,
  getBestExperts,
  getExpertASC,
  getExperts,
} from "../../../api/Expert/Expert";
import AppContext from "../../../appContext/AppContext";
import { ExpertCard } from "../../../components/ExpertsCard/ExpertCard";
import { FilterModal } from "../../../components/Modals/FilterModal";
import { SearchBox } from "../../../components/SearchBox/SearchBox";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";

const AllExperts = ({ navigation, route }) => {
  const { data, allExpertsMode } = route.params;
  const { fixedTitles } = useContext(AppContext);
  const [allExperts, setAllExperts] = useState(data);
  const [searchString, setSearchString] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);
  useEffect(() => {
    if (!allExpertsMode) return;
    setLoading(true);
    getExperts()
      .then((res) => {
        setLoading(false);
        setAllExperts(res.data.experts);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const searchHandler = () => {
    setLoading(true);
    expertSearch(searchString)
      .then((res) => {
        setLoading(false);

        setAllExperts(res.data.experts.data);
        s;
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.loader}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={colors.dark_blue}
          />
        </View>
        <View style={styles.arrow}>
          <TouchableOpacity
            style={{
              width: 20,
              height: 40,
              justifyContent: "center",
              paddingTop: 12,
            }}
            onPress={() => navigation.pop()}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
              fill={"#E8AF2E"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.pop()} style={{ top: 5 }}>
            <Typography
              content={fixedTitles.expertsTitles["experts"].title}
              size={20}
              bold={true}
              color="#E8AF2E"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <SearchBox
            filterEnabled={true}
            onPress={() => setModalVisible(true)}
            onSearchPress={() => searchHandler()}
            searchString={searchString}
            setSearchString={setSearchString}
            placeholder={fixedTitles.expertsTitles["search"].title}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={allExperts}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ExpertCard
                index={index}
                data={item}
                onPress={() =>
                  navigation.navigate("expertSingleScreen", {
                    data: item,
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            // onEndReached={()=>onEndReachHandler()}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignSelf: "center" }}>
                  {!loading && (
                    <Typography
                      content="no results"
                      color={colors.dark_blue}
                      sizr={12}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>
        <FilterModal
          allExperts={true}
          setAllExperts={setAllExperts}
          navigation={navigation}
          visible={modalVisible}
          close={() => setModalVisible(false)}
          setLoadingResults={setLoading}
          loadingResults={loading}
        />
      </SafeAreaView>
    </View>
  );
};

export default AllExperts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    backgroundColor: "white",
  },
  arrow: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginVertical: Platform.OS == "android" ? 15 : 0,
  },
  list: {
    height: SCREEN_HEIGHT - 185,
    paddingBottom: Platform.OS == "android" ? 60 : 40,
  },
  searchBox: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    zIndex: 10,
    elevation: 20,
  },
});
