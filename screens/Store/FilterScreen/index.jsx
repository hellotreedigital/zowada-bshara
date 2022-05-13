import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import AppContext from "../../../appContext/AppContext";
import { Header } from "../../../components/Header/Header";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT } from "../../../globals/globals";
import { filterShops } from "../../../api/Shop";
export const FilterScreen = ({ navigation }) => {
  const { fixedTitles } = useContext(AppContext);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //   fixedTitles.productTypes.map((data) => {
    //     filterArr.push(data);
    //   });
  }, []);
  let array = [...selectedFilters];
  const selectFilter = (id) => {
    const index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setSelectedFilters(array);
    } else {
      setSelectedFilters([...selectedFilters, id]);
    }
  };

  const handlerFilter = () => {
    setLoading(true);
    filterShops(selectedFilters)
      .then((res) => {
        setData(res.data.shops.data);
        navigation.navigate("FilterResults", {
          data: res.data.shops.data,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View
        style={[
          styles.loader,
          { zIndex: loading ? 10 : -1, elevation: loading ? 10 : 0 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.focused} />
      </View>
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          blue
          title={fixedTitles.shopTitles["filter"].title}
        />

        <View style={styles.list}>
          <FlatList
            data={fixedTitles.productTypes}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                selectFilter={() => selectFilter(item.id)}
                selectedFilters={selectedFilters}
              />
            )}
          />
        </View>
        <View>
          <TouchableOpacity
            disabled={selectedFilters.length == 0 ? true : false}
            onPress={() => handlerFilter()}
            style={styles.button}
          >
            <Typography
              content={fixedTitles.shopTitles["search"].title}
              color={colors.white}
              align="center"
              size={16}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const RenderItem = ({ item, selectFilter, selectedFilters }) => {
  return (
    <TouchableOpacity onPress={() => selectFilter()}>
      <Typography
        size={16}
        content={item.title}
        align="left"
        bold={selectedFilters.includes(item.id) ? true : false}
        color={
          selectedFilters.includes(item.id) ? colors.focused : colors.dark_blue
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    alignSelf: "center",
    marginTop: 20,
    flexGrow: 0.9,
    width: SCREEN_WIDTH - 40,
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    alignSelf: "center",
    elevation: 5,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
