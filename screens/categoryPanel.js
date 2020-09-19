import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Alert, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Config from '../config'
import LinearGradient from 'react-native-linear-gradient';

export default function CategoryPanel() {

    const [data, setData] = useState(null);

    const [imageNew, setImageNew] = useState(null);

    const [titleNew, setTitleNew] = useState("");

    const [errorTitle, setErrorTitle] = useState(false);

    const [errorImage, setErrorImage] = useState(false)

    useEffect(() => {
        // getPermissionAsync();
    })

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        await axios
        .get( Config.urlBackEnd + '/getAllCategory')
        .then(res => {
            if (res.data.response) {  
                const dataRecived = res.data.data.reverse()              
                setData(dataRecived)
            } else {
                setData(null)
            }
        })
    }

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
            setImageNew(result.uri)
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    const eliminateImage = () =>{
        setImageNew(null)
    }

    const handleAddCategory = async () => {
        const isValidate = validate();

        if (isValidate) {

            let fileType = imageNew.substring(imageNew.lastIndexOf(".") + 1);
            const dataSend = new FormData();

            dataSend.append('title', titleNew);
            dataSend.append('categoryImage', {
                uri: imageNew,
                name: `photo.${fileType}`,
                type: `image/${fileType}`
            })

            await axios
            .post( Config.urlBackEnd + '/addNewCategory', dataSend)
            .then(res =>{
                if (res.data.response) {
                    fetchData();
                    setImageNew(null);
                    setTitleNew(null);
                } else {
                    Alert.alert(
                        "Error al añadir una categoria",
                        res.data.message,
                        [
                        //   {
                        //     text: "Cancelar",
                        //     onPress: () => console.log("Cancelar presionado"),
                        //     style: "cancel"
                        //   },
                          { text: "OK", onPress: () => console.log("OK presionado") }
                        ],
                        { cancelable: false }
                    );
                }
            })
        }
    }

    const validate = () =>{
        if (titleNew == "") {
            setErrorTitle(true)
            return false
        }else{
            setErrorTitle(false)
        }

        if (!(imageNew)) {
            setErrorImage(true);
            return false
        } else {
            setErrorTitle(false)
        }

        return true
    }

    const eliminateCategory = async (id) => {
        const dataSend = new FormData();

        dataSend.append('categoryId', id);

        await axios
        .post( Config.urlBackEnd + '/eliminateOneCategory', dataSend)
        .then(res => {
            if (res.data.response) {
                fetchData();
            } else {
                Alert.alert(
                    "Error al eliminar una categoria",
                    res.data.message,
                    [
                      {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelar presionado"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }
        })
    }

    return(
        <ScrollView style={styles.container}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.linearGradient}>  
                <Text style={styles.subTitle}>Categorias Cursos</Text>
            </LinearGradient>   
            <View style={styles.addCategoryContainer}>

                {imageNew 
                ?
                <View>
                    <Image resizeMode="cover" style={styles.imageNewCategory} source={{uri: imageNew}} />
                    <View  style={styles.eliminate}>
                    <TouchableOpacity onPress={eliminateImage}>                    
                        <AntDesign name="minuscircle" size={35} color="red" />                                                                                    
                    </TouchableOpacity>                                
                    </View>
                </View>
                :
                <TouchableOpacity onPress={_pickFirstImage}>
                    <View style={[styles.boxImage, errorImage ? styles.boxImageError : null]}>
                        <AntDesign name="pluscircle" size={40} color="#eee" />
                    </View>
                </TouchableOpacity>
                }

                <View style={styles.boxAdd}>
                    <Text style={styles.textAdd}>Nueva Categoria</Text>
                    <TextInput
                        onChangeText={text => setTitleNew(text)}
                        value={titleNew}
                        style={[styles.input, errorTitle ? styles.errorInput : null]}                
                        selectionColor={Config.primaryColor}
                        placeholder="Titulo"                                
                    />
                    <View style={styles.btnAddCategory}>
                        <Button onPress={handleAddCategory} color={Config.primaryColor} title={"Añadir Categoria"} /> 
                    </View>
                </View>
                
            </View>

            <View style={styles.table}>
                <View style={styles.headerTable}>
                    <View style={styles.fristCol}>
                        <Text style={styles.textHeader}>Informacion de Categorias</Text>
                    </View>
                    <View style={styles.sencondCol}>
                        <Text style={styles.textHeader}>Accion</Text>
                    </View>                    
                </View>
                {/* Contenido */}

                {data
                ?
                data.map((item, index) => {
                    if (index%2 == 0) {

                        return (
                            <View style={styles.row} key={index}>
                                <View style={styles.fristCol}>
                                    <Image resizeMode="cover" style={styles.imageCategory} source={{uri: Config.urlBackEnd + '//categoryImages/' + item.mainImage}} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.textBodyTable}>{item.title}</Text>                        
                                    </View>
                                </View>
                                <View style={styles.btnAccion}>
                                    <Button onPress={() => eliminateCategory(item._id)} color={"red"} title={"Eliminar"} />
                                </View>
                            </View>     
                        )
                    } else {

                        return (
                            <View style={styles.row2} key={index}>
                                <View style={styles.fristCol}>
                                <Image resizeMode="cover" style={styles.imageCategory} source={{uri: Config.urlBackEnd + '//categoryImages/' + item.mainImage}} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.textBodyTable}>{item.title}</Text>                           
                                    </View>
                                </View>
                                <View style={styles.btnAccion}>
                                    <Button onPress={() => eliminateCategory(item._id)} color={"red"} title={"Eliminar"} />
                                </View>
                            </View> 
                        )
                    }
                })
                :
                <Text style={styles.noData}>No hay usuarios registrados</Text>
                }

                {/* <View style={styles.row}>
                    <View style={styles.fristCol}>
                        <Image resizeMode="cover" style={styles.imageCategory} source={{uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg'}} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textBodyTable}>Guitarra Electrica</Text>                        
                        </View>
                    </View>
                    <View style={styles.btnAccion}>
                        <Button color={"red"} title={"Eliminar"} />
                    </View>
                </View> 

                <View style={styles.row2}>
                    <View style={styles.fristCol}>
                        <Image resizeMode="cover" style={styles.imageCategory} source={{uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg'}} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textBodyTable}>Guitarra Electrica</Text>                        
                        </View>
                    </View>
                    <View style={styles.btnAccion}>
                        <Button color={"red"} title={"Eliminar"} />
                    </View>
                </View>  */}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white"
    },
    subTitle: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",

    },
    linearGradient:{
        padding: 20,
        paddingBottom: 0,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        width: 270,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
    },
    table: {
        backgroundColor: "#dddddd",
        // marginHorizontal: 10
        // paddingHorizontal: 10,
        marginTop: 10,
        // borderWidth: 1
    },
    headerTable: {
        flexDirection: "row",         
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        paddingHorizontal: 10
        
    },
    textHeader:{
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 10
    },
    fristCol: {
        borderRightWidth: 1,
        width: 260,
        flexDirection: "row"
    },
    sencondCol: {
        marginLeft: 20
        // width: "100%"
    },
    row:{
        backgroundColor: "#ffffff",
        width: "100%",
        height: 150,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    btnAccion: {
        marginLeft: 20,
        width: 105
    },
    textBodyTable: {
        fontSize: 18,           
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "green",              
    },
    row2:{
        backgroundColor: "#dddddd",
        width: "100%",
        height: 150,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    noData: {
        textAlign: "center",
        fontWeight: "bold"
    },
    imageCategory:{
        width: 100,
        height: 100
    },
    textContainer:{
        width: "60%",
        justifyContent: "center"  
    },
    addCategoryContainer:{
        backgroundColor: "white",
        marginTop: 5,
        flexDirection: "row"
        // marginLeft: 5
    },
    boxImage: {
        width: 100,
        height: 100,
        backgroundColor: "#dddddd",
        borderRadius: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    },
    input:{
        borderBottomWidth: 2,
        fontSize: 15,
        borderBottomColor: Config.primaryColor
    },
    boxAdd:{
        flex: 1,
        marginHorizontal: 10
    },
    textAdd:{
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: Config.primaryColor
    },
    btnAddCategory:{
        marginTop: 15,
        marginHorizontal: 20
    },
    imageNewCategory:{
        width: 100,
        height: 100,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    eliminate: {
        position: "absolute",
        top: 10,
        left: 60, 
        right: 0, 
        bottom: 0,
        // justifyContent: 'center', 
        alignItems: 'center',
    },
    errorInput:{
        borderBottomColor: "red"
    },
    boxImageError:{
        borderWidth: 1,
        borderColor: "red"
    }
})