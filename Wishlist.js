import React from 'react';
import { View, Button, Text, TextInput, SafeAreaView, ScrollView, Image } from 'react-native';
import { styles } from './assets/css/Styles'
import { AsyncStorage } from 'react-native';
import Header from './Head'
import firebase from './Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class wishlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsPokemonFav: [],
            user: [],
            sprites: '',
            finalWishlist: [],
            lastRefresh: Date(Date.now()).toString(),
        }
    }
    getUser = this.getUser.bind(this)
    deletePokemon = this.deletePokemon.bind(this)
    deleteAll = this.deleteAll.bind(this)



    
    componentDidMount() {

        this._retrieveData();
        this.getUser();
        this.forceUpdate()
    }
   
    componentDidUpdate() {
        this._storeData();
    }

    getUser() {
        var user = firebase.auth().currentUser;

        if (user) {
            this.setState({
                user: user
            })

            // console.log(user)
        } else {
            // No user is signed in.
        }

    }

    deletePokemon(i) {
        let finalWishlist = []
        for (const pokemon of this.state.detailsPokemonFav) {
            if (pokemon.id != i) {
                finalWishlist.push(pokemon)
            }
            // if (pokemon.id == i) {
            //     alert(pokemon.name + ' va être supprimé de la wishlist')
            // }
        }

        // console.log(finalWishlist)
        this.setState({
            detailsPokemonFav: finalWishlist,
            finalWishlist: finalWishlist
        })

    }

    deleteAll() {
        this.setState({
            detailsPokemonFav: []
        })
    }

      
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('FinalWishlist');
            if (value !== null) {
                this.setState({
                    detailsPokemonFav: JSON.parse(value),

                })
               
            }
        } catch (error) {
            console.log(error)
        }
    };


    _storeData = async () => {
        try {
          await AsyncStorage.setItem('FinalWishlist', JSON.stringify( this.state.detailsPokemonFav));
        } catch (error) {
          console.log('erreur de sauvegarde')
        }

      };


    render() {
        const { navigation, route } = this.props
        const { user, detailsPokemonFav,finalWishlist } = this.state

        console.log(route)
         console.log(detailsPokemonFav)
         console.log(finalWishlist)
        return (

            <SafeAreaView style={styles.SafeAreaView}>

                <ScrollView style={styles.scrollView}>
                    <Header navigation={navigation} namePage='Wishlist' ></Header>
                    <View style={{ flexDirection: "row", justifyContent:"space-between", padding:10 }} >
                        <Button
                            title='Ajouter'
                            color='red'
                            onPress={() => navigation.navigate('Pokemons')}>
                        </Button>

                        <Button
                            title='Tout Supprimer'
                            color='red'
                            onPress={this.deleteAll}>
                        </Button>

                    </View>
             <Text style={{textAlign:"center"}}> ps: Relancer l'application, si la wishlist n'est pas à jour.</Text>

                    {detailsPokemonFav.map((pokemon, i) => (

                        <View key={i} style={styles.viewPokemons}>
                            <Image source={{ uri: pokemon.sprites.front_shiny }} style={styles.imagePokemon} />
                            <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>
                            <TouchableOpacity onPress={() => this.deletePokemon(pokemon.id)}>
                                <Image style={styles.star} source={require('./assets/img/bin.png')} />

                            </TouchableOpacity>

                        </View>

                    ))}



                </ScrollView>
            </SafeAreaView>

        );
    }
}