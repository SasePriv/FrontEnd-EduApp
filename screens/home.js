import React, {useState,useContext, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, RefreshControl } from 'react-native'
import GridCategory from '../components/gridCategory'
import ContentNew from '../components/contentNew'
import CustomModal from './customModal'
import { connect } from "react-redux"
import axios from 'axios'

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchCategoryData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchCategoryData()
    },[])

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

    const close = () => {
        status = false
    }

    return(
        <View>
            <CustomModal 
                data={selected}
                close={close}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                 }
            >
                <Text style={styles.subTitle}>Nuevo</Text>
                <ContentNew 
                   onPressFun={onPressFunction}/>
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