import { StyleSheet, Image, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import Json from "../assets/Utils/fr.json";
import { HandleEventFilter } from '../Screens/Filter/Filter.function';

const Search = ({setModalVisible,setEventName, rangePrice, inclusiveArr, id, navigation, filter, eventName, setEvents }) => {
  const categoryArr = ["", "MOVIE", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "OTHERS"]
  return (
    <View style={styles.searchBox}>
    <TouchableOpacity onPress={async ()=>{
      if(!filter) {
        navigation.navigate(Json.filter.title, {rangePrice, inclusiveArr, id})
        }else{
          await HandleEventFilter(navigation.goBack, setEvents, categoryArr[id], eventName, inclusiveArr, rangePrice, filter)
        }
        }
        }>
    <Image style={styles.loupe} source={require("../assets/Images/loupe.png")} />
    </TouchableOpacity>
    <TextInput style={styles.input} placeholder={Json.event.label_4} onChangeText={text=>setEventName(text)}/>
    <TouchableOpacity onPress={()=>setModalVisible(true)}>
    <Image style={styles.loupe} source={require("../assets/Images/filter.png")} />
    </TouchableOpacity>
  </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchBox:{
        backgroundColor: "#FAFAFA",
        width: "100%",
        height: 45,
        borderRadius: 15,
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
})