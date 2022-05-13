import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  I18nManager,
} from "react-native";
import React, { useState, useContext } from "react";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../globals/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getClientsById } from "../../api/Clients/Clients";
import Typography from "../../components/Typography/Typography";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import AppContext from "../../appContext/AppContext";
import CloseSVG from "../../SVGR/Globals/CloseSVG";

const Header = ({ navigation, submit, data, fixedTitle }) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.pop()}
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
            style={{ right: 30 }}
          >
            <Typography
              content={data.full_name}
              color={colors.dark_yellow}
              align="left"
              size={20}
              bold={true}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => submit()} style={styles.button}>
            <Typography
              content={fixedTitle.clients["send-message"].title}
              color={colors.white}
              align="center"
              size={14}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.header, { paddingTop: SCREEN_HEIGHT * 0.025 }]}>
        <Typography
          content={fixedTitle.clients["cases"].title}
          color={colors.dark_yellow}
          align="left"
          size={16}
          bold={true}
        />
      </View>
    </>
  );
};

const SingleCaseCard = ({
  item,
  navigation,
  userData,
  clientName,
  fees,
  clientData,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("singleCaseScreen", {
          data: item,
          expertView: userData?.is_expert === 1 ? true : false,
          senderId: item.user_id,
          clientName: clientName,
          fees: fees,
          notification: false,
        })
      }
      style={styles.card}
    >
      <View style={styles.left}>
        <View style={styles.col}>
          <Typography
            content={item.name}
            align="left"
            color={colors.dark_blue}
            size={14}
            bold={true}
          />
          <View style={{ top: -SCREEN_HEIGHT * 0.011 }}>
            <Typography
              content={userData?.full_name}
              align="left"
              color={"#CFD9DC"}
            />
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <Typography
          content={item.status.title}
          color={"#CFD9DC"}
          size={14}
          align="right"
        />
      </View>
    </TouchableOpacity>
  );
};
const emptyList = () => {
  return (
    <View>
      <Typography
        content="you have 0 cases"
        align="center"
        size={12}
        color={colors.dark_blue}
      />
    </View>
  );
};
const List = ({ data, navigation, loading, userData, clientByIdHandler }) => {
  return (
    <View style={styles.list}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={clientByIdHandler}
            tintColor={colors.dark_blue}
          />
        }
        data={data.cases}
        ListEmptyComponent={loading ? null : emptyList}
        renderItem={({ item, index }) => (
          <SingleCaseCard
            fees={data.client.consultancy_fee}
            clientName={data.client.full_name}
            item={item}
            userData={userData}
            navigation={navigation}
            index={index}
            clientData={data}
          />
        )}
      />
    </View>
  );
};

export const SingleClient = ({ navigation, route }) => {
  const { id, data } = route.params;
  const { userData, fixedTitles } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const clientByIdHandler = () => {
    setLoading(true);
    getClientsById(id)
      .then((res) => {
        setCases(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = clientByIdHandler();

      return () => unsubscribe;
    }, [id])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        submit={() =>
          navigation.navigate("chatsList", {
            title: "رسائل",
            data: [{ id: 0 }],
            chat: true,
          })
        }
        fixedTitle={fixedTitles}
        data={data}
        navigation={navigation}
      />
      <List
        clientByIdHandler={() => clientByIdHandler()}
        userData={userData}
        loading={loading}
        data={cases}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    // marginRight: 10,
    height: 40,
    width: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  button: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list: {
    flex: 1,
  },
  col: {
    flexDirection: "column",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3,
    marginBottom: 7,
    marginTop: 7,
    elevation: 5,
    borderRadius: 10,
  },
  left: {
    paddingLeft: 15,
    paddingTop: 11,
  },
  right: {
    paddingRight: 15,
    paddingTop: 11,
  },
});
