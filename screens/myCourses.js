import React, {useState} from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { Searchbar , Card, Title, Subheading } from 'react-native-paper';

export default function MyCourses({navigation}) {

    const [textSearch, setTextSearch] = useState("")

    const info =[
        {
            id: 1,
            title: "Guitarra Acustica Basico",
            descrip: "Luis Sanchez",
            uri: 'https://picsum.photos/700'   
        },
        {
            id: 2,
            title: "Bajo Nivel Basico",
            descrip: "Fernando",
            uri: 'https://picsum.photos/700'   
        },
        {
            id: 3,
            title: "Bajo Nivel Basico",
            descrip: "Fernando",
            uri: 'https://picsum.photos/700'   
        }
    ]

    const onPress = () => {
        navigation.navigate('Curso')
    }

    return(
        <View style={styles.container}>            
            <Searchbar 
                placeholder="Buscar"
                onChangeText={() => setTextSearch()}
                value={textSearch}
                style={styles.serachBox}
            />

            <FlatList
                data={info}
                keyExtractor={item => item.id}
                renderItem={ ({item}) => 
                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={styles.containerCard}>
                            <Card elevation={7} style={styles.card}>
                                {/* <Card.Title 
                                    title={item.title} 
                                    subtitle={"Por: "+item.descrip} 
                                    subtitleStyle={styles.subtitleCard}
                                    style={styles.cardContent}
                                    left={() => <Image style={{width: 70, height: 70}} source={{uri: 'https://picsum.photos/700'}} />}
                                    leftStyle={{}}
                                /> */}
                                <View style={{flexDirection: "row"}}>
                                    <Image resizeMode="cover" style={styles.contentContainer} source={{uri: 'https://picsum.photos/700'}} />
                                    <View>
                                        <Text style={styles.tileCard}>Curso de Guitarra Electrica NIVEL 1</Text>
                                        <Text style={styles.descripCard}>Por: Luis Sanchez</Text>                                
                                        <Text style={{width: 270, padding: 10, paddingTop: 5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum accumsan viverra. Aliquam ornare pellentesque malesuada. Sed ut neque eu urna sagittis pellentesque eu ut sapien.</Text>
                                    </View>                                                                                                            
                                </View>                                
                            </Card>
                        </View>
                    </TouchableOpacity>                                         
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    },
    serachBox: {
        margin: 10,               
    },
    card: {
        // margin: 20,
        borderBottomRightRadius: 70,         
        height: 200,
        borderBottomColor: "#0080ff",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: "#0080ff",
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
    serachBox: {
        margin: 10,       
        // position: "relative" 
    },
    cardContent: {
        borderBottomRightRadius: 10
    },
    containerCard : {
        backgroundColor: "#0080ff",
        margin: 10,
        borderRadius: 5,
        borderBottomRightRadius: 5,        
    },
    contentContainer : {
        width: 120, 
        height: 200,
        flex: 1,

    },
    tileCard : {
        // marginLeft: 15,
        marginTop: 5,
        paddingTop: 0,
        padding: 10,
        width: 270,
        paddingBottom: 0,
        marginBottom: 0,
        fontSize: 20,
        fontWeight: "bold",        
    },
    descripCard: {
        margin: 0,
        paddingLeft: 10,
        fontSize: 11,
        color: "#0080ff",
        fontWeight: "normal",
        letterSpacing: 0.4   
    }
})