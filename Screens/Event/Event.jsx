import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Json from "../../assets/Utils/fr.json";
import { handleAttendee, handleDelete } from "./Event.functions";
import { SetEvent } from "../../Context/RequestContext/RequestActions";
const Event = ({ route, navigation: { goBack } }) => {
  const [event, setEvent] = useState(null);
  const { events, user, dispatch } = useContext(RequestContext);
  useEffect(() => {
    const eventRoute = route.params;
    setEvent(eventRoute);
  }, []);
  if (event)
    console.log(
      events.find((events) => events.id === event?.id),
      event,
      "new Event"
    );
  const similarEvents = events.filter((eventTofilter) => {
    if (event?.id !== eventTofilter.id) {
      if (event?.inclusive.length > 0) {
        return eventTofilter.inclusive.length > 0;
      } else {
        return eventTofilter.inclusive.length === 0;
      }
    }
  });
  const titleBtn = event?.listOfAttendees.find(
    (attendee) => attendee.id === user.id
  )
    ? Json.event.label_9
    : Json.event.label_8;
  const date = new Date(event?.schedule).toString().split("(").pop();
  return (
    <ScrollView>
      <Text>{event?.title}</Text>
      <View>
        <Text>{event?.listOfAttendees.length}</Text>
        <Button
          title={titleBtn}
          onPress={async () => {
            const data = await handleAttendee(titleBtn, event?.id);
            console.log(data);
            if (data) {
              dispatch(SetEvent(data));
              setEvent(data);
            }
          }}
        />
      </View>
      <View>
        <View></View>
        <Text>{date}</Text>
      </View>
      <View>
        <View></View>
        <Text>{event?.address}</Text>
      </View>
      <View>
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
            <Text>{event?.creator.pseudo}</Text>
            <Text>{Json.event.label_5}</Text>
          </View>
          <Button
            title={Json.event.label_10}
            onPress={async () => {
              const deletedEvent = await handleDelete(event.id);
              console.log(deletedEvent, user.authTokens);
              if (deletedEvent) goBack();
            }}
          />
        </View>
        <Text>{Json.event.label_6}</Text>
        <Text> {event?.description} </Text>
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
