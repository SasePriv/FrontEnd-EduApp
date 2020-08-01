import React, {useState,useContext, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, RefreshControl, Alert } from 'react-native'
import GridCategory from '../components/gridCategory'
import ContentNew from '../components/contentNew'
import CustomModal from './customModal'
import { connect } from "react-redux"
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchCategoryData();
        fecthLastCourses();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchCategoryData()
        fecthLastCourses()
        handleAsync()
    },[])

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

    async function onPressFunction(informacion) {
        console.log(informacion)
        let attachmentSelectedCourse = null
        let namesModulosCourses = null 
        const dataSend = new FormData();

        dataSend.append('courseId', informacion.course._id)

        await axios
        .post('http://10.0.2.2:4000/getAttachmentsOfCourse', dataSend)
        .then(res => {
            // console.log(res.data)
            if (res.data.response) {
                attachmentSelectedCourse = res.data.data
            } else {
                console.log(res.data.message)
            }
        })

        await axios
        .post('http://10.0.2.2:4000/getNamesModulesOfCourse', dataSend)
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
        .get('http://10.0.2.2:4000/getAllCategory')
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
        .get('http://10.0.2.2:4000/getLastestCourses')
        .then(res => {
            console.log(res.data)
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
        .post('http://10.0.2.2:4000/acquireCourse', dataSend)
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

    const close = () => {
        status = false
    }

    return(
        <View>
            <CustomModal 
                data={selected}
                close={close}
                getFreeCourse={getFreeCourse}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                 }
            >
                <Text style={styles.subTitle}>Nuevo</Text>
                <ContentNew 
                    onPressFun={onPressFunction}
                    dataLastCourses={lastestCourses}
                />
                <Text style={styles.subTitleCate}>Categorias</Text>
                <GridCategory naviga={navigation} dataCategory={dataCategory}/>
            </ScrollView>
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
        backgroundColor: "#0080ff",
        width: 130,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
    },
    subTitleCate: {
        padding: 20,
        paddingBottom: 5,
        fontSize: 25,
        paddingTop: 5,
        backgroundColor: "#0080ff",
        width: 180,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
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