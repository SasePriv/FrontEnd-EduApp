import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import MyProfile from '../screens/myProfile'

const Stack = createStackNavigator();

export default function ProfileStack() {
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
                    name="Mi Perfil" 
                    component={MyProfile}
                    options={{
                        headerTitleStyle: styles.headerTitle
                    }}
                />
                {/* <Stack.Screen name="Category" component={CoursesCategory}/> */}
            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    }
})
