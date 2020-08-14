import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import { StyleSheet, Button, View, Text, Image } from 'react-native'
import Home from '../screens/home';
import CoursesCategory from '../screens/coursesCategory'
import BillScreen from '../screens/billScreen'
import Config from '../config'
import { FontAwesome5 } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

export default function HomeStack() {

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
                    name="Home" 
                    component={Home}
                    options={{
                        headerTitleStyle: styles.headerTitle,
                        title: "EL CULTIVO",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            textAlign: "center",
                            width: 260,
                            //backgroundColor: "green",
                            justifyContent: "center",
                            fontSize: 24,
                            color: Config.primaryColor
                        },
                        headerLeft : () => {
                            return (
                                <View>
                                    <Image 
                                        style={styles.logoLogin}
                                        source={require('../assets/logoHeader.jpeg')}
                                    />
                                </View>
                            )
                        }
                    }}
                />
                <Stack.Screen name="Category" component={CoursesCategory}/>
            </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignSelf: 'center'
    },
    containerWallet:{      
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 5  ,
        marginRight: 10,
        // padding: 5,
    },
    iconCoin:{
        marginTop: 2,
        fontWeight: "bold",            
    },
    coinText:{
      backgroundColor: "#fff",
      paddingRight: 10,
      justifyContent: "center",
    },
    textMoney: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,      
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,           
    },
    TrapezoidStyle: {
        width: 45,
        height: 0,
        borderBottomColor: Config.primaryColor,
        borderBottomWidth: 25,
        borderLeftWidth: 0,
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        alignItems: "center",            
    },
    logoLogin: {
        width: 45,
        height: 45,
        marginLeft: 10,
        marginBottom: 5
        // margin: 10,
        // marginTop: 50,
        // marginBottom: 50
    }
})
