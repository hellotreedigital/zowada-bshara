import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { CenteredModal } from "../../../components/Modals/CenterModal/CenteredModal";
import { RatingModal } from "../../../components/Modals/RatingModal";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import PenSVG from "../../../SVGR/Globals/Pen";

const SingleCaseScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [newCaseModal, setNewCaseModal] = useState(false);
  const ratingHandler = () => {
    setModalVisible(true);
  };

  const newCasesHandler = () => {
    setNewCaseModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={styles.spacing}
            >
              <ArrowSVG fill={colors.dark_yellow} />
            </TouchableOpacity>
            <View>
              <Typography
                content={data.caseName}
                size={20}
                bold={true}
                color={colors.dark_yellow}
                align="left"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.icon}>
            <PenSVG />
          </TouchableOpacity>
        </View>
        <View style={styles.approval}>
          <Typography
            color={"#CFD9DC"}
            content="وافق"
            size={14}
            roman={true}
            align="left"
          />
        </View>
        <View>
          <View style={styles.card}>
            <View>
              <Typography
                content="موضوع الاستفسار"
                align="left"
                bold={true}
                color={"#E8AF2E"}
                size={14}
              />
            </View>
            <View>
              <Typography
                size={14}
                color={colors.dark_blue}
                roman={true}
                align="left"
                content="لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن ايوجد"
              />
            </View>
          </View>
          <View>
            <View style={[styles.card, styles.secondCard]}>
              <View
                style={[
                  styles.row,
                  { alignItems: "flex-start", marginBottom: 10 },
                ]}
              >
                <View style={{ marginRight: 8 }}>
                  <ImageBackground
                    style={styles.image}
                    source={{ uri: "https://picsum.photos/200" }}
                  />
                </View>
                <View>
                  <View>
                    <Typography
                      content="اسم الخبير"
                      color={colors.dark_blue}
                      size={16}
                      bold={true}
                      align="left"
                    />
                  </View>
                  <View style={{ top: -12 }}>
                    <Typography
                      content="مجال خبرة الخبير"
                      color={colors.dark_blue}
                      size={14}
                      bold={false}
                      align="left"
                    />
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.button}>
                  <Typography
                    content="محادثة"
                    color={colors.white}
                    size={14}
                    align="center"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.card}>
              <View>
                <Typography
                  content="موضوع الاستفسار"
                  align="left"
                  bold={true}
                  color={"#E8AF2E"}
                  size={14}
                />
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Typography
                  size={29}
                  color={colors.dark_blue}
                  bold={true}
                  align="left"
                  content="100 000 LBP"
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View>
              <Typography
                content="تفاصيل الاجتماع"
                align="left"
                bold={true}
                color={"#E8AF2E"}
                size={14}
              />
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="تاريخ"
                  color={"#E8AF2E"}
                  size={14}
                  bold={true}
                />
              </View>
              <View>
                <Typography />
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="زمن"
                  color={"#E8AF2E"}
                  size={14}
                  bold={true}
                />
              </View>
              <View>
                <Typography />
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="نوع"
                  color={"#E8AF2E"}
                  size={14}
                  bold={true}
                />
              </View>
              <View>
                <Typography />
              </View>
            </View>
          </View>
          <View style={[styles.card, styles.autoCard]}>
            <View>
              <Typography
                content="أسئلة"
                align="left"
                bold={true}
                color={"#E8AF2E"}
                size={14}
              />
            </View>
            <View style={styles.questionaire}>
              <View>
                <Typography
                  content="عنوان السؤال يذهب هنا"
                  color={colors.dark_blue}
                  align="left"
                  bold={true}
                  size={!4}
                />
              </View>
              <View style={{ top: -5 }}>
                <Typography
                  content="بلا جواب"
                  color="#CFD9DC"
                  roman={true}
                  size={12}
                  align="left"
                />
              </View>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <View>
              <TouchableOpacity
                onPress={() => ratingHandler()}
                style={[styles.button, { backgroundColor: colors.dark_blue }]}
              >
                <Typography
                  content="أضف تقييم"
                  color={colors.white}
                  size={16}
                  align="center"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => newCasesHandler()}
                style={[styles.button, { marginVertical: 15 }]}
              >
                <Typography
                  content="طلب الفتح مرة أخرى"
                  color={colors.white}
                  size={16}
                  align="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <RatingModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
      />
      <CenteredModal
        newCase={true}
        visible={newCaseModal}
        close={() => setNewCaseModal(false)}
      />
    </SafeAreaView>
  );
};

export default SingleCaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  spacing: {
    marginRight: 12,
    paddingBottom: 6,
  },
  header: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 2.65,

    elevation: 5,
  },
  approval: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    top: -15,
    marginLeft: 15,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.white,
    minHeight: SCREEN_HEIGHT * 0.0856,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 3.5,

    elevation: 10,
  },
  image: {
    height: SCREEN_HEIGHT * 0.078,
    width: SCREEN_HEIGHT * 0.078,
    borderRadius: (SCREEN_HEIGHT * 0.078) / 2,
    overflow: "hidden",
  },
  secondCard: {
    padding: 15,
  },
  button: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8AF2E",
    borderRadius: 10,
    shadowColor: "#00000070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,

    elevation: 5,
  },
  questionaire: {
    backgroundColor: "#F2F5F6",
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
    padding: 7,
  },
  autoCard: {
    height: "auto",
    paddingBottom: 17,
  },
  btnWrapper: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.048,
  },
});
