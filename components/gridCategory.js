import React, { useState }  from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';

export default function GridCategory( {naviga} ) {
    const [info, setInfo] = useState([
        {image: require('../assets/img/guitarra.jpg'), type: "Guitarra"},
        {image: require('../assets/img/gelectrica.jpg'), type: "Guitarra Elect."},
        {image: require('../assets/img/bajo.jpg') , type: "Bajo"},
        {image: require('../assets/img/bateria.jpg'), type: "Bateria"},
        {image: require('../assets/img/piano.jpg'), type: "Piano"},
        {image: require('../assets/img/saxofon.jpeg'), type: "Saxofon"},
        {image: require('../assets/img/saxofon.jpeg'), type: "Saxofon"},
    ])

    const onPress = () => { 
        naviga.navigate('Category')
    }

    return(
        <FlatGrid
            itemDimension={120}
            data={info}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>                    
                    <ImageBackground 
                        style={styles.boxOne}  
                        imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: "#0080ff",
                        borderWidth: 1}}
                        source={item.image} 
                    />                    
                    <Text style={styles.text}>{item.type}</Text>
                </TouchableOpacity>
            )}
        />

    )
}

const styles = StyleSheet.create({
    container:{        
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 0,
        alignItems: 'center',
        backgroundColor: '#ddd',        
    },
    boxOne: {
        flex: 1,        
        padding: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,        
            
    },
    appButtonContainer:{
        flex: 1,
        width: 120,
        height: 140,
        margin: 5,
        marginBottom: 5,

    },
    text: {
        backgroundColor: "white",
        textAlign: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 15,
        padding: 5,        
        color: "#0080ff",
        fontWeight: "bold",
        borderColor: "#0080ff",
        borderWidth: 1
    }
})