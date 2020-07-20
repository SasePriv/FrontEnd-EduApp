import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={[styles.row, styles.shadow]} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <View style={[styles.conta, styles.shadow]}>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color="white" />
                </View>
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={[styles.child, styles.shadow]}>
                    {this.props.data()}
                </View>                
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

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
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#0080ff",
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        // paddingRight:18,
        alignItems:'center',
        backgroundColor: "white",
        margin: 5,
        marginBottom: 0,
        borderRadius: 5,
    },
    parentHr:{
        height:1,
        color: "white",
        width:'100%'
    },
    child:{
        backgroundColor: "white",
        padding:16,
        marginHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#0080ff",
        borderTopWidth: 3
    },
    conta: {
        backgroundColor: "#0080ff",
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    }
    
});