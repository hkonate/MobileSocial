import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable
} from "react-native";
import Slider from "react-native-a11y-slider";
import SelectMultiple from 'react-native-select-multiple'
import ButtonGroup from "../../Component/ButtonGroup";
import Card from "../../Component/Card";
import SmallCard from "../../Component/SmallCard";
import { SetEvents } from "../../Context/RequestContext/RequestActions";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Json from "../../assets/Utils/fr.json";
import Fetch from "../../assets/Utils/useFetch";
import CLOSE from "../../assets/Images/close.png"
import { filterEvents } from "./Home.function";

export const Home = ({ navigation }) => {
  const [lastEvents, setLastEvents] = useState(null);
  const [events, setEvents] = useState(null);
  const [inclusiveArr, setInclusiveArr] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [rangePrice, setRangePrice] = useState([0, 1000])
  const [id, setId] = useState(0)
  const { user, dispatch } = useContext(RequestContext);
  const DATA = [];
  const inclusive = ["HALAL", "VEGAN", "VEGE", "STANDARD", "CASHER"]
  const categoryArr = ["", "MOVIE", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "OTHERS"]

 

 onSelectionsChange = (selectedItems, item) => {
    setInclusiveArr(prev => {
      const index = prev.findIndex((typeOfFood) => typeOfFood === item.value);
      if (index !== -1) {
        prev.splice(index, 1);
      } else {
        return [...prev, item.value];
      }
      return [...prev];
    });
  }
  console.log("state",rangePrice, inclusiveArr, categoryArr[id]);
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.userInfosBox}>
        <TouchableOpacity onPress={()=> navigation.navigate(Json.profile.title)} style={styles.avatarBox}>
          <Text style={styles.initial}>{user?.firstname[0]?.toUpperCase() + user?.lastname[0]?.toUpperCase()}</Text>
        </TouchableOpacity>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>{Json.event.label_13}</Text>
          <Text style={styles.textName}>{user.firstname + " " + user.lastname}</Text>
        </View>
        <View></View>
      </View>
      <View style={styles.searchBox}>
        <Image style={styles.loupe} source={require("../../assets/Images/loupe.png")} />
        <TextInput style={styles.input} placeholder={Json.event.label_4} />
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Image style={styles.loupe} source={require("../../assets/Images/filter.png")} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{Json.event.label_14}</Text>
            <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)} style={styles.closeModal}><Image source={CLOSE} /></TouchableOpacity>
            <View style={styles.underline}></View>
            <Text style={styles.subtitleModal}>{Json.event.label_15}</Text>
            <View style={styles.modalBtnGrp}>
            <ButtonGroup id={id} setId={setId} buttons={categoryArr} setEvents={setEvents} modal={true} />
            </View>
            <Text style={styles.subtitleModal}>{"Prix"}</Text>
            <Slider min={0} max={1000} values={rangePrice} markerColor='#2196F3' onChange={values=> setRangePrice(values)} />
            <Text style={styles.subtitleModal}>{Json.event.label_11}</Text>
            <SelectMultiple 
            items={inclusive}
            selectedItems={inclusiveArr}
            onSelectionsChange={onSelectionsChange}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                navigation.navigate(Json.filter.title, {rangePrice, inclusiveArr, category: categoryArr[id]})
                }}>
              <Text style={styles.textStyle}>Filtrer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.carousel}>
       {
         lastEvents && lastEvents?.length > 0 ? lastEvents.map((event, idx) =>  <Card key={idx} w={250} h={340} event={event} navigation={navigation} />) :
         <View style={{ alignItems: "center", width: 300}}>
           <Text style={styles.noEvent}>{Json.home.label_6}</Text>
         </View>
       }
      </ScrollView>
      <Text style={styles.categoryTitle}>Categories</Text>
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
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
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
    alignItems: "center"
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
    marginBottom: 25,
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
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 10,
    elevation: 5,
    position: "relative"
  },
  underline:{
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
  },
  subtitleModal:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  modalBtnGrp:{
    flexDirection: "row",
    flexWrap: "wrap", 
    gap: 8,
    marginBottom: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: "bold"
  },
  closeModal:{
    position: "absolute",
    right: "10%",
    top: "2%"
  }
});
