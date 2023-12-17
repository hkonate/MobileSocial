import { StyleSheet, View, TextInput, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getPermissionAndGetPicture, getPermissionAndTakePicture, handleUpdateProfile } from "./EditProfile.Function";

const EditProfile = ({route, navigation: {goBack}}) => {
  const [profile, setProfile] = useState(null)
  useEffect(()=>{
    const data = route.params
    setProfile({...data, picture: "" })
  },[])
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
      {profile?.picture && (
        <Image
        source={{ uri: profile?.picture }}
        style={{ width: "100%", height: "100%" }}
        />
        )}
        </View>
        <Button title="avatar" onPress={()=>getPermissionAndGetPicture(setProfile)} />
      <Button title="picture" onPress={()=>getPermissionAndTakePicture(setProfile)} />
      <TextInput value={profile?.user?.pseudo} onChangeText={(text)=>setProfile(prev=>({...prev,user:{
        ...prev.user,
        pseudo: text,
      }}))}/>
      <TextInput value={profile?.bio} onChangeText={(text)=>setProfile(prev=>({...prev, bio: text}))} />
      <TextInput value={profile?.hobbies} onChangeText={(text)=>setProfile(prev=>({...prev, hobbies: text}))} />
      <Button title="modifier le profil" onPress={async ()=>{
        const res = await handleUpdateProfile(profile)
        if(res) goBack()}}/>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
