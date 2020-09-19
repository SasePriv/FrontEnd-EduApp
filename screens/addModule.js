import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native'
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
        navigation.setOptions({ title: "Configuracion del Curso" })

    },[])

    useEffect(() => {
        const refreshUserData = navigation.addListener('focus', () => {
            const { coursesId } =  route.params;
            fetchCourseData(coursesId);   
          });
    }, [navigation])

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

    const handleEditCourse = () => {
        navigation.navigate('Añadir Curso', {coursesId: course_id})
    }

    const eliminateCourse = () => {
        Alert.alert(
            "Confirmacion",
            "¿Estas seguro de eliminar el curso?",
            [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "SI", onPress: () => handleEliminateCourse() }
            ],
            { cancelable: false }
        );
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

    const eliminateModule = (moduleId) => {
        Alert.alert(
            "Confirmacion",
            "¿Estas seguro de eliminar este modulo?",
            [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "SI", onPress: () => handleEliminateModule(moduleId) }
            ],
            { cancelable: false }
        );
    }

    const handleEliminateModule = async(moduleId) => {
        const dataSend = new FormData();
        dataSend.append('moduleId', moduleId);

        await axios
        .post( Config.urlBackEnd + "/eliminateModule", dataSend)
        .then(res => {
            if (res.data.response) {
                fetchCourseData(course_id);  
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

    if (loading) {
        return(
          <View style={styles.loadingMain}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

    const renderItem = ({item}) => {
        return(
            <View style={{flexDirection: "row"}}>
                <View /*onPress={() => handleEachModuleAction(item._id)}*/ style={[styles.containerModules]}>
                    <View style={[styles.moduloContainer, styles.shadow]}>
                        <Text style={styles.modulo}>MODULO: {item.title}</Text>
                        <View style={{flexDirection: "row", marginRight: 5}}>
                            <TouchableOpacity onPress={() => handleEachModuleAction(item._id)}>
                                <View styles={styles.iconContainer}>
                                    <AntDesign style={styles.icon} name='edit' size={40} color={Config.primaryColor} />                                                              
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => eliminateModule(item._id)}>
                                <AntDesign style={styles.icon} name='delete' size={40} color={Config.primaryColor} />                      
                            </TouchableOpacity>
                        </View>
                    </View>    

                </View>
            </View>
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
                            <TouchableOpacity onPress={handleEditCourse}>
                                <FontAwesome name="edit" size={50} color={Config.primaryColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconOptions}>
                            <TouchableOpacity onPress={eliminateCourse} >
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
        backgroundColor: "rgba(229, 90, 91, 0.5)",
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
        width: "100%",
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",    
        margin: 5    
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
        width: "70%"       
        // marginTop: 30    
    },
    icon: {
        padding: 5,
        paddingTop: 8,
        paddingRight: 0,
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
    },
    options: {
        padding: 5,
        flexDirection: "row",
        marginRight: 10  ,
        backgroundColor: "#ffffff",
        width: 200,
        height: 200
    },
    containerModules:{
        width: "94%",
        flexDirection: "row",
        justifyContent: "space-between",        
    },
    iconContainer:{
        backgroundColor: "#ffffff",        
    }
})