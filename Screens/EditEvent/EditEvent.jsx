import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import Json from "../../assets/Utils/fr.json";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {
  getPermissionAndGetPicture,
  getPermissionAndTakePicture,
  handleChange,
} from "./Edit.function.jsx";

const EditEvent = ({ route, navigation: { goBack } }) => {
  const [inputsData, setInputsData] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  const eventId = route.params;
  const emptyInputs = Object.values(inputsData).find((value) => {
    const key = Object.keys(value)[0];
    if (typeof value[key] === "string") {
      return value[key].trim().length > 0;
    } else {
      return value[key].length;
    }
  });
  if (emptyInputs) {
    if (emptyField) setEmptyField((prev) => !prev);
  } else {
    if (!emptyField) setEmptyField((prev) => !prev);
  }
  const indexFiles = inputsData.findIndex(input => "files" in input)
  console.log(inputsData[indexFiles]?.files);
  return (
    <ScrollView style={styles.container}>
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
          const updatedEvent = await handleChange(eventId, inputsData);
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
  }
});
