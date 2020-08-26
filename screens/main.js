import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Login from '../components/login'
import HomeStack from '../routes/homeStack'
import CoursesStack from '../routes/coursesStack'
import AddOptionStack from '../routes/addOptionStack'
import AdminStack from '../routes/adminStack'
import AsyncStorage from '@react-native-community/async-storage';
import ProfileStack from '../routes/profileStack'
import Config from '../config'


const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {

  const [typeOfUser, setTypeOfUser] = useState(null)

  useEffect(() =>{ 
    handleAsync()
  },[])

  const handleAsync  = async() => {
    let dataAsync;
    try {
      dataAsync = await AsyncStorage.getItem('userData')
    } catch (error) {
      console.log(error)
    }

    if(dataAsync){
      setTypeOfUser(JSON.parse(dataAsync).typeOfUser)
    }
  }

  console.log(typeOfUser)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"    
      barStyle={{ backgroundColor: Config.primaryColor }}
    >
      {/* <Tab.Screen
        name="Conference"
        component={Login}
        options={{
          tabBarLabel: 'Conference',
          // tabBarColor: '#3F51B5',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="video" color={color} size={27} />
          ),
        }}
      /> */}
      
      <Tab.Screen
        name="Courses"
        component={CoursesStack}
        options={{
          tabBarLabel: 'Mis Cursos',
          // tabBarColor: '#009688',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={27} />
          ),
        }}
      />
      
      
      {typeOfUser == "teacher" 
      ? 
      <Tab.Screen
        name="Add Courses"
        component={AddOptionStack}
        options={{
          tabBarLabel: 'Añadir Cursos',
          // tabBarColor: '#009688',
          tabBarIcon: ({ color }) => (            
            <MaterialIcons name="library-add" color={color} size={27} />
          ),
        }}
      />
      :
      null
      }

      {typeOfUser == "admin" 
      ? 
      <Tab.Screen
        name="Admin"
        component={AdminStack}
        options={{
          tabBarLabel: 'Admin Panel',
          // tabBarColor: '#009688',
          tabBarIcon: ({ color }) => (                        
            <Feather name="server" color={color} size={25} />
          ),
        }}
      />
      :
      null
      }
      
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          // tabBarColor: '#795548',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          // tabBarColor: '#607D8B',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={27} />
          ),
        }}
      />  
    </Tab.Navigator>
  );
}