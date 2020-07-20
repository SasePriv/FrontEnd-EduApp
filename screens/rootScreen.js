import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button } from 'react-native'
import { Switch } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios'

import { AuthContext } from '../components/context'

export default function RootScreen({navigation}) {

    const [form, setForm] = useState({
        email: "",
        password: "",
        errorMessage: "",
        errorStatus: false        
    })

    const { signIn } = useContext(AuthContext);

    const handleSubnmit = async (username, password) => {      
        const dataSend = new FormData()
        dataSend.append('email', username)
        dataSend.append('password', password)

        await axios
        .post('http://192.168.1.2:4000/login', dataSend)
        .then(res => {
            console.log(res.data)
            if (res.data.response) {
                signIn(res.data.data)
            }else{
                setForm({
                    ...form,
                    errorMessage: res.data.message,
                    errorStatus: true                 
                })
            }
        })
        // console.log(await AsyncFunctions.getToken())        
    }

    return(
        <ScrollView style={{backgroundColor: "white"}}>
        <View style={styles.container}>
            <Image 
                style={styles.logoLogin}
                source={require('../assets/logo.png')}
            />
            <View style={[styles.cardContainer,]}>
                <Text style={styles.labelText}>Email</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="user" size={24} style={styles.icon} color="#0080ff" />
                    <TextInput
                        onChangeText={text => setForm({...form,email: text})}
                        value={form.email}
                        style={[styles.input]}                
                        selectionColor="#0080ff"
                        placeholder="Email"                                
                    />
                </View>
                <Text style={styles.labelText}>Contraseña</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="lock" size={24} style={styles.icon} color="#0080ff" />
                    <TextInput
                        onChangeText={text => setForm({...form,password: text})}
                        value={form.password}
                        style={[styles.input]}                
                        selectionColor="#0080ff"
                        placeholder="Contraseña"                                
                    />
                </View>
                <Text style={styles.fogot}>Forgot Password?</Text>
                <View style={styles.botones}>
                    <View style={styles.btn}>
                        <Button onPress={() => handleSubnmit(form.email, form.password)}  title="Iniciar Sesion"/>
                    </View>
                    <View style={styles.btn}>
                        <Button onPress={() => navigation.navigate('register')} title="Registrarse"/>
                    </View>
                </View>
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
        color: "#0080ff"
    },
    btn:{
        marginVertical: 10,    
    },
    botones: {
        marginTop: 15
    }
})