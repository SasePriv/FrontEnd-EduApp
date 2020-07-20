import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { DefaultTheme , Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from './reducers/index'
import AsyncStorage from '@react-native-community/async-storage';

import RootScreen from './screens/rootScreen'
import RootStackScreen from './routes/rootStackScreen'
import Main from './screens/main'

import { AuthContext } from './components/context'

const store = createStore(reducer)

function App(){

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userData: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          userData: action.data,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          userData: action.data,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userData: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userData: action.data,
          userToken: action.token,
          isLoading: false,
        } 
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      let dataUser;
      dataUser = null
      dataUser = data

      try {
        await AsyncStorage.setItem('userData', JSON.stringify(dataUser))
      } catch (error) {
        console.log(error)
      }
      
      dispatch({ type: 'LOGIN', data: dataUser, token: dataUser.token})
    },
    signOut: async() => {

      try {
        await AsyncStorage.removeItem('userData')
      } catch (error) {
        console.log(error)
      }

      dispatch({ type: 'LOGOUT'})
    },
    signUp: async(data) => {
      // setUserToken('asdas');
      // setIsLoading(false);
      let dataUser;
      dataUser = null
      dataUser = data

      try {
        await AsyncStorage.setItem('userData', JSON.stringify(dataUser))
      } catch (error) {
        console.log(error)
      }
      
      dispatch({ type: 'REGISTER', data: dataUser, token: dataUser.token})

    },
  }))

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userData;
      userData = null
      let token;
      token = null

      try {
        userData = await AsyncStorage.getItem('userData')
        token = JSON.parse(userData)?.token
      } catch (error) {
        console.log(error)
      }

      dispatch({ type: 'RETRIEVE_TOKEN', data:  JSON.parse(userData), token: token})
    },1000)
  }, [])

  if (loginState.isLoading) {
    return(
      <View style={styles.loadingMain}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0080ff',
      accent: 'red',
    },
  };

  // useEffect(() => {
  //   (async() => await handleEstado())
  // },[estadoLogin])

  // const handleEstado = async () => {  
  //   const data = await asynFunctions.getToken()
  //   console.log(data)
  //   if (data) {
  //     setEstadoLogin(data)
  //   }else{
  //     setEstadoLogin("")
  //   }
  // }
  
  return (   
    <AuthContext.Provider value={authContext}>
    <Provider store={store}>
      {/* <CoursesCategory /> */}
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            { loginState.userToken != null             
            ? 
            <Main /> 
            :
            <RootStackScreen />       
            }
                         
            
          </View>
        </PaperProvider>        
      </NavigationContainer>      
    </Provider>    
    </AuthContext.Provider>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
 
