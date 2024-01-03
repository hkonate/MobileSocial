import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import Json from "../../assets/Utils/fr.json";
import Slider from "react-native-a11y-slider";
import SelectMultiple from 'react-native-select-multiple'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ButtonGroup from "../../Component/ButtonGroup";
import {
  getPermissionAndGetPicture,
  getPermissionAndTakePicture,
  handleChange,
} from "./Edit.function.jsx";

const EditEvent = ({ route, navigation: { goBack } }) => {
  const [inputsData, setInputsData] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  const [id, setId] = useState(null)
  
  const event = route.params;
  const categoryArr = ["","OTHERS", "ART", "STUDY", "CONCERT", "SPORT", "KARAOKE", "RESTAURANT", "GAMING", "MOVIE"]  
  const inclusive = ["HALAL", "VEGAN", "VEGE", "STANDARD", "CASHER"]
  

  const emptyInputs = Object.values(inputsData).find((value) => {
    const key = Object.keys(value)[0];
    if (typeof value[key] === "string" || typeof value[key] === "number") {
      return value[key].toString().trim().length > 0;
    } else {
      return value[key].length;
    }
  });
  if (emptyInputs) {
    if (emptyField) setEmptyField((prev) => !prev);
  } else {
    if (!emptyField) setEmptyField((prev) => !prev);
  }

  onSelectionsChange = (selectedItems, item) => {
    setInputsData(prev => {
      if(indexInclusive !== -1){
        const index = prev[indexInclusive]?.inclusive.findIndex((typeOfFood) => typeOfFood === item.value);
        if (index !== -1) {
          prev[indexInclusive]?.inclusive.splice(index, 1);
        } else {
          prev[indexInclusive]?.inclusive.push(item.value)
        }
      }else{
        prev.push({inclusive:[item.value]})
      }
      return [...prev];
    });
  }

  const indexFiles =  inputsData.findIndex(input => "files" in input) 
  const indexPrice =  inputsData.findIndex(input => "price" in input)
  const indexInclusive =  inputsData.findIndex(input => "inclusive" in input)

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <Text style={{marginTop: 10,...styles.subtitleModal}}>{Json.event.label_15}</Text>
      <View style={styles.modalBtnGrp}>
        <ButtonGroup id={id} setId={setId} buttons={categoryArr} modal={true} defined={true} setInputsData={setInputsData} />
      </View>
      <View style={styles.underline}/>
      <Text style={styles.subtitleModal}>{Json.home.label_7}</Text>
      <Slider style={{marginBottom: 30}} 
          min={0} 
          max={1000} 
          values={[inputsData[indexPrice]?.price !== undefined ? inputsData[indexPrice]?.price : event?.price]} 
          markerColor='#584CF4' 
          onChange={values => setInputsData((prev) => {
            if(indexPrice !== -1){
              prev[indexPrice].price = values[0]
            }else{
              prev.push({ price: values[0]})
            }
            return [...prev];
          })}  />
      <View style={styles.underline}/>
      <Text style={styles.subtitleModal}>{Json.editEvent.label_11}</Text>
      <Slider style={{marginBottom: 30}} min={event?.listOfAttendees.length > 1 ? event?.listOfAttendees.length : 2} max={300} values={event?.listOfAttendees.length > 15 ? event?.listOfAttendees.length : 15} markerColor='#584CF4' onChange={values => setInputsData((prev) => {
            const index = prev.findIndex((input) => "limit" in input);
            index !== -1
            ? (prev[index] = { limit: values[0] })
            : prev.push({ limit: values[0] });
            return [...prev];
          })}  />
      <View style={styles.underline}/>
      <Text style={styles.subtitleModal}>{Json.editEvent.label_2}</Text>
      <SelectMultiple 
        items={inclusive}
        selectedItems={indexInclusive !== -1 ? inputsData[indexInclusive].inclusive : []}
        onSelectionsChange={this.onSelectionsChange}
        />
      {
        inputsData[indexFiles]?.files?.length > 0 &&
        <View style={styles.carousselBox}>
       <SwiperFlatList
       autoplay
       autoplayDelay={2}
       autoplayLoop
       showPagination
       paginationDefaultColor="white"
       paginationActiveColor="#584CF4"
       data={inputsData[indexFiles].files}
       renderItem={({ item }) =>  <Image style={styles.images} source={{uri: item.uri}}/>}
     />
      </View>
      }
      <View style={{...styles.btnBox, justifyContent: inputsData[indexFiles]?.files?.length > 0 ? "space-between": "space-around"}}>
        <TouchableOpacity style={styles.btn} 
        onPress={async () => {
          await getPermissionAndGetPicture(setInputsData);
        }}>
          <Text style={styles.textBtn}>{Json.editEvent.label_9}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.btn}  onPress={async () => {
          await getPermissionAndTakePicture(setInputsData);
        }}>
          <Text style={styles.textBtn}>{Json.editEvent.label_8}</Text>
        </TouchableOpacity>
       { inputsData[indexFiles]?.files?.length > 0 && <TouchableOpacity style={styles.delete} 
        onPress={() => {
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "files" in input);
            index !== -1 && prev.splice(index, 1);
            return [...prev];
          });
        }}>
          <Text style={{fontWeight: "bold"}}>{Json.editEvent.label_10}</Text>
        </TouchableOpacity> }
      </View>
      <View style={{alignItems: "center", width: "100%", marginBottom: 20}}>
      <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.editEvent.label_1}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.editEvent.label_1}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "title" in input);
            index !== -1
              ? (prev[index] = { title: text })
              : prev.push({ title: text });
            return [...prev];
          })
        }/>
        </View>
        <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.editEvent.label_7}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.editEvent.label_7}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "description" in input);
            index !== -1
              ? (prev[index] = { description: text })
              : prev.push({ description: text });
            return [...prev];
          })
        }/>
        </View>
        <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.editEvent.label_3}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.editEvent.label_3}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "address" in input);
            index !== -1
              ? (prev[index] = { address: text })
              : prev.push({ address: text });
            return [...prev];
          })
        }/>
        </View>
        <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.editEvent.label_4}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.editEvent.label_4}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "limit" in input);
            index !== -1
              ? (prev[index] = { limit: text })
              : prev.push({ limit: text });
            return [...prev];
          })
        }/>
        </View>
        <TouchableOpacity 
        style={{...styles.modifyBtn, backgroundColor: emptyField ? "lightgrey" : "#584CF4"}} 
        onPress={async () => {
          const updatedEvent = await handleChange(event?.id, inputsData);
          if (updatedEvent) goBack();
        }}
        disabled={emptyField}
        >
          <Text style={styles.textBtn}>
          {Json.editEvent.label_6.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditEvent;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
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
  inputsBox:{
    width: "90%",
    height: 60,
    gap: 10,
    marginTop: 30
  },
  labels:{
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputs:{
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "70%",
    borderRadius: 16,
    paddingLeft: 10,
  },
  btnBox:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginTop: 20,
    paddingHorizontal: 10
  },
  btn:{
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#584CF4"
  }, 
  delete:{
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "red"
  },
  textBtn:{
    color: "white",
    fontWeight: "bold"
  },
  modifyBtn:{
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height:45,
    borderRadius: 10,
    marginTop: 40
  },
  subtitleModal:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 10
  },
  modalBtnGrp:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
    gap: 10,
    marginBottom: 20
  },
  underline:{
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
    marginHorizontal: 10
  },
});
