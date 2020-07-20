import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from "react-redux"
import CustomModal from './customModal'
import { Searchbar , Card} from 'react-native-paper';

let selected = ""
let status = false

function CoursesCategory({openModal, action}) {
    const [textSearch, setTextSearch] = useState("")

    const info =[
        {
            id: 1,
            title: "Guitarra Acustica Basico",
            descrip: "Elisa Fernandez",
            uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg'   
        },
        {
            id: 2,
            title: "Bajo Nivel Basico",
            descrip: "Fernando",
            uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg'   
        },
        {
            id: 3,
            title: "Bajo Nivel Basico",
            descrip: "Fernando",
            uri: 'https://picsum.photos/700'   
        }
    ]

    function onPressFunction(informacion) {
        selected = informacion
        status = true
        openModal() 
    }

    const close = () => {
        status = false
    }

    return(
        <View style={styles.container}>

            <CustomModal 
                data={selected}
                close={close}
            />
            {/* <ScrollView> */}

                {status 
                ?
                null 
                :
                
                <Searchbar 
                    placeholder="Buscar"
                    onChangeText={() => setTextSearch()}
                    value={textSearch}
                    style={styles.serachBox}
                />
                }

            <FlatList
                data={info}
                keyExtractor={item => item.id}
                renderItem={ ({item}) => 
                    <TouchableOpacity onPress={() => onPressFunction(item)}>
                        <View style={styles.containerCard}>
                            <Card 
                                elevation={7} 
                                style={styles.card}                            
                            >
                                <Card.Title 
                                    title={item.title.toUpperCase()}
                                    style={{backgroundColor: "#0080ff", borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    titleStyle={{color: "white", fontWeight: "bold"}}                                 
                                    right={() => {
                                        return(
                                            <Text style={styles.priceText}>
                                                40$
                                            </Text>
                                        )
                                    }}
                                />
                                <Card.Cover source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg' }} />
                                <Text style={styles.descripCardText}>Horas 120h - Guitarra</Text>    
                                <Text style={styles.contentDescrip}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum accumsan viverra. Aliquam ornare pellentesque malesuada. Sed ut neque eu urna sagittis pellentesque eu ut sapien. Suspendisse laoreet semper dolor at ultrices. In hac habitasse platea dictumst. Mauris lacinia neque vel turpis consectetur, at aliquet nibh rutrum ...</Text>
                                <Text style={styles.descripCard}>Por: Luis Sanchez</Text>                                
                                {/* <Card.Title 
                                    title={item.title} 
                                    subtitle={"Por: "+item.descrip} 
                                    subtitleStyle={styles.subtitleCard}
                                    right={() => {
                                        return(
                                            <Text style={styles.priceText}>
                                                40$
                                            </Text>
                                        )
                                    }}
                                /> */}
                            </Card>
                        </View>
                    </TouchableOpacity>                                         
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    },
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600"
    },
    card: {
        // margin: 20,
        borderBottomRightRadius: 70,     
        borderBottomColor: "#0080ff",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: "#0080ff",   
        borderRadius: 10                                 
    },
    priceText:{
        fontSize: 25,
        fontWeight: "bold",
        // marginRight: 10,
        color: "#0080ff",
        backgroundColor: "white",
        padding: 5,
        width: 70,
        textAlign: "center",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    subtitleCard: {
        color: "#0080ff",
    },
    serachBox: {
        margin: 10,       
        // position: "relative" 
    },
    contentDescrip: {
        padding: 10,
        textAlign: "justify",
        paddingBottom: 0
    },
    descripCard: {
        padding: 10,        
        fontSize: 12,
        color: "#0080ff",
        fontWeight: "normal",
        letterSpacing: 0.4   
    },containerCard : {
        backgroundColor: "#0080ff",
        margin: 10,
        borderRadius: 5,
        borderBottomRightRadius: 5,        
    },
    descripCardText:{
        padding: 10,
        paddingTop: 5,        
        fontSize: 12,
        color: "#909090",
        fontWeight: "normal",
        letterSpacing: 0.4  ,
        paddingBottom: 0
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
)(CoursesCategory)