import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native'
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function ContentNews() {    
    const [info, setInfo] = useState([
        {title: "Guitarra Electrica", description: "Nuevo Curso", id: 1},
        {title: "numero2", description: "Actualizacion del curso", id: 2},
        {title: "numero3", description: "Nuevo Curso", id: 3},
        {title: "numero4", description: "Nuevo Curso", id: 4},
        {title: "numero5", description: "Actualizacion del curso", id: 5},
        {title: "numero6", description: "Actualizacion del curso", id: 6},
    ])

    return (
        <View style={styles.container}>

            <View style={styles.inside}>
                <FlatList
                    data={info}
                    renderItem={({ item }) => 
                        <Card.Title
                            title={item.title}
                            subtitle={item.description}
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}             
                            style={styles.card}   
                        />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "coral",
        height: 200,        
        marginHorizontal: 20
    },
    inside: {
        // padding: 10
        paddingHorizontal: 10
    },
    card:{
        backgroundColor: "#DDDDDD",
        borderRadius: 10,    
        marginTop: 5,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

