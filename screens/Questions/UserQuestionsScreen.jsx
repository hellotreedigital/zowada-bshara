import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from "react-native";
import { getQuestionList } from "../../api/Profile/Profile";
import AppContext from "../../appContext/AppContext";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import { useIsFocused } from "@react-navigation/native";

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
            source={{
              uri:
                item?.expert?.image_absolute_url ||
                item?.user?.image_absolute_url,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.col}>
          <View style={{ top: 10 }}>
            <Typography
              content={item?.expert?.full_name || item?.user?.full_name}
              align="left"
              color={colors.dark_blue}
              size={14}
              bold={true}
            />
          </View>
          <View style={{ top: 0 }}>
            <Typography
              content={item?.value}
              align="left"
              color={Platform.OS == "ios" ? "#CFD9DC" : colors.dark_blue}
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
  const { data, title } = route.params;
  const { questionList, setQuestionList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const getQuestionListHandler = () => {
    setLoading(true);
    getQuestionList()
      .then((res) => {
        setQuestionList(res.data.questions.data);
        setLoading(false);
        // navigation.navigate("UserQuestionsScreen", {
        //   data: questions,
        //   title: fixedTitles.profileTitles["all-questions"].title,
        // });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isFocused) return;
    getQuestionListHandler();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
        <TouchableOpacity
          style={styles.spacing}
          onPress={() => navigation.pop()}
        >
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View>
          <Typography
            content={title}
            align="left"
            color={colors.focused}
            size={20}
            bold={true}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.list}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getQuestionListHandler}
              tintColor={colors.dark_blue}
            />
          }
          data={questionList}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return (
              <View style={{ alignSelf: "center" }}>
                {!loading && (
                  <Typography
                    content="You have no question"
                    color={colors.dark_blue}
                    size={12}
                  />
                )}
              </View>
            );
          }}
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
    paddingBottom: I18nManager.isRTL ? 6 : 0,
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
    height: SCREEN_HEIGHT - 150,
    paddingBottom: 40,
  },
});
