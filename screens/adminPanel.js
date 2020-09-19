import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import Config from '../config'
import LinearGradient from 'react-native-linear-gradient';

export default function AdminPanel({navigation}) {

    const handlePressTeachers = () => {
        navigation.navigate("Teacher Panel")
    }

    const handlePressCategory = () => {
        navigation.navigate("Category Panel")
    }

    return(
        <View>
            <TouchableOpacity onPress={handlePressTeachers}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={[styles.linearGradient, styles.shadow]}>
                <Text style={styles.subTitle}>Administrador</Text>
                <Text style={styles.subTitle}>de Profesores</Text>
                <FontAwesome5 style={styles.icon} name="chalkboard-teacher" size={50} color="#ffffff" />
            </LinearGradient>                
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePressCategory}>
            <View style={[styles.cardBlue, styles.shadow, styles.cardWhite]}>
                <Text style={[styles.subTitle, styles.blueText]}>Administrador</Text>
                <Text style={[styles.subTitle, styles.blueText]}>de Categorias</Text>
                <FontAwesome5 style={styles.icon} name="chalkboard-teacher" size={50} color={Config.primaryColor} />
            </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        // padding: 10,
        // paddingBottom: 0,
        fontSize: 40,
        alignContent: "center",
        color: "#ffffff",
        fontWeight: "bold"
    },
    cardBlue:{
        backgroundColor: Config.primaryColor,
        height: 250,
        margin: 30,
        borderRadius: 20,
        padding: 20,        
        alignItems: "center",
        marginVertical: 10
    },
    linearGradient:{
        height: 250,
        margin: 30,
        borderRadius: 20,
        padding: 20,        
        alignItems: "center",
        marginVertical: 10
    },
    icon:{
        marginTop: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 6,        
    },
    cardWhite: {
        backgroundColor: "white"
    },
    blueText: {
        color: Config.primaryColor,
    }
})