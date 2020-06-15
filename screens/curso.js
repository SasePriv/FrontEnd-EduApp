import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-paper';
import {AntDesign} from "@expo/vector-icons"

const ejemplo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum accumsan viverra. Aliquam ornare pellentesque malesuada. Sed ut neque eu urna sagittis pellentesque eu ut sapien. Suspendisse laoreet semper dolor at ultrices. In hac habitasse platea dictumst. Mauris lacinia neque vel turpis consectetur, at aliquet nibh rutrum"

export default function Curso() {
    return(
        <View style={{padding: 10}}>
            <View style={[styles.containerHeader, styles.shadow]}>
                <Image 
                    resizeMode="cover" 
                    style={styles.imageMain} 
                    source={{uri: 'https://picsum.photos/700'}} 
                />
                <View style={styles.hoverBack}>
                    <View style={styles.containerImage}>                                
                        <Image resizeMode="cover" style={styles.contentContainer} source={{uri: 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/perfil-resilencia.jpg'}} />
                    </View>
                    <Text style={[styles.descripCard, styles.other]}>{"Profesor".toUpperCase()}</Text> 
                    <Text style={styles.descripCard}>Luis Sanchez</Text>       
                </View>
                <View style={{flex: 1, backgroundColor:"white", borderRadius: 10}}>
                    <Text style={styles.titleCurso}>Guitarra Acustica Basico Nivel 1</Text>    
                    <Text style={styles.contentInfo}>Horas: 120h</Text>
                    <Text style={styles.contentInfo}>Fecha: 2020</Text>
                    <Text style={[styles.contentInfo, styles.readDescrip]}>{ejemplo.slice(0, 100)+"..."}</Text>                   
                    <Text style={[styles.contentInfo, styles.viewMore]}>Ver Mas</Text>
                </View>                
            </View>    
            <Text style={[styles.boxTitle, styles.shadow]}>MODULOS</Text>
            <View style={{alignItems: "center"}}>
                <View style={[styles.moduloContainer, styles.shadow]}>
                    <Text style={styles.modulo}>Modulo 1: Teclas</Text>                    
                    <AntDesign style={styles.icon} name='book' size={30} color='#0080ff' />
                </View>    
                <View style={[styles.moduloContainer, styles.shadow]}>
                    <Text style={styles.modulo}>Modulo 1: Teclas</Text>                    
                    <AntDesign style={styles.icon} name='book' size={30} color='#0080ff' />
                </View>
                <View style={[styles.moduloContainer, styles.shadow]}>
                    <Text style={styles.modulo}>Modulo 1: Teclas</Text>                    
                    <AntDesign style={styles.icon} name='book' size={30} color='#0080ff' />
                </View>
                <View style={[styles.moduloContainer, styles.shadow]}>
                    <Text style={styles.modulo}>Modulo 1: Teclas</Text>                    
                    <AntDesign style={styles.icon} name='book' size={30} color='#0080ff' />
                </View>
                <View style={[styles.moduloContainer, styles.shadow]}>
                    <Text style={styles.modulo}>Modulo 1: Teclas</Text>                    
                    <AntDesign style={styles.icon} name='book' size={30} color='#0080ff' />
                </View>                                                                    
            </View>
            <Divider />
        </View>
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
    imageMain: {
        width: 150,
        height: 220,
        borderRadius: 10
    },
    containerHeader: {
        flexDirection: "row", 
        borderRadius: 10              
    },
    titleCurso:{
        fontSize: 20,        
        padding: 5,
        marginLeft: 5,
        fontWeight: "600"
    },
    descripCard: {
        margin: 0,
        fontSize: 13,
        color: "white",
        fontWeight: "normal",
        letterSpacing: 0.4   ,
        padding: 0,
        paddingTop: 0,
        marginLeft: 5
        // marginTop: 5
    },
    other:{
        fontWeight: "bold"
    },
    hoverBack: {
        position: "absolute",
        backgroundColor: "rgba(0, 128, 255, 0.5)",
        width: 150,
        height: 220,
        justifyContent: "center",        
        alignItems: "center",
        borderRadius: 10,
    },
    containerImage:{
        width: 100,
        height: 100,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 100,  
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 7     
    },
    contentContainer : {
        borderRadius: 100,
        flex: 1,
    },
    contentInfo: {
        padding: 10,
        paddingBottom: 5,
        paddingTop: 0,
        color: "#909090"
    },    
    readDescrip: {
        width: "100%"
    },
    viewMore: {
        textAlign: "center",
        color: "#0080ff",
        fontWeight: "bold", 
        paddingTop: 7       
    },
    boxTitle: {
        width: "100%",
        backgroundColor: "white",
        marginTop: 10,
        color: "#0080ff",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,  
        marginBottom: 5      
    },
    moduloContainer: {
        width: "95%",
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modulo: {
        padding: 10,
    },
    icon: {
        padding: 5
    }
})