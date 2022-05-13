import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import Typography from "../../../components/Typography/Typography";
import { colors } from "../../../globals/colors";
import numeral from "numeral";
export const SingleOrder = ({ navigation, route }) => {
  const { data } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} blue title={`طلب #${data?.order?.id} `} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <Typography
            content={data?.order?.name}
            color={colors.focused}
            align="left"
            size={16}
            bold
          />
          <View style={styles.subtitle}>
            <Typography
              content="منتجات"
              size={16}
              align="left"
              color={colors.dark_blue}
              bold
            />
          </View>
          <View>
            {/* flatlist */}
            <FlatList
              data={data.order.items}
              renderItem={({ item }) => <ProductsBox item={item} />}
            />
          </View>
          <View style={styles.priceBox}>
            <View style={{ marginVertical: 10 }}>
              <Typography
                content="دفع"
                align="left"
                color={colors.dark_blue}
                size={16}
                bold
              />
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="مجموع المنتجات"
                  align="left"
                  size={14}
                  color={colors.dark_blue}
                />
              </View>
              <View>
                <Typography
                  content={`${numeral(
                    data?.order?.total_without_delivery
                  ).format("0,0")} L.L`}
                  align="left"
                  size={14}
                  color={colors.focused}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="الشحن"
                  align="left"
                  size={14}
                  color={colors.dark_blue}
                />
              </View>
              <View>
                <Typography
                  content={`${numeral(data?.order?.delivery_fee).format(
                    "0,0"
                  )} L.L`}
                  align="left"
                  size={14}
                  color={colors.focused}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Typography
                  content="مجموع"
                  align="left"
                  size={14}
                  color={colors.dark_blue}
                  bold
                />
              </View>
              <View>
                <Typography
                  content={`${numeral(data?.order?.total).format("0,0")} L.L`}
                  align="left"
                  size={14}
                  color={colors.focused}
                  bold
                />
              </View>
            </View>
          </View>
          <View>
            <View style={{ marginVertical: 10 }}>
              <Typography
                content="معلومات العميل"
                align="left"
                size={16}
                bold
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={`الاسم :${data?.order?.name} `}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={`الهاتف: ${data?.order?.phone}`}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={`المحافظة : ${data?.order?.governate?.title}`}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={`القضاء: ${data?.order?.district?.slug}`}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={data?.order?.address}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
            <View>
              <Typography
                content={data?.order?.note}
                align="left"
                size={14}
                color={colors.dark_blue}
              />
            </View>
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
  wrapper: {
    marginHorizontal: 20,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 15,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 0,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceBox: {
    paddingBottom: 20,
    borderBottomColor: "#CFD9DC",
    borderBottomWidth: 1,
  },
});

function ProductsBox({ item }) {
  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.product?.formatted_image }}
          style={{ width: 54, height: 54, borderRadius: 10, marginRight: 10 }}
        />
        <Typography
          content={item?.product?.name}
          align="left"
          size={14}
          color={colors.dark_blue}
        />
        <View
          style={{
            marginLeft: 6,
          }}
        >
          <Typography
            content={`(${item?.quantity})`}
            color={"#CFD9DC"}
            size={14}
            align="left"
          />
        </View>
      </View>
      <View>
        <Typography
          content={`${numeral(item?.total_price).format("0,0 ")} L.L `}
          color={colors.focused}
          size={14}
          bold
          align="right"
        />
      </View>
    </View>
  );
}
