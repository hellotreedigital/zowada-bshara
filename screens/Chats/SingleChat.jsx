import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useContext,
} from "react";
import { Header } from "../../components/Header/Header";
import ArrowSVG from "../../SVGR/Globals/Arrow";
import Typography from "../../components/Typography/Typography";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../globals/globals";
import { colors } from "../../globals/colors";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  MessageText as RNText,
  Time,
  Day,
  Send,
  GiftedAvatar,
  Composer,
} from "react-native-gifted-chat";
import moment from "moment";
import SendAnswerSVG from "../../SVGR/Globals/SendAnswer";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import AppContext from "../../appContext/AppContext";
// import pusherConfig from "../../pusher.json";
// import pusher from "../../pusher";
import { getChats, postChat } from "../../api/Chat/Chat";
import { channel } from "expo-updates";
import Pusher from "pusher-js/react-native";

const CustomHeader = ({ name, data, navigation, image }) => {
  return (
    <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{ marginRight: 10 }}
      >
        <ArrowSVG
          style={{
            transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
          }}
          fill={colors.focused}
        />
      </TouchableOpacity>
      <View style={styles.row}>
        <>
          <Image
            source={{ uri: image }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </>
        <View style={{ marginLeft: 8 }}>
          <Typography
            content={name}
            color={colors.dark_blue}
            size={16}
            bold={true}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const customtInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderTopWidth: 0,
        padding: 8,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 70,
        height: 50,
        marginBottom: 5,
      }}
    />
  );
};
export const SingleChat = ({ navigation, route }) => {
  const {
    userData,
    token,
    pusher,
    setFinalMessage,
    readArray,
    setReadArray,
  } = useContext(AppContext);
  // Pusher.logToConsole = true;

  const { data } = route.params;

  const [messages, setMessages] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [pusherSubscribed, setPusherSubscribe] = useState(false);
  const [senderId, setSenderId] = useState(null);

  useEffect(() => {
    let min_id = Math.min(data.sender_id, userData?.id);
    let max_id = Math.max(data.sender_id, userData?.id);
    // console.error(min_id, max_id);
    const channel = pusher?.subscribe(`private-chat.${min_id}.${max_id}`);

    channel?.bind("SendChat", function (data) {
      // alert(JSON.stringify(data));

      let messageOBJ = {
        _id: data.id,
        text: data.message,
        createdAt: new Date(),
        user: {
          _id: data.sender.id,
          name: userData?.full_name,
          avatar: "",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messageOBJ)
      );
    });
    return () => {
      pusher?.unsubscribe(`private-chat.${min_id}.${max_id}`);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getChats(data.sender_id)
      .then((res) => {
        res.data.conversations.map((response) => {
          // setSenderId(response?.sender_id);
          //
          let messageOBJ = {
            _id: response.id,
            text: response.message,
            createdAt: response.created_at,
            user: {
              _id: response.sender.id,
              name: data.name,
              avatar: "",
            },
          };

          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messageOBJ)
          );
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
    return () => {
      setMessages([]);
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    let formdata = new FormData();
    messages.map((data) => {
      formdata.append("message", data.text);
    });
    formdata.append("recipient_id", data.sender_id);

    postChat(formdata)
      .then((res) => {})
      .catch((err) => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        image={data.recipient_image}
        navigation={navigation}
        data={data}
        name={data.name}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={15}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: "#10425103" }}
      >
        <GiftedChat
          wrapInSafeArea
          isKeyboardInternallyHandled={false}
          alwaysShowSend
          // showUserAvatar
          messagesContainerStyle={{
            paddingBottom: 30,
          }}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userData?.id,
          }}
          renderAvatar={null}
          multiline={false}
          // inverted={false}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: "white",
                  },
                  left: {
                    backgroundColor: colors.dark_blue,
                  },
                }}
              />
            );
          }}
          // keyboardShouldPersistTaps={true}
          // isKeyboardInternallyHandled={false}

          renderMessageText={(props) => {
            return (
              <RNText
                {...props}
                textStyle={{
                  right: {
                    color: colors.dark_blue,
                    fontFamily: "HelveticaRegular",
                    fontSize: 12,
                  },
                  left: {
                    color: colors.white,
                    fontFamily: "HelveticaRegular",
                    fontSize: 12,
                  },
                }}
              />
            );
          }}
          // showUserAvatar={true}

          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: "#10425103",
                paddingTop: 6,
                borderTopColor: "#10425103",
                shadowOpacity: 0,
              }}
              primaryStyle={{ alignItems: "center" }}
            />
          )}
          maxComposerHeight={40}
          minComposerHeight={40}
          renderComposer={(props) => (
            <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: "center" }}>
              <Composer
                {...props}
                textInputStyle={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderRadius: 15,
                  paddingTop: 8.5,
                  paddingHorizontal: 12,
                  marginVertical: 10,
                  marginLeft: 0,
                  shadowOpacity: 0,
                  marginLeft: 20,
                }}
              />
            </View>
          )}
          // renderComposer={(props) => {
          //
          //   return (
          //     <View>
          //       <TextInput {...props} />
          //       {/* <View style={styles.box}>
          //         <View>
          //           <SearchBox
          //             placeholder="أجب عن السؤال هنا"
          //             width={SCREEN_WIDTH * 0.8}
          //             searchString={searchString}
          //             setSearchString={setSearchString}
          //           />
          //         </View>
          //         <TouchableOpacity
          //           onPress={() => onSend(props.messages)}
          //           style={styles.icon}
          //         >
          //           <SendAnswerSVG />
          //         </TouchableOpacity>
          //       </View> */}
          //     </View>
          //   );
          // }}
          renderTime={(props) => {
            return (
              <Time
                {...props}
                timeTextStyle={{
                  right: {
                    color: colors.dark_blue,
                    fontFamily: "HelveticaRegular",
                    fontSize: 9,
                  },
                  left: {
                    color: colors.white,
                    fontFamily: "HelveticaRegular",
                    fontSize: 9,
                  },
                }}
              />
            );
          }}
          renderDay={(props) => {
            return (
              <Day
                {...props}
                textStyle={{
                  color: colors.dark_blue,
                  fontFamily: "HelveticaRegular",
                  fontSize: 12,
                }}
              />
            );
          }}
          renderSend={(props) => {
            return (
              <View style={{ marginLeft: 20 }}>
                <Send {...props}>
                  <View style={styles.icon}>
                    <SendAnswerSVG />
                  </View>
                </Send>
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10425103",
  },
  header: {
    width: SCREEN_WIDTH,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 22,
    marginTop: Platform.OS === "android" ? 12 : 0,
  },
  receiverBox: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
    marginBottom: 30,
    marginLeft: 20,
  },
  right: {
    backgroundColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 18,
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    overflow: "hidden",
    marginRight: 5,
    position: "relative",
    top: -10,
  },
  box: {
    width: SCREEN_WIDTH,
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  icon: {
    backgroundColor: colors.focused,
    width: SCREEN_HEIGHT * 0.042,
    height: SCREEN_HEIGHT * 0.042,
    borderRadius: (SCREEN_HEIGHT * 0.042) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "red",
    backgroundColor: "#F2F5F6",
    // width: SCREEN_WIDTH * 0.9,
    paddingTop: SCREEN_HEIGHT * 0.017,
    paddingBottom: SCREEN_HEIGHT * 0.012,
    borderRadius: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    fontFamily: "HelveticaRegular",
    textAlign: I18nManager.isRTL ? "right" : "left",
    height: SCREEN_HEIGHT * 0.048,
    paddingTop: 5,
    zIndex: -1,
    borderTopColor: "white",
  },
  icon: {
    backgroundColor: colors.focused,
    width: SCREEN_HEIGHT * 0.042,
    height: SCREEN_HEIGHT * 0.042,
    borderRadius: (SCREEN_HEIGHT * 0.042) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
