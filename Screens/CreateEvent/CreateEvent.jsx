import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import Json from "../../assets/Utils/fr.json";
import {
  getPermissionAndGetPicture,
  getPermissionAndTakePicture,
} from "../EditEvent/Edit.function";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { handleCreate } from "./CreateEvent.function";

const CreateEvent = ({ navigation: { goBack } }) => {
  const [inputsData, setInputsData] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
  const [files, setFiles] = useState([]);
  const [wrongDate, setWrongDate] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (
      !(new Date(currentDate).getTime() > new Date().getTime() + 30 * 60 * 1000)
    ) {
      if (!wrongDate) setWrongDate((prev) => !prev);
    } else {
      if (wrongDate) setWrongDate((prev) => !prev);
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const emptyInputs = Object.values(inputsData).find((value) => {
    const key = Object.keys(value)[0];
    if (typeof value[key] === "string") {
      return value[key].trim().length === 0;
    } else {
      return value[key].length === 0;
    }
  });
  if (emptyInputs) {
    if (!emptyField) setEmptyField((prev) => !prev);
  } else {
    if (emptyField) setEmptyField((prev) => !prev);
  }
  return (
    <ScrollView>
       {
        files[0]?.files?.length > 0 &&
        <View style={styles.carousselBox}>
       <SwiperFlatList
       autoplay
       autoplayDelay={2}
       autoplayLoop
       showPagination
       paginationDefaultColor="white"
       paginationActiveColor="#584CF4"
       data={files[0]?.files}
       renderItem={({ item }) =>  <Image style={styles.images} source={{uri: item.uri}}/>}
     />
      </View>
      }
       <View style={{...styles.btnBox, justifyContent: files[0]?.files?.length > 0 ? "space-between": "space-around"}}>
        <TouchableOpacity style={styles.btn} 
        onPress={async () => {
          await getPermissionAndGetPicture(setFiles);
        }}>
          <Text style={styles.textBtn}>{Json.editEvent.label_9}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.btn}  onPress={async () => {
          await getPermissionAndTakePicture(setFiles);
        }}>
          <Text style={styles.textBtn}>{Json.editEvent.label_8}</Text>
        </TouchableOpacity>
       { files[0]?.files?.length > 0 && <TouchableOpacity style={styles.delete} 
        onPress={() => {
          setFiles([]);
        }}>
          <Text style={{fontWeight: "bold"}}>{Json.editEvent.label_10}</Text>
        </TouchableOpacity> 
        }
      </View>
      <View style={{alignItems: "center", width: "100%", marginBottom: 20}}>
      <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.createEvent.label_1}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.createEvent.label_1}
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
          <Text style={styles.labels}>{Json.createEvent.label_6}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.createEvent.label_6}
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
          <Text style={styles.labels}>{Json.createEvent.label_3}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.createEvent.label_3}
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
          <Text style={styles.labels}>{Json.createEvent.label_4}</Text>
        <TextInput style={styles.inputs}  
        placeholder={Json.createEvent.label_4}
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
        <Text style={styles.dateTxt}>{Json.createEvent.label_10 + date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      <View style={{...styles.btnBox, justifyContent: "space-around"}}>
        <TouchableOpacity style={styles.btn} onPress={showDatepicker}>
          <Text style={styles.textBtn}  onPress={showTimepicker} >{Json.createEvent.label_7}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.btn}  onPress={async () => {
          await getPermissionAndTakePicture(setFiles);
        }}>
          <Text style={styles.textBtn}>{Json.createEvent.label_9}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={{...styles.createBtn, backgroundColor: emptyField || wrongDate || files[0]?.files?.length === 0 ? "lightgrey" : "#584CF4"}} 
        onPress={async () => {
          try {
            const res = await handleCreate(files[0]?.files, date, inputsData);
            if (res) goBack();
          } catch (error) {
            alert(error);
          }
        }}
        disabled={emptyField || wrongDate || files[0]?.files?.length === 0}
        >
          <Text style={styles.textBtn}>
          {Json.createEvent.label_8.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateEvent;

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
  createBtn:{
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height:45,
    borderRadius: 10,
    marginTop: 40,
  },
  dateTxt:{
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});
