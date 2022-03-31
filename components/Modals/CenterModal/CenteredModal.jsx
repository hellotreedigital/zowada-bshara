import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import CloseSVG from "../../../SVGR/Globals/CloseSVG";
import Typography from "../../Typography/Typography";

export const CenteredModal = ({ visible, list, newCase, ...props }) => {
  const data = [
    {
      id: "0",
      title: "تاريخ",
    },
    {
      id: "1",
      title: "زمن",
    },
    {
      id: "3",
      title: "مبلغ",
    },
  ];

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
        <View
          style={[
            styles.center,
            { justifyContent: "center" },
            newCase && { height: SCREEN_HEIGHT * 0.29 },
          ]}
        >
          <TouchableOpacity
            style={!list && { top: -10 }}
            onPress={() => props.close()}
          >
            <CloseSVG />
          </TouchableOpacity>
          <View style={!list && !newCase && { top: -5 }}>
            {!newCase ? (
              <Typography
                content={list ? "تفاصيل الحجز" : "تم تحديد موعد اجتماعك بنجاح"}
                color={colors.dark_yellow}
                size={20}
                bold={true}
                align="center"
              />
            ) : (
              <Typography
                content="طلب الفتح مرة أخرى"
                color={colors.dark_blue}
                size={16}
                bold={false}
                align="center"
              />
            )}
          </View>
          {newCase && (
            <View style={styles.btnWrapper}>
              <View style={{ marginBottom: 15 }}>
                <SecondaryButton content="حجز مدفوع" size={16} />
              </View>
              <View>
                <PrimaryButton content="استشارة مجانية" size={16} />
              </View>
            </View>
          )}

          {list && (
            <View>
              {data.map((data, index) => {
                return (
                  <View key={index.toString()}>
                    <View>
                      <Typography
                        content={data.title}
                        color={colors.dark_yellow}
                        size={14}
                        bold={true}
                        align="left"
                      />
                    </View>
                    <View></View>
                  </View>
                );
              })}
            </View>
          )}
          {list && (
            <View style={styles.btn}>
              <SecondaryButton
                onPress={() => props.submit()}
                content="تأكيد الحجز"
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    height: 137,
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
  btnWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
});
