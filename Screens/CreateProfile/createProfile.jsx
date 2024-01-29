import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import Json from "../../assets/Utils/fr.json";
import Gallery from "../../assets/Images/gallery.png"
import Camera from "../../assets/Images/camera.png"
import { handleUpdate } from "./createProfile.function";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { getPermissionAndGetPicture, getPermissionAndTakePicture } from "./createProfile.function";
export const CreateProfile = ({ states, user }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [desc, setDesc] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const { setCreatedProfile } = states;
  const { dispatch } = useContext(RequestContext);
  return (
    <View style={styles.container}>
      <View
        style={styles.avatarBox}
      >
        {selectedPicture && (
          <Image
            source={{ uri: selectedPicture }}
            style={styles.avatar}
          />
        )}
         <TouchableOpacity onPress={()=>getPermissionAndGetPicture(setSelectedPicture)} style={styles.gallery}>
          <Image style={styles.icons} source={Gallery} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.camera} onPress={()=>getPermissionAndTakePicture(setSelectedPicture)}>
        <Image style={styles.icons} source={Camera} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.createProfile.label_1}</Text>
        <TextInput style={styles.inputs} placeholder={Json.createProfile.label_1} onChangeText={(text) => setDesc(text)}/>
        </View>
        <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.createProfile.label_2}</Text>
        <TextInput style={styles.inputs} placeholder={Json.createProfile.label_2} onChangeText={(text) => setHobbies(text)}/>
        </View>
     
        <TouchableOpacity 
        style={{...styles.btn, backgroundColor: !desc || !hobbies || !desc.trim() || !hobbies.trim() ? "lightgrey": "#584CF4"}}  
        disabled={!desc || !hobbies || !desc.trim() || !hobbies.trim()}
        onPress={async () => {
          const result = await handleUpdate(selectedPicture,desc,hobbies,dispatch, user);
          if (result) {
            setCreatedProfile("done");
          }
        }}
        >
      <Text style={styles.textBtn}>{Json.createProfile.label_4}</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  avatarBox:{
      width: "35%",
      height: "20%",
      borderRadius: 100,
      backgroundColor: "#D4D4D4",
      position: "relative"
  },
  avatar:{
    width: "100%",
    height: "100%",
    borderRadius: 100,
    objectFit: "cover"
  },
  camera:{
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 5,
    right: 1
  },
  gallery:{
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 5,
    left: 1,
  },
  icons:{
    width: "100%",
    height: "100%"
  },
  inputsBox:{
    width: "90%",
    height: "13%",
    gap: 10
  },
  labels:{
    fontSize: 15,
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
  textBtn:{
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold"
  },
  btn:{
    width: "80%",
    height: "9%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
});
