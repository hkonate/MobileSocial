import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Screens/Login/Login";
import { Register } from "./Screens/Register/Register";
import { AuthContextProvider } from "./Context/AuthContext/AuthContext";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen
            name="Login"
            options={{
              title: null,
            }}
            component={Login}
          />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
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
