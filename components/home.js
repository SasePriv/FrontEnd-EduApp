import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView} from 'react-native'
import { Appbar } from 'react-native-paper';
import  HeaderMenu  from './headerMenu'
import Nav from './nav'
import Header from './header'
import Card from './card'

export default function Home(){
    return(
        <View style={styles.containerHome}>
            <HeaderMenu/>
            {/* <Nav /> */}
            <Header/>
            <Card/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHome: {
        flex: 1
    },
    griya:{
        flex: 1,
        // paddingTop:80,      
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    contentH:{
      flex: 1,
      paddingTop:80,
    },
    filas: {
        width: 100,
        height: 100,
        padding: 20,
        margin: 10,
        backgroundColor: 'green',
        borderRadius: 10        
    },
    filas1: {
      width: 100,
      height: 100,
      padding: 20,
      margin: 10,
      marginBottom: 0,
      backgroundColor: 'red',
      borderRadius: 10        
    },
    filas2: {
      width: 100,
      height: 100,
      padding: 20,
      margin: 10,
      backgroundColor: 'grey' ,
      borderRadius: 10       
    },
    subTitle:{
      fontWeight: 'bold',
      fontSize: 20,
      padding: 20,
      paddingLeft: 40
    },
    cajaNews:{
      flex: 1,
      alignItems: 'center'  
    },
    dentroNews:{
      width: 350,
      height: 120,
    //   backgroundColor: 'grey',
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 2,
    //   borderStyle: 'dashed'
    }
})