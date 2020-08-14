import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Platform,Alert  } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../config'
import axios from 'axios'
import * as RNIap from "react-native-iap"

import { AuthContext } from '../components/context'

const itemSkus = Platform.select({
    ios: [
      '1000_monedas',
      '2000_monedas' 
    ],
    android: [
        // '1000_monedas',
        // '2000_monedas',
        // '3000_monedas'
        "android.test.purchased"
    ]
  });

// initializeInAppPurchase();


export default function MyProfile() {

    const [userInfo, setUserInfo] = useState(null);
    const [userWallet, setUserWallet] = useState(null);
    const [productData, setProductData] = useState("");

    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        fetchUserData();
    },[])

    useEffect(() => {
        // initializeInAppPurchase()
        fetchProductsData()        
    },[])

    const fetchUserData = async() => {
        try {
            const userData = await AsyncStorage.getItem('userData')
            const dataUser = JSON.parse(userData)
            setUserInfo(dataUser)
            fetchUserWallet(dataUser._id);
          } catch (error) {
            console.log(error)
          }
    }

    const fetchUserWallet = async (user_Id) => {
        const dataSend = new FormData();
        dataSend.append('user_Id', user_Id)

        await axios
        .post(Config.urlBackEnd + '/getUserWallet', dataSend)
        .then(res => {            
            console.log(res.data)
            if (res.data.response) {
                setUserWallet(res.data.data[0])
            } else {
                console.log("Error al hacer el fecth con la wallet")
            }
        })
    }

    const fetchProductsData = async () => {
        try {
            const products = await RNIap.getProducts(itemSkus);
            setProductData(products)
            console.log(products)
        } catch(err) {
            console.warn(err); // standardized err.code and err.message available
        }
    }

    const cleanPurchases = async () =>{
            const respuesta = await RNIap.consumeAllItemsAndroid()
            console.log("respuesta", respuesta)
    }

    const requestPurchase_Addcoin = async (sku) => {       
        console.log(sku)         
        try {
            const invoice = await RNIap.requestPurchase(sku, false);          
            cleanPurchases()
            console.log(invoice.transactionId)
            
            const dataSend = new FormData();
            dataSend.append('user_Id', userInfo._id);
            dataSend.append('walletId', userWallet._id);
            dataSend.append('productId', invoice.productId);
            dataSend.append('orderId', invoice.dataAndroid.orderId);
            dataSend.append('transactionId', invoice.transactionId);    

            postPayment(dataSend)            

        } catch (err) {
            console.warn(err.code, err.message);
        }
      }

    const postPayment = async(dataSend) => {
        await axios
            .post(Config.urlBackEnd + '/addCoin', dataSend)
            .then(res => {
                if (res.data.response) {     
                    fetchUserWallet(userInfo._id)               
                    console.log('succesful',res.data.data);
                } else {
                    console.log('No succesful',res.data)
                }
            })
    }
    
    return(
        <ScrollView>
            <View style={[styles.containerUser]}>
                <Image 
                    resizeMode="contain" 
                    style={styles.imageMain} 
                    source={require('../assets/backgrounds/perfil2.jpg')} 
                />
                <View style={styles.hoverBack}>
                    <View style={styles.containerImage}>
                        <Image 
                            resizeMode="cover" 
                            style={styles.profileImage} 
                            source={{uri: Config.urlBackEnd + '//profileImages/' + userInfo?.profile_image}} 
                        />
                    </View>
                    <Text style={styles.textWhite}>{userInfo?.name}</Text>
                    <Text style={styles.textWhite}>{userInfo?.email}</Text>
                    <Text style={styles.textWhite}>Tipo de Usuario: {userInfo?.typeOfUser == "teacher" ? "Profesor" : userInfo?.typeOfUser == "user" ? "Usuario Normal" : "Administrador"}</Text>
                    
                    {userWallet 
                    ? 
                    <View style={[styles.containerWallet, styles.shadow]}>
                        <View style={styles.TrapezoidStyle}>
                            <FontAwesome5 style={styles.iconCoin} name="coins" size={20} color="#efb810" />
                        </View>
                        <View style={styles.coinText}>
                            <Text style={styles.textMoney}>{userWallet.coins}</Text>
                        </View>
                    </View>
                    : 
                        null
                    }
                    
                </View>
            </View>

            <View style={styles.coinBox}>

                {productData 
                ? 
                productData.map((product, index) => {

                    let monedas = 0;

                    if (product.price == 10) {
                        monedas = 1000;
                    }else if(product.price == 20){
                        monedas = 2000;
                    }else if(product.price == 30){
                        monedas = 3000

                    }

                    var example = "android.test.purchased"

                    return(
                        <TouchableOpacity key={index} onPress={() => requestPurchase_Addcoin(example)} style={{width: "33.5%"}}>
                            <View style={styles.btnAddCoins}>
                                <Text style={styles.textAddCoin}>Añadir</Text>
                                <View style={styles.numberCoin}>
                                    <Text style={[styles.textAddCoin, styles.textCoinCenter]}>{monedas}</Text>
                                    <FontAwesome5 style={styles.iconCoinBoc} name="coins" size={20} color="#efb810" />
                                </View>
                                <Text style={styles.textAddCoin}>Monedas</Text>
                                <Text style={styles.textAddCoin}>{product.price}$</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                    null
                }

            </View>

            <View style={styles.containerOptions}>
                <View style={styles.eachOption}>
                    <AntDesign style={styles.icon} name="edit" size={25} color="#526065" />
                    <Text style={styles.textEach}>Editar mi Perfil</Text>
                </View>
                <View style={styles.eachOption}>
                    <MaterialCommunityIcons name="textbox-password" style={styles.icon} size={25} color="#526065" />
                    <Text style={styles.textEach}>Cambiar la Contraseña</Text>
                </View>
                {/* <TouchableOpacity onPress={() => requestPurchase(itemSkus)}>
                    <View style={styles.eachOption}>
                        <MaterialCommunityIcons name="textbox-password" style={styles.icon} size={25} color="#526065" />
                        <Text style={styles.textEach}>Añadir Monedas</Text>
                    </View>
                </TouchableOpacity> */}
                <View style={styles.eachOption}>
                    <AntDesign name="delete" style={styles.icon} size={25} color="#526065" />
                    <Text style={styles.textEach}>Eliminar Cuenta</Text>
                </View>

                <TouchableOpacity onPress={signOut}>
                    <View style={styles.eachOption}>
                        <AntDesign name="logout" style={styles.icon} size={25} color="#526065" />
                        <Text style={styles.textEach}>Cerrar Sesion</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Text>
                {JSON.stringify(productData)}
            </Text> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 25
    },
    containerUser:{
        height: 250,
        // backgroundColor: "grey",
        justifyContent: "center",
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
    },
    containerImage: {
        height: 120, 
        width: 120,
        backgroundColor: "#ccc",
        borderWidth: 1,
        borderColor: "#526065",
        borderRadius: 100,
        marginBottom: 10
    },
    profileImage:{
        height: 117, 
        width: 117,
        borderRadius: 100,
    },
    eachOption:{
        padding: 12,
        borderBottomColor: "#bfccd4",
        borderBottomWidth: 2,
        marginHorizontal: 0,
        flexDirection: "row"
    },
    containerOptions:{
        // marginTop: 2
        backgroundColor: "#eaf2f3"
    },
    textWhite:{
        color: "black",
        padding: 2,
        fontWeight: "bold"
    },
    hoverBack: {
        position: "absolute",
        backgroundColor: "rgba(191, 204, 212, 0.8)",
        width: "100%",
        height: "100%",
        justifyContent: "center",        
        alignItems: "center",
        // borderRadius: 10,
    },
    imageMain:{
        height: 250,
    },
    icon:{
        
    },
    textEach:{
        marginLeft: 10,
        // fontWeight: "bold",
        fontSize: 15,
        marginTop: 2
    },
    TrapezoidStyle: {
 
    width: 45,
    height: 0,
    borderBottomColor: Config.primaryColor,
    borderBottomWidth: 28,
    borderLeftWidth: 0,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    alignItems: "center",            
  },
  containerWallet:{      
      flexDirection: "row",
      backgroundColor: "#fff",
      marginTop: 5      
  },
  iconCoin:{
      marginTop: 3,
      fontWeight: "bold",            
  },
  coinText:{
    backgroundColor: "#fff",
    paddingRight: 10,
    justifyContent: "center",
  },
  textMoney: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 5,      
  },
  btnAddCoins: {
    //   margin: 5,
    padding: 10,
    // height: 100,    
    backgroundColor: "#ddd",
    justifyContent: "center",      
    borderRightWidth: 2,
    // borderWidth: 5,
    borderColor: Config.secondaryColor,
    backgroundColor: Config.primaryColor
  },
  coinBox:{
      flexDirection: "row",      
      justifyContent: "space-between"            
    //   marginHorizontal: 1
  },
  textAddCoin:{
      color: "white",
      fontWeight: "bold",
      textAlign: "center",         
      fontSize: 18,
      marginVertical: 1,      
  },
  numberCoin: {
      flexDirection: "row",
      justifyContent: "center"
  },
  iconCoinBoc: {
      marginLeft: 5,
      marginTop: 3
  },
  textCoinCenter:{
    //   marginLeft: 5
  }
})