import React, { useContext, useState } from "react";
import {

  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  I18nManager,
  ActivityIndicator,

} from "react-native";
import AppContext from "../../appContext/AppContext";
import { AccordationList } from "../../components/AccordationList/AccordationList";
import { FullBox } from "../../components/Boxes/FullBox";
import { ImageBox } from "../../components/Boxes/ImageBox";
import { SmallBox } from "../../components/Boxes/SmallBox";
import { HomeCarousel } from "../../components/Carousel/HomeCarousel";
import { ExpertCard } from "../../components/ExpertsCard/ExpertCard";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import {
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
	STATUS_BAR_HEIGHT,
} from "../../globals/globals";
import NotificationSVG from "../../SVGR/Home/Notification";
import ShareSVG from "../../SVGR/Home/Share";
import { FilterModal } from "../../components/Modals/FilterModal";
import { expertSearch } from "../../api/Expert/Expert";
export const ExpertScreen = ({ navigation }) => {

  const {
    appLanguage,
    userName,
    token,
    bestExperts,
    setBestExperts,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchString, setSearchString] = useState(null);
  const expertDetailsHandler = (data) => {
    navigation.navigate("expertSingleScreen", {
      data: data,
    });
  };

  const searchHandler = () => {
    setLoading(true);
    expertSearch(searchString)
      .then((res) => {
        setLoading(false);
        navigation.navigate("ResultScreenScreen", {
          data: res.data.experts.data,
          fees: false,
        });
        setSearchString(null);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // StatusBar.setHidden(true);
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_blue}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.carousel}>
            <HomeCarousel />
          </View>
        </View>
        <View style={styles.status}>
          <View style={styles.left}>
            <Typography
              content={"خبراء"}
              color={colors.white}
              size={22}
              bold={true}
              lh={26}
              align="left"
            />
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.icon}>
              <ShareSVG />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <NotificationSVG />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBox}>
          <SearchBox
            filterEnabled={true}
            onPress={() => setModalVisible(true)}
            onSearchPress={() => searchHandler()}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={[styles.about, styles.spacing]}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              color={colors.dark_yellow}
              size={16}
              content="أفضل الخبراء"
              align="left"
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("allExperts", {
                data: bestExperts,
              })
            }
            style={styles.aboutRight}
          >
            <Typography
              color={colors.dark_blue}
              size={14}
              content="اظهار الكل"
              align="left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
          >
            {bestExperts?.map((data, index) => {
              return (
                <ExpertCard
                  onPress={() => expertDetailsHandler(data)}
                  data={data}
                  key={data.id}
                  index={index}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={[styles.about, styles.spacing]}>
          <View style={styles.aboutLeft}>
            <Typography
              bold={true}
              align="left"
              color={colors.dark_yellow}
              size={16}
              content="أسئلة نشطة"
            />
          </View>
        </View>
        <View>
          <AccordationList />
        </View>
      </View>
      <FilterModal
        navigation={navigation}
        visible={modalVisible}
        close={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    zIndex: 10000,
    // marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  left: {
    marginLeft: 24,
  },
  right: {
    marginRight: 24,
    flexDirection: "row",
  },
  header: {
    position: "relative",
  },
  icon: {
    width: SCREEN_HEIGHT * 0.037,
    height: SCREEN_HEIGHT * 0.037,
    borderRadius: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.0315,
  },
  container: {
    backgroundColor: "#fff",
  },
  searchBox: {
    position: "absolute",
    bottom: -22,
    alignSelf: "center",
    zIndex: 100000000,
  },
  body: {
    paddingTop: 24,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    zIndex: -1,
  },
  about: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },
  list: {
    position: "relative",
    top: -SCREEN_HEIGHT * 0.011,
    // paddingBottom: 20,
  },
  spacing: {
    marginTop: SCREEN_HEIGHT * 0.012,
  },
  loader: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
  },
});
