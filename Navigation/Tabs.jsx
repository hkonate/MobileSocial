import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Home } from "../Screens/Home/Home";
import Profile from "../Screens/Profile/Profile";
import Json from "../assets/Utils/fr.json";
import CreateEvent from "../Screens/CreateEvent/CreateEvent";

const Tabs = ({states}) => {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()
    console.log(Json.home.title);
  return (
    <Tab.Navigator
    initialRouteName={Json.home.title}
    screenOptions={{
      title: null,
      headerShown: false,
      tabBarActiveTintColor: "#584CF4"
    }}
    >
      <Tab.Screen
      name={`bottomNav${Json.home.title}`}
      options={{
        tabBarLabel: Json.home.title,
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)
      }}
     >
     {()=><Stack.Navigator >
     <Stack.Screen name={Json.home.title} options={{ headerShown: false }}>
       {(props)=><Home {...props} />}
     </Stack.Screen>
     </Stack.Navigator>
      }
      </Tab.Screen>  
      <Tab.Screen
        name={`bottomNav${Json.createEvent.title}`}
        options={{
          tabBarLabel: Json.createEvent.title,
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="plus-circle" color={color} size={size} />)
        }}
      >{
        ()=><Stack.Navigator >
        <Stack.Screen name={Json.createEvent.title} options={{ headerShown: false }}>
       { (props)=><CreateEvent {...props} />}
        </Stack.Screen>
        </Stack.Navigator>
      }
       </Tab.Screen>  

      <Tab.Screen 
      name={`bottomNav${Json.profile.title}`}
      options={{
          tabBarLabel: Json.profile.title,
          tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />)
       }}>
        {
          ()=><Stack.Navigator >
            <Stack.Screen name={Json.profile.title} options={{ headerShown: false }}>
            {(props)=><Profile {...props} states={states} />}
            </Stack.Screen>
        </Stack.Navigator>
        }
       </Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs