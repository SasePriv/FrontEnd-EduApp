import React, {useState,useContext, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, RefreshControl, Alert } from 'react-native'
import GridCategory from '../components/gridCategory'
import ContentNew from '../components/contentNew'
import CustomModal from './customModal'
import { connect } from "react-redux"
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../config'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { consumePurchaseAndroid } from 'react-native-iap'

import LinearGradient from 'react-native-linear-gradient';


const screenHeight = Dimensions.get("window").height
let status = false

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
  

function Home({navigation, openModal}) {

    const [selected, setSelected] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const [dataCategory, setDataCategory] = useState(null);

    const [lastestCourses, setLastestCourses] = useState(null)

    const [userId, setUserId] = useState(null)

    const [userWallet, setUserWallet] = useState(0)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchCategoryData();
        fecthLastCourses();
        handleAsync()   
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        const refreshUserData = navigation.addListener('focus', () => {
            fetchCategoryData();
            fecthLastCourses();
            handleAsync()   
          });
    }, [navigation])

    useEffect(() => {
        fetchCategoryData()
        fecthLastCourses()
        handleAsync() 
    },[])

    const fetchUserWallet = async (user_Id) => {
        const dataSend = new FormData();
        dataSend.append('user_Id', user_Id)

        await axios
        .post(Config.urlBackEnd + '/getUserWallet', dataSend)
        .then(res => {            
            console.log(user_Id)
            console.log("asdas")
            console.log(res.data)
            if (res.data.response) {
                setUserWallet(res.data.data[0])

                navigation.setOptions({
                    headerRight: () => (
                    <View style={[styles.containerWallet, styles.shadow]}>
                        <View style={styles.TrapezoidStyle}>
                            <FontAwesome5 style={styles.iconCoin} name="coins" size={19} color="#efb810" />
                        </View>
                        <View style={styles.coinText}>
        
                            <Text style={styles.textMoney}>{res.data.data[0]?.coins}</Text>
                        </View>
                    </View>
                    ),
                });

            } else {
                console.log("Error al hacer el fecth con la wallet")
            }
        })
    }
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <View style={[styles.containerWallet, styles.shadow]}>
                <View style={styles.TrapezoidStyle}>
                    <FontAwesome5 style={styles.iconCoin} name="coins" size={19} color="#efb810" />
                </View>
                <View style={styles.coinText}>

                    <Text style={styles.textMoney}>{userWallet?.coins}</Text>
                </View>
            </View>
            ),
        });
    }, [navigation]);     

    const handleAsync  = async() => {
        let dataAsync;
        try {
            dataAsync = await AsyncStorage.getItem('userData')
        } catch (error) {
            console.log(error)
        }

        if(dataAsync){
            setUserId(JSON.parse(dataAsync)._id)
            fetchUserWallet(JSON.parse(dataAsync)._id)   
        }
    }

    async function onPressFunction(informacion) {
        console.log(informacion)
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
            // console.log(res.data)
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

    const fetchCategoryData = async() =>{
        await axios
        .get( Config.urlBackEnd + '/getAllCategory')
        .then(res => {
            if (res.data.response) {          
                setDataCategory(res.data.data)
            } else {
                setDataCategory(null)
            }
        })
    }

    const fecthLastCourses = async() => {
        await axios
        .get( Config.urlBackEnd + '/getLastestCourses')
        .then(res => {
            if (res.data.response) {
                setLastestCourses(res.data.data)
            }else{
                setLastestCourses(null)
            }
        })
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

    const close = () => {
        status = false
    }

    return(
        <View style={{height: "100%"}}>
            
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                 }
                style={{height: "100%"}}
            >
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.linearGradient}>    
                    <Text style={styles.subtitleInside}>Nuevo</Text>
                </LinearGradient>   
                <ContentNew 
                    onPressFun={onPressFunction}
                    dataLastCourses={lastestCourses}
                />
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1.1, y: 0}} colors={['#e55a5b', '#fedf67']} style={styles.linearGradient}>
                    <Text style={styles.subtitleInside}>Categorias</Text>
                </LinearGradient>
                <GridCategory naviga={navigation} dataCategory={dataCategory}/>
            </ScrollView>
            <CustomModal 
                data={selected}
                close={close}
                getFreeCourse={getFreeCourse}
                getPayCourse={getPayCourse}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        backgroundColor: Config.primaryColor,
        width: 130,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
    },
    subtitleInside:{
        fontSize: 25,
        color: "white",
        fontWeight: "bold",        
    },
    linearGradient:{
        flex: 1,
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        width: 180,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5,
        marginTop: 10
    },
    subTitleCate: {
        padding: 20,
        paddingBottom: 5,
        fontSize: 25,
        paddingTop: 5,
        backgroundColor: Config.primaryColor,
        width: 180,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
    },
    containerWallet:{      
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 5  ,
        marginRight: 10,
        // padding: 5,
    },
    iconCoin:{
        marginTop: 2,
        fontWeight: "bold",            
    },
    coinText:{
      backgroundColor: "#fff",
      paddingRight: 10,
      justifyContent: "center",
    },
    textMoney: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,      
    },
    TrapezoidStyle: {
        width: 45,
        height: 0,
        borderBottomColor: Config.primaryColor,
        borderBottomWidth: 25,
        borderLeftWidth: 0,
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        alignItems: "center",            
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,           
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

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Home)