import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from "react-redux"
import CustomModal from './customModal'
import { Searchbar , Card} from 'react-native-paper';
import axios from 'axios'

// let selected = ""
let status = false

function CoursesCategory({openModal, action, route ,navigation }) {
    const [textSearch, setTextSearch] = useState("");

    const [categoryTitle, setCategoryTitle] = useState("");

    const [info, setInfo] = useState(null);

    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const { category } = route.params;
        setCategoryTitle(category);
        fetchCategoryData(category)
    },[])

    const fetchCategoryData = async (category) => {

        const dataSend = new FormData();
        dataSend.append('categoryTitle', category);

        await axios
        .post('http://10.0.2.2:4000/getAllCoursesOfCategory', dataSend)
        .then(res => {
            if (res.data.response) {
                setInfo(res.data.data)
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

    return(
        <View style={styles.container}>

            <CustomModal 
                data={selected}
                close={close}
            />
            {/* <ScrollView> */}

                {status 
                ?
                null 
                :
                
                <Searchbar 
                    placeholder="Buscar"
                    onChangeText={() => setTextSearch()}
                    value={textSearch}
                    style={styles.serachBox}
                />
                }

            {info 
            ? 
            <FlatList
                data={info}
                keyExtractor={item => item._id}
                renderItem={ ({item}) => {
                    return(
                    <TouchableOpacity onPress={() => onPressFunction(item)}>
                        <View style={styles.containerCard}>
                            <Card 
                                elevation={7} 
                                style={styles.card}                            
                            >
                                <Card.Title 
                                    title={item.course?.title.toUpperCase()}
                                    style={{backgroundColor: "#0080ff", borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    titleStyle={{color: "white", fontWeight: "bold"}}                                 
                                    right={() => {
                                        return(
                                            <Text style={styles.priceText}>
                                                {item.course?.price ? item.course.price + "$" : "FREE"}
                                            </Text>
                                        )
                                    }}
                                />
                                <Card.Cover source={{ uri: 'http://192.168.1.2:4000//coursesImages/' + item.course?.mainImage }} />
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
            <Text>asdas</Text>
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
        borderBottomColor: "#0080ff",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: "#0080ff",   
        borderRadius: 10                                 
    },
    priceText:{
        fontSize: 25,
        fontWeight: "bold",
        // marginRight: 10,
        color: "#0080ff",
        backgroundColor: "white",
        padding: 5,
        width: 70,
        textAlign: "center",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    subtitleCard: {
        color: "#0080ff",
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
        color: "#0080ff",
        fontWeight: "normal",
        letterSpacing: 0.4   
    },containerCard : {
        backgroundColor: "#0080ff",
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