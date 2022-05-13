import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import RedArrowSVG from "../../../SVGR/Globals/RedArrow";
import Typography from "../../../components/Typography/Typography";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { colors } from "../../../globals/colors";
import PlusSVG from "../../../SVGR/Globals/Plus";
import * as Animatable from "react-native-animatable";
import { getExpertEvents } from "../../../api/Events/Events";

const Header = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.pop()}>
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View style={{ right: 10 }}>
          <Typography
            content="أحداثي"
            color={colors.focused}
            size={20}
            bold={true}
            align="left"
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EventsForm", {
              editMode: false,
              expertCase: true,
            })
          }
          style={styles.icon}
        >
          <PlusSVG />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const List = ({ data, navigation, myEventsHandler, dataLoader }) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              <Typography
                content="You have 0 events"
                color={colors.dark_blue}
                size={12}
                align="center"
              />
            </View>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={dataLoader}
            onRefresh={myEventsHandler}
            tintColor={colors.dark_blue}
          />
        }
      />
    </View>
  );
};

const RenderItem = ({ item, navigation, index }) => {
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
        onPress={() =>
          navigation.navigate("SingleEvent", {
            item: item,
          })
        }
        style={styles.box}
      >
        <View style={styles.top}>
          <View>
            <Typography
              content={item.name}
              align="left"
              color={colors.focused}
              size={16}
              bold={true}
            />
          </View>
          <View style={{ top: -10 }}>
            <Typography
              content={item.date}
              align="left"
              color={`#CFD9DC`}
              size={12}
              bold={false}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <View>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: item.formatted_image }}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Typography
              content={item.about}
              color={colors.dark_blue}
              size={12}
              algin="left"
              ellipsizeMode="tail"
              lines={2}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export const MyEventsScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [dataLoader, setDataLoader] = React.useState(false);
  const [eventsData, setEventsData] = React.useState(data);
  const myEventsHandler = () => {
    setDataLoader(true);
    getExpertEvents()
      .then((res) => {
        setEventsData(res.data.events.data);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <List
        dataLoader={dataLoader}
        myEventsHandler={myEventsHandler}
        data={eventsData}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrow: {
    width: 30,
    backgroundColor: "white",
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,

    elevation: 5,
  },
  box: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
    marginVertical: 20,
    paddingBottom: 15,
  },
  bottom: {
    flexDirection: "row",
    // alignItems: "center",
    top: -10,
  },
  image: {
    height: SCREEN_HEIGHT * 0.09,
    width: SCREEN_HEIGHT * 0.09,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
});
