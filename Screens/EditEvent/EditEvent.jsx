import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Json from "../../assets/Utils/fr.json";
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
  return (
    <View>
      <TextInput
        placeholder={Json.editEvent.label_1}
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
        placeholder={Json.editEvent.label_7}
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
          await getPermissionAndTakePicture(setInputsData);
        }}
      />
      <Button
        title="Gallerie"
        onPress={async () => {
          await getPermissionAndGetPicture(setInputsData);
        }}
      />
      <Button
        title="Supprimer les photos"
        onPress={() => {
          setInputsData((prev) => {
            const index = prev.findIndex((input) => "files" in input);
            index !== -1 && prev.splice(index, 1);
            return [...prev];
          });
        }}
      />
      <Button
        title={Json.editEvent.label_6}
        onPress={async () => {
          const updatedEvent = await handleChange(eventId, inputsData);
          if (updatedEvent) goBack();
        }}
        disabled={emptyField}
      />
    </View>
  );
};

export default EditEvent;

const styles = StyleSheet.create({});
