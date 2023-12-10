import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Json from "../../assets/Utils/fr.json";

const CreateEvent = () => {
  const [inputsData, setInputsData] = useState([]);
  const [emptyField, setEmptyField] = useState(true);
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
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
