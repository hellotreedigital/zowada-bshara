import { BlurView } from "expo-blur";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import { filterFundings } from "../../api/Funding/Funding";
export const FundingFilterModal = ({
  isVisible,
  domainId,
  typeId,
  domainData,
  typeData,
  loading,
  setLoading,
  navigation,
  ...props
}) => {
  const [type, setType] = React.useState(null);
  const [domain, setDomain] = React.useState(null);

  const filterHandler = (type, id) => {
    props.close();
    setLoading(true);
    filterFundings(type, id)
      .then((res) => {
        navigation.navigate("FundingSearchScreen", {
          data: res.data.projects.data,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
        props.close();
      });
  };

  return (
    <Modal animationType="slide" isVisible={isVisible} hasBackdrop={true}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => props.close()}
            >
              <CloseSVG stroke={colors.focused} />
            </TouchableOpacity>
            <View>
              <Typography
                content="تصفية بحسب"
                align="center"
                size={20}
                bold
                color={colors.focused}
              />
            </View>
            <View />
          </View>
          <View style={styles.filterWrapper}>
            <View style={{ width: "100%" }}>
              <ModalDropdown
                options={typeData}
                dropdownStyle={styles.dropdownStyles}
                showsVerticalScrollIndicator={false}
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={`نوع`}
                onSelect={(item) => {
                  filterHandler("type", typeId[item]);
                  setType(typeId[item]);
                }}
                renderRowText={(item) => {
                  return (
                    <View>
                      <Typography
                        size={12}
                        content={item}
                        align="right"
                        color={colors.dark_blue}
                      />
                    </View>
                  );
                }}
                isFullWidth
                renderSeparator={() => <View />}
                keyboardShouldPersistTaps="handled"
                renderRightComponent={() => {
                  return <View style={styles.arrowContainer} />;
                }}
                renderRightComponent={() => {
                  return (
                    <View style={styles.arrowContainer}>
                      <ArrowDownSVG />
                    </View>
                  );
                }}
              />
            </View>

            <View style={{ width: "100%" }}>
              <ModalDropdown
                options={domainData}
                dropdownStyle={styles.dropdownStyles}
                showsVerticalScrollIndicator={false}
                style={[styles.containerStyles, { marginBottom: 15 }]}
                textStyle={styles.label}
                defaultValue={`قطاع`}
                onSelect={(item) => {
                  filterHandler("domain", domainId[item]);
                  setDomain(domainId[item]);
                }}
                renderRowText={(item) => {
                  return (
                    <View>
                      <Typography
                        size={12}
                        content={item}
                        align="right"
                        color={colors.dark_blue}
                      />
                    </View>
                  );
                }}
                isFullWidth
                renderSeparator={() => <View />}
                keyboardShouldPersistTaps="handled"
                renderRightComponent={() => {
                  return <View style={styles.arrowContainer} />;
                }}
                renderRightComponent={() => {
                  return (
                    <View style={styles.arrowContainer}>
                      <ArrowDownSVG />
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.022,
    height: SCREEN_HEIGHT * 0.3,
    position: "relative",
    bottom: Platform.OS == "ios" ? -30 : 0,
    marginTop: "auto",
    backgroundColor: "white",
    width: SCREEN_WIDTH,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.46,

    elevation: 9,
  },
  blurContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownStyles: {
    marginTop: 12,
    // borderRadius: 10,
    paddingHorizontal: 12,

    height: 100,
    alignItems: "flex-start",
    padding: 10,
  },
  containerStyles: {
    textAlign: "right",
    paddingVertical: 10,
    // alignItems: "flex-start",
    backgroundColor: "#F2F5F6",
    // width: "auto",
    // borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
  },
  arrowContainer: {
    position: "absolute",
    alignItems: "flex-end",
    right: 10,
  },
  close: {
    paddingVertical: 20,
  },
});
