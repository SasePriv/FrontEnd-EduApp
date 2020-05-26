import React from 'react'
import { StyleSheet, Text} from 'react-native'
import { Appbar } from 'react-native-paper';

export default function HeaderMenu(){
    return(        
        <Appbar style={styles.bottom}>
            <Appbar.Action icon="backburger" onPress={() => console.log('Pressed archive')} />
            <Text style={styles.headerTitle}>HOME</Text>            
            <Appbar.Action icon="bell-circle-outline" onPress={() => console.log('Pressed delete')} />
        </Appbar>        
    )
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'blue',
        padding: 25,
        paddingTop: 50,
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }
})