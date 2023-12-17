import { useContext, useState } from "react";
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
import { getPermissionAndGetPicture, getPermissionAndTakePicture } from "./createProfile.function";
export const CreateProfile = ({ states }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [desc, setDesc] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const { setCreatedProfile } = states;
  const { dispatch } = useContext(RequestContext);

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
      <Button title="galery" onPress={()=>getPermissionAndGetPicture(setSelectedPicture)} />
      <Button title="picture" onPress={()=>getPermissionAndTakePicture(setSelectedPicture)} />
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
