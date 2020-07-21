import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import MyCourses from '../screens/myCourses'
import Curso from '../screens/curso'
import AddModule from '../screens/addModule'
import AddCourses from '../screens/addCourse'
import AddOptions from '../screens/addOptions'
import ModuleForm from '../screens/moduleForm'
import MyCoursesCreated from '../screens/myCoursesCreated'

const Stack = createStackNavigator();

export default function AddOptionStack() {
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
                    name="Nueva Opcion" 
                    component={AddOptions}
                    options={{
                        headerTitleStyle: styles.headerTitle
                    }}
                />
                <Stack.Screen name="Añadir Curso" component={AddCourses}/>
                <Stack.Screen name="MyCoursesCreated" component={MyCoursesCreated}/>
                <Stack.Screen 
                    name="AddModule" 
                    component={AddModule}                    
                />
                <Stack.Screen name="ModuleForm" component={ModuleForm}/>
            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    }
})
