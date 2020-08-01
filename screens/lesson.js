import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Video } from 'expo-av'
import * as ScreenOrientation  from 'expo-screen-orientation';
import Accordian from '../components/accordian'
import {AntDesign} from "@expo/vector-icons"
import {SingleImage} from 'react-native-zoom-lightbox';
import axios from 'axios'

const principalUri = 'http://192.168.1.4:4000'

export default function Lesson({route}) {

    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);
    const [dataLesson, setDataLesson] = useState(null)
    const [dataAttachtment, setDataAttachtment] = useState([]) ;

    useEffect(() => {
        const { module } = route.params;
        setDataLesson(module);
        fecthAttachmentModule(module._id)
    },[])

    const fecthAttachmentModule = async (moduleId) => {
        const dataSend = new FormData();
        dataSend.append('moduleId', moduleId);

        await axios
        .post(principalUri + '/getAttachmentsOfModule', dataSend)
        .then(res => {
            if (res.data.response) {
                setDataAttachtment(res.data.data)
            } else {
                setDataAttachtment(null)
            }
        })        
    }

    console.log('lessons', dataLesson)

    return(
        <ScrollView>
            <View style={styles.videoContainer}>

                {dataLesson
                ?
                <Video
                    onFullscreenUpdate={async () => {
                        await ScreenOrientation.lockAsync(
                        orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : 
                        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                    );
                    setOrientationIsLandscape(!orientationIsLandscape);
                    }}
                    source={{ uri: principalUri + '//moduleVideos/' + dataLesson?.attachmentVideo}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay = {false}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    isLooping = {false}
                    useNativeControls
                    style={{ width: "100%", height: 300 }}
                />
                :
                null
                }

            </View>
            <View style={{padding: 5}}>
                {/* <List.AccordionGroup>
                    <List.Accordion style={styles.containerAcordion} title="Accordion 1" id="1">
                        <List.Item title="Item 1" />
                        <Text>
                        List.Accordion can be wrapped because implementation uses React.Context.
                        </Text>
                    </List.Accordion>
                    <List.Accordion title="Accordion 2" id="2">
                        <List.Item title="Item 2" />
                    </List.Accordion>
                </List.AccordionGroup> */}

                <Accordian 
                    title={"Descripcion".toUpperCase()}
                    data={() =>                         
                        <Text>{dataLesson?.contentText}</Text>                            
                    }
                />
                <Accordian 
                    title={"Archivos".toUpperCase()}
                    data={() => 
                        <View>
                            <View style={styles.files}>
                                <AntDesign style={styles.icon} name='pdffile1' size={30} color='#0080ff' />
                                <Text style={styles.textFile}>Notas Musicales</Text>
                            </View>
                            <View style={styles.files}>
                                <AntDesign style={styles.icon} name='pdffile1' size={30} color='#0080ff' />
                                <Text style={styles.textFile}>Teclado Notas 1</Text>
                            </View>
                        </View>
                    }
                />
                <Accordian 
                    title={"Imagenes".toUpperCase()}
                    data={() => 
                        <View style={{flexDirection: "row"}}>

                            {dataAttachtment?.map(item => {
                                if(item?.type_of_Attachment == "image"){
                                    return(
                                        <SingleImage 
                                            uri={principalUri + '/moduleImages/' +item?.attachment}
                                            style={{width: 100, height: 100, marginHorizontal: 8}} 
                                        />
                                    )    
                                }
                            })}
                        </View>}
                />
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
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    },
    videoContainer: {
        width: "100%",
        height: 300,
        backgroundColor: "black"
    },
    containerAcordion: {
        backgroundColor: "white",
        margin: 5,        
    },
    child:{
        backgroundColor: "white",
        padding:16,
        marginHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#0080ff",
        borderTopWidth: 3
    },
    files: {
        flexDirection: "row",
        marginBottom: 10
    },
    textFile: {
        padding: 6
    }
})