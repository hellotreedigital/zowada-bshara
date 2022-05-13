import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { Header } from "../../components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../SVGR/Globals/ArrowDown";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { caseActions } from "../../api/Clients/Clients";
import AppContext from "../../appContext/AppContext";
import { useEffect } from "react";

const RadioButtonWithLabel = ({
  checked,
  setChecked,
  setExpertValue,
  expertValue,
  rejectReason,
  setRejectReason,
  rejectCaseHandler,
  fixedTitles,
  expertsArr,
  expertId,
  setExpertIndex,
}) => {
  var radio_props = [
    {
      label: fixedTitles.rejections[0].title,
      value: 1,
    },
    {
      label: fixedTitles.rejections[1].title,
      value: 2,
    },
    {
      label: fixedTitles.rejections[2].title,
      value: 3,
    },
    {
      label: fixedTitles.rejections[3].title,
      value: 4,
    },
  ];
  let experts = ["tony", "ibra"];
  return (
    <View style={styles.row}>
      <RadioForm formHorizontal={false} animation={true}>
        <RadioButton style={{ marginVertical: 10 }} labelHorizontal={true}>
          <>
            <RadioButtonInput
              obj={radio_props}
              index={0}
              isSelected={checked === 1}
              onPress={(value) => setChecked(1)}
              borderWidth={1}
              buttonInnerColor={colors.dark_blue}
              // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
              buttonSize={12}
              buttonOuterSize={11}
              buttonStyle={styles.radio}
              buttonWrapStyle={{ marginLeft: 10 }}
            />

            <RadioButtonLabel
              onPress={() => {
                setChecked(1);
              }}
              obj={radio_props[0]}
              index={0}
              labelHorizontal={true}
              labelStyle={styles.label}
              labelWrapStyle={{}}
            />
          </>
          <View></View>
        </RadioButton>
        {checked == 1 && (
          <View>
            <ModalDropdown
              options={expertsArr}
              dropdownStyle={styles.dropdownStyles}
              showsVerticalScrollIndicator={false}
              style={[styles.containerStyles, { marginBottom: 15 }]}
              textStyle={styles.label}
              defaultValue={"اسم الخبير"}
              onSelect={(item) => {
                setExpertIndex(item);
                setExpertValue(item);
              }}
              renderRowText={(item) => {
                return (
                  <View>
                    <Typography
                      size={12}
                      content={item}
                      align="right"
                      color={colors.dark_blue}
                      fit={true}
                      lines={1}
                    />
                  </View>
                );
              }}
              isFullWidth={false}
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
        )}
        <RadioButton style={{ marginVertical: 10 }} labelHorizontal={true}>
          <>
            <RadioButtonInput
              obj={radio_props}
              index={0}
              isSelected={checked === 2}
              onPress={(value) => setChecked(2)}
              borderWidth={1}
              buttonInnerColor={colors.dark_blue}
              // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
              buttonSize={12}
              buttonOuterSize={11}
              buttonStyle={styles.radio}
              buttonWrapStyle={{ marginLeft: 10 }}
              expertsArr={expertsArr}
            />

            <RadioButtonLabel
              obj={radio_props[1]}
              index={0}
              labelHorizontal={true}
              onPress={(value) => {
                setChecked(2);
              }}
              labelStyle={styles.label}
              labelWrapStyle={{}}
            />
          </>
          <View></View>
        </RadioButton>

        <RadioButton style={{ marginVertical: 10 }} labelHorizontal={true}>
          <>
            <RadioButtonInput
              obj={radio_props}
              index={0}
              isSelected={checked === 3}
              onPress={(value) => setChecked(3)}
              borderWidth={1}
              buttonInnerColor={colors.dark_blue}
              // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
              buttonSize={12}
              buttonOuterSize={11}
              buttonStyle={styles.radio}
              buttonWrapStyle={{ marginLeft: 10 }}
            />

            <RadioButtonLabel
              obj={radio_props[2]}
              index={0}
              labelHorizontal={true}
              onPress={(value) => {
                setChecked(3);
              }}
              labelStyle={styles.label}
              labelWrapStyle={{}}
            />
          </>
          <View></View>
        </RadioButton>
        <RadioButton style={{ marginVertical: 10 }} labelHorizontal={true}>
          <>
            <RadioButtonInput
              obj={radio_props}
              index={0}
              isSelected={checked === 4}
              onPress={(value) => setChecked(4)}
              borderWidth={1}
              buttonInnerColor={colors.dark_blue}
              // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
              buttonSize={12}
              buttonOuterSize={11}
              buttonStyle={styles.radio}
              buttonWrapStyle={{ marginLeft: 10 }}
            />

            <RadioButtonLabel
              obj={radio_props[3]}
              index={0}
              labelHorizontal={true}
              onPress={(value) => {
                setChecked(4);
              }}
              labelStyle={styles.label}
              labelWrapStyle={{}}
            />
          </>
        </RadioButton>
        {checked == 4 && (
          <View style={styles.searchBox}>
            <SearchBox
              searchString={rejectReason}
              setSearchString={setRejectReason}
              placeholder="أدخل السبب"
            />
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <SecondaryButton
            onPress={() => {
              rejectCaseHandler();
            }}
            content="إرسل"
          />
        </View>
      </RadioForm>
    </View>
  );
};

export const RejectCaseScreen = ({ navigation, route }) => {
  const { fixedTitles, experts } = useContext(AppContext);

  let expertsArr = [];
  const [expertId, setExpertId] = React.useState(null);
  const [expertIndex, setExpertIndex] = React.useState(null);
  useEffect(() => {
    //
    setExpertId(experts[expertIndex]?.id);
    experts.map((data) => {
      expertsArr.push(data.full_name);
    });
  }, [expertsArr, expertIndex]);
  const [checked, setChecked] = React.useState(null);
  const [expertValue, setExpertValue] = React.useState(null);
  const [rejectReason, setRejectReason] = React.useState("");
  const { id, type, notification } = route.params;
  const [loading, setLoading] = React.useState(false);
  const rejectCaseHandler = (id, type) => {
    let formdata = new FormData();
    formdata.append("rejection_reason_id", checked);
    if (checked == 1) {
      formdata.append("expert_id", expertId);
    }
    if (rejectReason !== "") {
      formdata.append("rejection_reason", rejectReason);
    }
    setLoading(true);

    caseActions(formdata, id, type)
      .then((res) => {
        if (notification) {
          navigation.navigate("clientScreen");
        } else {
          navigation.pop();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          animating={loading}
          color={colors.dark_blue}
        />
      </View>
      <Header navigation={navigation} title="رفض القضية" />
      <RadioButtonWithLabel
        fixedTitles={fixedTitles}
        setRejectReason={setRejectReason}
        rejectReason={rejectReason}
        setExpertValue={setExpertValue}
        expertValue={expertValue}
        checked={checked}
        setChecked={setChecked}
        rejectCaseHandler={() => rejectCaseHandler(id, type)}
        expertsArr={expertsArr}
        expertId={expertId}
        setExpertIndex={setExpertIndex}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  radio: {
    borderColor: colors.dark_blue,
    marginRight: Platform.OS == "android" ? 12 : 0,
  },
  label: {
    fontFamily: "HelveticaLight",
    color: colors.dark_blue,
    fontSize: 16,
    lineHeight: 19,
  },
  containerStyles: {
    backgroundColor: "#F2F5F6",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: 163,
  },
  arrowContainer: {
    position: "absolute",
    right: 0,
  },
  dropdownStyles: {
    paddingTop: 15,
    paddingHorizontal: 10,
    position: "absolute",
    left: 10,
    marginTop: 15,
    borderRadius: 10,
    height: "auto",
    alignItems: "flex-start",
    height: 150,
  },
  searchBox: {
    marginTop: 20,
  },
  buttonWrapper: {
    width: SCREEN_WIDTH - 20,
    alignItems: "center",
    marginTop: 30,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    zIndex: 10,
    elevation: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});
