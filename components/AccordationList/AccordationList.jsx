import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { colors } from "../../globals/colors";
import { SCREEN_WIDTH } from "../../globals/globals";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import Typography from "../Typography/Typography";

const renderSelectionTitle = () => {
  return <></>;
};

const RenderHeader = ({
  section,
  index,
  SECTIONS,
  activeSections,
  animatedValue,
  ...props
}) => {
  let arrLength = SECTIONS.length - 1;

  return (
    <View
      style={[
        styles.content,
        {
          borderTopRightRadius: index == 0 ? 10 : 0,
          borderTopLeftRadius: index == 0 ? 10 : 0,
          borderBottomWidth: index == arrLength ? 1 : 0,
          borderBottomRightRadius:
            index == arrLength && !activeSections.includes(arrLength.toString())
              ? 10
              : 0,
          borderBottomLeftRadius:
            index == arrLength && !activeSections.includes(arrLength.toString())
              ? 10
              : 0,
        },
      ]}
    >
      <Typography align="left" content={section} color={colors.dark_blue} />
      <View style={{ transform: [{ rotateX: 0 }] }}>
        <ArrowDownSVG />
      </View>
    </View>
  );
};
const renderContent = (section) => {
  return (
    <View style={[styles.content, { borderTopWidth: 0 }]}>
      <Typography align="left" content={section} color={colors.dark_blue} />
    </View>
  );
};
export const AccordationList = () => {
  const [activeSections, setActiveSections] = useState([]);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const SECTIONS = [
    {
      id: "0",
      title: "السؤال هنا",
      content: "Lorem ipsum...",
    },
    {
      id: "1",
      title: "السؤال هنا",
      content: "Lorem ipsum...",
    },
    {
      id: "2",
      title: "السؤال هنا",
      content: "Lorem ipsum...",
    },
    {
      id: "3",
      title: "السؤال هنا",
      content: "Lorem ipsum...",
    },
    {
      id: "4",
      title: "السؤال هنا",
      content: "Lorem ipsum...",
    },
  ];

  const updateSections = (value) => {
    setActiveSections(value);
  };

  return (
    <View style={styles.container}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderSectionTitle={() => renderSelectionTitle()}
        renderHeader={({ title }, index) => (
          <RenderHeader
            section={title}
            index={index}
            SECTIONS={SECTIONS}
            activeSections={activeSections}
            animatedValue={animatedValue}
          />
        )}
        renderContent={({ content }) => renderContent(content)}
        onChange={(activeSections) => updateSections(activeSections)}
        keyExtractor={(item) => item.id}
        underlayColor={"white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#E8AF2E",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 24,
  },

  header: {
    // height: 0,
  },
});
