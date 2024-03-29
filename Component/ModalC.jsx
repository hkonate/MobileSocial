import React from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image, Modal, Platform, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import Slider from "react-native-a11y-slider";
import SelectMultiple from 'react-native-select-multiple'
import ButtonGroup from "./ButtonGroup";
import Json from "../assets/Utils/fr.json";
import CLOSE from "../assets/Images/close.png"
import { HandleEventFilter } from '../Screens/Filter/Filter.function';

const ModalC = ({setModalVisible, modalVisible, rangePrice, inclusiveArr, eventName, navigation, setRangePrice, id, setId, setEvents, filter, setInclusiveArr}) => {
  const categoryArr = ["", "MOVIE", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "OTHERS"]  
  const inclusive = ["HALAL", "VEGAN", "VEGE", "STANDARD", "CASHER"]
  
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
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <ScrollView style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{Json.event.label_14}</Text>
        <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)} style={styles.closeModal}><Image style={{width: 30, height: 30}} source={CLOSE} /></TouchableOpacity>
        <View style={styles.underline}></View>
        <Text style={styles.subtitleModal}>{Json.event.label_15}</Text>
        <View style={styles.modalBtnGrp}>
        <ButtonGroup id={id} setId={setId} buttons={categoryArr} setEvents={setEvents} modal={true} />
        </View>
        <Text style={styles.subtitleModal}>{Json.home.label_7}</Text>
        <Slider min={0} max={1000} values={rangePrice} markerColor='#584CF4' onChange={values=> setRangePrice(values)} />
        <Text style={styles.subtitleModal}>{Json.event.label_11}</Text>
        <SelectMultiple 
        items={inclusive}
        selectedItems={inclusiveArr}
        onSelectionsChange={onSelectionsChange}
        />
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {
            setModalVisible(!modalVisible)
            if(!filter){
            navigation.navigate(Json.filter.title, {rangePrice, inclusiveArr, id, eventName})
          }else{
            await HandleEventFilter(navigation.goBack, setEvents, categoryArr[id], eventName, inclusiveArr, rangePrice, filter)
          }
          }}>
          <Text style={styles.textStyle}>Filtrer</Text>
        </Pressable>
      </View>
    </ScrollView>
  </Modal>
  )
}

export default ModalC

const styles = StyleSheet.create({
    modalView: {
        height: "100%",
        width: "100%",
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 10,
        elevation: 5,
        position: "relative",
        paddingTop: Platform.OS === "ios" && Constants.statusBarHeight + 10,
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
        top:  Platform.OS === "ios" ? "3.5%" : "1%"
      },
})