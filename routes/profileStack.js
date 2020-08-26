import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'
import MyProfile from '../screens/myProfile'
import EditProfile from '../screens/editProfile'
import ChangePassword from '../screens/changePassword'
import EliminateUser from '../screens/eliminateUser'

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
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                <Stack.Screen name="EliminateUser" component={EliminateUser}/>

            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    }
})
