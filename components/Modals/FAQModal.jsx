import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import Typography from "../Typography/Typography";
import { globalStyles } from "../../globals/globaStyles";

const FAQModal = ({ visible, FAQ, ...props }) => {
  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.center}>
          <>
            <View style={{ height: SCREEN_HEIGHT * 0.17 }}>
              <TouchableOpacity
                onPress={() => props.close()}
                style={styles.modalHeader}
              >
                <CloseSVG stroke={colors.blue} />
              </TouchableOpacity>
              <View style={styles.message}>
                <Typography
                  content={"أسئلة مكررة"}
                  color={colors.blue}
                  align="center"
                  bold={true}
                  size={20}
                />
              </View>
            </View>
          </>
          <View>
            {FAQ.map((item, index) => (
              <FAQItem
                key={item.id}
                content={item}
                isFirst={index === 0}
                isLast={index === FAQ.length - 1}
                ind={index}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FAQModal;

const FAQItem = ({ content, isFirst, isLast, ind }) => {
  let [modalVisible, setModalVisible] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false);

  function showFAQAnswer() {
    setShowAnswer((prev) => !prev);
  }

  return (
    <TouchableOpacity
      style={[
        styles.faqItemContainer,
        isFirst && styles.firstItemBorder,
        isLast && styles.lastItemBorder
      ]}
      onPress={() => {
        showFAQAnswer();
      }}
    >
        <View style={[styles.rows]}>
          <View style={[styles.columns, styles.column1]}>
            <Text style={[globalStyles.textBlue, globalStyles.leftText]}>
              {content.question}
            </Text>
          </View>

          <View style={[globalStyles.icon, styles.columns, styles.column2]}>
            <ArrowDownSVG
              style={{
                transform: [{ rotateX: showAnswer ? "180deg" : '0deg' }],
              }}
              fill={colors.blue}
            />
          </View>
        </View>
        {showAnswer && (
          <View style={[styles.rows]}>
            <View>
              <Text style={[globalStyles.textDarkBlue, globalStyles.leftText]}>
                {content.answer}
              </Text>
            </View>
          </View>
        )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  center: {
    minHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    shadowColor: "#00000030",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 20,
  },
  message: {
    height: "100%",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.019,
  },
  title: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT * 0.0015,
  },
  btn: {
    marginTop: SCREEN_HEIGHT * 0.037,

    alignItems: "center",
  },
  /** Course Syllabus */

  syllabusContainer: {
    width: "100%",
  },
  faqItemContainer: {
    display: "flex",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderColor: colors.dark_blue,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  firstItemBorder: {
    borderTopWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItemBorder: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rows: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  columns: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 0,
    marginHorizontal: 5,
  },
  column1: {
    width:'85%'
  },
  column2: {
    width:'15%'
  },
  imagee: {
    width: "57%",
    height: "57%",
  },
  verticalPadding5: {
    paddingVertical: 5,
  },
});
