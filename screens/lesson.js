import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Video } from 'expo-av'
import * as ScreenOrientation  from 'expo-screen-orientation';
import Accordian from '../components/accordian'
import {AntDesign} from "@expo/vector-icons"
import {SingleImage} from 'react-native-zoom-lightbox';

const ejemplo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum accumsan viverra. Aliquam ornare pellentesque malesuada. Sed ut neque eu urna sagittis pellentesque eu ut sapien. Suspendisse laoreet semper dolor at ultrices. In hac habitasse platea dictumst. Mauris lacinia neque vel turpis consectetur, at aliquet nibh rutrum. Suspendisse vitae fringilla tellus. Integer molestie non dolor id congue. Donec aliquet sem odio, quis maximus tellus convallis quis. Mauris vitae nibh vulputate, lacinia sem eu, rhoncus urna. Pellentesque efficitur, turpis quis hendrerit commodo, ante risus commodo lectus, vel sagittis lectus enim at erat. Mauris eu nibh sit amet orci egestas tempor. Pellentesque malesuada purus vitae orci egestas, ut blandit ex faucibus."

export default function Lesson() {

    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);

    return(
        <ScrollView>
            <View style={styles.videoContainer}>
                <Video
                    onFullscreenUpdate={async () => {
                        await ScreenOrientation.lockAsync(
                        orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : 
                        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                    );
                    setOrientationIsLandscape(!orientationIsLandscape);
                    }}
                    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }}
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
                        <Text>{ejemplo}</Text>                            
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
                            <SingleImage 
                                uri='https://picsum.photos/700'
                                style={{width: 100, height: 100, marginHorizontal: 8}} 
                            />
                            <SingleImage 
                                uri='https://picsum.photos/700'
                                style={{width: 100, height: 100, marginHorizontal: 8}} 
                            />
                            <SingleImage 
                                uri='https://picsum.photos/700'
                                style={{width: 100, height: 100, marginHorizontal: 8}} 
                            />
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