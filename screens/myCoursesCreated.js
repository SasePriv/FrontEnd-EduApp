import React, {useState, useEffect} from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { Searchbar , Card, Title, Subheading } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../config'

export default function MyCoursesCreated({navigation}) {

    const [textSearch, setTextSearch] = useState("")
    const [user_id, setUser_Id] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        getUser()
    },[])

    const getUser = async ()=> {
        const user_Id = await AsyncStorage.getItem('userData')
        setUser_Id(JSON.parse(user_Id)._id)
        fetchAllCoursesOfTeacher(JSON.parse(user_Id)._id)
    }

    const fetchAllCoursesOfTeacher = async (user_id) => {
        const dataForm = new FormData()
        dataForm.append("user_id", user_id)
        await axios
        .post(Config.urlBackEnd + '/getAllTeacherCourses', dataForm)
        .then(res => {
            if (res.data.response) {
                setData(res.data.data)
            }else{
                console.log(res.data.message)
            }
        })

    }

    const onPress = (coursesId) => {
        navigation.navigate('AddModule', {coursesId})
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
                data={data.coursesTeacher}
                keyExtractor={item => item._id}
                renderItem={ ({item}) => 
                    <TouchableOpacity onPress={() => onPress(item._id)}>
                        <View style={styles.containerCard}>
                            <Card elevation={7} style={styles.card}>
                                <View style={{flexDirection: "row"}}>
                                    <Image resizeMode="cover" style={styles.contentContainer} source={{uri: Config.urlBackEnd + '//coursesImages/'+item.mainImage}} />
                                    <View>
                                        <Text style={styles.tileCard}>{item.title}</Text>
                                        <Text style={styles.descripCard}>Por: {data.userInfo.name}</Text>                                
                                        <Text style={{width: 270, padding: 10, paddingTop: 5}}>{item.description.slice(0, 150)+"..."}</Text>
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
        borderBottomColor: Config.primaryColor,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: Config.primaryColor,
    },
    priceText:{
        fontSize: 25,
        fontWeight: "bold",
        marginRight: 10,
        color: Config.primaryColor,
    },
    subtitleCard: {
        color: Config.primaryColor,
    },
    serachBox: {
        margin: 10,       
        // position: "relative" 
    },
    cardContent: {
        borderBottomRightRadius: 10
    },
    containerCard : {
        backgroundColor: Config.primaryColor,
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
        color: Config.primaryColor,
        fontWeight: "normal",
        letterSpacing: 0.4   
    }
})