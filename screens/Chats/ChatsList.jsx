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
import { useIsFocused } from "@react-navigation/native";

import AppContext from "../../appContext/AppContext";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
import pusherConfig from "../../pusher.json";
import pusher from "../../pusher";
import { getChats, getChatters } from "../../api/Chat/Chat";

export const RenderItem = ({
  item,
  navigation,
  userData,
  navigationHandler,
  chat,
  finalMessage,
  readArray,
  index,
  readid,
  newMessages,
  chatClick,
}) => {
  const chatSingleClick = (item) => {
    navigationHandler(item);
    chatClick();
  };

  return (
    <TouchableOpacity
      // onPress={() =>
      onPress={() => chatSingleClick(item)}
      style={styles.box}
    >
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={styles.row}>
          <View>
            {userData?.is_expert !== 1 ? (
              <ImageBackground
                style={styles.image}
                source={{
                  uri:
                    item.sender?.image_absolute_url ||
                    item.recipient.image_absolute_url,
                }}
                resizeMode="cover"
              />
            ) : (
              <ImageBackground
                style={styles.image}
                source={{
                  uri:
                    item.sender?.image_absolute_url ||
                    item.recipient.image_absolute_url,
                }}
                resizeMode="cover"
              />
            )}
          </View>
          <View style={styles.col}>
            <View style={{ top: item.title ? -5 : 5 }}>
              {userData?.is_expert == 1 ? (
                <Typography
                  content={item.sender.full_name}
                  align="left"
                  color={colors.dark_blue}
                  size={14}
                  bold={true}
                />
              ) : (
                <Typography
                  content={item?.recipient?.full_name || item.sender.full_name}
                  align="left"
                  color={colors.dark_blue}
                  size={14}
                  bold={true}
                />
              )}
            </View>

            <View style={{ top: item.message ? -7 : 0 }}>
              <Typography
                content={item.message}
                align="left"
                color={colors.dark_blue}
                size={12}
                bold={false}
              />
            </View>
            <View
              style={{
                bottom: -5,
                position: "absolute",
              }}
            >
              <Typography
                content="17h"
                size={8}
                color={Platform.OS == "ios" ? "#CFD9DC" : colors.dark_blue}
                bold={false}
              />
            </View>
          </View>
        </View>

        {!item.read && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );
};

export const ChatsList = ({ navigation, route }) => {
  const { data, title, chat } = route.params;
  const [newMessages, setNewMessages] = useState();

  useEffect(() => {
    if (newMessages) {
      let newChatters = { ...chatList };

      // Check if new chat exists
      let existingChatIndex = -1;
      newChatters.data.forEach((newChatter, index) => {
        if (newChatter.sender_id == newMessages.sender_id) {
          existingChatIndex = index;
        }
      });

      // delete existing chat if exists
      if (existingChatIndex !== -1) {
        newChatters.data.splice(existingChatIndex, 1);
      }

      // add the new chat to the begining
      newChatters.data = [newMessages, ...newChatters.data];

      setChatList(newChatters);
    }
  }, [newMessages]);

  const {
    userData,
    pusher,
    finalMessage,
    setFinalMessage,
    readArray,
    setReadArray,
  } = useContext(AppContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const channel = pusher?.subscribe(`private-chats.${userData?.id}`);
    channel?.bind("Chatter", (data) => {
      // alert(JSON.stringify(data));
      //
      setReadArray([...readArray, data?.recipient_id]);
      setNewMessages(data, chatList);

      setFinalMessage({
        messageString: data.message,
        recipient_id: data?.recipient_id,
        read: data.read,
      });
    });
    return () => {
      pusher?.unsubscribe(`private-chats.${userData?.id}`);
    };
  }, []);

  const navigationHandler = (item) => {
    if (chat) {
      navigation.navigate("singleChat", {
        data: {
          sender_id:
            userData?.is_expert !== 1 ? item.recipient_id : item.sender_id,
          // sender_id: item.sender_id,
          recipient_image:
            userData?.is_expert !== 1
              ? item.recipient.image_absolute_url
              : item.sender.image_absolute_url,
          name:
            userData?.is_expert !== 1
              ? item.recipient.full_name
              : item.sender.full_name,
        },
      });
    } else {
      navigation.navigate("SingleQuestionScreen", {
        data: item,
      });
    }
  };

  const [chatList, setChatList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getChatsHandler = () => {
    //userData.id
    setLoading(true);
    getChatters()
      .then((res) => {
        setChatList(res.data.chatters);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getChatsHandler();
  }, []);

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
          data={chatList.data}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getChatsHandler}
              tintColor={colors.dark_blue}
            />
          }
          renderItem={({ item, index }) => (
            <RenderItem
              newMessages={newMessages}
              chat={true}
              userData={userData}
              navigationHandler={(item) => navigationHandler(item)}
              item={item}
              navigation={navigation}
              finalMessage={finalMessage}
              readArray={readArray}
              index={index}
              chatClick={() => {
                let newChatters = { ...chatList };
                newChatters.data[index].read = 1;
                setChatList(newChatters);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return (
              <View style={{ alignSelf: "center" }}>
                {!loading && (
                  <Typography
                    content="You have no chats"
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
    // paddingBottom: I18nManager.isRTL ? 6 : 0,
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: colors.focused,
  },
});
