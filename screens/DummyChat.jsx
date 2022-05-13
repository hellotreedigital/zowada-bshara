// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { useEffect } from "react";
// import pusherConfig from "../pusher.json";
// import pusher from "../pusher";

// export const DummyChat = () => {
//   const [messages, setMessages] = React.useState([]);
//   useEffect(() => {
//     //sum -> user id(the one u speaking to)

//     const chatChannel = pusher.subscribe(`chat.${Number(332 + 351)}.${332}`);
//     chatChannel.bind("SendChat", function (data) {
//
//       setMessages([...messages, data.message]);
//     });
//   }, []);

//   function handleMessage(message) {
//     // newMessages.push(message);
//     setMessages(message);
//   }

//   const sendChat = () => {
//     var formdata = new FormData();
//     formdata.append("message");
//   };

//   return (
//     <SafeAreaView
//       style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
//     >
//       {messages?.map((data) => {
//         return <Text key={data}>{data}</Text>;
//       })}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({});
