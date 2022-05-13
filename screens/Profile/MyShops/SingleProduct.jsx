import React from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ArrowSVG from "../../../SVGR/Globals/Arrow";
import PenSVG from "../../../SVGR/Globals/Pen";
import numeral from "numeral";
import ExpoCheckbox from "expo-checkbox";
export const SingleProduct = ({ navigation, route }) => {
  const { name, image, desc, price, stock, size, data, id } = route.params;

  const [isOffer, setIsOffer] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header id={id} data={data} title={name} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Image
          style={styles.bgImage}
          source={{
            uri: image,
          }}
        />
        <View style={{ marginHorizontal: 20 }}>
          <AboutProduct stock={stock} size={size} price={price} />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <Typography
            align="left"
            content="حول"
            color={colors.focused}
            size={16}
            bold
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Typography
            size={14}
            align="left"
            color={colors.dark_blue}
            content={desc}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View>
            <ExpoCheckbox
              style={styles.checkbox}
              value={data.is_offer == 1 ? true : false}
              color={colors.dark_blue}
            />
          </View>
          <View>
            <Typography
              content="هذا المنتج هو عرض"
              align="left"
              color={colors.dark_blue}
              size={14}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  iconBtn: {
    height: SCREEN_HEIGHT * 0.037,
    width: SCREEN_HEIGHT * 0.037,
    backgroundColor: "white",
    borderRadius: (SCREEN_HEIGHT * 0.037) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.27,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  aboutCard: {
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 10,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.37,
    height: SCREEN_HEIGHT * 0.085,
    marginHorizontal: 5,
  },
  checkbox: {
    marginVertical: SCREEN_HEIGHT * 0.012,
    marginRight: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.012,
    width: SCREEN_HEIGHT * 0.012,
    borderWidth: 1,
  },
});

function Header({ navigation, title, id, data }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.pop()}
      >
        <ArrowSVG
          style={{
            transform: [
              {
                rotateY: I18nManager.isRTL ? "0deg" : "180deg",
              },
            ],
          }}
          fill={colors.dark_blue}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Typography
            content={title}
            size={20}
            bold
            align="left"
            color={colors.dark_blue}
          />
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddProductForm", {
              editMode: true,
              data: data,
              id: id,
            })
          }
          style={styles.iconBtn}
        >
          <PenSVG />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AboutProduct({ price, size, stock }) {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingVertical: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[styles.aboutCard, { width: SCREEN_WIDTH * 0.23 }]}>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.018,
          }}
        >
          <Typography
            fit={true}
            lines={1}
            content={size["title"]}
            size={26}
            color={colors.focused}
            bold
          />
        </View>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.0365,
          }}
        >
          <Typography content="حجم" color={colors.dark_blue} size={16} bold />
        </View>
      </View>
      <View style={[styles.aboutCard]}>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.018,
          }}
        >
          <Typography
            content={`${numeral(price).format("0,0")} L.L`}
            size={26}
            color={colors.focused}
            bold
            fit={true}
            lines={1}
          />
        </View>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.0365,
          }}
        >
          <Typography content="سعر" color={colors.dark_blue} size={16} bold />
        </View>
      </View>
      <View style={[styles.aboutCard, { width: SCREEN_WIDTH * 0.23 }]}>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.018,
          }}
        >
          <Typography content={stock} size={20} color={colors.focused} bold />
        </View>
        <View
          style={{
            top: -SCREEN_HEIGHT * 0.0365,
          }}
        >
          <Typography content="كمية" color={colors.dark_blue} size={16} bold />
        </View>
      </View>
    </ScrollView>
  );
}
