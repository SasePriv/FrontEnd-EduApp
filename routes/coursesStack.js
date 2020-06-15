import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import MyCourses from '../screens/myCourses'
import Curso from '../screens/curso'

const Stack = createStackNavigator();

export default function CoursesStack() {
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
                    name="Mis Cursos" 
                    component={MyCourses}
                    options={{
                        headerTitleStyle: styles.headerTitle
                    }}
                />
                <Stack.Screen name="Curso" component={Curso}/>
            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    }
})
