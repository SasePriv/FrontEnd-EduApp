import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native'
import { Card, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

function ContentNews({onPressFun}) {    
    const [info, setInfo] = useState([])

    useEffect(() => {
        fecthInfo()
    },[])

    const fecthInfo = async() => {
        await axios
        .get('http://10.0.2.2:4000/getLastestCourses')
        .then(res => {
            console.log(res.data)
            if (res.data.response) {
                setInfo(res.data.data)
            }else{
                console.log(res.data.response)
            }
        })
    }

    const renderItem = ({item, index}) => {
        return (            
            <TouchableOpacity onPress={() => onPressFun(item)}>
                <Card elevation={7} >
                    <Card.Cover source={{ uri: 'http://192.168.1.2:4000//coursesImages/' + item.course.mainImage}} />
                    {/* <Title style={item.create === "NUEVO" ? styles.titleCoverNuevo : styles.titleCover}>{item.create}</Title> */}
                    <Title style={true ? styles.titleCoverNuevo : styles.titleCover}>NUEVO</Title>
                    <Card.Title 
                        title={item.course.title} 
                        subtitle={"Por: " + item.userInfo.name} 
                        subtitleStyle={styles.subtitleCard}
                        right={() => {
                            return(
                                <Text style={styles.priceText}>
                                    {item.course.price ?item.course.price+"$" : "FREE" }
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
            <View style={styles.inside}>

            {info 
            ? 
            <Carousel
            //   ref={(c) => { this._carousel = c; }}
            layout={'default'}
              data={info}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            />
            :
            <Text style={styles.noContent}>No hay cursos recientes</Text>
            }
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "coral",
        // height: 300,
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
    inside:{
        paddingVertical: 15
    },
    noContent: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
})



export default ContentNews