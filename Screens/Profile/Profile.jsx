import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import ReadMore from '@fawazahmed/react-native-read-more';
import Fetch from "../../assets/Utils/useFetch";
import Json from "../../assets/Utils/fr.json";
import Modify from "../../assets/Images/modify.png"
import RectangularCard from "../../Component/RectangularCard";
import useSecureStore from "../../assets/Utils/useSecureStore";
import { RequestSucceed } from "../../Context/RequestContext/RequestActions";
import Constant from "expo-constants"

const Profile = ({ navigation, route, states }) => {
  const { user, dispatch } = useContext(RequestContext);
  const [data, setData] = useState(null)
  const {setUser} = states
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
    <View style={styles.container}>
      <View style={styles.top} >
        <View style={styles.imageBox}>
          {data &&( data.picture ? 
          <Image style={styles.avatar} source={{uri: data.picture}} />:
          <Text style={styles.initial}>{data?.user?.pseudo[0]?.toUpperCase()}</Text>)
          }
        </View>
        <Text numberOfLines={1} style={styles.pseudo}>{data?.user?.pseudo[0]?.toUpperCase() + data?.user?.pseudo?.slice(1).trim()}</Text>
        <View style={styles.infosBox}>
          <View style={styles.leftInfo}>
            <Text style={styles.number}>{data?.user?.listOfEventsCreated.length}</Text>
            <Text style={styles.subString}>{Json.profile.label_9}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.number}>{data?.user?.listOfEventsToAttend.length}</Text>
            <Text style={styles.subString}>{Json.profile.label_10}</Text>
          </View>
        </View>
       {user?.id === data?.user?.id &&
       <View style={styles.btnBox}>
       <TouchableOpacity  style={styles.editBtn} onPress={()=>{navigation.navigate(Json.editProfile.title, data)}}>
          <Image style={styles.logoBtn} source={Modify}/>
          <Text style={styles.textBtn}>{Json.profile.label_8}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={async ()=>{
          const {removeValue} = useSecureStore()
          const fetchToken = await Fetch()
          const res = await fetchToken.DELETE("auth")
          if(res){
            await removeValue("userCredentials")
            dispatch(RequestSucceed(null))
            setUser(null)
          }
        }}>
          <Text>{Json.profile.label_11}</Text>
        </TouchableOpacity>
        </View>
        }
        
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.bot}>
        <Text style={styles.subtitle}>{Json.profile.label_6}</Text>
        <ReadMore 
        style={{fontSize: 15, marginBottom: 15}}
        numberOfLines={4} 
        seeMoreText={Json.profile.label_4}
        seeMoreStyle={{color: "#584CF4"}}
        seeLessText={Json.profile.label_5}
        seeLessStyle={{color: "#584CF4"}}
        >{data?.bio}
        </ReadMore>
        <Text style={styles.subtitle}>{Json.profile.label_7}</Text>
        <ReadMore 
        style={{fontSize: 15, marginBottom: 15}}
        numberOfLines={2} 
        seeMoreText={Json.profile.label_4}
        seeMoreStyle={{color: "#584CF4"}}
        seeLessText={Json.profile.label_5}
        seeLessStyle={{color: "#584CF4"}}
        >{data?.hobbies}
        </ReadMore>
        <Text numberOfLines={1} style={styles.subtitle}>{`${Json.profile.label_3} ${data?.user?.pseudo[0]?.toUpperCase() + data?.user?.pseudo.slice(1).trim()}`}</Text>
       {data?.user?.listOfEventsCreated && <RectangularCard events={data?.user?.listOfEventsCreated} navigation={navigation} />}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    paddingTop: Constant.statusBarHeight + 20
  },
  top:{
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15
  },
  bot:{
    height: "45%",
    width: "100%",
  },
  imageBox:{
    backgroundColor: "red",
    height: "35%",
    width: "35%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  initial:{
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },
  avatar:{
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  pseudo:{
    fontSize: 18,
    fontWeight: "bold"
  },
  infosBox:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  btnBox:{
    flexDirection: "row",
    width: "100%",
    height: "20%",
    justifyContent: "space-between",
    marginBottom: 20
  },
  leftInfo:{
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rightInfo:{
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "black"
  },
  number:{
    fontSize: 16,
    fontWeight: "bold",
  },
  subString:{
    fontSize: 12,
    color: "lightgrey"
  },
  editBtn:{
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#584CF4",
    alignItems: "center",
    justifyContent: "center",
    width: "49%",
    height: "100%",
    padding: 10
  },
  deleteBtn:{
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "49%",
    height: "100%",
    padding: 10
  },
  logoBtn:{
    marginRight: 10,
    width: 20,
    height: 20
  },
  textBtn:{
    color: "#584CF4",
    fontSize: 14
  },
  subtitle:{
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 15,
  }
});
