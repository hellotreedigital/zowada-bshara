import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { EventsCard } from "../../components/EventsCard/EventsCard";
import Typography from "../../components/Typography/Typography";
import { colors } from "../../globals/colors";
import { getEvents, getExpertEvents } from "../../api/Events/Events";
const List = ({
  data,
  navigation,
  loading,
  getFeaturedEvents,
  featuredEvents,
  ...props
}) => {
  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={featuredEvents}
        renderItem={({ item, index }) => (
          <EventsCard navigation={navigation} item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getFeaturedEvents}
            tintColor={colors.dark_blue}
          />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  content="there is no featured events"
                  color={colors.dark_blue}
                  size={12}
                  align="center"
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export const TopEvents = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const getFeaturedEvents = () => {
    setLoading(true);

    getEvents("featured", 1)
      .then((res) => {
        setFeaturedEvents(res.data.events.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFeaturedEvents();
  }, []);
  return (
    <View style={styles.container}>
      <List
        loading={loading}
        getFeaturedEvents={() => getFeaturedEvents()}
        featuredEvents={featuredEvents}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // marginBottom: 20,
  },
  list: {
    marginTop: 15,
    backgroundColor: "white",
    flexGrow: 1,
  },
});
