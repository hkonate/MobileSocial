import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./Screens/Login/Login";
import { Register } from "./Screens/Register/Register";
import { RequestContextProvider } from "./Context/RequestContext/RequestContext";
import { CreateProfile } from "./Screens/CreateProfile/createProfile";
import Json from "./assets/Utils/fr.json";
import useSecureStore from "./assets/Utils/useSecureStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Event from "./Screens/Event/Event";
import EditEvent from "./Screens/EditEvent/EditEvent";
import EditProfile from "./Screens/EditProfile/EditProfile";
import Profile from "./Screens/Profile/Profile";
import Filter from "./Screens/Filter/Filter";
import Tabs from "./Navigation/Tabs";

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
                  headerShown: false,
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
            <Stack.Screen name="Tabs" options={{headerShown: false}}>
              {()=><Tabs states={states} />}
            </Stack.Screen>
              <Stack.Screen name={Json.event.title} options={{ title: null }}>
                {(props) => <Event {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.editEvent.title}>
                {(props) => <EditEvent {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.editProfile.title}>
                {(props) => <EditProfile {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.filter.title} options={{title: null, headerShown: false }}>
                {(props) => <Filter {...props} />}
              </Stack.Screen>
              <Stack.Screen name={Json.profile.title} options={{title: null,  headerShown: false }}>
                {(props)=><Profile {...props} states={states} />}
            </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RequestContextProvider>
  );
}
