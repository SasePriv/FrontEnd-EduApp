import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import axios from 'axios'
import Config from '../config'
import { AuthContext } from '../components/context'

export default function EliminateUser({route, userInfo, navigation}) {
    const { signOut } = useContext(AuthContext);

    const [formData, setForm] = useState({
        user_Id: "",
    })

    useEffect(() => {        
        setForm({
            user_Id: route.params.userInfo?._id
        })       
        navigation.setOptions({ title: "Eliminacion de Cuenta" }) 
    },[])

    const eliminateAccount = () => {
        Alert.alert(
            "Pregunta de Seguridad",
            "¿Desea eliminar la cuenta?",
            [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "SI", onPress: () => console.log("OK presionado") }
            ],
            { cancelable: false }
        );
    }

    const handleEliminateAccount = async () => {
        const dataSend =  new FormData();
        dataSend.append('user_Id', formData.user_Id);

        await axios
        .post( Config.urlBackEnd + "/eliminateUser", dataSend)
        .then(res => {
            if(res.data.response){
                signOut();
            }else{
                Alert.alert(
                    "Error",
                    "Error en el servidor. No se puedo eliminar la cuenta",
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
                    <Text style={styles.advertencia}>Advertencia</Text>
                    <Text style={styles.textInfo}>Al eliminar la cuenta se borrara todos sus datos, las monedas que tenga en el momento, ademas de los cursos que haya creado. Entonces antes de hacer esta accion este consciente de lo anteriormente dicho, por lo tanto usted queda informado de las consecuencia al hacer esta accion </Text>
                    
                    {/* {error.errorStatus 
                    ?
                    <Text style={styles.errorMessage}>{error.errorMessage}</Text> 
                    :
                    null
                    } */}

                    <Button onPress={eliminateAccount} title="Eliminar Cuenta" color={Config.primaryColor}/>
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
    },
    advertencia:{
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"
    }
})