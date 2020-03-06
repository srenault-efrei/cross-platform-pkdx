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
            sprites: '',
            finalWishlist: [],
            navigation: this.props.navigation,
        }
    }
    deletePokemon = this.deletePokemon.bind(this)
    deleteAll = this.deleteAll.bind(this)

    existUser() {
        let user = firebase.auth().currentUser
        console.log(user)
        if (user == null) {
            this.state.navigation.navigate('Connexion')
        }

    }


    componentDidMount() {
        this.existUser();
        this._retrieveData();

    }

    componentDidUpdate() {
        this._storeData();
    }


    deletePokemon(i) {
        let finalWishlist = []
        for (const pokemon of this.state.detailsPokemonFav) {
            if (pokemon.id != i) {
                finalWishlist.push(pokemon)
            }
        }
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
            await AsyncStorage.setItem('FinalWishlist', JSON.stringify(this.state.detailsPokemonFav));
        } catch (error) {
            console.log('erreur de sauvegarde')
        }

    };


    render() {
        const { navigation, route } = this.props
        const { detailsPokemonFav, finalWishlist } = this.state

        return (

            <SafeAreaView style={styles.SafeAreaView}>

                <ScrollView style={styles.scrollView}>
                    <Header navigation={navigation} namePage='Wishlist' ></Header>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }} >
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
                    <Text style={{ textAlign: "center" }}> ps: Relancer l'application, si la wishlist n'est pas à jour.</Text>

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