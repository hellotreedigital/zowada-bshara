import React, { useState, useContext } from "react";
import {
  FlatList,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import { SearchBox } from "../../../components/SearchBox/SearchBox";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import RedArrowSVG from "../../../SVGR/Globals/RedArrow";
import SendAnswerSVG from "../../../SVGR/Globals/SendAnswer";
import { answerQuestion } from "../../../api/Profile/Profile";
import AppContext from "../../../appContext/AppContext";
import { useEffect } from "react";
export const RenderItem = ({
  item,
  answerValue,
  answers,
  questionTitle,
  answerTitle,
}) => {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.title}>
          <Typography
            content={questionTitle}
            align="left"
            color={colors.dark_yellow}
            bold={true}
            size={14}
          />
        </View>
        <View style={styles.about}>
          <Typography size={12} content={item.subject} align="left" />
        </View>
      </View>
      {answerValue && (
        <>
          <View style={styles.card}>
            <View style={styles.title}>
              <Typography
                content={answerTitle}
                align="left"
                color={colors.focused}
                bold={true}
                size={14}
              />
            </View>
            <View style={styles.about}>
              <Typography size={12} content={answerValue} align="left" />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export const SingleQuestionScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const { userId, isExpert, fixedTitles, userData } = useContext(AppContext);
  const [renderData, setRenderData] = useState([data]);
  const [searchString, setSearchString] = useState("");
  const [answers, setAnswers] = useState(data.answers.length);
  const [answerValue, setAnswerValue] = useState();

  useEffect(() => {
    setAnswerValue(data?.answers[0]?.value);
  }, []);

  const answerQuestionHandler = () => {
    let formdata = new FormData();
    formdata.append("question_id", data.id);
    formdata.append("value", searchString);
    setAnswerValue(searchString);
    answerQuestion(formdata)
      .then((res) => {
        setSearchString("");
        setAnswers(1);
      })
      .catch((err) => {});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RedArrowSVG
            style={{
              transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View>
          <ImageBackground
            style={styles.image}
            source={{
              uri:
                data?.expert?.image_absolute_url ||
                data?.user?.image_absolute_url,
            }}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          {/* <View style={{ top: SCREEN_HEIGHT * 0.009 }}>
            <Typography
              content="اسم الحالة"
              color={colors.dark_blue}
              size={16}
              align="left"
              bold={true}
            />
          </View> */}
          <View style={{ top: -SCREEN_HEIGHT * 0.005 }}>
            <Typography
              content={data?.expert?.full_name || data?.user?.full_name}
              size={12}
              align="left"
              color={colors.dark_blue}
            />
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={renderData}
          renderItem={({ item }) => {
            return (
              <RenderItem
                answerValue={answerValue}
                questionTitle={fixedTitles.profileTitles["question"].title}
                answerTitle={fixedTitles.profileTitles["answer"].title}
                answers={answers}
                item={item}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      {userData?.is_expert == 1 && data.answers.length === 0 && !answerValue && (
        <>
          <KeyboardAvoidingView
            keyboardVerticalOffset={40}
            alwaysVisible
            hideBorder
            behavior={"padding"}
          >
            <View>
              <View style={styles.box}>
                <View>
                  <SearchBox
                    placeholder="أجب عن السؤال هنا"
                    width={SCREEN_WIDTH * 0.8}
                    searchString={searchString}
                    setSearchString={setSearchString}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => answerQuestionHandler()}
                  style={styles.icon}
                >
                  <SendAnswerSVG />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
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
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: SCREEN_HEIGHT * 0.045,
    height: SCREEN_HEIGHT * 0.045,
    borderRadius: (SCREEN_HEIGHT * 0.045) / 2,
    overflow: "hidden",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT * 0.015,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6.68,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    elevation: 1,
  },
  list: {
    width: SCREEN_WIDTH,
    alignSelf: "center",
    flexGrow: 0.95,
  },
  about: {
    paddingBottom: 10,
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
});
