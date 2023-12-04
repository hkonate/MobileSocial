import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useContext } from "react";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Json from "../../assets/Utils/fr.json";
const Event = ({ route, navigation }) => {
  const { events, user } = useContext(RequestContext);
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
      <View>
        <Text>{event.listOfAttendees.length}</Text>
        <Button
          title={
            event.listOfAttendees.includes(user.id)
              ? Json.event.label_9
              : Json.event.label_8
          }
          onPress={(e) => {
            console.log(e.currentTarget.title);
          }}
        />
      </View>
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
        <Text>{Json.event.label_6}</Text>
        <Text> {event.description} </Text>
        <Text> {Json.event.label_3} </Text>
        <View></View>
        <Text>{Json.event.label_4}</Text>
        <View></View>
        <Text>{Json.event.label_7}</Text>
        {similarEvents.map((similarEvent, idx) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#f9c2ff",
              padding: 20,
              marginVertical: 8,
            }}
            key={idx}
            onPress={() => {
              navigation.push(Json.event.title, similarEvent);
            }}
          >
            <Text>{similarEvent.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({});
