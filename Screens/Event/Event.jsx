import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import React, { useContext, useState } from "react";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Json from "../../assets/Utils/fr.json";
import { handleAttendee, handleDelete } from "./Event.functions";
import { SetEvent } from "../../Context/RequestContext/RequestActions";
import { useFocusEffect } from "@react-navigation/native";
import Fetch from "../../assets/Utils/useFetch";
import Back from "../../assets/Images/back.png"
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Event = ({ route, navigation: { goBack, navigate, push } }) => {
  const [event, setEvent] = useState(null);
  const { events, user, dispatch } = useContext(RequestContext);
  useFocusEffect(
    React.useCallback(() => {
      const event = route.params;
      const fetchEvent = async () => {
        const fetch = await Fetch();
        const res = await fetch.GET(`event/${event.id}`);
        if (!res) {
          return (
            <View>
              <Text>Not Found</Text>
            </View>
          );
        }
        setEvent(res);
      };
      fetchEvent();
    }, [])
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
    <ScrollView style={styles.constainer}>
      <View style={styles.carousselBox}>
        <TouchableOpacity style={styles.leftArrowBox} onPress={()=> goBack()}>
          <Image style={styles.leftArrowLogo} source={Back} />
        </TouchableOpacity>
       { 
       event?.images.length > 0 ? 
       <SwiperFlatList
       autoplay
       autoplayDelay={2}
       autoplayLoop
       showPagination
       paginationDefaultColor="white"
       paginationActiveColor="#584CF4"
       data={event.images}
       renderItem={({ item }) =>  <Image style={styles.images} source={{uri: item}}/>}
     />
       :
        <Text style={styles.noEvent}>Pas de photos</Text>
        }
      </View>
      <Text>{event?.title}</Text>
      <Text>{event?.images.length}</Text>
      <View>
        <Text>{event?.listOfAttendees.length}</Text>
        <Button
          title={titleBtn}
          onPress={async () => {
            const data = await handleAttendee(titleBtn, event?.id);
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
          {event?.creator.id === user?.id && (
            <>
              <Button
                title={Json.event.label_10}
                onPress={async () => {
                  const deletedEvent = await handleDelete(event.id);
                  if (deletedEvent) goBack();
                }}
              />
              <Button
                title={Json.event.label_12}
                onPress={() => navigate(Json.editEvent.title, event.id)}
              />
            </>
          )}
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
              push(Json.event.title, similarEvent);
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
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  
  constainer: {
    flex: 1,
    backgroundColor: "white",
  },
  carousselBox:{
    backgroundColor: "lightgrey",
    height: "50%",
    width:"100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  images:{
    width,
    height: "100%",
  },
  leftArrowBox:{
    width: 30,
    height: 30,
    position: "absolute",
    top: 15,
    left: 10
  },
  leftArrowLogo:{
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  noEvent:{
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});
