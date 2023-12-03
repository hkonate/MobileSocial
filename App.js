import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./Screens/Login/Login";
import { Register } from "./Screens/Register/Register";
import { RequestContextProvider } from "./Context/RequestContext/RequestContext";
import { CreateProfile } from "./Screens/Profile/createProfile";
import Json from "./assets/Utils/fr.json";
import { Home } from "./Screens/Home/Home";
import useSecureStore from "./assets/Utils/useSecureStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Event from "./Screens/Event/Event";

const Stack = createNativeStackNavigator();

export default function App() {
  const { getValue } = useSecureStore();
  const [user, setUser] = useState(async () =>
    JSON.parse(await getValue("userCredentials"))
  );
  const [createdProfile, setCreatedProfile] = useState(async () =>
    JSON.parse(await getValue("createdProfile"))
  );
  const [onBoarding, setOnBoarding] = useState(async () =>
    JSON.parse(await getValue("onbording"))
  );
  Stack;
  const states = {
    setUser,
    setCreatedProfile,
    setOnBoarding,
  };

  return (
    <RequestContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Json.register.title}>
          {!user ? (
            <>
              <Stack.Screen
                name={Json.login.title}
                options={{
                  title: null,
                }}
              >
                {(props) => <Login {...props} states={states} />}
              </Stack.Screen>
              <Stack.Screen name={Json.register.title}>
                {(props) => <Register {...props} states={states} />}
              </Stack.Screen>
            </>
          ) : !createdProfile ? (
            <Stack.Screen name={Json.profile.title}>
              {(props) => <CreateProfile {...props} states={states} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name={Json.home.title} options={{ title: null }}>
                {(props) => <Home {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.event.title} options={{ title: null }}>
                {(props) => <Event {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RequestContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
