import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, Button, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'

export default function ForgotPassword({navigation}) {

    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState(false)
    const [errorEmail, setErrorEmail] = useState(null)

    const handleSubmitForgot = async () => {
        const isValidate = validation();
        if (isValidate) {
            const dataSend = new FormData();
            dataSend.append('email', email);

            await axios
            .post('http://192.168.1.2:4000/forgotPassword', dataSend)
            .then(res => {
                if (res.data.response) {
                    setEmailStatus(true)
                } else {
                    setErrorEmail(res.data.message)
                }
            })
        }
    }

    const validation = () => {

        if (email == "") {
            setErrorEmail("No deje el campo vacio")
            return false
        }else{
            setErrorEmail("")
        }

        if (!(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email))) {
            setErrorEmail("Introduzca un correo valido")
            return false
        }else{
            setErrorEmail("")
        }

        return true
    }

    return(
        <ScrollView style={{backgroundColor: "white"}}>
        <View style={styles.container}>
            <Image 
                style={styles.logoLogin}
                source={require('../assets/logo.png')}
            />
            <View style={[styles.cardContainer,]}>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.fogot}>Iniciar Sesión</Text>
                </TouchableOpacity>

                {!emailStatus
                ?
                <View>
                    <Text style={styles.labelText}>Olvido la contraseña?</Text>
                    <Text style={styles.labeldescription}>Introduce el correo electronico asociado a la cuenta</Text>
                    <View style={styles.containerInput}>
                        <AntDesign name="user" size={24} style={styles.icon} color="#0080ff" />
                        <TextInput
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={[styles.input]}                
                            selectionColor="#0080ff"
                            placeholder="Email"                                
                        />
                    </View>
                    {errorEmail 
                    ?
                    <Text style={styles.textError}>{errorEmail}</Text>   
                    :
                    null
                    }                    

                    <View style={styles.botones}>
                        <View style={styles.btn}>
                            <Button onPress={handleSubmitForgot} title="Cambiar Contraseña"/>
                        </View>
                    </View>
                </View>
                :
                    <View> 
                        <Text style={styles.labelText}>Correo enviado</Text>
                        <Text style={styles.labeldescription}>Se ha enviado un link a su correo para el cambio de contraseña</Text>
                    </View>
                }

                
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,           
    },
    container: {
        flex: 1,
        backgroundColor: "#0080ff",
        alignItems: "center",        
    },
    logoLogin: {
        width: 300,
        height: 300,
        margin: 10,
        marginTop: 50,
        marginBottom: 50
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "white",   
        width: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
        paddingTop: 40
    },
    labelText: {
        fontSize: 18
    },
    input:{
        // height: 40,
        backgroundColor: "white",

        fontSize: 18,
        // margin: 10
        // marginVertical: 10,
        padding: 5,
        width: "90%"
    },
    containerInput:{
        flexDirection: "row",    
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        padding: 1,
        marginBottom: 15,
        marginTop: 5
    },
    icon: {
        padding: 5,
        paddingLeft: 0
    },
    fogot: {
        color: "#0080ff",
        // textAlign: "center",
        marginBottom: 10,
        fontSize: 15
    },
    btn:{
        marginVertical: 10,    
    },
    botones: {
        marginTop: 15
    },
    textError:{
        textAlign: "center",
        color: "red",
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "bold"
    },
    labeldescription:{
        fontSize: 15
    },
    textError:{
        textAlign: "center",
        color: "red",
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "bold"
    }
})