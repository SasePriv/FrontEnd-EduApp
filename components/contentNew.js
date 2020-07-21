import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native'
import { Card, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

function ContentNews({onPressFun}) {    
    const [info, setInfo] = useState([
        {title: "Guitarra Electrica", description: "Luis Sanchez", id: 1, create: "NUEVO"},
        {title: "Bajo Nivel 1 Basico", description: "Luis Sanchez", id: 2, create: "ACTUALIZADO"},
        {title: "Guitarra Electrica", description: "Luis Sanchez", id: 3, create: "NUEVO"},
        {title: "Bajo Nivel 1 Basico", description: "Luis Sanchez", id: 4, create: "NUEVO"},
        {title: "Guitarra Electrica", description: "Luis Sanchez", id: 5, create: "ACTUALIZADO"},
        {title: "Bajo Nivel 1 Basico", description: "Luis Sanchez", id: 6, create: "NUEVO"},        
    ])

    useEffect(() => {
        fecthInfo()
    },[])

    const fecthInfo = async() => {
        await axios
        .get('http://10.0.2.2:4000/getLastestCourses')
        .then(res => {
            console.log("asdasd")
            console.log(res.data)
            if (res.data.response) {
                setInfo(res.data.data)
            }
        })
    }

    const renderItem = ({item, index}) => {
        return (            
            <TouchableOpacity onPress={() => onPressFun(item)}>
                <Card elevation={7} >
                    <Card.Cover source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLmx1eC5saXZlLndhbGxwYXBlcnMuYW5kLmNyZWF0aXZlLmZhY3Rvcnkud2FsbHBhcGVycy5iYWNrZ3JvdW5kcy5oZC5sd3AuZ3VpdGFyLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8zXzE1NDk4NTgzNjRfMDQ5/screen-3.jpg?fakeurl=1&type=.jpg' }} />
                    {/* <Title style={item.create === "NUEVO" ? styles.titleCoverNuevo : styles.titleCover}>{item.create}</Title> */}
                    <Title style={true ? styles.titleCoverNuevo : styles.titleCover}>NUEVO</Title>
                    <Card.Title 
                        title={item.title} 
                        // subtitle={"Por: " + item.description} 
                        subtitleStyle={styles.subtitleCard}
                        right={() => {
                            return(
                                <Text style={styles.priceText}>
                                    {item.price ?item.price+"$" : "FREE" }
                                </Text>
                            )
                        }}
                    />
                </Card>
            </TouchableOpacity>            
        );
    }

    return (
        <View style={styles.container}>
            
            <Carousel
            //   ref={(c) => { this._carousel = c; }}
            layout={'default'}
              data={info}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "coral",
        height: 300,
        marginVertical: 10,
        marginBottom: 0        
        // marginHorizontal: 20
    },
    inside: {
        // padding: 10
        paddingHorizontal: 10
    },
    priceText:{
        fontSize: 25,
        fontWeight: "bold",
        marginRight: 10,
        color: "#0080ff",
    },
    subtitleCard: {
        color: "#0080ff",
    },
    titleCover: {
        position: "absolute",
        color: "#0080ff",
        fontWeight: "bold",
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.7)",
        marginTop: 0,
        width: 135,
        fontSize: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 25,
        paddingLeft: 10
    },
    titleCoverNuevo: {
        position: "absolute",
        color: "#0080ff",
        fontWeight: "bold",
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.7)",
        marginTop: 0,
        width: 80,
        fontSize: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 25,
        paddingLeft: 10
    },

})



export default ContentNews