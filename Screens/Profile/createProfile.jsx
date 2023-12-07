import { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import Json from "../../assets/Utils/fr.json";
import { handleUpdate } from "./createProfile.function";
import { RequestContext } from "../../Context/RequestContext/RequestContext";

export const CreateProfile = ({ states }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [desc, setDesc] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const { setCreatedProfile } = states;
  const { dispatch } = useContext(RequestContext);

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === false) {
        setSelectedPicture(result.assets[0].uri);
      }
    }
  };
  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled === false) {
        setSelectedPicture(result.assets[0].uri);
      }
    }
  };
  return (
    <View>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: "lightgray",
        }}
      >
        {selectedPicture && (
          <Image
            source={{ uri: selectedPicture }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
      <Button title="galery" onPress={getPermissionAndGetPicture} />
      <Button title="picture" onPress={getPermissionAndTakePicture} />
      <TextInput
        style={styles.input}
        placeholder={Json.createProfile.label_1}
        onChangeText={(text) => setDesc(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={Json.createProfile.label_2}
        onChangeText={(text) => setHobbies(text)}
      />
      <Button
        title={Json.createProfile.label_4}
        onPress={async () => {
          const result = await handleUpdate(
            selectedPicture,
            desc,
            hobbies,
            setCreatedProfile,
            dispatch
          );
          if (result) {
            setCreatedProfile("done");
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "70%",
  },
});
