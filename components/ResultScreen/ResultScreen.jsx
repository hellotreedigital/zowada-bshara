import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getExpertASC } from "../../api/Expert/Expert";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import { ExpertCard } from "../ExpertsCard/ExpertCard";
import { SearchBox } from "../SearchBox/SearchBox";
import Typography from "../Typography/Typography";

const ResultScreen = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const expertDetailsHandler = (data) => {
    navigation.navigate("expertSingleScreen", {
      data: data,
    });
  };
  const { data, fees, dir, search, query, filter } = route.params;
  const [searchString, setSearchString] = useState(query);

  const [resultData, setResulstData] = useState([]);

  useEffect(() => {
    setSearchString(query);
    setResulstData(data);
  }, []);

  const [offset, setOffset] = useState(2);

  const getASCHandler = async () => {
    setLoading(true);
    getExpertASC("full_name", offset, "asc")
      .then((res) => {
        setOffset(offset + 1);
        setLoading(false);

        setResulstData([...resultData, ...res.data.experts.data]);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getExpertsByFees = () => {
    if (dir) {
      setLoading(true);
      getExpertASC("consultancy_fee", offset, dir)
        .then((res) => {
          setOffset(offset + 1);
          setLoading(false);
          setResulstData([...resultData, ...res.data.experts.data]);

          navigation.navigate("ResultScreenScreen", {
            data: res.data.experts.data,
            fees: true,
          });
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={[styles.spacing, styles.arrow]}
        >
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        {/* <View>
          <SearchBox
            height={Platform.OS == "android" && SCREEN_HEIGHT * 0.06}
            width={SCREEN_WIDTH * 0.84}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        </View> */}
      </View>
      <View style={styles.list}>
        <>
          {search || filter ? (
            <FlatList
              data={resultData}
              keyExtractor={(item) => item.id.toString()}
              enableEmptySections={true}
              renderItem={({ item }) => {
                return (
                  <ExpertCard
                    data={item}
                    onPress={() => expertDetailsHandler(item)}
                  />
                );
              }}
              ListEmptyComponent={() => (
                <View style={{ alignSelf: "center" }}>
                  <Typography content="Empty list" />
                </View>
              )}
            />
          ) : (
            <FlatList
              data={resultData}
              keyExtractor={(item) => item.id.toString()}
              enableEmptySections={true}
              renderItem={({ item }) => {
                return (
                  <ExpertCard
                    data={item}
                    onPress={() => expertDetailsHandler(item)}
                  />
                );
              }}
              ListEmptyComponent={() => (
                <View style={{ alignSelf: "center" }}>
                  <Typography content="Empty list" />
                </View>
              )}
              // onEndReached={fees ? getExpertsByFees : getASCHandler}
            />
          )}
        </>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
  },
  spacing: {
    marginRight: 10,
  },
  list: {
    // height: "auto",

    paddingBottom: 60,
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  arrow: {
    width: 40,
    height: 15,
  },
});
