import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import AdminPanel from '../screens/adminPanel'
import TeacherPanel from '../screens/teacherPanel'
import CategoryPanel from '../screens/categoryPanel'

const Stack = createStackNavigator();

export default function AdminStack() {
    return (
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                headerMode="float"
                >
                <Stack.Screen 
                    name="AdminPanel" 
                    component={AdminPanel}
                    options={{
                        headerTitleStyle: styles.headerTitle
                    }}
                />
                <Stack.Screen name="Teacher Panel" component={TeacherPanel}/>
                <Stack.Screen name="Category Panel" component={CategoryPanel}/>
            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    }
})
