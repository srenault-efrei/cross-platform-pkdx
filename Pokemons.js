import React from 'react';
import { View, Button, Text, TextInput, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
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
    getUser = this.getUser.bind(this)

    componentDidUpdate() {
       
    }

    componentDidMount() {
        this.allPokemons();
        this.getUser();
    }


    getUser() {
        var user = firebase.auth().currentUser;

        if (user) {
            this.setState({
                user: user
            })

            console.log(user)
        } else {
            // No user is signed in.
        }

    }
    

    allPokemons() {
        try {
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=5').then((response) => response.json())
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




    // addWishlist(e, i){ 
    //     console.log(e);
    //     console.log('yes');
    //     // this.setState({
    //     //     clickedId : i,
    //     // })
    // }



    render() {

       
        const { pokemons, imageIcon, user } = this.state
        // console.log(`${imageIcon}`)
        const { navigation,route } = this.props
        console.log(this.props.route)
        // const test = require('./assets/img/star.png') 
        // const test2 = require('./assets/img/emptyStar.png')

        return (



            <SafeAreaView style={styles.SafeAreaView}>

                <ScrollView style={styles.scrollView}>
                    <Header navigation={navigation} namePage ='Pokedex' ></Header>


                    {pokemons.map((pokemon, i) => (

                        <View key={i} style={styles.viewPokemons}>

                            <Image style={styles.pokeball} source={require('./assets/img/pokeball.png')} />
                            {/* <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>  */}
                            <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>
                          
                          {user.uid != null ? <Image style={styles.star} source={require('./assets/img/emptyStar.png')} /> : <Image></Image>}
                                
                        
                        

                        </View>



                    ))}



                </ScrollView>
            </SafeAreaView>
        );
    }
}