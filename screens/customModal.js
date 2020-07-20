import React ,{ useState, useEffect } from "react"
import styled from "styled-components"
import { List } from 'react-native-paper'
import { Animated, TouchableOpacity, Dimensions, Text, ImageBackground, ScrollView, View, StyleSheet, Image } from "react-native"
import * as Icon from "@expo/vector-icons"
import { connect } from "react-redux"
import ParalaxImage from '../components/parallaxImage'

const screenHeight = Dimensions.get("window").height

function CustomModal({action, CloseModal, data, close}){

    const [top, setTop] = useState(new Animated.Value(screenHeight));
    const [expanded, setExpanded] = useState(true)

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

    return(
        <AnimatedContainer style={{ top: top }}>            
            <Container>
                <ScrollView>
                    {/* Header */}
                    <Header>
                        <ImageBackground 
                            style={{ flex: 1,}}  
                            // imageStyle={{ borderRadius: 10 }}
                            source={{uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg'}} />
                        <View style={styles.hoverImage}>
                            <ModelTileBody>{data.title}</ModelTileBody>
                            <View style={styles.containerImage}>                                
                                <Image resizeMode="cover" style={styles.contentContainer} source={{uri: 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/perfil-resilencia.jpg'}} />
                            </View>
                            <Text style={styles.descripCard}>Por: Elizabeth D.</Text>     
                        </View>
                    </Header>     

                    {/* Boton Close */}
                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ position: "absolute", top: 175, left: "50%", marginLeft: -22, zIndex: 1 }}
                    >
                        <CloseView style={{ elevation: 10 }}>
                            <Icon.Ionicons name='ios-close' size={44} color='#0080ff' />
                        </CloseView>
                    </TouchableOpacity>   

                    {/* Barra de Precio */}
                    <PriceBar>
                        <PriceText style={styles.shadow}>PRECIO: 40$</PriceText>
                        <Icon.FontAwesome5 style={styles.cartIcon} name='shopping-cart' size={22} color='white' />
                        <TouchableOpacity>
                            <ButtonPay style={styles.shadow}>
                                <PriceButton>GET</PriceButton>
                            </ButtonPay>      
                        </TouchableOpacity>                  
                    </PriceBar>

                    {/* Cuuerpo */}

                    <Body>                        
                        <Text style={styles.subTitleImagenes}>Imagenes</Text>
                        <ParalaxImage />
                        <Text style={styles.subTitleDescrip}>Descripcion</Text>
                        <ModelDescripctionBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum eros ut nulla placerat congue. Sed quis molestie neque. Sed nec magna mauris. Aliquam vestibulum urna nec feugiat accumsan. Curabitur in posuere sem. In id ante convallis, vehicula diam vel, condimentum eros. Donec sapien nunc, malesuada vel auctor in, congue sed enim. Aenean rhoncus quis felis eu cursus. Curabitur at velit congue, tristique eros et, faucibus dolor. Etiam lorem eros, fringilla pretium nunc vitae, sollicitudin malesuada nunc. Aliquam vel magna mi. Etiam nisi leo, bibendum in nibh ut, pellentesque vestibulum sem. Vivamus non leo ac tellus venenatis fermentum quis sit amet purus.

    Vestibulum quis vulputate ex. Nam at odio varius, iaculis neque vel, ullamcorper massa. Sed vitae elit sodales, mollis felis venenatis, egestas nisl. Nulla quis libero sed neque cursus vehicula. Sed et eleifend tortor. Vestibulum ultricies tincidunt massa, sit amet consequat ipsum sollicitudin ornare. Aliquam erat volutpat. Suspendisse gravida rhoncus ante, vel iaculis nulla finibus quis. Vestibulum at malesuada ante. Suspendisse ullamcorper iaculis ultrices. Curabitur malesuada bibendum neque id pulvinar. Maecenas scelerisque, nisl sed congue pellentesque, odio felis tempus urna, sit amet dictum est ante sed orci. In cursus turpis nec orci eleifend, sed maximus tortor ultricies. Sed viverra lorem elit, quis efficitur felis vulputate sed. Vestibulum ut convallis ipsum. Mauris vitae dignissim est.</ModelDescripctionBody>
                        <List.Accordion
                            title="Modulos"
                            left={props => <List.Icon {...props} icon="book-open" />}                        
                            raised theme={{ colors: {primary: '#0080ff'} }}
                            style={{marginTop: -10,}}
                        >
                            <List.Item title="Modulo 1: Acordes" />
                            <List.Item title="Modulo 1: Notas" />
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
        backgroundColor: "#0080ff",
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
    subTitleDescrip: {
        padding: 20,
        paddingBottom: 5,
        fontSize: 20,
        paddingTop: 5,
        backgroundColor: "#0080ff",
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
    color: #0080ff;
    fontWeight: bold;
    padding: 1px;            
    width: 100%;
    flex: 1;
    textAlign: center
`
const PriceBar = styled.View`
    height: 45px;
    flexDirection: row;
    background: #0080ff;
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