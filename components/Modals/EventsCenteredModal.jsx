import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import Modal from "react-native-modal";
import { colors } from "../../globals/colors";
import CloseSVG from "../../SVGR/Globals/CloseSVG";
import Typography from "../Typography/Typography";
import { SearchBox } from "../SearchBox/SearchBox";
import AppContext from "../../appContext/AppContext";
const EventsCenteredModal = ({
  visible,
  loading,
  setFinished,
  message,
  name,
  setName,
  about,
  setAbout,
  email,
  setEmail,
  nameError,
  fixedTitles,
  ...props
}) => {
  const { userData } = useContext(AppContext);

  useEffect(() => {
    setEmail && setEmail(userData?.email);
  }, []);

  return (
    <Modal
      onBackdropPress={() => props.close()}
      hasBackdrop={true}
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={colors.dark_yellow}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={25}
        >
          <View style={styles.center}>
            <TouchableOpacity onPress={() => props.close()}>
              <CloseSVG stroke={colors.focused} />
            </TouchableOpacity>
            {!props.finished && (
              <View style={styles.title}>
                <Typography
                  content={fixedTitles.events["book"].title}
                  color={colors.focused}
                  size={20}
                  bold={true}
                  align="center"
                />
              </View>
            )}

            {!props.finished ? (
              <>
                <View style={styles.box}>
                  <>
                    <SearchBox
                      width={SCREEN_WIDTH * 0.8}
                      placeholder={fixedTitles.events["full-name"].title}
                      searchString={name}
                      setSearchString={setName}
                    />
                    {nameError && (
                      <View>
                        <Typography
                          content={nameError}
                          color="red"
                          size={12}
                          align="left"
                        />
                      </View>
                    )}
                  </>
                </View>
                <View style={styles.box}>
                  <SearchBox
                    width={SCREEN_WIDTH * 0.8}
                    placeholder={
                      userData?.email ||
                      fixedTitles.events["email-address"].title
                    }
                    setSearchString={email}
                    setSearchString={setEmail}
                  />
                </View>
                <View style={styles.box}>
                  <SearchBox
                    width={SCREEN_WIDTH * 0.8}
                    multiline={true}
                    height={SCREEN_HEIGHT * 0.21}
                    placeholder={fixedTitles.events["message"].title}
                    searchString={about}
                    setSearchString={setAbout}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => props.submit()}
                    style={styles.button}
                  >
                    <Typography
                      content={fixedTitles.events["send"].title}
                      color={colors.white}
                      align="center"
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View>
                <Typography
                  content={
                    message || fixedTitles.events["success-booking"].title
                  }
                  color={colors.focused}
                  align="center"
                  size={20}
                  bold={true}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EventsCenteredModal;

const styles = StyleSheet.create({
  center: {
    height: "auto",
    minHeight: 137,
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  box: {
    marginBottom: 15,
  },
  button: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    marginVertical: 15,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
  },
});
