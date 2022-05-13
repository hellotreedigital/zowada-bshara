import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  I18nManager,
  Linking,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { Header } from "../../../components/Header/Header";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import CalendarSVG from "../../../SVGR/Globals/Calendar";
import { colors } from "../../../globals/colors";
import Typography from "../../../components/Typography/Typography";
import WatchSVG from "../../../SVGR/Globals/Watch";
import LocationSVG from "../../../SVGR/Globals/Location";
import ShareSVG from "../../../SVGR/Globals/Share";
import EditSVG from "../../../SVGR/Globals/Edit";

import * as Animatable from "react-native-animatable";
import EventsCenteredModal from "../../../components/Modals/EventsCenteredModal";
import AppContext from "../../../appContext/AppContext";
import { bookingEvent } from "../../../api/Events/Events";

const AboutEvents = ({
  data,
  item,
  editEventHandler,
  shareHandler,
  expertId,
  userId,
}) => {
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  const linkingHandler = () => {
    if (item?.link) {
      if (
        item?.location == null ||
        item.location == "null" ||
        item.location == ""
      ) {
        Linking.openURL(item?.link).catch((err) => {});
      }
    }
  };

  return (
    <View style={styles.eventHeader}>
      <View style={styles.col}>
        {data.map((data, index) => (
          <Animatable.View
            animation={I18nManager.isRTL ? "slideInRight" : "slideInLeft"}
            style={styles.row}
            delay={index * 250}
            key={data.id.toString()}
          >
            <View style={styles.icon}>{data.icon}</View>
            {data.id == 2 ? (
              <TouchableOpacity onPress={() => linkingHandler()}>
                <Typography
                  content={data.title}
                  color={colors.dark_blue}
                  align="left"
                  size={16}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <Typography
                  content={data.title}
                  color={colors.dark_blue}
                  align="left"
                  size={16}
                />
              </View>
            )}
          </Animatable.View>
        ))}
      </View>
      <Animatable.View style={{ flexDirection: "row" }} animation={fadeIn}>
        <TouchableOpacity onPress={() => shareHandler()} style={styles.bigIcon}>
          <ShareSVG />
        </TouchableOpacity>
        {expertId == userId && (
          <TouchableOpacity
            onPress={() => editEventHandler()}
            style={[styles.bigIcon, { marginLeft: 8 }]}
          >
            <EditSVG />
          </TouchableOpacity>
        )}
      </Animatable.View>
    </View>
  );
};

const EventBody = ({ setModalVisible, item, setFinished, fixedTitles }) => {
  return (
    <View style={styles.body}>
      <Animatable.View
        style={styles.bodyTitle}
        animation="slideInUp"
        delay={600}
      >
        <Typography
          content={fixedTitles.events["about"].title}
          align="left"
          color={colors.focused}
          size={16}
          bold={true}
        />
      </Animatable.View>
      <Animatable.View animation="slideInUp" delay={700}>
        <Typography
          size={14}
          color={colors.dark_blue}
          align="left"
          content={item?.about}
        />
      </Animatable.View>
      <Animatable.View animation="slideInUp" delay={900}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Typography
            content={fixedTitles.events["book"].title}
            color={colors.white}
            size={16}
            align="center"
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export const SingleEvent = ({ navigation, route }) => {
  const { item } = route.params;
  const { userId, userData, fixedTitles } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const shareHandler = async () => {
    try {
      const result = await Share.share({
        message: item?.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const editEventHandler = () => {
    navigation.navigate("EventsForm", {
      editMode: true,
      expertCase: true,
      data: item,
    });
  };

  const data = [
    {
      id: 0,
      title: item?.date,
      icon: <CalendarSVG />,
    },
    {
      id: 1,
      title: item?.time,
      icon: <WatchSVG />,
    },
    {
      id: 2,
      title:
        item?.location == null || item.location == "null" || item.location == ""
          ? "Online Meeting"
          : item?.location,
      icon: <LocationSVG />,
    },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [nameError, setNameError] = useState(null);
  const bookingHandler = () => {
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("message", about);

    bookingEvent(formdata, item.id)
      .then((res) => {
        setFinished(true);
      })
      .catch((err) => {
        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={item.name} red={true} />
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <Animatable.View animation="fadeInDown">
          <ImageBackground
            style={styles.image}
            source={{
              uri: item?.formatted_image,
            }}
          />
        </Animatable.View>
        <AboutEvents
          item={item}
          shareHandler={() => shareHandler()}
          data={data}
          editEventHandler={() => editEventHandler()}
          expertId={item?.expert_id}
          userId={userData?.id}
        />
        <EventBody
          item={item}
          setFinished={setFinished}
          fixedTitles={fixedTitles}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
      <EventsCenteredModal
        visible={modalVisible}
        close={() => (finished ? navigation.pop() : setModalVisible(false))}
        loading={false}
        setFinished={setFinished}
        finished={finished}
        submit={() => bookingHandler()}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        setAbout={setAbout}
        about={setAbout}
        nameError={nameError}
        fixedTitles={fixedTitles}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    overflow: "hidden",
    height: SCREEN_HEIGHT * 0.192,
    alignSelf: "center",
    marginTop: 15,
  },
  eventHeader: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginTop: 20,
  },
  col: {
    flexDirection: "column",
  },
  icon: {
    backgroundColor: colors.focused,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 11,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  bigIcon: {
    backgroundColor: colors.focused,
    width: 39,
    height: 39,
    borderRadius: 39 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  bodyTitle: {
    marginBottom: -5,
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    width: SCREEN_WIDTH * 0.9,
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
});
