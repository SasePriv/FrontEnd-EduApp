import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View, Text,TouchableWithoutFeedback, Keyboard} from 'react-native';
import Login from './components/login'
import Home from './components/home'


export default function App() {
  
  return (    
      <PaperProvider>
        <View style={styles.container}>
          <Login />
          {/* <Home /> */}
        </View>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
 
