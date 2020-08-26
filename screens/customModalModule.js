import React ,{ useState, useEffect } from "react"
import styled from "styled-components"
import {  Checkbox  } from 'react-native-paper';
import { TouchableOpacity, Dimensions, Text, ImageBackground, ScrollView, View, StyleSheet, Image, TextInput, Button } from "react-native"
import * as Icon from "@expo/vector-icons"
import { connect } from "react-redux"
import ParalaxImage from '../components/parallaxImage'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Video } from 'expo-av'
import { AntDesign } from '@expo/vector-icons'; 
import Config from '../config'



export default function CustomModalModule(){

    const [formModule, setFormModule] = useState({
        title: "",
        content: "",
        typeVideo: "url",   
        urlvideo: "",
        video
    });


    const handleCheckUrl  = () => {
        if (formModule.typeVideo == "url") {
            setFormModule({
                ...formModule,
                typeVideo: "upload"
            })
        }else{
            setFormModule({
                ...formModule,
                typeVideo: "url"
            })
        }
    } 
    
    const handleCheckUpload  = () => {
        if (formModule.typeVideo == "upload") {
            setFormModule({
                ...formModule,
                typeVideo: "url"
            })
        }else{
            setFormModule({
                ...formModule,
                typeVideo: "upload"
            })
        }
    } 

    return(          
            <Container>
                <ScrollView>
                    <Text style={styles.titleModule}>Module 1</Text>
                    
                    <View style={[styles.formGroup, styles.formGroupFrist]}>  
                        <Text style={styles.labelText}>Titulo del Modulo</Text>
                        <View style={styles.containerInput}>                    
                            <MaterialCommunityIcons style={styles.icon} name="format-title" size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={(text) => handlteTitle(text)}
                                value={moduleData?.title}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Titulo"                                                                
                            />
                        </View>        
                    </View>
                    <View style={styles.formGroup}>  
                        <Text style={styles.labelText}>Contenido del Modulo</Text>
                        <View style={styles.containerInput}>                                            
                            <MaterialIcons name="description" style={[styles.icon, styles.descriptionIcon]} size={24} color={Config.primaryColor} />
                            <TextInput
                                onChangeText={text => setFormModule({...formModule,content: text})}
                                value={formModule.content}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Correo"     
                                multiline={true}
                                numberOfLines={5}                           
                            />
                        </View>        
                    </View> 

                    <View style={[styles.formGroup]}>  
                        <Text style={styles.labelText}>Tipo del Servicio</Text>
                        <View style={[styles.containerInput, styles.getVideo]}>                                                                                                
                            <AntDesign name="videocamera"  style={styles.icon} size={24} color={Config.primaryColor} />
                            <Text style={styles.titleCheck}>Url Video</Text>
                            <Checkbox
                                status={formModule.typeVideo == "url" ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckUrl()}
                            />
                            <Text style={styles.titleCheck}>Subir Video</Text>
                            <Checkbox
                                status={formModule.typeVideo == "upload" ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckUpload()}
                            />
                        </View>        
                    </View>
                    {formModule.typeVideo == "url" 
                    ?
                    <View style={styles.formGroup}>                          
                        <View style={[styles.containerInput]}>                                                                        
                            <TextInput
                                onChangeText={text => setFormModule({...formModule,urlvideo: text})}
                                value={formModule.urlvideo}
                                style={[styles.input]}                
                                selectionColor={Config.primaryColor}
                                placeholder="Url"                             
                            />
                        </View>        
                    </View>
                    :
                    <View>
                             
                    {video 
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
                            source={{ uri: video }}
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

                    <View style={[styles.formGroup, styles.btnVideo]}>       
                        <TouchableOpacity>
                        <View style={[styles.cajaSave, styles.shadow]}>
                            <Text style={styles.textSave}>Añadir Modulo</Text>                 
                        </View>       
                        </TouchableOpacity>               
                    </View>
                                        
                    {/* Boton Close */}
                    <TouchableOpacity
                        style={styles.btnClose}
                    >
                        <CloseView style={{ elevation: 10 }}>
                            <Icon.Ionicons name='ios-close' size={44} color={Config.primaryColor} />
                        </CloseView>
                    </TouchableOpacity>   

                                                  
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
        backgroundColor: Config.primaryColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10
    },
    textSave:{
        fontSize: 18,
        color: "white",

    }
})


const Container = styled.View`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 100;

`

const CloseView = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`
