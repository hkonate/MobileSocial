import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Fetch from "../../assets/Utils/useFetch";
import JSON from "../../assets/Utils/fr.json"
const Profile = ({ navigation, route }) => {
  const { user } = useContext(RequestContext);
  const [data, setData] = useState(null)
  useFocusEffect(
    React.useCallback(() => {
      const id = route.params || user.id;
      const fetchProfile = async () => {
        try {
          const fetch = await Fetch();
          const res = await fetch.GET(`profile/${id}`);
          if(res){
          setData(res)
        }
        } catch (error) {
          alert("error");
        }
      };
      fetchProfile();
    }, [])
  );
  return (
    <View>
      <Text>Profile</Text>
      <Button title="modifier profile" onPress={()=>{navigation.navigate(JSON.editProfile.title, data)}}/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
