import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image, TouchableOpacity, Dimensions, TouchableOpacityBase, FlatList } from 'react-native'
import {  Switch, Checkbox, ActivityIndicator   } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../config'

import CustomModalModule from './customModalModule'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

let selected = ""

function AddCourses({navigation, openModal}) {
    const [formData, setForm] = useState({
        title: "",
        description: "",
        typePay: false,
        category: "",
        info: [{uri: "first", name: ``,type: ``}],   
        contador: 0,
        typeService: "free",
        hours: "",
        price: "",
        imageUnique: null,        
    });
    const [status, setStatus] = useState({
        dropDown: 0
    })
    
    const [fModule, setFmodule] = useState({
        title: "",
        content: "",
        typeVideo: "url",   
        urlvideo: ""
    })

    const [error, setError] = useState({
        errorMessage: "",
        errorStatus: false
    })

    const [loading, setLoading] = useState(false)

    const [userId, setUserId] = useState(null)

    const [items, setItems] = useState(null)

    useEffect(() => {
        // getPermissionAsync();
    })

    useEffect(() =>{ 
        handleAsync()
        fetchCategory()
      },[])
    
    const handleAsync  = async() => {
        let dataAsync;
        try {
            dataAsync = await AsyncStorage.getItem('userData')
        } catch (error) {
            console.log(error)
        }

        if(dataAsync){
            setUserId(JSON.parse(dataAsync)._id)
        }
    }

    const fetchCategory = async() => {
        let resultArray = [];

        await axios
        .get( Config.urlBackEnd + '/getAllCategory')
        .then(res => {
            if (res.data.response) {
                console.log(res.data.data)
                res.data.data.forEach(element => {
                    resultArray.push({label: element.title, value: element.title})
                })
                setItems(resultArray)
            } else {
                setItems([{
                    label: "No hay categorias disponible",
                    value: 0
                }])
            }
        })
    }

    const onOpenDrop = () => {
        let acum = 0;
        for (let index = 0; index < items.length; index++) {            
            acum += 20
        }
        setStatus({dropDown: acum + 30})
    }

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    // const _pickImage = async () => {
    //     try {
    //       let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });
    //       if (!result.cancelled) {
    //         setImage(result.uri);
    //         setForm({
    //             ...formData,
    //             info: [...formData.info, {uri: result.uri, file:""}]
    //         })
    //       }
    
    //       console.log(result);
    //     } catch (E) {
    //       console.log(E);
    //     }
    // };

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
            })

            console.log(result)
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    const addImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {

                let fileType =  result.uri.substring(result.uri.lastIndexOf(".") + 1);
        
                setForm({
                    ...formData,
                    contador: formData.contador + 1,
                    info: [...formData.info, {uri: result.uri, name: `photo.${fileType}`,type: `image/${fileType}`}]
                })
            }
        
            console.log(result);
        } catch (E) {
        console.log(E);
        }
    }

    const eliminate = (index) => {
        const array = formData.info
        array.splice(index, 1)
        setForm({
            ...formData,
            info: array,
            contador: formData.contador - 1
        })        
    }

    const renderItem = ({item, index}) =>{
        if(item.uri == "first"){
            return(
                <TouchableOpacity onPress={addImage}>
                    <View style={styles.boxImage}>
                        <AntDesign name="pluscircle" size={40} color="#ddd" />
                    </View>
                </TouchableOpacity>
            )
        }
        
        return(
            <View>                
                <Image source={{uri: item.uri}} style={{width: 100, height: 100}} />
                <View  style={styles.eliminate}>
                <TouchableOpacity onPress={() => eliminate(index)}>                    
                    <AntDesign name="minuscircle" size={40} color="black" />                                                                                    
                </TouchableOpacity>                                
                </View>
            </View>
        )
    }

    function onPressFunction(informacion) {
        selected = informacion
        status = true
        openModal() 
    }

    const changeCheckFree = () => {
        if (formData.typeService == "free") {
            setForm({
                ...formData,
                typeService: "pay"
            })
        }else{
            setForm({
                ...formData,
                typeService: "free"
            })
        }
    }

    const changeCheckPayment = () => {
        if (formData.typeService == "pay") {
            setForm({
                ...formData,
                typeService: "free"
            })
        }else{
            setForm({
                ...formData,
                typeService: "pay"
            })
        }
    }

    const renderModule = ({ item }) => {
        return(
        <TouchableOpacity onPress={() => openModal()}>
            <View style={styles.Module}>                                                                    
                <Text style={styles.textModule}>Module</Text>         
            </View>        
        </TouchableOpacity>
        )
    }

    const handleText = (text, formText) => {
        setFmodule({
            ...fModule,
            title: text
        })
    }

    //Validacion de entrada de datos
    const validate = () => {
        const title = formData.title
        const description = formData.description
        const category = formData.category
        const hours = formData.hours
        const price = formData.price
        const imageUnique = formData.imageUnique

        //Titulo del curso
        if (title == "") {
            setError({
                errorMessage: "Por favor introduzca un titulo para el curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        //Descripcion del curso
        if (description == "") {
            setError({
                errorMessage: "Por favor introduzca una descripcion del curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        //Categoria del curso
        if (category == "") {
            setError({
                errorMessage: "Por favor seleccione una categoria para el curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        //Horas del curso
        if (hours == "") {
            setError({
                errorMessage: "Por favor introduzca las horas totales del curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        //Imagen principal del curso
        if (!imageUnique) {
            setError({
                errorMessage: "Por favor introduzca la imagen pricipal para el curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        //Precio del curso
        if (price == "" && formData.typeService == "pay") {
            setError({
                errorMessage: "Por favor introduzca un precio para el curso",
                errorStatus: true
            })
            return false
        }else{
            setError({
                errorMessage: "",
                errorStatus: false
            })
        }

        return true

    }
    
    const createCourse = () => {
        // navigation.navigate('AddModule')
        const isValidate = validate()

        if(isValidate){
            setLoading(true)
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        let fileType = formData.imageUnique.substring(formData.imageUnique.lastIndexOf(".") + 1);
        let cont = 0
        const data = new FormData();
        //colocar aqui el id del usuario
        data.append('user_id', userId)
        data.append("title", formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category)
        data.append('typeService', formData.typeService)
        data.append('hours', formData.hours)

        const precioCoin = formData.price * 100

        data.append('price', precioCoin)
        data.append('contador', formData.contador)
        data.append('imageUnique', {
            uri: formData.imageUnique,
            name: `photo.${fileType}`,
            type: `image/${fileType}`
        })

        if (formData.info.length > 0) {
            formData.info.forEach((element) => {
                if (element.uri !== "first") {
                    let typeFile = element.uri.substring(element.uri.lastIndexOf(".") + 1);
                    console.log(element)
                    data.append(`image${cont}`, {
                        uri: element.uri,
                        name: `photo.${typeFile}`,
                        type: `image/${typeFile}`
                    })
    
                    cont ++;
                }    
            });
        }
        await axios
        .post( Config.urlBackEnd + '/addCourse', data, {
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
            }
        })
        .then(res => {
            if (res.data.response) {
                console.log(res.data)
                setLoading(false)
                navigation.navigate('AddModule', {coursesId: res.data.data.coursesId})
            }else{
                console.log(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })

    }

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator 
                animating={true} 
                color={Config.primaryColor} 
                size={100}
                />
            </View>
        )
    }


    return(
        <View keyboardShouldPersistTaps="handled" >
            <ScrollView>
                <View style={styles.container}> 
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Imagen Principal del Curso</Text>                                      
                        <View style={styles.centrar}>
                            {formData.imageUnique && <Image source={{ uri: formData.imageUnique }} style={{ width: 390, height: 200 }} />}
                            <View style={{marginTop: 10}}>
                                <Button title="Subir imagen desde la galeria" onPress={_pickFirstImage} />                    
                            </View>
                        </View>                        
                    </View>                 
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Titulo del Curso</Text>
                        <View style={styles.containerInput}>                    
                            <MaterialCommunityIcons style={styles.icon} name="format-title" size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={text => setForm({...formData,title: text})}
                                value={formData.title}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Titulo"                                
                            />
                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Descripcion del Curso</Text>
                        <View style={styles.containerInput}>                                            
                            <MaterialIcons name="description" style={[styles.icon, styles.descriptionIcon]} size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={text => setForm({...formData,description: text})}
                                value={formData.description}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Descripcion del Contenido del Curso"     
                                multiline={true}
                                numberOfLines={5}                           
                            />
                        </View>        
                    </View>  
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Categoria del Curso</Text>
                        <View style={styles.containerInput}>                                                                    
                            <Entypo name="add-to-list" style={[styles.icon, {marginTop: 8}]} size={24} color={Config.primaryColor}/>
                            {items 
                            ? 
                            <DropDownPicker
                                items={items}
                                defaultValue={formData.category}
                                containerStyle={[styles.dropDown, {marginBottom: status.dropDown}]}
                                style={{backgroundColor: '#fff', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0}}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => setForm({
                                    ...formData,
                                    category: item.value
                                })} 
                                onOpen={() => onOpenDrop()}   
                                onClose={() => setStatus({dropDown: 0})}                                
                            />
                            : 
                            null
                            }

                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Horas del Curso</Text>
                        <View style={styles.containerInput}>                                            
                            <MaterialIcons name="access-time" style={styles.icon} size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={text => setForm({...formData,hours: text})}
                                value={formData.hours}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Introducir la horas totales del curso"  
                                keyboardType='numeric'                              
                            />
                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Tipo del Servicio</Text>
                        <View style={styles.containerInput}>                                                                    
                            <MaterialIcons name="attach-money" style={styles.icon} size={24} color={Config.primaryColor} />
                            <Text style={styles.titleCheck}>Gratis</Text>
                            <Checkbox
                                status={formData.typeService == "free" ? 'checked' : 'unchecked'}
                                onPress={() => changeCheckFree()}
                            />
                            <Text style={styles.titleCheck}>Pago</Text>
                            <Checkbox
                                status={formData.typeService == "pay" ? 'checked' : 'unchecked'}
                                onPress={() => changeCheckPayment()}
                            />
                        </View>        
                    </View>
                    <View style={[styles.formGroup, formData.typeService == "free" && styles.formPrice]}>  
                        <Text style={styles.labelText}>Precio en Pesos</Text>
                        <View style={styles.containerInput}>                                        
                            <FontAwesome5 name="money-bill-wave" style={styles.icon} size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={text => setForm({...formData,price: text})}
                                value={formData.price}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Precio"  
                                keyboardType='numeric' 
                                editable={formData.typeService == "free" ? false : true}                                
                            />
                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Imagenes Adcionales</Text>
                        <View style={styles.containerInput}>                                            
                            {/* <FontAwesome5 name="money-bill-wave" style={styles.icon} size={24} color="#0080ff" /> */}
                            <Carousel
                                //   ref={(c) => { this._carousel = c; }}
                                layout={'default'}
                                data={formData.info}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH/2}
                                itemWidth={ITEM_WIDTH/2}                             
                            />

                            
                        </View>        
                    </View>

                    {error.errorStatus 
                    &&
                    <Text style={styles.error}>{error.errorMessage}</Text>
                    }            
                    
                    <View style={styles.formGroup}>
                        <Button title="Crear Curso" onPress={createCourse} />
                    </View>                    
                    {/* <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Modulos</Text>
                        <TouchableOpacity onPress={() => openModal()}>
                            <View style={styles.addModule}>                                                                    
                                <AntDesign name="pluscircle" size={30} color="#ddd" />                        
                            </View>        
                        </TouchableOpacity>
                        <FlatList
                            data={formData.module}
                            renderItem={renderModule}                            
                        />
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // margin: 15,
        display: "flex",
        padding: 20,
        paddingTop: 0,
        // flex: 1,
        // width: "100%",
        // height: 100,
        backgroundColor: "white",
        flex: 1,                
    },
    labelText: {
        fontSize: 18,                            
        // padding: 5,
        // paddingLeft: 10,
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
    input:{
        // height: 40,
        backgroundColor: "white",

        fontSize: 18,
        // margin: 10
        // marginVertical: 10,
        padding: 5,
        width: "90%",
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
    formGroup: {
        marginTop: 10,
    },
    descriptionIcon: {
        marginTop: 42
    },
    dropDown: {
        height: 50, 
        width: "95%",        
    },
    titleCheck: {
        fontSize: 15,
        marginTop: 6,
        marginLeft: 10,
    },
    boxImage: {
        width: 100,
        height: 100,
        backgroundColor: "#eeeeee",
        borderRadius: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    eliminate: {
        position: "absolute",
        top: 0,
        left: 15, 
        right: 0, 
        bottom: 0,
        // justifyContent: 'center', 
        alignItems: 'center',
    },
    addModule: {
        width: "100%",
        height: 40,
        backgroundColor: "#eeeeee",
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    centrar: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 20 
    },
    formPrice: {
        opacity: 0.5
    },
    Module: {
        width: "100%",
        height: 40,
        backgroundColor: Config.primaryColor,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textModule:{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    loading:{
        position: "absolute",
        right: 0,
        left: 0,
        top: "40%",
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center"
    }
})

function mapStateToProps(state) {
    return { action: state.action }
}

function mapDispatchToProps(dispatch) {
    return {
        openModal: () =>
            dispatch({
                type: "OPEN_MODAL"
            })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCourses)