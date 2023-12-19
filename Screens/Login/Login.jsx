import { React, useContext, useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Platform,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { handleSubmit } from "./Login.functions";
import Json from "../../assets/Utils/fr.json";
import { Link } from "@react-navigation/native"

export const Login = ({ navigation }, states) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePwd, setHidePwd] = useState(true);
  const [showEmailTip, setEmailTip] = useState(false);
  const [showPasswordTip, setPasswordTip] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { dispatch, isFetching, error } = useContext(RequestContext);
  const { setUser } = states;

  return (
    <ScrollView style={styles.container} >
      <Text style={styles.title}>{Json.login.label_1}</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder={Json.login.label_2}
          onChangeText={(text) => setEmail(text)}
          required={true}
          style={styles.input}
        />
        <Tooltip
          isVisible={showEmailTip}
          content={
            <View>
              <Text> {Json.login.format_1}</Text>
            </View>
          }
          onClose={() => setEmailTip(false)}
          placement="top"
          // below is for the status bar of react navigation bar
          topAdjustment={
            Platform.OS === "android" ? -StatusBar.currentHeight : 0
          }
        >
          <TouchableOpacity
            style={styles.infoBulle}
            onPress={() => setEmailTip(true)}
          >
            <Text style={styles.text}>i</Text>
          </TouchableOpacity>
        </Tooltip>
      </View>
      <View style={styles.inputBox}>
      {
          hidePwd ? 
        <TouchableOpacity onPress={()=>setHidePwd(false)} style={styles.eyes}>
        <Image style={{width: "100%", height: "100%"}} source={require("../../assets/Images/8665352_eye_slash_icon.png")}  />
        </TouchableOpacity> :
        <TouchableOpacity onPress={()=>setHidePwd(true)} style={styles.eyes}>
          <Image style={{width: "100%", height: "100%"}} source={require("../../assets/Images/8664880_eye_view_icon.png")}  />
        </TouchableOpacity>
        }
        <TextInput
          style={styles.input}
          placeholder={Json.login.label_3}
          secureTextEntry={hidePwd}
          onChangeText={(text) => setPassword(text)}
          required={true}
        />
        <Tooltip
          isVisible={showPasswordTip}
          content={
            <View>
              <Text> {Json.login.format_2}</Text>
            </View>
          }
          onClose={() => setPasswordTip(false)}
          placement="top"
          // below is for the status bar of react navigation bar
          topAdjustment={
            Platform.OS === "android" ? -StatusBar.currentHeight : 0
          }
        >
          <TouchableOpacity
            style={styles.infoBulle}
            onPress={() => setPasswordTip(true)}
          >
            <Text style={styles.text}>i</Text>
          </TouchableOpacity>
        </Tooltip>
      </View>
      {!isFetching ? (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const rep = await handleSubmit(email, password, dispatch);
            if (!rep.id) {
              setErrorMessage(rep);
            } else {
              setUser(rep);
            }
          }}
          disabled={isFetching}
        >
          <Text style={styles.textBtn}>{Json.login.label_1}</Text>
          </TouchableOpacity>
      ) : (
        <ActivityIndicator style={styles.loading} size="small" color="#0000ff" />
      )}
      {error && <Text style={styles.textErr}>{Json.login[errorMessage]}</Text>}
      <View style={styles.linkContainer}>
      <Text style={styles.account}>{Json.login.label_8}</Text>
        <Link style={styles.link} to={{screen: Json.register.title}}>{Json.register.title}</Link>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 60,
    marginTop: 35
  },
  input:{
    backgroundColor: "#FAFAFA",
    width: 240,
    height: 45,
    borderRadius: 16,
    paddingLeft: 10,
    marginBottom: 40
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "relative"
  },
  infoBulle: {
    width: 20,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    paddingLeft: 8,
    marginBottom: 40
  },
  button:{
    backgroundColor: "#584CF4",
    width: 255,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10
  },
  textBtn:{
    color: "white"
  },
  textErr:{
    color: "red",
    textAlign: "center",
    marginTop: 10
  },
  loading:{
    marginTop: 10,
  },
  account:{
    color: "gray",
    textAlign: "center"
  },  
  link:{
    color: "#584CF4",
    marginLeft: 5
  }, 
  linkContainer:{
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center"
  },
  eyes:{
    position: "absolute",
    width: 20,
    height: 20, 
    zIndex: 2,
    right: 45,
    bottom: 52
  }
});
