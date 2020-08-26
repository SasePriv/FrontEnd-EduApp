import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import Config from '../config'
import AsyncStorage from '@react-native-community/async-storage';

export default function EditProfile({route, userInfo}) {

    const [formData, setForm] = useState({
        imageUnique: null,
        imageChange: false,
        name: "",
        user_Id: ""
    })

    const [error, setError] = useState({
        errorStatus: false,
        errorMessage: ""
    })

    const [picked, setPicked] = useState(false)

    useEffect(() => {
        getPermissionAsync();
    })

    useEffect(() => {        
        setForm({
            imageUnique: route.params.userInfo?.profile_image,
            name: route.params.userInfo?.name,
            user_Id: route.params.userInfo?._id
        })        
    },[])    

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickFirstImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {            
            setForm({
                ...formData,
                imageUnique: result.uri,  
                imageChange: true                                   
            })

            setPicked(true)
          }
    
        } catch (E) {
          console.log(E);
        }
    };

    const updateProfile = () => {
        const isValidate = validation();

        if (isValidate) {
            handleUpdate();
        }
    }

    const validation = () => {
        const name = formData.name;

        if (name == "") {
            setError({
                errorStatus: true,
                errorMessage: "No dejar esta casilla en blanco"
            });
            return false;
        }else{
            setError({
                errorStatus: false,
                errorMessage: ""
            });
        }

        return true;
    }

    const handleUpdate = async () => {        
        const dataSend = new FormData();
        dataSend.append('user_Id', formData.user_Id);
        dataSend.append('name', formData.name);

        if (formData.imageChange) {
            let fileType = formData.imageUnique.substring(formData.imageUnique.lastIndexOf(".") + 1);
            dataSend.append('imageUnique', {
                uri: formData.imageUnique,
                name: `photo.${fileType}`,
                type: `image/${fileType}`
            });
        }

        await axios
        .post( Config.urlBackEnd + "/updateInfoUser", dataSend , {
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
            }
        })
        .then(async res => {
            console.log(res.data)
            if (res.data.response) {
                await AsyncStorage.setItem('userData', JSON.stringify(res.data.data))
                Alert.alert(
                    "Actualizado",
                    "Se han actualizado sus datos correctamente",
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
                <View style={styles.imageBox}>
                    <TouchableOpacity onPress={_pickFirstImage}>
                        <View style={styles.photoDefault}>
                            <View style={styles.containerImage}>
                                <Image 
                                    resizeMode="cover" 
                                    style={styles.profileImage} 
                                    source={{uri: !picked ? Config.urlBackEnd + '//profileImages/' + formData.imageUnique : formData.imageUnique}} 
                                />
                            </View>      
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={_pickFirstImage}>
                        <View style={styles.changePhoto}>
                            <Text style={styles.textChange}>Cambiar foto</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.formBox}>
                    <View style={styles.names}>
                        <Text style={styles.textName}>Nombre</Text>
                        <TextInput 
                            onChangeText={text => setForm({...formData,name: text})}
                            value={formData.name}
                            style={[styles.input]}                
                            selectionColor={Config.primaryColor}
                            placeholder="Nombre"    
                        />
                    </View>
                </View>

                {error.errorStatus 
                ?
                <Text style={styles.errorMessage}>{error.errorMessage}</Text> 
                :
                null
                }

                <View style={styles.btnBox}>
                    <View style={styles.saveBtn}>
                        <Button onPress={updateProfile} title={"Guardar Cambios"} />
                    </View>
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
        padding: 10,
        height: "97%"
    },
    imageMain: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    photoDefault: {
        justifyContent: "center",
        alignContent: "center"
    },
    imageBox: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    photoDefault: {
        width: 117,
        height: 117,
        borderRadius: 100
    },
    containerImage: {
        height: 120, 
        width: 120,
        backgroundColor: "#ccc",
        borderWidth: 1,
        borderColor: "#526065",
        borderRadius: 100,
        textAlign: "center",
        // marginBottom: 10
    },
    profileImage:{
        height: 117, 
        width: 117,
        borderRadius: 100,
    },
    changePhoto: {
        marginVertical: 15
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
    }
})