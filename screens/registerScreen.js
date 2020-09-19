import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios'
import Config from '../config'

import LinearGradient from 'react-native-linear-gradient';

import { AuthContext } from '../components/context'

export default function RegisterScreen({navigation}) {

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmation_pass: "",
        fecha: "05/07/2020",
        gender: "female",
        name: "",
        accountType: ""
    })

    const [error, setError] = useState({
        errorEmail: "",
        errorPassword: "",
        errorConfirmationPass: "",
        errorFecha: "",
        errorName: "",
        errorAccountType: "",
        errorStatus: false
    })

    const [status, setStatus] = useState({
        dropDown: 0,
        dropDown2: 0
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const { signUp } = useContext(AuthContext);

    const items = [
        {label: 'Mujer', value: 'female'},
        {label: 'Hombre', value: 'male'},        
    ]

    const items2 = [
        {label: 'Profesor', value: 'teacher'},
        {label: 'Estudiante', value: 'user'},        
    ]

    const onOpenDrop = () => {
        let acum = 0;
        for (let index = 0; index < items.length; index++) {            
            acum += 30
        }
        setStatus({dropDown: acum + 30})
    }

    const onOpenDrop2 = () => {
        let acum = 0;
        for (let index = 0; index < items.length; index++) {            
            acum += 30
        }
        setStatus({dropDown2: acum + 30})
    }
     
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setForm({...form,fecha: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`})              
        hideDatePicker();
    };

    const handleSubmit = async () => {
        const isValidate = validate()
        if (isValidate) {

            const dataSend = new FormData()

            dataSend.append('email', form.email)
            dataSend.append('password', form.password),
            dataSend.append('date_birth', form.fecha)
            dataSend.append('gender', form.gender)
            dataSend.append('type_of_user', form.accountType)
            dataSend.append('name', form.name)

            await axios
            .post(Config.urlBackEnd + '/register', dataSend)
            .then(async res => {
                console.log(res.data)
                if (res.data.response) {
                    signUp(res.data.data)                              
                }else{
                    setError({
                        ...error,
                        errorEmail: res.data.message,
                        errorStatus: true            
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const validate = () => {
        const email = form.email
        const password = form.password
        const confirmation_pass = form.confirmation_pass
        const fecha = form.fecha        
        const name = form.name
        const accountType = form.accountType

        //Validacion del Email
        if (email == "") {
            setError({
                ...error,
                errorEmail: "Campo Requerido",
                errorStatus: true            
            })
            return false
        } else {
            setError({
                ...error,
                errorEmail: "",
                errorStatus: false            
            })
        }

        if (!(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email))) {
            setError({
                ...error,
                errorEmail: "Introduzca un correo valido",
                errorStatus: true            
            })
            return false
        }else{
            setError({
                ...error,
                errorEmail: "",
                errorStatus: false            
            })
        }

        //Validacion del nombre
        if (name == "") {
            setError({
                ...error,
                errorName: "Campo Requerido",
                errorStatus: true                
            })
            return false
        }else{
            setError({
                ...error,
                errorName: "",
                errorStatus: false            
            })
        }

        //Validacion de fecha de nacimiento
        const fechaArray = fecha.split("/")
        if (parseInt(fechaArray[2]) > 2010) {
            setError({
                ...error,
                errorFecha: "Introducir una fecha valida",
                errorStatus: true
            })
            return false
        } else {
            setError({
                ...error,
                errorFecha: "",
                errorStatus: false
            })
        }

        //Valadiacion de tipo de cuenta
        if (accountType == "") {
            setError({
                ...error,
                errorAccountType: "Campo Requerido",
                errorStatus: true
            })
            return false
        } else {
            setError({
                ...error,
                errorAccountType: "",
                errorStatus: false
            })
        }

        //Validacion de contraseñas
        if (password == "") {
            setError({
                ...error,
                errorPassword: "Por favor introducir una contraseña",
                errorStatus: true                
            })
            return false
        } else if(password < 8){
            setError({
                ...error,
                errorPassword: "La contraseña tiene que ser mas de 8 caracteres",
                errorStatus: true                
            })
            return false
        }else if(password != confirmation_pass){
            setError({
                ...error,
                errorPassword: "Ambas contraseñas tienen que ser iguales",
                errorStatus: true                
            })
            return false
        }else{
            setError({
                ...error,
                errorPassword: "",
                errorStatus: false     
            })
        }

        return true

    }



    return(
        <ScrollView style={{backgroundColor: "white"}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.container}>
            {/* <Image 
                style={styles.logoLogin}
                source={require('../assets/logo.png')}
            /> */}
            <Text style={styles.textTitle}>Registrarse</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.textLow}>¿Ya tienes cuenta? Inicia Sesión</Text>
            </TouchableOpacity>
            <View style={[styles.cardContainer,]}>
                <Text style={styles.labelText}>Correo</Text>
                <View style={styles.containerInput}>                    
                    <MaterialCommunityIcons style={styles.icon} name="email" size={24} color={Config.primaryColor} />
                    <TextInput
                        onChangeText={text => setForm({...form,email: text})}
                        value={form.email}
                        style={[styles.input]}                
                        selectionColor={Config.urlBackEnd}
                        placeholder="Correo"                                
                    />
                </View>

                {error.errorStatus && error.errorEmail != "" 
                ?
                <Text style={styles.errorMessage}>{error.errorEmail}</Text>
                :
                null
                }

                <Text style={styles.labelText}>Nombre</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="user" size={24} style={styles.icon} color={Config.primaryColor} />
                    <TextInput
                        onChangeText={text => setForm({...form,name: text})}
                        value={form.name}
                        style={[styles.input]}                
                        selectionColor={Config.primaryColor}
                        placeholder="Nombre"                                
                    />
                </View>

                {error.errorStatus && error.errorName != "" 
                ?
                <Text style={styles.errorMessage}>{error.errorName}</Text>
                :
                null
                }

                <Text style={styles.labelText}>Fecha de Nacimiento</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="calendar" size={24} style={styles.icon} color={Config.primaryColor} />
                    <TouchableOpacity onPress={showDatePicker} style={{width: "100%"}}>
                        <Text style={styles.textLikeInput}>{form.fecha}</Text>
                    </TouchableOpacity>
                </View>

                {error.errorStatus && error.errorFecha != "" 
                ?
                <Text style={styles.errorMessage}>{error.errorFecha}</Text>
                :
                null
                }

                <Text style={styles.labelText}>Sexo</Text>
                <View style={styles.containerInput}>                    
                    <FontAwesome name="intersex" size={24} style={styles.icon} color={Config.primaryColor} />
                    <DropDownPicker
                        items={items}
                        defaultValue={form.gender}
                        containerStyle={{width: "95%",height: 40, marginBottom: status.dropDown}}
                        style={{backgroundColor: '#fff', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setForm({...form,
                            gender: item.value
                        })} 
                        onOpen={() => onOpenDrop()}   
                        onClose={() => setStatus({dropDown: 0})}                                
                    />
                </View>
                <Text style={styles.labelText}>Tipo de Cuenta</Text>
                <View style={styles.containerInput}>                    
                    <MaterialCommunityIcons name="account-badge-horizontal-outline" size={24} style={styles.icon} color={Config.primaryColor}/>
                    <DropDownPicker
                        items={items2}
                        defaultValue={form.accountType}
                        containerStyle={{width: "95%",height: 40, marginBottom: status.dropDown2}}
                        style={{backgroundColor: '#fff', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setForm({...form,
                            accountType: item.value
                        })} 
                        onOpen={() => onOpenDrop2()}   
                        onClose={() => setStatus({dropDown2: 0})}                                
                    />
                </View>

                {error.errorStatus && error.errorAccountType != "" 
                ?
                <Text style={styles.errorMessage}>{error.errorAccountType}</Text>
                :
                null
                }

                <Text style={styles.labelText}>Contraseña</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="lock" size={24} style={styles.icon} color={Config.primaryColor} />
                    <TextInput
                        onChangeText={text => setForm({...form,password: text})}
                        value={form.password}
                        style={[styles.input]}                
                        selectionColor={Config.primaryColor}
                        placeholder="Contraseña"   
                        secureTextEntry={true}                             
                    />
                </View>
                <Text style={styles.labelText}>Confirmar Contraseña</Text>
                <View style={styles.containerInput}>
                    <AntDesign name="lock" size={24} style={styles.icon} color={Config.primaryColor} />
                    <TextInput
                        onChangeText={text => setForm({...form,confirmation_pass: text})}
                        value={form.confirmation_pass}
                        style={[styles.input]}                
                        selectionColor={Config.primaryColor}
                        placeholder="Repetir Contraseña"   
                        secureTextEntry={true}                             
                    />
                </View>

                {error.errorStatus && error.errorPassword != "" 
                ?
                <Text style={styles.errorMessage}>{error.errorPassword}</Text>
                :
                null
                }

                <View style={{marginTop: 10}}>
                    <Button onPress={handleSubmit} title="Registrarse" color={Config.primaryColor} />
                </View>
                
                {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </LinearGradient>
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
        // backgroundColor: Config.primaryColor,
        // alignItems: "center",        
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "white",   
        width: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
        paddingTop: 40,                        
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
    textTitle: {
        fontSize: 30,
        marginVertical: 40,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: "bold",
        color: "white"
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
    textLikeInput:{
        fontSize: 18,
        padding: 5
    },
    textLow:{
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    errorMessage:{
        color: "red",
        paddingBottom: 6,                
        // textAlign: "center"
    }
})