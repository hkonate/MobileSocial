import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { RequestContext } from "../../Context/RequestContext/RequestContext";

const Event = ({ route }) => {
  const { events } = useContext(RequestContext);
  const event = route.params;
  const similarEvents = events.filter((eventTofilter) => {
    if (event.id !== eventTofilter.id) {
      if (event.inclusive.length > 0) {
        return eventTofilter.inclusive.length > 0;
      } else {
        return eventTofilter.inclusive.length === 0;
      }
    }
  });
  const date = new Date(event.schedule).toString().split("(").pop();
  return (
    <ScrollView>
      <Text>{event.title}</Text>
      <Text>{event.listOfAttendees.length}</Text>
      <View>
        <View></View>
        <Text>{date}</Text>
      </View>
      <View>
        <View></View>
        <Text>{event.address}</Text>
      </View>
      <Text>Event</Text>
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({});
