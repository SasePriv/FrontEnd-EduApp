import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text,TouchableWithoutFeedback, Keyboard} from 'react-native';
import Login from './components/login'
import Main from './screens/main'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from './reducers/index'
import CoursesCategory from './screens/coursesCategory'

const store = createStore(reducer)

function App(){
  
  return (        
    <Provider store={store}>
      {/* <CoursesCategory /> */}
      <NavigationContainer>
        <PaperProvider>
          <View style={styles.container}>
            <Main />
          </View>
        </PaperProvider>        
      </NavigationContainer>      
    </Provider>    
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
 
