import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text,TouchableWithoutFeedback, Keyboard} from 'react-native';
import Login from './components/login'
import Sandbox from './components/ejemplos/sandbox'
import Main from './screens/main'


export default function App() {
  
  return (        
      <NavigationContainer>
          <View style={styles.container}>
            <Main />
          </View>
      </NavigationContainer>          
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
 
