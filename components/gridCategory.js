import React, { useState }  from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';

export default function GridCategory() {
    const [info, setInfo] = useState([
        {image: require('../assets/img/guitarra.jpg')},
        {image: require('../assets/img/gelectrica.jpg')},
        {image: require('../assets/img/bajo.jpg')},
        {image: require('../assets/img/bateria.jpg')},
        {image: require('../assets/img/piano.jpg')},
        {image: require('../assets/img/saxofon.jpeg')},
    ])

    return(
        <FlatGrid
            itemDimension={120}
            data={info}
            renderItem={({ item }) => (
                <ImageBackground 
                    style={styles.boxOne}  
                    imageStyle={{ borderRadius: 10 }}
                    source={item.image} />
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
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,    
    },
})