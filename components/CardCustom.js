import React, { useState }  from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import Config from '../config'
import LinearGradient from 'react-native-linear-gradient';

export default function CardCustom( {title, icon} ) {

    return(     
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1.5, y: 0}} colors={['#e55a5b', '#fedf67']} style={[styles.container, styles.shadow, styles.contianerOut]}>
                <View style={[styles.container, styles.shadow, styles.contianerInside]}>
                <Text style={[styles.textCard]}>{title}</Text>
                </View>            
                <Ionicons style={styles.btnAdd} name={icon} size={65} color="white" />
            </LinearGradient>        
    )
}

const styles = StyleSheet.create({
    container:{        
        width: "87.5%",
        margin: 25,        
        // marginHorizontal: 20,
        borderColor: "#000",
        borderWidth: 0,
        // backgroundColor: Config.primaryColor,
        height: 250,
        display: "flex",
        borderRadius: 40,
        marginBottom: 10    
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
    contianerOut: {
        
    },
    contianerInside: {
        width: "80%",
        margin: 0,
        borderBottomRightRadius: 90,
        borderTopRightRadius: 90,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btnAdd: {
        position: "absolute",
        right: 0,        
        bottom: "39%",
        marginRight: 10
    },
    textCard:{
        width: "80%",
        fontSize: 30,
        fontWeight: "bold",
        // backgroundColor: "blue",        
        textAlign: "center",
        
    }
})