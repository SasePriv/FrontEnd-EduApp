import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import Config from '../config'
import AsyncStorage from '@react-native-community/async-storage';

export default function ChangePassword({route, userInfo, navigation}) {

    const [formData, setForm] = useState({
        user_Id: "",
        pasword_one: "",
        password_two: ""
    })

    const [error, setError] = useState({
        errorStatus: false,
        errorMessage: ""
    })

    useEffect(() => {        
        setForm({
            user_Id: route.params.userInfo?._id
        })        
        navigation.setOptions({ title: "Cambiar la Contraseña" })
    },[])

    const changePassword = () =>{
        const isValidate = validation();

        if(isValidate){
            handleChangePaassword()
        }
    }
    
    const validation = () => {
        const passwordOne = formData.pasword_one;
        const passwordTwo = formData.password_two;

        if (passwordOne == "" && passwordTwo == "") {
            setError({
                errorStatus: true,
                errorMessage: "No se puede dejar en blanco las casillas"
            })
            return false;
        }else{
            setError({
                errorStatus: false,
                errorMessage: ""
            })
        }

        if (passwordOne == "") {
            setError({
                errorStatus: true,
                errorMessage: "No se puede dejar la casilla en blanco"
            })
            return false
        }else{
            setError({
                errorStatus: false,
                errorMessage: ""
            })
        }

        if (passwordOne < 8) {
            setError({
                errorStatus: true,
                errorMessage: "La contraseña debe ser mayor de 8 caracteres"
            })
            return false
        }else{
            setError({
                errorStatus: false,
                errorMessage: ""
            })
        }

        if (passwordOne != passwordTwo) {
            console.log(passwordOne)
            console.log(passwordTwo)
            console.log(passwordOne != passwordTwo)
            setError({
                errorStatus: true,
                errorMessage: "Ambas contraseñas deben ser iguales"
            })
            return false;
        } else {
            setError({
                errorStatus: false,
                errorMessage: ""
            })
        }

        return true
    }

    const handleChangePaassword = async() => {
        const dataSend = new FormData();
        
        dataSend.append('user_Id', formData.user_Id);
        dataSend.append('password', formData.pasword_one);
        dataSend.append('repeatPassword', formData.password_two);

        await axios
        .post( Config.urlBackEnd + "/changePassword", dataSend)
        .then(res => {
            if(res.data.response){
                Alert.alert(
                    "Actualizado",
                    "La contrasela se ha cambiado correctamente",
                    [
                    { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }else{
                Alert.alert(
                    "Error",
                    res.data.message,
                    [
                    { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }
        })

    }
    
    return(
        <View>
            <View style={styles.box}>
                <View style={styles.formBox}>
                    <Text style={styles.textInfo}>Se recomienda usar contraseñas con mas de 8 caracteres y la utilizacion de numeros, mayusculas, minusculas y caracteres especiales</Text>
                    <View style={styles.names}>
                        <Text style={styles.textName}>Nueva Contraseña</Text>
                        <TextInput 
                            onChangeText={text => setForm({...formData,pasword_one: text})}
                            value={formData.pasword_one}
                            style={[styles.input]}                
                            selectionColor={Config.primaryColor}
                            placeholder="Nueva contraseña"    
                            // secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.names}>
                        <Text style={styles.textName}>Repetir Nueva Contraseña</Text>
                        <TextInput 
                            onChangeText={text => setForm({...formData,password_two: text})}
                            value={formData.pasword_two}
                            style={[styles.input]}                
                            selectionColor={Config.primaryColor}
                            placeholder="Repetir contraseña"   
                            // secureTextEntry={true} 
                        />
                    </View>

                    {error.errorStatus 
                    ?
                    <Text style={styles.errorMessage}>{error.errorMessage}</Text> 
                    :
                    null
                    }

                    <Button onPress={changePassword} color={Config.primaryColor} title="Cambiar Contraseña" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    },
    box:{
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 20,
        height: "97%",
        // justifyContent: "center"
    },
    textName:{
        fontSize: 18,
        fontWeight: "bold",
    },
    input: {
        padding: 5,
        fontSize: 15,
        borderBottomColor: Config.primaryColor,
        borderBottomWidth: 2,
        marginBottom: 15
    },
    errorMessage:{
        color: "red",
        paddingBottom: 6,                
        // textAlign: "center"
    },
    textInfo:{
        marginBottom: 10,
        fontSize: 15
    }
})