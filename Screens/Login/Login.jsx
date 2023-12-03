import { React, useContext, useState } from "react";
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
import { RequestContext } from "../../Context/RequestContext/RequestContext";
import { handleSubmit } from "./Login.functions";
import Json from "../../assets/Utils/fr.json";
export const Login = ({ navigation }, states) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showEmailTip, setEmailTip] = useState(false);
  const [showPasswordTip, setPasswordTip] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { dispatch, isFetching, error } = useContext(RequestContext);
  const { setUser } = states;

  return (
    <View>
      <Text>{Json.login.title}</Text>
      <Text>{Json.login.label_1}</Text>
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
        <TextInput
          style={styles.input}
          placeholder={Json.login.label_3}
          secureTextEntry={true}
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
        <Button
          title={Json.login.label_1}
          onPress={async () => {
            const rep = await handleSubmit(email, password, dispatch);
            if (!rep.id) {
              setErrorMessage(rep);
            } else {
              setUser(rep);
            }
          }}
          disabled={isFetching}
        />
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
      {error && <Text>{Json.login[errorMessage]}</Text>}
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
