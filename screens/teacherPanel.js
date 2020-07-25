import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Alert, ScrollView  } from 'react-native'
import axios from 'axios'


export default function TeacherPanel() {

    const [data, setData] = useState(null);

    useEffect( () => {
        fecthData();
    },[])

    const fecthData = async () =>{
        await axios
        .get('http://10.0.2.2:4000/getAllUserTeacher')
        .then(res => {
            console.log(res.data)
            if (res.data.response) {
                setData(res.data.data)
            }else{
                setData(null)
                console.log(res.data.message)
            }
        })
    }

    const handleChangeStatus = async(id, status) => {
        const user_id = id;
        const dataSend = new FormData();
        let statusChange;        

        if (status == "active") {
            statusChange = "inactive";
        }else{
            statusChange = "active";
        }

        dataSend.append('user_id', user_id);
        dataSend.append('status_teacher', statusChange);

        await axios
        .post('http://10.0.2.2:4000/changeStatusTeacherUser', dataSend)
        .then(res => {
            if (res.data.response) {
                console.log(res.data.data)
                fecthData();
            } else {
                Alert.alert(
                    "Error al cambiar el estado",
                    res.data.message,
                    [
                      {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelar presionado"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK presionado") }
                    ],
                    { cancelable: false }
                );
            }
        })


    }

    return(
        <ScrollView>
            <Text style={styles.subTitle}>Usuario Profesores</Text>
            <View style={styles.table}>
                <View style={styles.headerTable}>
                    <View style={styles.fristCol}>
                        <Text style={styles.textHeader}>Informacion del Usuario</Text>
                    </View>
                    <View style={styles.sencondCol}>
                        <Text style={styles.textHeader}>Accion</Text>
                    </View>                    
                </View>
                {/* Contenido */}

                {data 
                ?
                data.map((item, index) => {

                    if (index%2 == 0) {                        
                        return(
                            <View style={styles.row}>
                                <View style={styles.fristCol}>
                                    <Text style={styles.textBodyTable}>Nombre: {item.name}</Text>
                                    <Text style={styles.textBodyTable}>Correo: {item.email}</Text>
                                </View>
                                <View style={styles.btnAccion}>
                                    <Button onPress={() => handleChangeStatus(item._id, item.status_teacher)} title={item.status_teacher == "active" ? "Desactivar" : "Activar"} />
                                </View>
                            </View> 
                        )
                        
                    }else{                        
                        return (
                            <View style={styles.row2}>
                                <View style={styles.fristCol}>
                                    <Text style={styles.textBodyTable}>Nombre: {item.name}</Text>
                                    <Text style={styles.textBodyTable}>Correo: {item.email}</Text>
                                </View>
                                <View style={styles.btnAccion}>
                                    <Button onPress={() => handleChangeStatus(item._id, item.status_teacher)} title={item.status_teacher == "active" ? "Desactivar" : "Activar"} />
                                </View>
                            </View>
                        )
                        
                    }

                    
                }) 
                :
                <Text>No hay usuarios registrados</Text>
                }

            </View>
        </ScrollView>
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
        width: 270,
        color: "white",
        fontWeight: "bold",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5
    },
    table: {
        backgroundColor: "#dddddd",
        // marginHorizontal: 10
        // paddingHorizontal: 10,
        marginTop: 10,
        // borderWidth: 1
    },
    headerTable: {
        flexDirection: "row",         
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        paddingHorizontal: 10
        
    },
    textHeader:{
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 10
    },
    fristCol: {
        borderRightWidth: 1,
        width: 260
    },
    sencondCol: {
        marginLeft: 20
        // width: "100%"
    },
    row:{
        backgroundColor: "#ffffff",
        width: "100%",
        height: 60,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    btnAccion: {
        marginLeft: 20,
        width: 105
    },
    textBodyTable: {
        fontSize: 16,        
    },
    row2:{
        backgroundColor: "#dddddd",
        width: "100%",
        height: 60,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center"
    },
})