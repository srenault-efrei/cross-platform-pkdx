import React from 'react';
import { View, Button, Text,TextInput } from 'react-native';
import {styles} from './assets/css/Styles'
import {AsyncStorage} from 'react-native';
import Header from './Head'

 

export default class wishlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsPokemonFav :[],
        }
    }

    componentDidMount() {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('detailsPokemonFav');
          console.log("récuperation faite")
          if (value !== null) {
            this.setState({
                detailsPokemonFav: JSON.parse(value),
            })
          }
        } catch (error) {
          console.log('erreur de récupération')
        }
    };

    render() {
        const { navigation } = this.props

        console.log(this.state.detailsPokemonFav)
        return (
           
           <View>
                <Header navigation={navigation}  ></Header>
               {
                   this.state.detailsPokemonFav.map(pokemon =>(
                       <Text>{pokemon.name}</Text>
                   ))
               }
           </View>
            
        );
    }
}