import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function BillScreen() {
    return(
        <View>
            <Text style={styles.subTitle}>Facturacion</Text>

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