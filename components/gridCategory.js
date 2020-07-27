import React, { useState, useEffect }  from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios'

export default function GridCategory( {naviga, dataCategory} ) {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if (dataCategory) {
            setInfo(dataCategory)
        }
    })

    const onPress = (title) => { 
        naviga.navigate('Category',{category: title});
    }

    return(
        <View>

        {info 
        ? 
        <FlatGrid
            itemDimension={120}
            data={info}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onPress(item.title)} style={styles.appButtonContainer}>                    
                    <ImageBackground 
                        style={styles.boxOne}  
                        imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: "#0080ff",
                        borderWidth: 1}}
                        source={{uri: 'http://192.168.1.2:4000//categoryImages/' + item.mainImage}} 
                    />                    
                    <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
        :
        null
        }
        </View>
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