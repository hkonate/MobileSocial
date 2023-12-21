import { React, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import Json from "../../assets/Utils/fr.json";
import { handleRegister } from "./Register.function";
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { Link } from "@react-navigation/native"
export const Register = ({ states }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const [hidePwd, setHidePwd] = useState(true);
  const [hideConfirmPwd, setHideConfirmPwd] = useState(true);
  const [showEmailTip, setEmailTip] = useState(false);
  const [showPasswordTip, setPasswordTip] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { dispatch, isFetching, error } = useContext(RequestContext);
  const { setUser } = states;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Json.register.title}</Text>
      <View>
      <TextInput
        style={styles.input}
        placeholder={Json.register.label_1}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, firstname: text }));
        }}
      />
      <TextInput
      style={styles.input}
        placeholder={Json.register.label_2}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, lastname: text }));
        }}
      />
      <TextInput
      style={styles.input}
        placeholder={Json.register.label_3}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, pseudo: text }));
        }}
      />
      <View style={styles.inputBox}>
        <TextInput
          placeholder={Json.register.label_4}
          onChangeText={(text) => {
            setUserCredentials((prev) => ({ ...prev, email: text }));
          }}
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
          onChangeText={(text) =>
            setUserCredentials((prev) => ({ ...prev, pwd: text }))
          }
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
      <View>
      <TextInput
        style={styles.input}
        placeholder={Json.register.label_6}
        secureTextEntry={hideConfirmPwd}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, confirmPwd: text }));
        }}
      />
       {
          hideConfirmPwd ? 
        <TouchableOpacity onPress={()=>setHideConfirmPwd(false)} style={styles.eyes}>
        <Image style={{width: "100%", height: "100%"}} source={require("../../assets/Images/8665352_eye_slash_icon.png")}  />
        </TouchableOpacity> :
        <TouchableOpacity onPress={()=>setHideConfirmPwd(true)} style={styles.eyes}>
          <Image style={{width: "100%", height: "100%"}} source={require("../../assets/Images/8664880_eye_view_icon.png")}  />
        </TouchableOpacity>
        }
      </View>
      </View>
      {!isFetching ? (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (errorMessage) {
              setErrorMessage(null);
            }
            const res = await handleRegister(userCredentials, dispatch);
            if (!res.id) {
              setErrorMessage(res);
            } else {
              setUser(res);
            }
          }}
        >
          <Text style={styles.textBtn}>{Json.register.title}</Text>
          </TouchableOpacity>
      ) : (
        <ActivityIndicator style={styles.loading} size="meduim" color="#0000ff" />
      )}
      {error && <Text style={styles.textErr}>{Json.register[errorMessage]}</Text>}
      <View style={styles.linkContainer}>
      <Text style={styles.account}>{Json.register.label_7}</Text>
        <Link style={styles.link} to={{screen: Json.login.label_1}}>{Json.login.label_1}</Link>
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
    marginBottom: 30,
    marginTop: 40
  },
  input:{
    backgroundColor: "#FAFAFA",
    width: 240,
    height: 45,
    borderRadius: 16,
    paddingLeft: 10,
    marginBottom: 20
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
    backgroundColor: "white",
    paddingLeft: 8,
    backgroundColor: "#FAFAFA",
    marginBottom: 22
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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  eyes:{
    position: "absolute",
    width: 20,
    height: 20, 
    zIndex: 2,
    right: 45,
    bottom: 33
  }

});
