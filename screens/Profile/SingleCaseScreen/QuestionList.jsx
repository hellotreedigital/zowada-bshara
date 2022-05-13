import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../../components/Header/Header";
import {
  answerQuestion,
  getCasesQuestions,
  getQuestionList,
} from "../../../api/Profile/Profile";
import { getQuestions } from "../../../api/Booking/Booking";
import { colors } from "../../../globals/colors";
import { SCREEN_WIDTH } from "../../../globals/globals";
import Typography from "../../../components/Typography/Typography";

import { AnswerModal } from "../../../components/Modals/AnswerModal";
import AppContext from "../../../appContext/AppContext";

const QuestionBox = ({ item, modalHandler, userData }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        !item.answers[0]?.value && userData?.is_expert == 1
          ? modalHandler(item.value, item.id)
          : null
      }
      style={styles.questionCard}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <>
          <Typography
            color={colors.dark_blue}
            size={14}
            bold={true}
            align="left"
            content={item.value}
          />
        </>
        {!item.answers[0]?.value && userData?.is_expert == 1 && (
          <TouchableOpacity onPress={() => modalHandler(item.value, item.id)}>
            <Typography
              color={`#CFD9DC`}
              size={12}
              bold={true}
              align="right"
              content={`إجابة`}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ top: -5 }}>
        <Typography
          color={Platform.OS == "ios" ? `#CFD9DC` : colors.dark_blue}
          size={14}
          bold={false}
          align="left"
          content={item.answers[0]?.value || "بلا جواب"}
        />
      </View>
    </TouchableOpacity>
  );
};

const List = ({
  loading,
  questions,
  setLoading,
  setQuestions,
  getQuestionsList,
  setModalVisible,
  setTitle,
  setId,
  userData,
}) => {
  const modalHandler = (title, id) => {
    setTitle(title);
    setId(id);
    if (userData?.is_expert == 1) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.list}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <QuestionBox
            userData={userData}
            item={item}
            modalHandler={(title, id) => modalHandler(title, id)}
          />
        )}
        data={questions}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getQuestionsList}
            tintColor={colors.dark_blue}
          />
        }
        refreshing={loading}
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  color={colors.dark_blue}
                  content="You have no questions"
                  size={12}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export const QuestionList = ({ navigation, route }) => {
  const { caseID } = route.params;
  const { userData } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const [answerLoader, setAnswerLoader] = useState(false);
  const [asnwerString, setAnswerString] = useState("");
  const [id, setId] = useState(null);
  const getQuestionsList = () => {
    setLoading(true);
    getCasesQuestions(caseID)
      .then((res) => {
        setQuestions(res.data.questions);
      })
      .catch((err) => {})
      .finally(() => {
        setAnswerString("");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (modalVisible === true) return;
    getQuestionsList();
  }, [modalVisible]);

  const answerQuestionHandler = () => {
    let fd = new FormData();

    fd.append("question_id", id);
    fd.append("value", asnwerString);

    setAnswerLoader(true);
    answerQuestion(fd)
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setAnswerLoader(false);
        setModalVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="أسئلة" navigation={navigation} />

      <AnswerModal
        userData={userData}
        visible={modalVisible}
        loading={answerLoader}
        close={() => setModalVisible(false)}
        title={title}
        asnwerString={asnwerString}
        setAnswerString={setAnswerString}
        submit={() => answerQuestionHandler()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    backgroundColor: "white",
    minHeight: 71,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 7,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 11,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flexGrow: 1,
  },
});
