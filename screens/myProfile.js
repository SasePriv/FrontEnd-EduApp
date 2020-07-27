import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from '../components/context'

export default function MyProfile() {

    const [userInfo, setUserInfo] = useState(null);

    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        fetchUserData()
    },[])

    const fetchUserData = async() => {
        try {
            const userData = await AsyncStorage.getItem('userData')
            const dataUser = JSON.parse(userData)
            setUserInfo(dataUser)
          } catch (error) {
            console.log(error)
          }
    }

    return(
        <ScrollView>
            <View style={[styles.containerUser]}>
                <Image 
                    resizeMode="contain" 
                    style={styles.imageMain} 
                    source={require('../assets/backgrounds/perfil2.jpg')} 
                />
                <View style={styles.hoverBack}>
                    <View style={styles.containerImage}>
                        <Image 
                            resizeMode="cover" 
                            style={styles.profileImage} 
                            source={{uri: 'http://192.168.1.2:4000//profileImages/' + userInfo?.profile_image}} 
                        />
                    </View>
                    <Text style={styles.textWhite}>{userInfo?.name}</Text>
                    <Text style={styles.textWhite}>{userInfo?.email}</Text>
                    <Text style={styles.textWhite}>Tipo de Usuario: {userInfo?.typeOfUser == "teacher" ? "Profesor" : userInfo?.typeOfUser == "user" ? "Usuario Normal" : "Administrador"}</Text>
                </View>
            </View>
            <View style={styles.containerOptions}>
                <View style={styles.eachOption}>
                    <AntDesign style={styles.icon} name="edit" size={25} color="#526065" />
                    <Text style={styles.textEach}>Editar mi Perfil</Text>
                </View>
                <View style={styles.eachOption}>
                    <MaterialCommunityIcons name="textbox-password" style={styles.icon} size={25} color="#526065" />
                    <Text style={styles.textEach}>Cambiar la Contraseña</Text>
                </View>
                <View style={styles.eachOption}>
                    <MaterialCommunityIcons name="wallet-membership" style={styles.icon} size={25} color="#526065" />
                    <Text style={styles.textEach}>Membresia</Text>
                </View>
                <View style={styles.eachOption}>
                    <AntDesign name="delete" style={styles.icon} size={25} color="#526065" />
                    <Text style={styles.textEach}>Eliminar Cuenta</Text>
                </View>

                <TouchableOpacity onPress={signOut}>
                    <View style={styles.eachOption}>
                        <AntDesign name="logout" style={styles.icon} size={25} color="#526065" />
                        <Text style={styles.textEach}>Cerrar Sesion</Text>
                    </View>
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
    },
    containerUser:{
        height: 250,
        // backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
    },
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
    containerImage: {
        height: 120, 
        width: 120,
        backgroundColor: "#ccc",
        borderWidth: 1,
        borderColor: "#526065",
        borderRadius: 100,
        marginBottom: 10
    },
    profileImage:{
        height: 117, 
        width: 117,
        borderRadius: 100,
    },
    eachOption:{
        padding: 12,
        borderBottomColor: "#bfccd4",
        borderBottomWidth: 2,
        marginHorizontal: 0,
        flexDirection: "row"
    },
    containerOptions:{
        // marginTop: 2
        backgroundColor: "#eaf2f3"
    },
    textWhite:{
        color: "black",
        padding: 2,
        fontWeight: "bold"
    },
    hoverBack: {
        position: "absolute",
        backgroundColor: "rgba(191, 204, 212, 0.8)",
        width: "100%",
        height: "100%",
        justifyContent: "center",        
        alignItems: "center",
        // borderRadius: 10,
    },
    imageMain:{
        height: 250,
    },
    icon:{
        
    },
    textEach:{
        marginLeft: 10,
        // fontWeight: "bold",
        fontSize: 15,
        marginTop: 2
    }
})