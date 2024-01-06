import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./Screens/Login/Login";
import { Register } from "./Screens/Register/Register";
import { RequestContextProvider } from "./Context/RequestContext/RequestContext";
import { CreateProfile } from "./Screens/CreateProfile/createProfile";
import Json from "./assets/Utils/fr.json";
import { Home } from "./Screens/Home/Home";
import useSecureStore from "./assets/Utils/useSecureStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Event from "./Screens/Event/Event";
import EditEvent from "./Screens/EditEvent/EditEvent";
import CreateEvent from "./Screens/CreateEvent/CreateEvent";
import Profile from "./Screens/Profile/Profile";
import EditProfile from "./Screens/EditProfile/EditProfile";
import Filter from "./Screens/Filter/Filter";

const Stack = createNativeStackNavigator();

export default function App() {
  const { getValue } = useSecureStore();
  const [user, setUser] = useState(null)
  const [createdProfile, setCreatedProfile] = useState(null);
  const [onBoarding, setOnBoarding] = useState(null);

  useEffect(()=>{
    const fetchStorage = async ()=>{
      const user = JSON.parse(await getValue("userCredentials"))
      const profile = JSON.parse(await getValue("createdProfile"))
      const boarding = JSON.parse(await getValue("onbording"))
      setUser(user)
      setCreatedProfile(profile)
      setOnBoarding(boarding)
    }
    fetchStorage()
  },[])

  Stack;
  const states = {
    user,
    setUser,
    setCreatedProfile,
    setOnBoarding,
  };
  return (
    <RequestContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Json.login.label_1}>
          {!user ? (
            <>
              <Stack.Screen
                name={Json.login.label_1}
                options={{
                  title: null,
                  headerShown: false
                }}
              >
                {(props) => <Login {...props} states={states} />}
              </Stack.Screen>
              <Stack.Screen  name={Json.register.title} options={{
                  title: null,
                  headerShown: false
                }}>
                {(props) => <Register {...props} states={states} />}
              </Stack.Screen>
            </>
          ) : (createdProfile !== "done")  ? (
            <Stack.Screen name={Json.createProfile.title}>
              {(props) => <CreateProfile {...props} states={states} user={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name={Json.home.title} options={{ title: null, headerShown: false }}>
                {(props) => <Home {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.event.title} options={{ title: null }}>
                {(props) => <Event {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.editEvent.title}>
                {(props) => <EditEvent {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.profile.title}>
                {(props) => <Profile {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.editProfile.title}>
                {(props) => <EditProfile {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.createEvent.title}>
                {(props) => <CreateEvent {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.filter.title} options={{title: null, headerShown: false }}>
                {(props) => <Filter {...props} />}
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
    backgroundColor: "white",
    paddingTop: 20,
  },
});
