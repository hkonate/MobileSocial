import { React, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import Json from "../../assets/Utils/fr.json";
import { handleRegister } from "./Register.function";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

export const Register = ({ navigation }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const [showEmailTip, setEmailTip] = useState(false);
  const [showPasswordTip, setPasswordTip] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { dispatch, isFetching, error } = useContext(AuthContext);

  return (
    <View>
      <Text>{Json.register.title}</Text>
      <TextInput
        placeholder={Json.register.label_1}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, firstname: text }));
        }}
      />
      <TextInput
        placeholder={Json.register.label_2}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, lastname: text }));
        }}
      />
      <TextInput
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
        <TextInput
          style={styles.input}
          placeholder={Json.login.label_3}
          secureTextEntry={true}
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
      <TextInput
        style={styles.input}
        placeholder={Json.register.label_6}
        onChangeText={(text) => {
          setUserCredentials((prev) => ({ ...prev, confirmPwd: text }));
        }}
      />
      {!isFetching ? (
        <Button
          title="Login"
          onPress={async () => {
            if (errorMessage) {
              setErrorMessage(null);
            }
            const err = await handleRegister(userCredentials, dispatch);
            if (err) {
              setErrorMessage(err);
            } else {
              navigation.navigate("Login");
            }
          }}
        />
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
      {error && <Text>{Json.register[errorMessage]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 40,
  },
  button: {
    padding: 10,
    borderRadius: 4,
  },
  input: {
    width: "70%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoBulle: {
    width: 20,
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 8,
  },
});
