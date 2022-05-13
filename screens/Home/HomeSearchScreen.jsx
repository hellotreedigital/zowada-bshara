import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { FullBox } from "../../components/Boxes/FullBox";
import { ImageBox } from "../../components/Boxes/ImageBox";
import JobBox from "../../components/Boxes/JobBox";
import { ExpertCard } from "../../components/ExpertsCard/ExpertCard";
import { getShopsById } from "../../api/Shop";
import { singleJob } from "../../api/Jobs";
import { getFundingsById } from "../../api/Funding/Funding";

const HomeSearchScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState(false);
  const expertDetailsHandler = (data) => {
    navigation.navigate("expertSingleScreen", {
      data: data,
      search: false,
    });
  };
  const singleShopHandler = (id) => {
    setLoading(true);
    getShopsById(id)
      .then((res) => {
        navigation.navigate("SingleShop", {
          name: res.data.shop.name,
          offers: res.data.offers,
          products: res.data.products,
          image: res.data.shop.formatted_image,
          id: res.data.shop.id,
          deliveryFees: res.data.shop.delivery_fee,
          deliveryDuration: res.data.shop.delivery_duration,
          shopType: res.data.shop.shop_type.title,
          village: res.data.shop.address,
          about: res.data.shop.about,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const singleJobHandler = (id) => {
    console.log(id);
    setLoading(true);
    singleJob(id)
      .then((res) => {
        navigation.navigate("SingleJobScreen", {
          item: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSingleFunding = (id) => {
    setLoading(true);

    getFundingsById(id)
      .then((res) => {
        navigation.navigate("FundingSingleScreen", { data: res.data.project });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getShopType = (item, index) => {
    console.error(item.type);
    switch (item?.type) {
      case "shop":
        return (
          <FullBox
            fullWidth
            item={item}
            myCards={true}
            press={() => singleShopHandler(item.id)}
            // addToFavorites={() => toogleFavoritesHandler(item.id, index)}
          />
        );
      case "course":
        return (
          <ImageBox
            fullWidth
            item={item}
            image={item.formatted_image}
            name={item.title}
          />
        );
      case "job":
        return (
          <JobBox
            fullWidth
            location
            company
            jobName={item.job_name}
            spacing
            item={item}
            onPress={() => singleJobHandler(item.id)}
          />
        );
      case "user":
        return (
          <ExpertCard
            onPress={() => expertDetailsHandler(data)}
            data={item}
            index={index}
          />
        );
      case "crowdfunding":
        return (
          <ImageBox
            fullWidth
            item={item}
            image={item.image_absolute_url}
            name={item.name}
            singleFunding={() => getSingleFunding(item.id)}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index }) => {
          return getShopType(item, index);
        }}
        data={data.results.data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
};

export default HomeSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
