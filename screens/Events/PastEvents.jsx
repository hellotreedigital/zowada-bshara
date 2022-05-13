import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { EventsCard } from "../../components/EventsCard/EventsCard";
import { colors } from "../../globals/colors";
import { getEvents, getExpertEvents } from "../../api/Events/Events";
import Typography from "../../components/Typography/Typography";

const List = ({
  data,
  navigation,
  pastEvents,
  loading,
  getPastEventsHandler,
  ...props
}) => {
  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pastEvents}
        renderItem={({ item, index }) => (
          <EventsCard navigation={navigation} item={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getPastEventsHandler}
            tintColor={colors.dark_blue}
          />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              {!loading && (
                <Typography
                  content="there is no past events"
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

export const PastEvents = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);
  const getPastEventsHandler = () => {
    setLoading(true);

    getEvents("past", 1)
      .then((res) => {
        setPastEvents(res.data.events.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPastEventsHandler();
  }, []);

  return (
    <View style={styles.container}>
      <List
        getPastEventsHandler={() => getPastEventsHandler()}
        loading={loading}
        pastEvents={pastEvents}
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
    marginTop: 15,

    backgroundColor: "white",
    flexGrow: 1,
  },
});
