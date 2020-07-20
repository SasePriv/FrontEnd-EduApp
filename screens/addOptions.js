import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import CardCustom from '../components/CardCustom'

export default function AddOptions({navigation}) {

    function onPressCurso(direction){
        navigation.navigate(direction)
    }

    return(
        <ScrollView>
            <View>
                <TouchableOpacity onPress={() => onPressCurso('Añadir Curso')}>
                    <CardCustom 
                        title="Añadir Nuevo Curso"
                        icon="ios-add-circle-outline"                                  
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressCurso("MyCoursesCreated")}>
                    <CardCustom 
                        title="Ver Cursos Creados"
                        icon="ios-book"                                  
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    }
})