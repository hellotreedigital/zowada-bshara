import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { EventsCard } from "../../components/EventsCard/EventsCard";
import { colors } from "../../globals/colors";
import Typography from "../../components/Typography/Typography";
import { getEvents, getExpertEvents } from "../../api/Events/Events";

const List = ({
  data,
  navigation,
  loading,
  upcomingEvents,
  getUpcomingEvents,
  ...props
}) => {
  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={upcomingEvents}
        renderItem={({ item, index }) => (
          <EventsCard navigation={navigation} item={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getUpcomingEvents}
            tintColor={colors.dark_blue}
          />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  content="there is no upcoming events"
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

export const UpcomingEvents = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const getUpcomingEvents = () => {
    setLoading(true);

    getEvents("future", 1)
      .then((res) => {
        setUpcomingEvents(res.data.events.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUpcomingEvents();
  }, []);
  return (
    <View style={styles.container}>
      <List
        loading={loading}
        upcomingEvents={upcomingEvents}
        getUpcomingEvents={() => getUpcomingEvents()}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    backgroundColor: "white",
    flexGrow: 1,
  },
});
