import React, {useState,useContext} from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Dimensions } from 'react-native'
import GridCategory from '../components/gridCategory'
import ContentNew from '../components/contentNew'
import CustomModal from './customModal'
import { connect } from "react-redux"
import axios from 'axios'

import { AuthContext } from '../components/context'

const screenHeight = Dimensions.get("window").height
let selected = ""
let status = false

function Home({navigation, openModal}) {

    const { signOut } = useContext(AuthContext)

    const [attachmentSelectedCourse, setAttachmentSelectedCourse] = useState([])
    const [namesModulosCourses, setNamesModulosCourses] = useState()

    function onPressFunction(informacion) {
        console.log(informacion)
        fetchAttachmentCourse(informacion.course._id)
        fetcGetNamesModulesOfCourse(informacion.course._id)
        selected = {
            dataSelectedCourse: informacion.course,
            userInfo: informacion.userInfo,
            attachmentSelectedCourse,
            namesModulosCourses
        }
        status = true
        openModal() 
    }

    const fetchAttachmentCourse = async (courseId) =>{
        const dataSend = new FormData();
        dataSend.append('courseId', courseId)

        await axios
        .post('http://10.0.2.2:4000/getAttachmentsOfCourse', dataSend)
        .then(res => {
            // console.log(res.data)
            if (res.data.response) {
                setAttachmentSelectedCourse(res.data.data)
            } else {
                console.log(res.data.message)
            }
        })
    }

    const fetcGetNamesModulesOfCourse = async (courseId) =>{
        const dataSend = new FormData();
        dataSend.append('courseId', courseId)

        await axios
        .post('http://10.0.2.2:4000/getNamesModulesOfCourse', dataSend)
        .then(res => {
            // console.log(res.data)
            if (res.data.response) {
                setNamesModulosCourses(res.data.data)
            } else {
                console.log(res.data.message)
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
            <ScrollView>
                <View style={{alignContent:"center", alignItems: "center", padding: 5}}>
                    <Button onPress={() => signOut()} title="logout-test" />
                </View>
                <Text style={styles.subTitle}>Nuevo</Text>
                <ContentNew 
                   onPressFun={onPressFunction}/>
                <Text style={styles.subTitleCate}>Categorias</Text>
                <GridCategory naviga={navigation} />
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