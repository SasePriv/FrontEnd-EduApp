import React ,{ useState, useEffect } from "react"
import styled from "styled-components"
import { List } from 'react-native-paper'
import { Animated, TouchableOpacity, Dimensions, Text, ImageBackground, ScrollView, View, StyleSheet, Image } from "react-native"
import * as Icon from "@expo/vector-icons"
import { connect } from "react-redux"
import ParalaxImage from '../components/parallaxImage'
import Config from '../config'
import { FontAwesome5 } from '@expo/vector-icons'; 

import LinearGradient from 'react-native-linear-gradient';

const screenHeight = Dimensions.get("window").height

function CustomModal({action, CloseModal, data, close, getFreeCourse, getPayCourse}){

    const [top, setTop] = useState(new Animated.Value(screenHeight));
    const [expanded, setExpanded] = useState(true);

    const AnimatedContainer = Animated.createAnimatedComponent(Container)

    useEffect(() => {
        toggleModal()
    })

    const toggleModal = () => {
        if (action === "openModal") {
            Animated.spring(top, {
                toValue: 0
            }).start()
          
        }
        if (action === "closeModal") {
            Animated.spring(top, {
                toValue: screenHeight
            }).start()
        }
    }

    const closeModal = () => {
        Animated.spring(top, {
            toValue: screenHeight
        }).start()
        close()
        CloseModal()
    }

    const handleAcquiere = (course) => {
        if (course.dataSelectedCourse.typeService == "free") {
            getFreeCourse(course.dataSelectedCourse)
        }else{
            console.log("add")
            getPayCourse(course.dataSelectedCourse)
        }
    }
 
    return(
        <AnimatedContainer style={{ top: top }}>            
            <Container>
                <ScrollView>
                    {/* Header */}
                    <Header>
                        <ImageBackground 
                            style={{ flex: 1,}}  
                            // imageStyle={{ borderRadius: 10 }}
                            source={{uri: Config.urlBackEnd + '//coursesImages/' + data?.dataSelectedCourse?.mainImage}} />
                        <View style={styles.hoverImage}>
                            <ModelTileBody>{data?.dataSelectedCourse?.title}</ModelTileBody>
                            <View style={styles.containerImage}>                                
                                <Image resizeMode="cover" style={styles.contentContainer} source={{uri: Config.urlBackEnd + '//profileImages/' + data?.userInfo?.profile_image}} />
                            </View>
                            <Text style={styles.descripCard}>Por: {data?.userInfo?.name}</Text>     
                        </View>
                    </Header>     

                    {/* Boton Close */}
                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ position: "absolute", top: 10, left: "8%", marginLeft: -22, zIndex: 1 }}
                    >
                        <CloseView style={{ elevation: 10 }}>
                            <Icon.Ionicons name='ios-close' size={44} color={Config.primaryColor} />
                        </CloseView>
                    </TouchableOpacity>   

                    {/* Barra de Precio */}
                    {/* <PriceBar> */}
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={[styles.linearGradientPrice, styles.shadow]}>
                        <PriceText style={styles.shadow}>PRECIO: {data?.dataSelectedCourse?.price ?  data?.dataSelectedCourse?.price + " " : "FREE" }</PriceText>
                        <FontAwesome5 style={styles.iconCoin} name="coins" size={23} color="#ffffff"/>
                        <Icon.FontAwesome5 style={styles.cartIcon} name='shopping-cart' size={22} color='white' />
                        <TouchableOpacity onPress={() => handleAcquiere(data)}>
                            <ButtonPay style={styles.shadow}>
                                <PriceButton>GET</PriceButton>
                            </ButtonPay>      
                        </TouchableOpacity> 
                    </LinearGradient>                
                    {/* </PriceBar> */}

                    {/* Cuuerpo */}

                    <Body>  
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.linearGradient}>
                            <Text style={styles.subtitleInside}>Imagenes</Text>
                        </LinearGradient>
                        <ParalaxImage 
                            arrayImage={data?.attachmentSelectedCourse}
                        />
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.linearGradient}>
                            <Text style={styles.subtitleInside}>Descripcion</Text>
                        </LinearGradient>
                        <ModelDescripctionBody>{data?.dataSelectedCourse?.description}</ModelDescripctionBody>
                        <List.Accordion
                            title="Modulos"
                            left={props => <List.Icon {...props} icon="book-open" />}                        
                            raised theme={{ colors: {primary: Config.primaryColor} }}
                            style={{marginTop: -10,}}
                        >
                        {Array.isArray(data?.namesModulosCourses) && data?.namesModulosCourses.length
                        ?
                            data?.namesModulosCourses.map((module, index) => {
                                return (<List.Item key={index} title={"Modulo: " + module.title} />)
                            })
                        :
                         <Text style={styles.noDisponible}>No hay modulos disponibles</Text> 
                        }
                            
                            {/* <List.Item title="Modulo 1: Acordes" />
                            <List.Item title="Modulo 1: Notas" /> */}
                        </List.Accordion>  

                    </Body>                        
                                                  
                </ScrollView>
            </Container>
        </AnimatedContainer>
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
    cartIcon:{
        marginRight: 10,
        marginTop: 9
    },
    subTitleImagenes: {
        padding: 20,        
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        backgroundColor: Config.primaryColor,
        width: 140,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,
    },
    subtitleInside:{
        fontSize: 20,
        color: "white",
        fontWeight: "bold",        
    },
    linearGradient:{
        flex: 1,
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        width: 150,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    linearGradientPrice:{
        height: 45,
        flexDirection: "row",
        borderColor: "white",
        // borderBottomWidth: 3
    },
    subTitleDescrip: {
        padding: 20,
        paddingBottom: 5,
        fontSize: 20,
        paddingTop: 5,
        backgroundColor: Config.primaryColor,
        width: 150,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5,
        margin: 10,
        marginLeft: 0,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,
    },
    hoverImage:{
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 1,
        // padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderBottomRightRadius: 20,
        alignItems: "center",
        // justifyContent: "center",        
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
    descripCard: {
        margin: 0,
        fontSize: 13,
        color: "white",
        fontWeight: "normal",
        letterSpacing: 0.4   ,
        marginTop: 5
    },
    noDisponible: {
        marginLeft: 10,
        marginBottom: 10
    },
    iconCoin:{
        left: -150,
        marginTop: 8
    }
})

const ButtonPay = styled.View`
    width: 60px;
    height: 25px;
    background: white;
    marginRight: 20px
    marginTop: 9px;
    borderRadius: 20px;
`

const PriceText = styled.Text`
    fontSize: 16px;
    color: white;
    paddingLeft: 10px;
    fontWeight: bold;
    width: 100%;
    flex: 1;  
    margin-top: 9px  
`

const PriceButton = styled.Text`
    fontSize: 16px;
    color: ${Config.primaryColor};
    fontWeight: bold;
    padding: 1px;            
    width: 100%;
    flex: 1;
    textAlign: center
`
const PriceBar = styled.View`
    height: 45px;
    flexDirection: row;
    background: ${Config.primaryColor};
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.8);
    borderColor: white;
    borderBottomWidth: 3px;
`

const ModelDescripctionBody = styled.Text`
    margin: 15px;
    marginBottom: 0px;
    marginTop: 5px
    textAlign: justify;    
`

const ModelTileBody = styled.Text`
    fontSize: 25px;
    margin: 5px;    
    marginBottom: 5px;
    textAlign: center;
    fontWeight: bold;
    color: white;
    letterSpacing: 2px
`

const Container = styled.View`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 100;    
`

const Header = styled.View`
    background: #333;
    height: 200px;
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

const Body = styled.View`
    background: white;    
`

function mapStateToProps(state) {
    return { action: state.action }
}

function mapDispatchToProps(dispatch) {
    return {
        CloseModal: () =>
            dispatch({
                type: "CLOSE_MODAL"
            })
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(CustomModal)