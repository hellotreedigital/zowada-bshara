import React, { useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import AppContext from "../../appContext/AppContext";
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
  animatedValue,
  activeSections,

  ...props
}) => {
  let arr = [];
  arr.push(section);
  let arrLength = SECTIONS.length - 1;

  return (
    <View
      style={[
        styles.content,
        {
          borderTopRightRadius: index == 0 ? 10 : 0,
          borderTopLeftRadius: index == 0 ? 10 : 0,
          borderBottomWidth: index === SECTIONS.length ? 1 : 1,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 1,
          height: "auto",
          minHeight: 50,
        },
      ]}
    >
      <View style={{ width: "100%" }}>
        <Typography align="left" content={section} color={colors.dark_blue} />
      </View>
      <View style={{ left: -10 }}>
        <ArrowDownSVG />
      </View>
    </View>
  );
};
const renderContent = (section, index) => {
  return (
    <View
      style={[
        styles.content,
        {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          minHeight: 50,
          height: "auto",
        },
      ]}
    >
      <View style={{ height: "auto" }}>
        <Typography align="left" content={section} color={colors.dark_blue} />
      </View>
    </View>
  );
};
export const AccordationList = ({ data }) => {
  const { faq } = useContext(AppContext);
  const [activeSections, setActiveSections] = useState([]);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const updateSections = (value) => {
    setActiveSections(value);
  };

  return (
    <View style={styles.container}>
      <Accordion
        renderAsFlatList
        sections={data ? data : faq}
        activeSections={activeSections}
        renderSectionTitle={() => renderSelectionTitle()}
        renderHeader={({ question, ...props }, index) => {
          return (
            <RenderHeader
              section={question}
              index={index}
              SECTIONS={faq}
              activeSections={activeSections}
              animatedValue={animatedValue}
            />
          );
        }}
        renderContent={({ answer }, index) => renderContent(answer, index)}
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
