import { StyleSheet, View, TextInput, Image, Button, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getPermissionAndGetPicture, getPermissionAndTakePicture, handleUpdateProfile } from "./EditProfile.Function";
import Gallery from "../../assets/Images/gallery.png"
import Camera from "../../assets/Images/camera.png"
import Json from "../../assets/Utils/fr.json"

const EditProfile = ({route, navigation: {goBack}}) => {
  const [profile, setProfile] = useState(null)
  useEffect(()=>{
    const data = route.params
    setProfile({...data, picture: "" })
  },[])
  return (
    <View style={styles.container}>
       <View
        style={styles.avatarBox}
        >
      {profile?.picture && (
        <Image
        source={{ uri: profile?.picture }}
        style={styles.avatar}
        />
        )}
        <TouchableOpacity onPress={()=>getPermissionAndGetPicture(setProfile)} style={styles.gallery}>
          <Image style={styles.icons} source={Gallery} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.camera} onPress={()=>getPermissionAndTakePicture(setProfile)}>
        <Image style={styles.icons} source={Camera} />
        </TouchableOpacity>
        </View>
        <View style={styles.inputsBox}>
          <Text style={styles.labels}>{Json.editProfile.label_4}</Text>
        <TextInput style={styles.inputs} value={profile?.user?.pseudo} onChangeText={(text)=>setProfile(prev=>({...prev,user:{
        ...prev.user,
        pseudo: text,
      }}))}/>
        </View>
        <View style={styles.inputsBox}>
        <Text style={styles.labels}>{Json.editProfile.label_1}</Text>
      <TextInput style={styles.inputs} value={profile?.bio} onChangeText={(text)=>setProfile(prev=>({...prev, bio: text}))} />
       </View>
      <View style={styles.inputsBox}>
      <Text style={styles.labels}>{Json.editProfile.label_2}</Text>
      <TextInput style={styles.inputs} value={profile?.hobbies} onChangeText={(text)=>setProfile(prev=>({...prev, hobbies: text}))} />
     </View>
     <TouchableOpacity style={styles.btn}  onPress={async ()=>{
        const res = await handleUpdateProfile(profile)
        if(res) goBack()}}>
      <Text style={styles.textBtn}>{Json.editProfile.label_5}</Text>
     </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

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
    objectFit: "contain"
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
  btn:{
    backgroundColor: "#584CF4",
    width: "80%",
    height: "9%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn:{
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold"
  },
});
