import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import Fetch from "../../assets/Utils/useFetch";
import Json from "../../assets/Utils/fr.json";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { filterEvents } from "./Home.function";
import { SetEvents } from "../../Context/RequestContext/RequestActions";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Component/Card";

export const Home = ({ navigation }) => {
  const [events, setEvents] = useState(null);
  const { user, dispatch } = useContext(RequestContext);
  const DATA = [];

  useFocusEffect(
    React.useCallback(() => {
      const eventsRequest = async () => {
        const fetchEvents = await Fetch();
        const eventsResponse = await fetchEvents.GET("event");
        console.log(eventsResponse);
        if (eventsResponse !== undefined) {
          dispatch(SetEvents(eventsResponse));
          setEvents(eventsResponse);
        }
      };
      eventsRequest();
    }, [])
  );

  if (events) {
    const upComingEvents = filterEvents(events);
    const sixFirstEvents = events.slice(0, 6);
    DATA.push(
      { title: Json.event.label_5, data: upComingEvents },
      { title: Json.event.title, data: sixFirstEvents }
    );
  }

  if (!user) {
    // User is not available or still fetching data, show loading or handle accordingly
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfosBox}>
        <View style={styles.avatarBox}>
          <Text style={styles.initial}>{user?.firstname[0]?.toUpperCase() + user?.lastname[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>{Json.event.label_13}</Text>
          <Text style={styles.textName}>{user.firstname + " " + user.lastname}</Text>
        </View>
        <View></View>
      </View>
      <View style={styles.searchBox}>
        <Image style={styles.loupe} source={require("../../assets/Images/loupe.png")} />
        <TextInput style={styles.input} placeholder={Json.event.label_4} />
        <Image style={styles.loupe} source={require("../../assets/Images/filter.png")} />
      </View>
      <ScrollView horizontal={true} style={styles.carousel}>
       {
          events && events.map((event, idx) =>  <Card key={idx} w={250} h={340} event={event} />)
       }
      </ScrollView>
      <Button
        title={Json.createEvent.title}
        onPress={() => navigation.navigate(Json.createEvent.title)}
      />
      <Button
        title="Profil"
        onPress={() => navigation.navigate(Json.profile.title)}
      />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(Json.event.title, item)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingTop: 50,
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
    alignItems: "center",
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
  searchBox:{
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: 45,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loupe:{
    width: 20,
    height: 20
  },
  input:{
    width: "78%",
    height: "100%"
  },
  carousel:{
    width: "100%",
    height: 450,
    marginBottom: 50,
  },
});
