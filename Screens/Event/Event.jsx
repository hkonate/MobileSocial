import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext } from "react";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Json from "../../assets/Utils/fr.json";
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
      <View>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            overflow: "hidden",
            backgroundColor: "lightgray",
          }}
        >
          <Image />
        </View>
        <View>
          <Text>{event.creator.pseudo}</Text>
          <Text>{Json.event.label_5}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({});
