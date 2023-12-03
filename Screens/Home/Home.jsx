import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Fetch from "../../assets/Utils/useFetch";
import Json from "../../assets/Utils/fr.json";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { filterEvents } from "./Home.function";
import useSecureStore from "../../assets/Utils/useSecureStore";
import { SetEvents } from "../../Context/RequestContext/RequestActions";
export const Home = ({ navigation }) => {
  const [events, setEvents] = useState(null);
  const { user, dispatch } = useContext(RequestContext);
  const DATA = [];
  useEffect(() => {
    const eventsRequest = async () => {
      const fetchEvents = await Fetch();
      const eventsResponse = await fetchEvents.GET("event");
      if (eventsResponse !== undefined) {
        dispatch(SetEvents(eventsResponse));
        setEvents(eventsResponse);
      }
    };
    eventsRequest();
  }, []);

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
    <SafeAreaView>
      <View>
        <View></View>
        <View>
          <Text>{Json.event.label_3}</Text>
          <Text>{user.firstname + " " + user.lastname}</Text>
        </View>
        <View></View>
      </View>
      <View>
        <TextInput placeholder={Json.event.label_4} />
      </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});
