import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import Json from "../../assets/Utils/fr.json";
import {
  getPermissionAndGetPicture,
  getPermissionAndTakePicture,
  handleChange,
} from "../EditEvent/Edit.function";
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
    <View>
      <TextInput
        placeholder={Json.createEvent.label_1}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "title" in input);
            index !== -1
              ? (prev[index] = { title: text })
              : prev.push({ title: text });
            return [...prev];
          })
        }
      />
      <TextInput
        placeholder={Json.createEvent.label_6}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "description" in input);
            index !== -1
              ? (prev[index] = { description: text })
              : prev.push({ description: text });
            return [...prev];
          })
        }
      />
      <TextInput
        placeholder={Json.editEvent.label_3}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "address" in input);
            index !== -1
              ? (prev[index] = { address: text })
              : prev.push({ address: text });
            return [...prev];
          })
        }
      />
      <TextInput
        placeholder={Json.editEvent.label_4}
        onChangeText={(text) =>
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "limit" in input);
            index !== -1
              ? (prev[index] = { limit: text })
              : prev.push({ limit: text });
            return [...prev];
          })
        }
      />
      <Button
        title="Prendre une photo"
        onPress={async () => {
          await getPermissionAndTakePicture(setFiles);
        }}
      />
      <Button
        title="Gallerie"
        onPress={async () => {
          await getPermissionAndGetPicture(setFiles);
        }}
      />
      <Button
        title="Supprimer les photos"
        onPress={() => {
          setFiles([]);
        }}
      />
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Button
        title={Json.createEvent.label_8}
        disabled={emptyField || wrongDate || files.length === 0}
        onPress={async () => {
          try {
            const res = await handleCreate(files, date, inputsData);
            if (res) goBack();
          } catch (error) {
            alert(error);
          }
        }}
      />
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
