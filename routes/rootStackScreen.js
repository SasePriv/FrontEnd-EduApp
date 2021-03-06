import React from 'react';
import { createStackNavigator }from '@react-navigation/stack';

import RootScreen from '../screens/rootScreen';
import Register from '../screens/registerScreen'
import ForgorPassword from '../screens/forgotPassword'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="login" component={RootScreen}/>
        <RootStack.Screen name="register" component={Register}/>
        <RootStack.Screen name="forgotPassword" component={ForgorPassword}/>
    </RootStack.Navigator>
)

export default RootStackScreen;

