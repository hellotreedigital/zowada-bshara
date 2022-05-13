import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  const { data, fees, dir } = route.params;

  const [resultData, setResulstData] = useState([]);

  useEffect(() => {
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
        console.log(err);
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
          console.log(err);
        });
    } else {
      console.log("end reached");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.spacing}
        >
          <RedArrowSVG />
        </TouchableOpacity>
        <View>
          <SearchBox
            height={SCREEN_HEIGHT * 0.04}
            width={SCREEN_WIDTH * 0.84}
          />
        </View>
      </View>
      <View style={styles.list}>
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
          onEndReached={fees ? getExpertsByFees : getASCHandler}
        />
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
    width: SCREEN_WIDTH - 20,
    alignSelf: "center",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  spacing: {
    marginRight: 10,
  },
  list: {
    // height: "auto",
    // backgroundColor: "red",
    paddingBottom: SCREEN_HEIGHT * 0.12,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
