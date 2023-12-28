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
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Location from "../../assets/Images/location.png"
import Calendar from "../../assets/Images/calendar.png"
import { FormatDate } from "../../assets/Utils/formatDate";


const Event = ({ route, navigation: { goBack, navigate, push } }) => {
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState(null)
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
        setDate(FormatDate(res.schedule))
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
    console.log(event?.schedule);
  return (
    <ScrollView style={styles.container}>
      { 
       event?.images.length > 0 &&
      <View style={styles.carousselBox}>
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
      </View>
        }
        <View style={{width: "100%", paddingHorizontal: 10, marginTop: 20}}>
      <Text style={styles.title}>{event?.title}</Text>
      <View style={styles.attendeeBox}>
        <View style={styles.category}>
          <Text style={styles.categoryTxt}>{event?.category}</Text>
        </View>
        <Text>{`Il y a ${event?.listOfAttendees?.length} ${event?.listOfAttendees?.length > 1 ? Json.event.label_16 :  Json.event.label_17}`}</Text>
       {event?.creator.id !== user.id && <TouchableOpacity
         style={{backgroundColor: titleBtn === "Quitter" ? "red" : "#584CF4", ...styles.attendBtn}}  
         onPress={async () => {
            const data = await handleAttendee(titleBtn, event?.id);
            if (data) {
              dispatch(SetEvent(data));
              setEvent(data);
            }
          }}>
          <Text style={{color: titleBtn === "Joindre" && "white", ...styles.attendBtnTxt}}>{titleBtn}</Text>
        </TouchableOpacity>}
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.locationBox}>
        <View style={styles.locationLogoBox}>
          <Image style={styles.locationLogo} source={Calendar}/>
        </View>
        <Text style={styles.locationTxt}>{date}</Text>
      </View>
      <View style={styles.locationBox}>
        <View style={styles.locationLogoBox}>
        <Image style={styles.locationLogo} source={Location}/>
        </View>
        <Text style={styles.locationTxt}>{event?.address}</Text>
      </View>
      <View style={styles.underline}></View>
      
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
  
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  carousselBox:{
    backgroundColor: "lightgrey",
    height: 300,
    width:"100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
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
    left: 10,
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
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  attendeeBox:{
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    gap: 10,
    marginBottom: 15
  },
  category:{
    height: "50%",
    borderWidth: 1,
    borderColor: "#584CF4",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 5
   
  },
  categoryTxt:{
    color: "#584CF4",
    textAlign: "center",
    fontSize: 9,
    textTransform: "capitalize"
  },
  attendBtn:{
    paddingHorizontal: 10,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 30
  },
  attendBtnTxt:{
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 12
  },
  underline:{
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginBottom: 15
  },
  locationBox:{
    width: "100%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationLogoBox:{
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center"
  },
  locationLogo:{
    width: 20,
    height: 20,
  },
  locationTxt:{
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center"
  }
});
