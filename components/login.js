import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'

export default function Login(){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>       
            <View style={styles.loginContainer}>
                <View style={styles.contentInputs}>
                    <Image 
                        style={styles.logoLogin}
                        source={require('../assets/img/logo-login.jpeg')}
                    />
                    <TextInput 
                        style={styles.inputLogin}
                        placeholder='USUARIO'
                    />
                    <TextInput 
                        style={styles.inputLogin}
                        placeholder='CONTRASEÑA'
                    />
                    <TouchableOpacity>
                        <View style={styles.btnEnter}>
                            <Text style={styles.textBtnEnter}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.otherOption}>
                        <Text style={styles.textOption}>Recordarme</Text>
                        <Text style={styles.textOption}>Crear Cuenta</Text>
                    </View>
                    <Text style={styles.textOption}>Olvide la Contraseña</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>     
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        flex: 1,
        backgroundColor: '#FF6240',
        padding: 20,
    },
    contentInputs:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoLogin: {
        width: 200,
        height: 200,
        marginBottom: 40,                
    },
    inputLogin: {    
        backgroundColor: '#fff',
        color: '#000',
        width: 250,
        height: 50,
        padding: 15,
        marginBottom: 10,
        borderRadius: 400,
        textAlign: 'center'    
    },
    btnEnter:{
        backgroundColor: '#FF7C00',
        width: 250,
        height: 50,
        borderRadius: 400,
        padding: 15,    
        justifyContent: 'center'            
    },
    textBtnEnter:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    otherOption:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 25,
        width: 250
    },
    textOption:{        
        color: '#fff',
        padding: 10,
        fontSize: 15
        // paddingTop: 20
    }
})