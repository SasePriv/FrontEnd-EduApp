import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../components/login'
import MyCourses from './myCourses'
import HomeStack from '../routes/homeStack'
import CoursesStack from '../routes/coursesStack'

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"    
      barStyle={{ backgroundColor: '#0080ff' }}
    >
      <Tab.Screen
        name="Conference"
        component={Login}
        options={{
          tabBarLabel: 'Conference',
          // tabBarColor: '#3F51B5',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="video" color={color} size={27} />
          ),
        }}
      />
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
        component={Login}
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