import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from "react-redux"
import CustomModal from './customModal'
import { Searchbar , Card} from 'react-native-paper';
import axios from 'axios'
import Config from '../config'
import { handleChangeBar } from '../utils/searchFunction';
// let selected = ""
let status = false

function CoursesCategory({openModal, action, route ,navigation }) {
    const [textSearch, setTextSearch] = useState("");

    const [categoryTitle, setCategoryTitle] = useState("");

    const [info, setInfo] = useState(null);

    const [originalInfo, setOriginalInfo] = useState(null);

    const [selected, setSelected] = useState(null)

    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const { category } = route.params;
        setCategoryTitle(category);
        navigation.setOptions({ title: category })
        fetchCategoryData(category)
        handleAsync()
    },[])

    useEffect(() => {
        const { category } = route.params;
        const refreshUserData = navigation.addListener('focus', () => {
            fetchCategoryData(category)
        });
    }, [navigation])

    const handleAsync  = async() => {
        let dataAsync;
        try {
            dataAsync = await AsyncStorage.getItem('userData')
        } catch (error) {
            console.log(error)
        }

        if(dataAsync){
            setUserId(JSON.parse(dataAsync)._id)  
        }
    }

    const fetchCategoryData = async (category) => {

        const dataSend = new FormData();
        dataSend.append('categoryTitle', category);

        await axios
        .post( Config.urlBackEnd + '/getAllCoursesOfCategory', dataSend)
        .then(res => {
            if (res.data.response) {
                setInfo(res.data.data)
                setOriginalInfo(res.data.data)
            } else {
                setInfo(null)
            }
        })

    }

    async function onPressFunction(informacion) {
        let attachmentSelectedCourse = null
        let namesModulosCourses = null 
        const dataSend = new FormData();

        dataSend.append('courseId', informacion.course._id)

        await axios
        .post( Config.urlBackEnd + '/getAttachmentsOfCourse', dataSend)
        .then(res => {
            // console.log(res.data)
            if (res.data.response) {
                attachmentSelectedCourse = res.data.data
            } else {
                console.log(res.data.message)
            }
        })

        await axios
        .post( Config.urlBackEnd + '/getNamesModulesOfCourse', dataSend)
        .then(res => {
            console.log(res.data)
            if (res.data.response) {
                namesModulosCourses = res.data.data
            } else {
                console.log(res.data.message)
            }
        })

        setSelected({
            dataSelectedCourse: informacion.course,
            userInfo: informacion.userInfo,
            attachmentSelectedCourse,
            namesModulosCourses
        })
        status = true
        openModal() 
    }

    const close = () => {
        status = false
    }

    const getFreeCourse = async(course) => {
        const dataSend = new FormData();
        dataSend.append('user_Id', userId);
        dataSend.append('coursesId', course._id);
        dataSend.append('typeService', course.typeService);

        await axios
        .post( Config.urlBackEnd + '/acquireCourse', dataSend)
        .then(res => {
            if (res.data.response) {
                Alert.alert(
                    "Realizado",
                    "El curso se ha añadido a su libreria",
                    [
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    "Error",
                    res.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }
        })
    }

    const getPayCourse = async (course) => {
        const dataSend = new FormData();
        dataSend.append('user_Id', userId);
        dataSend.append('coursesId', course._id);
        dataSend.append('typeService', course.typeService);
        dataSend.append('priceCoin', course.price);
        dataSend.append('profesor_id', course.user_id);

        await axios
        .post( Config.urlBackEnd + '/acquireCourse', dataSend)
        .then(res => {
            if (res.data.response) {
                handleAsync()
                Alert.alert(
                    "Realizado",
                    "El curso se ha añadido a su libreria",
                    [
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    "Error",
                    res.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }
        })

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

            <CustomModal 
                data={selected}
                close={close}
                getFreeCourse={getFreeCourse}
                getPayCourse={getPayCourse}
            />
            {/* <ScrollView> */}

                {status 
                ?
                null 
                :
                
                <Searchbar 
                    placeholder="Buscar"
                    onChangeText={handleSerachChange}
                    value={textSearch}
                    style={styles.serachBox}                    
                    onKeyPress={handlebackspace}
                />
                }

            {info 
            ? 
            <FlatList
                data={info}
                keyExtractor={item => item._id}
                renderItem={ ({item}) => {
                    return(
                    <TouchableOpacity onPress={() => onPressFunction(item)} key={item.course._id}>
                        <View style={styles.containerCard}>
                            <Card 
                                elevation={7} 
                                style={styles.card}                            
                            >
                                <Card.Title 
                                    title={item.course?.title.toUpperCase()}
                                    style={{backgroundColor: Config.primaryColor, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    titleStyle={{color: "white", fontWeight: "bold"}}                                 
                                    right={() => {
                                        return(
                                            <Text style={styles.priceText}>
                                                {item.course?.price ? item.course.price + "" : "FREE"}
                                            </Text>
                                        )
                                    }}
                                />
                                <Card.Cover source={{ uri: Config.urlBackEnd + '//coursesImages/' + item.course?.mainImage }} />
                                <Text style={styles.descripCardText}>Horas {item.course?.hours}h - {item.course?.category}</Text>    
                                <Text style={styles.contentDescrip}>{item.course?.description.slice(0, 250)+"..."}</Text>
                                <Text style={styles.descripCard}>Por: {item.userInfo?.name}</Text>                                
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
                    )
                    }                                         
                }
            />

            :
            // <Text>asdas</Text>
            null
            }
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
        borderBottomColor: Config.primaryColor,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: Config.primaryColor,   
        borderRadius: 10                                 
    },
    priceText:{
        fontSize: 25,
        fontWeight: "bold",
        // marginRight: 10,
        color: "#efb810",
        backgroundColor: "white",
        padding: 5,
        width: 100,
        textAlign: "center",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    subtitleCard: {
        color: Config.primaryColor,
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
        color: Config.primaryColor,
        fontWeight: "normal",
        letterSpacing: 0.4   
    },containerCard : {
        backgroundColor: Config.primaryColor,
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