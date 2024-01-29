import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { SetEvents } from "../../Context/RequestContext/RequestActions";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import Constants from 'expo-constants';
import ButtonGroup from "../../Component/ButtonGroup";
import Card from "../../Component/Card";
import SmallCard from "../../Component/SmallCard";
import Json from "../../assets/Utils/fr.json";
import Fetch from "../../assets/Utils/useFetch";
import Search from "../../Component/Search";
import Modal from "../../Component/ModalC";

export const Home = ({ navigation }) => {
  const [lastEvents, setLastEvents] = useState(null);
  const [events, setEvents] = useState(null);
  const [inclusiveArr, setInclusiveArr] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [rangePrice, setRangePrice] = useState([0, 1000]);
  const [eventName, setEventName] = useState("")
  const [id, setId] = useState(0)
  const { user, dispatch } = useContext(RequestContext);
  const categoryArr = ["", "MOVIE", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "OTHERS"]
  useFocusEffect(
    React.useCallback(() => {
      const eventsRequest = async () => {
        const fetchEvents = await Fetch();
        const eventsResponse = await fetchEvents.GET("event");
        if (eventsResponse !== undefined) {
          dispatch(SetEvents(eventsResponse));
          setLastEvents(eventsResponse.filter((ele, idx) => idx < 5));
          setEvents(eventsResponse)
          setId(0)
        }
      };
      eventsRequest();
    }, [])
  );

  if (!user) {
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.userInfosBox}>
        <TouchableOpacity style={styles.avatarBox}>
         {user?.profile?.picture ? 
         <Image style={styles.avatar} source={{uri: user.profile.picture}} /> :
          <Text style={styles.initial}>{user?.firstname[0]?.toUpperCase() + user?.lastname[0]?.toUpperCase()}</Text>
          }
        </TouchableOpacity>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>{Json.event.label_13}</Text>
          <Text style={styles.textName}>{user.firstname + " " + user.lastname}</Text>
        </View>
      </View>
      <Search setModalVisible={setModalVisible} setEventName={setEventName} rangePrice={rangePrice} inclusiveArr={inclusiveArr} id={id} navigation={navigation} eventName={eventName} />
     <Modal setModalVisible={setModalVisible} modalVisible={modalVisible} rangePrice={rangePrice} inclusiveArr={inclusiveArr} id={id} eventName={eventName} navigation={navigation} setRangePrice={setRangePrice} setId={setId} setEvents={setEvents} setInclusiveArr={setInclusiveArr} />
     <Text style={{ marginTop: 20,...styles.categoryTitle}}>{Json.home.label_9}</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.carousel}>
       {
         lastEvents && lastEvents?.length > 0 ? lastEvents.map((event, idx) =>  <Card key={idx} event={event} navigation={navigation} />) :
         <View style={{ alignItems: "center", width: 300}}>
           <Text style={styles.noEvent}>{Json.home.label_6}</Text>
         </View>
       }
      </ScrollView>
      <Text style={styles.categoryTitle}>{Json.home.label_8}</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.categoryCarousel}>
        <ButtonGroup id={id} setId={setId} buttons={categoryArr} setEvents={setEvents} modal={false} />
      </ScrollView>
      <View style={styles.categorizeEventBox}>
       {
        events && events?.length > 0 ? events.map((event, idx) => <SmallCard  key={idx} event={event} navigation={navigation}/>) :
        <Text style={styles.noEvent}>{Json.home.label_6}</Text>
       }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight + 25,
  },
  userInfosBox:{
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginBottom: 20
  },
  welcomeText:{
    color: "gray"
  },
  textName : {
    fontWeight: "bold",
    fontSize: 18
  },
  welcomeBox:{
    height: 50,
    justifyContent: "space-between"
  },
  avatarBox:{
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar:{
    width: "100%",
    height: "100%",
    borderRadius: 50,
    objectFit: "cover"
  },
  initial:{
    color: "white"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
  carousel:{
    width: "100%",
   marginBottom: 20
  },
  categoryTitle:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryCarousel:{
    marginBottom: 25
  },
  categorizeEventBox:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
    marginBottom: 80
  },
  noEvent:{
    fontSize: 24,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#584CF4"
  },  
});
