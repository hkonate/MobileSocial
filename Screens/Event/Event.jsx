import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
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
import ReadMore from '@fawazahmed/react-native-read-more';
import RectangularCard from "../../Component/RectangularCard";


const Event = ({ route, navigation }) => {
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
        <Text numberOfLines={2} style={styles.locationTxt}>{date}</Text>
      </View>
      <View style={styles.locationBox}>
        <View style={styles.locationLogoBox}>
        <Image style={styles.locationLogo} source={Location}/>
        </View>
        <Text numberOfLines={2} style={styles.locationTxt}>{event?.address}</Text>
      </View>
      <View style={styles.underline}></View>
      <View style={styles.ownerBox}>
          <TouchableOpacity onPress={()=> navigation.push(Json.profile.title, event?.creator?.id)} style={styles.avatarBox}>
            {
              event?.creator?.profile?.picture ? 
              <Image style={styles.avatar} source={{uri:event?.creator?.profile?.picture }}/> :
              <Text style={styles.initial}>{event?.creator?.pseudo[0]}</Text>
            }
          </TouchableOpacity>
          <View style={styles.ownerInfoBox}>
            <Text numberOfLines={2} style={styles.ownerName}>{event?.creator.pseudo}</Text>
            <Text numberOfLines={2} style={styles.ownerSubtitle}>{Json.event.label_5}</Text>
          </View>
          {event?.creator.id === user.id && 
          <>
            <TouchableOpacity
            style={styles.modifyBtn}  
            onPress={() => navigation.navigate(Json.editEvent.title, event)}>
              <Text style={{color: "white", ...styles.attendBtnTxt}}>{Json.event.label_12}</Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}  
            onPress={async () => {
                    const deletedEvent = await handleDelete(event.id);
                    if (deletedEvent) navigation.goBack();
                  }}>
              <Text style={styles.attendBtnTxt}>{Json.event.label_10}</Text>
            </TouchableOpacity>
          </>
          }
        </View>
        <Text style={styles.subTitle}>{Json.event.label_6}</Text>
        <ReadMore 
        style={{fontSize: 15, marginBottom: 15}}
        numberOfLines={4} 
        seeMoreText={Json.profile.label_4}
        seeMoreStyle={{color: "#584CF4"}}
        seeLessText={Json.profile.label_5}
        seeLessStyle={{color: "#584CF4"}}
        >{event?.description}
        </ReadMore>
        <Text style={styles.subTitle}>{Json.event.label_7}</Text>
        <RectangularCard events={similarEvents} navigation={navigation}/>
      </View>
    </ScrollView>
  );
};

export default Event;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
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
    backgroundColor: "#f8f8f8",
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
  },
  ownerBox:{
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 15
  },
  avatarBox:{
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar:{
    width: "100%",
    height:"100%",
    borderRadius: 25,
    objectFit: "contain"
  },
  initial:{
    color: "white",
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold"
  },
  ownerInfoBox:{
    flexDirection: "column",
    justifyContent: "center",
    gap: 3
  },
  ownerName:{
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  ownerSubtitle:{
    fontSize: 9,
    color: "lightgrey",
    fontWeight: "bold"
  },
  deleteBtn:{
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "red"
  },
  modifyBtn:{
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#584CF4"
  },
  subTitle:{
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15
  }
});
