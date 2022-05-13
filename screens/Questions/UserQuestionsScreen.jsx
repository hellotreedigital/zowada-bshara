import React from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";

export const RenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SingleQuestionScreen", {
          data: item,
        })
      }
      style={styles.box}
    >
      <View style={styles.row}>
        <View>
          <ImageBackground
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.col}>
          <View style={{ top: 10 }}>
            <Typography
              content={item.name}
              align="left"
              color={colors.dark_blue}
              size={14}
              bold={true}
            />
          </View>
          <View style={{ top: 0 }}>
            <Typography
              content={item.subtitle}
              align="left"
              color={"#CFD9DC"}
              size={14}
              bold={false}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const UserQuestionsScreen = ({ navigation, route }) => {
  const { data } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.spacing}
          onPress={() => navigation.pop()}
        >
          <RedArrowSVG />
        </TouchableOpacity>
        <View>
          <Typography
            content="أسئلتي"
            align="left"
            color={colors.focused}
            size={20}
            bold={true}
          />
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginRight: 10,
    paddingBottom: 6,
  },
  box: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD9DC",
    paddingVertical: SCREEN_HEIGHT * 0.018,
  },
  image: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    overflow: "hidden",
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    height: SCREEN_HEIGHT,
  },
});
