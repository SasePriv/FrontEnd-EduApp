import React ,{ useState, useEffect } from "react"
import styled from "styled-components"
import {  Checkbox, Title  } from 'react-native-paper';
import { TouchableOpacity, Text, ScrollView, View, StyleSheet, Image, TextInput, Button, Dimensions, FlatList, ActivityIndicator } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Video } from 'expo-av'
import { AntDesign } from '@expo/vector-icons'; 
import Carousel from 'react-native-snap-carousel';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios'
import { set } from "react-native-reanimated";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);



export default function ModuleForm({route, navigation: { goBack }}){

    const [form, setForm] = useState({
        title: "",
        content: "",
        typeVideo: "url",   
        urlvideo: "",
        video: null,
        info: [{uri: "first", file: ""}],
        documents: [],
        contadorImage: 0,
        contadorFiles: 0
    });

    const [course_id, setCourse_id] = useState(null)

    const [loading, setLoading] = useState(false)

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const { coursesId } =  route.params;
        console.log(route.params)
        if (route.params.moduleId) {
            setEdit(true)
            fetchModuleInfo(route.params.moduleId)
        }
        setCourse_id(coursesId)
    }, [])

    const fetchModuleInfo = async (moduleId) => {
        const dataSend = new FormData()
        dataSend.append('moduleId', moduleId)
        
        await axios
        .post('http://192.168.1.2:4000/getSingleModule', dataSend)
        .then(res => {
            if (res.data.response) {
                let arrayImage = form.info;
                let imageContador = 0
                let arrayFile = [];
                let contadorFile = 0
                let arriveVideo = ""
                console.log(res.data)
                res.data.data.attachmentModule.forEach(element => {
                    if (element.type_of_Attachment == "image") {
                        // arrayImage = [...form.info, {uri: element.attachment, file:""}]
                        arrayImage.push({uri: "http://192.168.1.2:4000//moduleImages/" + element.attachment, file:""})
                        imageContador = imageContador + 1
                    }else if(element.type_of_Attachment == "file"){
                        // setForm({
                        //     ...form,
                        //     documents: [...form.documents, {name: element.nameOfFile, uri: element.attachment}],
                        //     contadorFiles: form.contadorFiles + 1
                        // })
                        // arrayFile = [...arrayFile,  {name: element.nameOfFile, uri: element.attachment}]
                        arrayFile.push({name: element.nameOfFile, uri: element.attachment}  )
                        contadorFile = contadorFile + 1
                    }else{
                        
                    }
                });

                if (res.data.data.module.type_of_video_source == "upload") {
                    arriveVideo = "http://192.168.1.2:4000//moduleVideos/"+ res.data.data.module.attachmentVideo
                }else{
                    arriveVideo = res.data.data.module.attachmentVideo
                }

                setForm({
                    ...form,
                    title: res.data.data.module.title,
                    content: res.data.data.module.contentText,
                    typeVideo: res.data.data.module.type_of_video_source,   
                    urlvideo: arriveVideo,
                    video: arriveVideo,
                    info: arrayImage,
                    documents: arrayFile,
                    contadorImage: imageContador,
                    contadorFiles: contadorFile
                })
            }
        })
    }

    const handleCheckUrl  = () => {
        if (form.typeVideo == "url") {
            setForm({
                ...form,
                typeVideo: "upload"
            })
        }else{
            setForm({
                ...form,
                typeVideo: "url"
            })
        }
    } 
    
    const handleCheckUpload  = () => {
        if (form.typeVideo == "upload") {
            setForm({
                ...form,
                typeVideo: "url"
            })
        }else{
            setForm({
                ...form,
                typeVideo: "upload"
            })
        }
    } 

    const pickVideo = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {            
             setForm({...form, video: result.uri})        
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setForm({
            ...form,
            contadorFiles: form.contadorFiles + 1,
            documents: [...form.documents, {name: result.name, uri: result.uri}]
        })
        // alert(result.name);
        // console.log(result);
	}

    const addImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setForm({
                    ...form,
                    contadorImage: form.contadorImage + 1,
                    info: [...form.info, {uri: result.uri, file:""}]
                })
            }
        
            console.log(result);
        } catch (E) {
        console.log(E);
        }
    }

    const eliminate = (index) => {
        const array = form.info
        array.splice(index, 1)
        setForm({
            ...form,
            info: array
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

    const eliminateFile = (index) => {
        const array = form.documents
        array.splice(index, 1)
        setForm({
            ...form,
            documents: array
        })        
    }

    const handleSubmit = async () => {
        let fileType = form.video.substring(form.video.lastIndexOf(".") + 1);
        let contImage = 0
        let contFiles = 0
        const data = new FormData();
        //colocar aqui el id del usuario
        data.append('coursesId', course_id)
        data.append('title', form.title)
        data.append('contentText', form.content)
        data.append('type_of_video_source', form.typeVideo)
        data.append('contadorImage', form.contadorImage)
        data.append('contadorFiles', form.contadorFiles)
        data.append('attachmentVideo', {
            uri: form.video,
            name: `videoModule.${fileType}`,
            type: `video/${fileType}`
        })

        if (form.contadorFiles > 0) {
            data.append('files_for_donwload', 'yes')
        }else{
            data.append('files_for_donwload', 'no')
        }

        if (form.info.length > 0) {
            form.info.forEach((element) => {
                if (element.uri !== "first") {
                    let typeFile = element.uri.substring(element.uri.lastIndexOf(".") + 1);
                    console.log(element)
                    data.append(`image${contImage}`, {
                        uri: element.uri,
                        name: `photo.${typeFile}`,
                        type: `image/${typeFile}`
                    })
    
                    contImage ++;
                }    
            });
        }

        if (form.documents.length > 0) {
            form.documents.forEach((element) => {
                if (element.uri !== "first") {
                    let typeFile = element.uri.substring(element.uri.lastIndexOf(".") + 1);
                    console.log(element)
                    data.append(`file${contFiles}`, {
                        uri: element.uri,
                        name: `${element.name}.${typeFile}`,
                        type: `file/${typeFile}`
                    })
    
                    contFiles ++;
                }    
            });
        }

        setLoading(true)

        await axios
        .post('http://10.0.2.2:4000/addModule', data, {
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
                // navigation.navigate('AddModule', {coursesId: res.data.data.coursesId})
                goBack()
            }else{
                console.log(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })

    }

    console.log(form)

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator 
                animating={true} 
                color={"#0080ff"} 
                size={100}
                />
            </View>
        )
    }

    const renderFiles = ({item, index}) => {
        return(            
        <View style={styles.containerDocument}>                                                                            
            <View style={styles.boxDocument}>
                <FontAwesome name="file-text-o" style={styles.icon} size={24} color="#0080ff" />
                <Text style={{width: 290}}>{item.name}</Text>     
                <TouchableOpacity style={styles.coverEliminate} onPress={() => eliminateFile(index)}>
                    <AntDesign name="closecircle" style={styles.iconEliminate} size={24} color="red"  />
                </TouchableOpacity>
            </View>                            
        </View>  
        )
    }

    return(          
            <Container>
                <ScrollView>
                    <Text style={styles.titleModule}>Module 1</Text>
                    
                    <View style={[styles.formGroup]}>  
                        <Text style={styles.labelText}>Titulo del Modulo</Text>
                        <View style={styles.containerInput}>                    
                            <MaterialCommunityIcons style={styles.icon} name="format-title" size={24} color="#0080ff" />
                            <TextInput
                                onChangeText={(text) => setForm({...form, title: text})}
                                value={form.title}
                                style={[styles.input]}                
                                selectionColor="#0080ff"
                                placeholder="Titulo"                                                                
                            />
                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Contenido del Modulo</Text>
                        <View style={styles.containerInput}>                                            
                            <MaterialIcons name="description" style={[styles.icon, styles.descriptionIcon]} size={24} color="#0080ff" />
                            <TextInput
                                onChangeText={(text) => setForm({...form, content: text})}
                                value={form.content}
                                style={[styles.input]}                
                                selectionColor="#0080ff"
                                placeholder="Correo"     
                                multiline={true}
                                numberOfLines={5}                           
                            />
                        </View>        
                    </View> 

                    <View style={[styles.formGroup]}>  
                        <Text style={styles.labelText}>Tipo del Servicio</Text>
                        <View style={[styles.containerInput, styles.getVideo]}>                                                                                                
                            <AntDesign name="videocamera"  style={styles.icon} size={24} color="#0080ff" />
                            <Text style={styles.titleCheck}>Url Video</Text>
                            <Checkbox
                                status={form.typeVideo == "url" ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckUrl()}
                            />
                            <Text style={styles.titleCheck}>Subir Video</Text>
                            <Checkbox
                                status={form.typeVideo == "upload" ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckUpload()}
                            />
                        </View>        
                    </View>
                    {form.typeVideo == "url" 
                    ?
                    <View style={styles.formGroup}>                          
                        <View style={[styles.containerInput]}>                                                                        
                            <TextInput
                                onChangeText={text => setForm({...form,urlvideo: text})}
                                value={form.urlvideo}
                                style={[styles.input]}                
                                selectionColor="#0080ff"
                                placeholder="Url"                             
                            />
                        </View>        
                    </View>
                    :
                    <View>
                             
                    {form.video 
                    &&    
                    <View style={styles.formGroup} onPress={pickVideo}> 
                        <Video
                            onFullscreenUpdate={async () => {
                                await ScreenOrientation.lockAsync(
                                orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : 
                                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                            );
                            setOrientationIsLandscape(!orientationIsLandscape);
                            }}
                            source={{ uri: form.video }}                            
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay = {false}
                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                            isLooping = {false}
                            useNativeControls
                            style={styles.video}
                        />
                    </View>
                    }
                    <View style={[styles.formGroup, styles.btnVideo]}>       
                        <Button title="Subir imagen desde la galeria" onPress={pickVideo} />                        
                    </View>
                    </View>
                    }

                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Imagenes del Curso</Text>
                        <View style={styles.containerInput}>                                            
                            {/* <FontAwesome5 name="money-bill-wave" style={styles.icon} size={24} color="#0080ff" /> */}
                            <Carousel
                                //   ref={(c) => { this._carousel = c; }}
                                layout={'default'}
                                data={form.info}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH/2}
                                itemWidth={ITEM_WIDTH/2}                             
                            />

                            
                        </View>        
                    </View>

                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Documentos del Curso</Text>
                        <View style={styles.group}>

                            <View style={{alignItems:"center", margin: 10}}>
                                <View style={{width: 100}}>
                                    <Button title="Añadir" onPress={pickDocument}/>
                                </View>
                            </View>

                            <FlatList 
                                data={form.documents}
                                renderItem={renderFiles}
                            />

                            {/* <View style={styles.containerDocument}>                                                                            
                                <View style={styles.boxDocument}>
                                    <FontAwesome name="file-text-o" style={styles.icon} size={24} color="#0080ff" />
                                    <Title>Archivo 1</Title>     
                                    <TouchableOpacity style={styles.coverEliminate}>
                                        <AntDesign name="closecircle" style={styles.iconEliminate} size={24} color="red"  />
                                    </TouchableOpacity>
                                </View>                            
                            </View>  
                            <View style={styles.containerDocument}>                                                                        
                                <View style={styles.boxDocument}>
                                    <FontAwesome name="file-text-o" style={styles.icon} size={24} color="#0080ff" />
                                    <Title>Archivo 1</Title>     
                                    <TouchableOpacity style={styles.coverEliminate}>
                                        <AntDesign name="closecircle" style={styles.iconEliminate} size={24} color="red"  />
                                    </TouchableOpacity>
                                </View>                            
                            </View>   */}

                        </View>
                    </View>

                    <View style={[styles.formGroup, styles.btnVideo]}>       
                        <TouchableOpacity onPress={() => handleSubmit()} >
                        <View style={[styles.cajaSave, styles.shadow]}>
                            <Text style={styles.textSave}>Añadir Modulo</Text>                 
                        </View>       
                        </TouchableOpacity>               
                    </View>                           
                </ScrollView>
            </Container>
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
        elevation: 7,           
    },
    titleModule: {
        textAlign: "center",
        fontSize: 30,
        padding: 10
    },
    labelText: {
        fontSize: 18,                            
        // padding: 5,
        // paddingLeft: 10,
    },
    formGroup: {
        // marginTop: 10,
        padding: 20,
        paddingVertical: 0,
        paddingBottom: 0
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
    group:{
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
    },
    containerDocument: {
        flexDirection: "row",    
        paddingHorizontal: 10,
        padding: 5,
    }
    ,
    btnClose: {
        position: "absolute", 
        top: 60, 
        left: "50%", 
        marginLeft: -22, 
        zIndex: 1
    },
    formGroupFrist:{
        marginTop: 50
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
    descriptionIcon:{
        marginTop: 41
    },
    icon: {
        padding: 5,
        paddingLeft: 0
    },
    titleCheck: {
        fontSize: 15,
        marginTop: 6,
        marginLeft: 10,
    },
    getVideo: {
        borderBottomWidth: 0,      
        marginBottom: 0  
    },
    video: {
        width: "100%", 
        height: 300 
    },
    btnVideo: {
        marginTop: 5
    },
    cajaSave: {
        height: 50,
        backgroundColor:  "#0080ff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10
    },
    textSave:{
        fontSize: 18,
        color: "white",

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
    boxDocument: {
        flexDirection: "row"
    },
    iconEliminate: {
        padding: 5,
        paddingLeft: 0,
        width: "100%",
        textAlign: "right"
    },
    coverEliminate:{
        width: "12%",
    }
})


const Container = styled.View`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 100;

`
