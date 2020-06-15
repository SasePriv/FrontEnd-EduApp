import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Conference() {
    return(
        <View>
            <Text style={styles.subTitle}>Conferencias</Text>
        
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    }
})