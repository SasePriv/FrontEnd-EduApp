import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, ScrollView} from 'react-native'

const SearchRoute = () => <Text>Search</Text>;

const HomeRoute = () => {
  return (
    <ScrollView>
      <View style={styles.contentH}> 
          <Text style={styles.subTitle}>Nuevo</Text>
          <View style={styles.cajaNews}>
              <View style={styles.dentroNews}></View>
          </View>
          <Text style={styles.subTitle}>Categorias</Text>     
          <View style={styles.griya}>        
              <View >
                  <View style={styles.filas}></View>
                  <View style={styles.filas1}></View>
                  <View style={styles.filas2}></View>
              </View>
              <View >
                  <View style={styles.filas}></View>
                  <View style={styles.filas1}></View>
                  <View style={styles.filas2}></View>
              </View>
              <View >
                  <View style={styles.filas}></View>
                  <View style={styles.filas1}></View>
                  <View style={styles.filas2}></View>
              </View>
          </View>
      </View>
    </ ScrollView>
  )
}

const ProfileRoute = () => <Text>Profile</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'search', title: 'Buscador', icon: 'feature-search-outline' },
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'profile', title: 'Profile', icon: 'clipboard-account-outline' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    home: HomeRoute,
    profile: ProfileRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  griya:{
    flex: 1,
    // paddingTop:80,      
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
},
contentH:{
  flex: 1,
  paddingTop:80,
},
filas: {
    width: 100,
    height: 100,
    padding: 20,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 10        
},
filas1: {
  width: 100,
  height: 100,
  padding: 20,
  margin: 10,
  marginBottom: 0,
  backgroundColor: 'red',
  borderRadius: 10        
},
filas2: {
  width: 100,
  height: 100,
  padding: 20,
  margin: 10,
  backgroundColor: 'grey' ,
  borderRadius: 10       
},
subTitle:{
  fontWeight: 'bold',
  fontSize: 20,
  padding: 20,
  paddingLeft: 40
},
cajaNews:{
  flex: 1,
  alignItems: 'center'  
},
dentroNews:{
  width: 350,
  height: 120,
//   backgroundColor: 'grey',
  borderRadius: 10,
  borderColor: '#000',
  borderWidth: 2,
//   borderStyle: 'dashed'
}
})