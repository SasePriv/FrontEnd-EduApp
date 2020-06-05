import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GridCategory from '../components/gridCategory'
import ContentNew from '../components/contentNew'

export default function SandBox() {
    return(
        <View>
            <Text style={styles.subTitle}>Nuevo</Text>
            <ContentNew />
            <Text style={styles.subTitle}>Categorias</Text>
            <GridCategory />
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