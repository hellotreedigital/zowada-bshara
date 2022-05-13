import React, { useContext } from "react";
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { getCasesList, getClientView } from "../../../api/Profile/Profile";
import AppContext from "../../../appContext/AppContext";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { Navigation } from "../../../navigation";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import SearchSVG from "../../../SVGR/Globals/Search";
import * as Animatable from "react-native-animatable";

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
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ top: -10 }}>
            <Typography
              content={item.details}
              size={14}
              roman={true}
              color={"#CFD9DC"}
            />
          </View>
          <View style={{ top: -10 }}>
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
      </TouchableOpacity>
    </Animatable.View>
  );
};

const CasesListScreen = ({ navigation, route }) => {
  const [offset, setOffset] = React.useState(2);

  const [loading, setLoading] = React.useState(false);
  const [casesLoader, setCasesLoader] = React.useState(false);
  const { casesList, userData, fixedTitles, setCasesList } = useContext(
    AppContext
  );

  const getCasesListHandler = () => {
    setCasesLoader(true);
    setLoading(true);
    getCasesList()
      .then((res) => {
        setCasesList(res.data.cases.data);
        setCasesLoader(false);
        setLoading(false);
      })
      .catch((err) => {
        setCasesLoader(false);
        setLoading(false);
      });
  };

  const clientViewHandler = (item, case_id) => {
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
            userData?.is_expert == 1 && userData.id == res.data.case.expert.id
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
      <View pointerEvents={loading ? "box-only" : "none"} style={styles.loader}>
        <ActivityIndicator
          animating={loading}
          color={colors.dark_blue}
          size="large"
        />
      </View>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.spacing}
          >
            <ArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
              fill={colors.dark_yellow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ top: -4, right: 10 }}
          >
            <Typography
              content={fixedTitles.expertsTitles["cases"].title}
              size={20}
              bold={true}
              color={colors.dark_yellow}
              align="left"
            />
          </TouchableOpacity>
        </View>
        {casesList.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate("search", { cases: true })}
            style={styles.icon}
          >
            <SearchSVG />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list}>
        <FlatList
          ListEmptyComponent={() => {
            return (
              <>
                {!casesLoader ? (
                  <View style={{ alignSelf: "center" }}>
                    <Typography
                      content={fixedTitles.expertsTitles["no-results"].title}
                      color={colors.dark_blue}
                      size={12}
                      align="left"
                    />
                  </View>
                ) : (
                  <View>
                    <ActivityIndicator
                      animating={casesLoader}
                      color={colors.dark_blue}
                    />
                  </View>
                )}
              </>
            );
          }}
          extraData={casesList}
          data={casesList}
          renderItem={({ item, index }) => (
            <RenderItem
              index={index}
              fixedTitles={fixedTitles}
              clientViewHandler={() => clientViewHandler(item, item.id)}
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CasesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  spacing: {
    // marginRight: 12,
    paddingBottom: 10,
    width: 30,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 6.65,

    elevation: 1,
  },
  list: {
    marginTop: SCREEN_HEIGHT * 0.024,
    height: SCREEN_HEIGHT - 80,
    paddingBottom: SCREEN_HEIGHT * 0.15,
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
  loader: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "transparent",
  },
});
