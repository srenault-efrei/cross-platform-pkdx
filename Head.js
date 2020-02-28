import React from 'react';
import { View, Button, Text,TextInput } from 'react-native';
import {styles} from './assets/css/Styles'
import {Header,Icon} from 'react-native-elements'

 

export default class Head extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const navigation  = this.props.navigation

        return (
            <Header
          
            leftComponent={<Icon
                name = 'menu'
                color ='white'
                onPress={() => navigation.toggleDrawer()}
                />}
            rightComponent={<Icon
                name ='home'
                color ='white'
                onPress={()=>navigation.navigate('Pokedex')}
           ></Icon> }
            centerComponent={{ text: 'POKEDEX', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
            containerStyle={{
                backgroundColor: '#e85050',
              }}
          />
        );
    }
}