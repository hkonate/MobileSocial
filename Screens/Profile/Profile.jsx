import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import Fetch from "../../assets/Utils/useFetch";

const Profile = ({ navigation, route }) => {
  const { user } = useContext(RequestContext);
  useFocusEffect(
    React.useCallback(() => {
      const id = route.params || user.id;
      const fetchProfile = async () => {
        try {
          const fetch = await Fetch();
          const res = await fetch.GET(`profile/${id}`);
          console.log(res);
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
      <Button title="modifier profile" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
