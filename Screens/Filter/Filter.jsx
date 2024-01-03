import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Left from "../../assets/Images/leftarrow.png"
import Search from "../../Component/Search.jsx"
import { HandleEventFilter } from './Filter.function.jsx'
import Json from "../../assets/Utils/fr.json"
import Modal from '../../Component/ModalC.jsx'
import RectangularCard from '../../Component/RectangularCard.jsx'

const Filter = ({route, navigation}) => {
  const filters = route.params
  const [events, setEvents] = useState(null)
  const [inclusiveArr, setInclusiveArr] = useState(filters.inclusiveArr)
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(filters.id)
  const [rangePrice, setRangePrice] = useState(filters.rangePrice);
  const [eventName, setEventName] = useState("")
  useEffect(()=>{
    const categoryArr = ["", "MOVIE", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "OTHERS"]
    const fetchByFilter = async ()=>{
        await HandleEventFilter(navigation.goBack, setEvents, categoryArr[id], eventName, inclusiveArr, rangePrice)
      }
      fetchByFilter()
    }, [])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputBox}>
        <TouchableOpacity style={{ width: "7%"}} onPress={()=> navigation.goBack()}>
        <Image style={styles.image} source={Left} />
        </TouchableOpacity>
        <View style={{width: "88%"}}>
          <Search setModalVisible={setModalVisible} setEventName={setEventName} rangePrice={rangePrice} inclusiveArr={inclusiveArr} id={id} navigation={navigation} eventName={eventName} filter={true} setEvents={setEvents} />
        </View>
      </View>
      <Text style={styles.findText}>{events && (events.length > 1 ? `${events.length} ${Json.filter.label_1}` : `${events.length} ${Json.filter.label_2}`)}</Text>
      <RectangularCard events={events} navigation={navigation} />
      <Modal setModalVisible={setModalVisible} modalVisible={modalVisible} rangePrice={rangePrice} inclusiveArr={inclusiveArr} id={id} eventName={eventName} navigation={navigation} setRangePrice={setRangePrice} setId={setId} setEvents={setEvents} filter={true} setInclusiveArr={setInclusiveArr}/>
    </ScrollView>
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingTop: 50,
  }, 
  inputBox:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    width: "100%",
    height: 70,
  },
  image:{
    width: "100%",
    height: 20
  },
  findText:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 25
  }
})