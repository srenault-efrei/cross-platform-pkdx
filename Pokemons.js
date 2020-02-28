import React from 'react';
import { View, Button, Text, TextInput, SafeAreaView, ScrollView, Image, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import { styles } from './assets/css/Styles'
import Header from './Head'
import firebase from './Firebase';



export default class Pokemons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            imageIcon: false,
            user: [],
            // clickedId: -1
        }
    }
    // addWishlist  = this.addWishlist.bind(this)
    componentDidMount() {
        this.allPokemons();
        this._retrieveData();
        this.getUser();
    }

    allPokemons() {
        try {
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=20').then((response) => response.json())
                .then((pokemons) => {
                    this.setState({
                        pokemons: pokemons.results
                    })
                })

        }
        catch (error) {
            console.log(error)
        }
    }


    getUser() {
        var user = firebase.auth().currentUser;

        if (user) {
           console.log(user)
        } else {
            // No user is signed in.
        }

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("récuperation faite")
            if (value !== null) {
                this.setState({
                    user: JSON.parse(value),
                })
            }
        } catch (error) {
            console.log('erreur de récupération')
        }
    };


    // addWishlist(e, i){ 
    //     console.log(e);
    //     console.log('yes');
    //     // this.setState({
    //     //     clickedId : i,
    //     // })
    // }



    render() {

        const { pokemons, imageIcon, user } = this.state
        console.log(user)
        // console.log(`${imageIcon}`)
        const { navigation } = this.props
        // const test = require('./assets/img/star.png') 
        // const test2 = require('./assets/img/emptyStar.png')

        return (



            <SafeAreaView style={styles.SafeAreaView}>

                <ScrollView style={styles.scrollView}>
                    <Header navigation={navigation}  ></Header>


                    {pokemons.map((pokemon, i) => (

                        <View key={i} style={styles.viewPokemons}>

                            <Image style={styles.pokeball} source={require('./assets/img/pokeball.png')} />
                            {/* <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>  */}
                            <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>
                            {/* <TouchableOpacity onPress={(e) => {this.addWishlist(e, i)}} >
                            {this.state.clickedId == i ? <Image    style={styles.star} source={test} /> : <Image    style={styles.star} source={test2} />}
                            </TouchableOpacity> */}

                        </View>



                    ))}



                </ScrollView>
            </SafeAreaView>
        );
    }
}