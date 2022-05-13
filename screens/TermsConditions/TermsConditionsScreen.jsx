import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  I18nManager,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { bookNewCase } from "../../api/Booking/Booking";
import { acceptTerms } from "../../api/Profile/Profile";
import AppContext from "../../appContext/AppContext";
import { CenteredModal } from "../../components/Modals/CenterModal/CenteredModal";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import RedArrowSVG from "../../SVGR/Globals/RedArrow";
export const TermsConditionsScreen = ({ navigation, route }) => {
  const { setCanBookForFree, setTermAccepted } = useContext(AppContext);
  const { bookingType, date, time, booknewCaseHandler, data, price, terms } =
    route.params;

  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const systemFonts = [
    ...defaultSystemFonts,
    "HelveticaBold",
    "HelveticaRegular",
    "HelveticaLight",
  ];

  const bookingHandler = () => {
    bookNewCase(data)
      .then((res) => {
        setModalVisible(false);
        if (bookingType === "free") {
          setCanBookForFree(true);
          navigation.navigate("expertScreen");
        } else {
          navigation.navigate("PaymentScreen");
        }
      })
      .catch((err) => {});
  };

  const acceptTermsHandler = () => {
    setModalVisible(true);
    var formdata = new FormData();
    formdata.append("terms", 1);
    setLoader(true);
    acceptTerms(formdata)
      .then((res) => {
        setTermAccepted(1);
        setLoader(false);
        setModalVisible(true);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.loader}>
          <ActivityIndicator
            animating={loader}
            color={colors.dark_blue}
            size="large"
          />
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.spacing}
          >
            <RedArrowSVG
              style={{
                transform: [{ rotateY: I18nManager.isRTL ? "0deg" : "180deg" }],
              }}
            />
          </TouchableOpacity>
          <View>
            <Typography
              content={terms.terms_conditions.title}
              size={20}
              bold={true}
              color={colors.focused}
              align="left"
            />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <RenderHTML
            source={{
              html: terms.terms_conditions.text,
            }}
            contentWidth={SCREEN_WIDTH}
            tagsStyles={{
              p: {
                fontFamily: "HelveticaLight",
                fontSize: SCREEN_HEIGHT * 0.018,
                color: colors.dark_blue,
                textAlign: I18nManager.isRTL ? "left" : "right",
                lineHeight: 24,
                paddingHorizontal: 20,
              },
            }}
            systemFonts={systemFonts}
          />
        </View>
        <View style={styles.wrapper}>
          <Typography
            content=" هذه الأفكار المغلوطةعقلانومن"
            align="left"
            size={16}
            bold={true}
            color={colors.focused}
          />
        </View>
        <View>
          <RenderHTML
            source={{
              html: "<p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام “هنا يوجد محتوى نصي، هنا يوجد محتوى نصي” فتجعلها تبدو (أي الأحرف)</p>",
            }}
            contentWidth={SCREEN_WIDTH}
            tagsStyles={{
              p: {
                fontFamily: "HelveticaLight",
                fontSize: SCREEN_HEIGHT * 0.018,
                color: colors.dark_blue,
                textAlign: I18nManager.isRTL ? "left" : "right",
                lineHeight: 24,
                paddingHorizontal: 20,
              },
            }}
            systemFonts={systemFonts}
          />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              acceptTermsHandler();
            }}
            style={styles.button}
          >
            <Typography
              content="قبول"
              size={16}
              align="center"
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CenteredModal
        list={true}
        visible={modalVisible}
        close={() => setModalVisible(false)}
        submit={() => bookingHandler()}
        bookingType={bookingType}
        date={date}
        time={`${time[0].from}-${time[0].to}`}
        loading={loader}
        addLink={false}
        price={price}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginRight: 10,
  },
  wrapper: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },

  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    marginTop: 30,
    elevation: 5,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
});
