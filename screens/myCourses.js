import React, {useState, useEffect} from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text, RefreshControl } from 'react-native'
import { Searchbar , Card, Title, Subheading } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../config'
import { handleChangeBar } from '../utils/searchFunction';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function MyCourses({navigation}) {

    const [textSearch, setTextSearch] = useState("")
    const [userId, setUserId] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    const [info, setInfo] = useState(null)
    const [originalInfo, setOriginalInfo] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        handleAsync();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        handleAsync();
    },[])

    const handleAsync  = async() => {
        let dataAsync;
        try {
            dataAsync = await AsyncStorage.getItem('userData')
        } catch (error) {
            console.log(error)
        }

        if(dataAsync){
            const user_id = JSON.parse(dataAsync)._id
            setUserId(JSON.parse(dataAsync)._id)
            fetchMyCourses(user_id)
        }
    }

    const fetchMyCourses  = async (user_id) => {
        const dataSend = new FormData();
        dataSend.append('user_id', user_id);

        await axios
        .post(Config.urlBackEnd + '/getAcquiredCourses', dataSend)
        .then(res => {            
            if (res.data.response) {                
                setInfo(res.data.data)
            } else {
                setInfo(null);
                console.log("No se encontraron cursos")
            }
        })

    }

    const onPress = (dataCourse) => {
        navigation.navigate('Curso', {dataCourse})
    }

    const handleSerachChange = (text) => {        
        setTextSearch(text)
        console.log(info)        
        setInfo(handleChangeBar(info, originalInfo, text))
    }

    const handlebackspace= ({nativeEvent }) => {
        if (nativeEvent.key === 'Backspace') {
            setInfo(handleChangeBar(originalInfo, originalInfo, textSearch))
        }
    }

    return(
        <View style={styles.container}>            
            {/* <Searchbar 
                placeholder="Buscar"
                onChangeText={handleSerachChange}
                value={textSearch}
                style={styles.serachBox}
                onKeyPress={handlebackspace}
            /> */}

            {!info 
            ? 
            <FlatList
                data={info}
                keyExtractor={item => item.course?._id}
                renderItem={ ({item}) => 
                    <TouchableOpacity onPress={() => onPress(item)}>
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
                                    <Image resizeMode="cover" style={styles.contentContainer} source={{uri: Config.urlBackEnd + '//coursesImages/' + item.course?.mainImage}} />
                                    <View>
                                        <Text style={styles.tileCard}>{item.course?.title}</Text>
                                        <Text style={styles.descripCard}>Por: {item.userInfo?.name}</Text>                                
                                        <Text style={{width: 270, padding: 10, paddingTop: 5}}>{item.course?.description.slice(0, 250)+"..."}</Text>
                                    </View>                                                                                                            
                                </View>                                
                            </Card>
                        </View>
                    </TouchableOpacity>                                         
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                 }
            />
            :
            <Text style={{textAlign: "center", fontSize: 25, marginTop: 10}}>No tienes ningun curso todavia</Text>
            }

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