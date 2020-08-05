import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, ColorPropType } from 'react-native'
import { Divider } from 'react-native-paper';
import {AntDesign} from "@expo/vector-icons"
import { useSafeArea } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios'
import { HeaderBackButton } from '@react-navigation/stack'; 
import Config from '../config'

export default function Curso({ route ,navigation }) {

    const [dataInfo, setDataInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [course_id, setCourse_Id] = useState("")

    useEffect(() => {
        const { coursesId } =  route.params;
        setCourse_Id(coursesId)
        fetchCourseData(coursesId)        
    },[])

    navigation.setOptions({
        headerLeft: (props) => (
            <HeaderBackButton
                {...props}
                onPress={() => {
                    navigation.navigate('Nueva Opcion')
                }}
            />
        ),
    });

    const fetchCourseData = async (courseId) => {
        const dataForm = new FormData()
        dataForm.append('idCourse', courseId)

        try {
            await axios
            .post( Config.urlBackEnd + '/getSingleCourse', dataForm)
            .then(res => {
                if (res.data.response) {
                    console.log(res.data)
                    setLoading(false)
                    setDataInfo(res.data.data)
                }else{
                    console.log("No Curso")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onPress = () => {
        navigation.navigate('ModuleForm', {coursesId: course_id, fetchCourseData: (coursesId) => fetchCourseData(coursesId)})
    }

    const handleEachModuleAction = (moduleId) => {
        navigation.navigate('ModuleForm', {coursesId: course_id, moduleId})
    }

    const handleEliminateCourse = async() => {
        const dataSend = new FormData();
        dataSend.append('courseId', course_id);

        await axios
        .post( Config.urlBackEnd + '/eliminateCourse', dataSend)
        .then(res => {
            if (res.data.response) {
                navigation.navigate('Nueva Opcion')
            }else{
                console.log(res.data.message)
            }
        })
    }

    if (loading) {
        return(
          <View style={styles.loadingMain}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress={() => handleEachModuleAction(item._id)} style={[styles.moduloContainer, styles.shadow]}>
                <Text style={styles.modulo}>MODULO: {item.title}</Text>                    
                <AntDesign style={styles.icon} name='book' size={30} color={Config.primaryColor} />
            </TouchableOpacity>
        )
    }

    const dateYear = (fecha)=>{
        const fechaDate = new Date(fecha)
        return fechaDate.getFullYear()
    }
    return(
        <ScrollView>
        <View style={{padding: 10}}>
            <View style={[styles.containerHeader, styles.shadow]}>
                <Image 
                    resizeMode="cover" 
                    style={styles.imageMain} 
                    source={{uri: Config.urlBackEnd + '//coursesImages/'+dataInfo.course?.mainImage}} 
                />
                <View style={styles.hoverBack}>
                    <View style={styles.containerImage}>                                
                        <Image resizeMode="cover" style={styles.contentContainer} source={{uri: Config.urlBackEnd + '//profileImages/'+dataInfo.userInfo?.profile_image}} />
                    </View>
                    <Text style={[styles.descripCard, styles.other]}>{"Profesor".toUpperCase()}</Text> 
                    <Text style={styles.descripCard}>{dataInfo.userInfo?.name}</Text>       
                </View>
                <View style={{flex: 1, backgroundColor:"white", borderRadius: 10}}>
                    <Text style={styles.titleCurso}>{dataInfo.course?.title}</Text>    
                    <Text style={styles.contentInfo}>Horas: {dataInfo.course?.hours}h</Text>
                    <Text style={styles.contentInfo}>Fecha: {dateYear(dataInfo.course?.createdAt)}</Text>
                    <Text style={[styles.contentInfo, styles.readDescrip]}>{dataInfo.course?.description.slice(0, 100)+"..."}</Text>    

                    <View style={styles.CourseBtn}>
                        <View style={styles.iconOptions}>
                            <TouchableOpacity>
                                <FontAwesome name="edit" size={50} color={Config.primaryColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconOptions}>
                            <TouchableOpacity onPress={handleEliminateCourse} >
                                <AntDesign name="delete" size={46} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>               

                    {/* <Text style={[styles.contentInfo, styles.viewMore]}>Ver Mas</Text> */}
                </View>                
            </View>    
            <Text style={[styles.boxTitle, styles.shadow]}>MODULOS</Text>            
            <View style={{alignItems: "center"}}>                    
                <TouchableOpacity onPress={onPress}>  
                    <View style={[styles.addModule, styles.shadow]}>
                        <AntDesign name="pluscircle" size={30} color={Config.primaryColor}  />
                    </View>                                        
                </TouchableOpacity>
                <FlatList 
                    data={dataInfo.modules}
                    renderItem={renderItem}
                    style={styles.list}
                    ContainerStyle={{alignContent: "center"}}
                />
            </View>                     
        </View> 
        </ScrollView>      
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,           
    },
    imageMain: {
        width: 150,
        height: 220,
        borderRadius: 10
    },
    containerHeader: {
        flexDirection: "row", 
        borderRadius: 10              
    },
    titleCurso:{
        fontSize: 20,        
        padding: 5,
        marginLeft: 5,
        fontWeight: "600"
    },
    descripCard: {
        margin: 0,
        fontSize: 13,
        color: "white",
        fontWeight: "normal",
        letterSpacing: 0.4   ,
        padding: 0,
        paddingTop: 0,
        marginLeft: 5
        // marginTop: 5
    },
    other:{
        fontWeight: "bold"
    },
    hoverBack: {
        position: "absolute",
        backgroundColor: "rgba(0, 128, 255, 0.5)",
        width: 150,
        height: 220,
        justifyContent: "center",        
        alignItems: "center",
        borderRadius: 10,
    },
    containerImage:{
        width: 100,
        height: 100,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 100,  
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 7     
    },
    contentContainer : {
        borderRadius: 100,
        flex: 1,
    },
    contentInfo: {
        padding: 10,
        paddingBottom: 5,
        paddingTop: 0,
        color: "#909090"
    },    
    readDescrip: {
        width: "100%"
    },
    viewMore: {
        textAlign: "center",
        color: Config.primaryColor,
        fontWeight: "bold", 
        paddingTop: 7       
    },
    boxTitle: {
        width: "100%",
        backgroundColor: "white",
        marginTop: 10,
        color: Config.primaryColor,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,  
        marginBottom: 5      
    },
    moduloContainer: {
        width: "95%",
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "space-between",        
    },
    addModule: {
        width: "100%",
        backgroundColor: "#fff",
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",   
        borderRadius: 20,
        marginBottom: 10     
    }
    ,
    modulo: {
        padding: 15,
        fontSize: 14,
        fontWeight: "bold",        
    },
    icon: {
        padding: 5
    },
    list: {
        width: "100%",
        marginLeft: 18,
    },
    loadingMain: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    CourseBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    iconOptions: {
        paddingHorizontal: 10
    }
})