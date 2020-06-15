import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Settings() {
    return(
        <View>
            <Text style={styles.subTitle}>Configuraciones</Text>

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