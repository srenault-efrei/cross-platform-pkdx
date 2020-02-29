import React from 'react';
import { View, Button, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './assets/css/Styles'
import Header from './Head'
import { AsyncStorage } from 'react-native';
import Pokemons from './Pokemons';


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            detailsPokemon: [],
            sprites: {},
            types: {},
            clickFav: false,
            detailsPokemonFav: [],
            user: [],
            fav: []

        }
        this._isMounted = false;
    }
    addWishlist = this.addWishlist.bind(this);

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getDetailsPokemon();
        this._retrieveData();

    }


    componentDidUpdate() {
        this._storeData();

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addWishlist(pokemon) {

        let boolean = false;

        for (const dpf of this.state.detailsPokemonFav) {
            if (dpf.id == pokemon.id) {
                boolean = true;
            }
        }
        if (boolean) {
            alert(pokemon.name + ' est déja dans votre Wishlist.')
        } else {
            this.setState({
                clickFav: true
            })

            this.state.detailsPokemonFav.push(pokemon)
            this.state.fav.push(pokemon.id)

        }

        return boolean
    }

    getDetailsPokemon() {
        let n = this.state.name
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/${n}`).then((response) => response.json())
                .then((responseDetailsPokemon) => {
                    this._isMounted && this.setState({
                        detailsPokemon: responseDetailsPokemon,
                        sprites: responseDetailsPokemon.sprites,
                    })
                })

        }
        catch (error) {
            console.log(error)
        }
    }




    _retrieveData = async () => {


        try {
            AsyncStorage.multiGet(["FinalWishlist", "user", "fav"]).then(response => {

                if (response[0][1] !== null) {
                    this.setState({
                        detailsPokemonFav: JSON.parse(response[0][1]),

                    })
                }
                if (response[1][1] != null) {
                    this.setState({
                        user: JSON.parse(response[1][1]),

                    })

                }

                if (response[2][1] != null) {
                    this.setState({
                        fav: JSON.parse(response[2][1]),

                    })

                }
            }
            )
        } catch (error) {
            console.log('erreur de récupération')
        }
    };




    _storeData = async () => {
        try {
            const items = [['FinalWishlist', JSON.stringify(this.state.detailsPokemonFav)], ['fav', JSON.stringify(this.state.fav)]]
            AsyncStorage.multiSet(items, () => {
                //to do something
            });

        } catch (error) {
            console.log('erreur de sauvegarde')
        }
    };



    render() {

        const { name, detailsPokemon, sprites, fav, detailsPokemonFav, user, types } = this.state

        const imageFavEmptyStar = require('./assets/img/emptyStar.png');
        const imageFavStar = require('./assets/img/star.png');
        let image = sprites.front_shiny
        const navigation = this.props.navigation

        return (

            <View style={styles.cont} >
                <Header navigation={navigation} namePage='Details'></Header>
                <View style={styles.containerProfile}>

                    <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />


                    <Text style={styles.categorie}>{name}


                        {
                            user.uid != null ?
                                <TouchableOpacity onPress={() => this.addWishlist(detailsPokemon)}>
                                    {

                                        this.state.fav.includes(detailsPokemon.id)
                                            ? <Image style={styles.star} source={imageFavStar} />
                                            : this.state.clickFav == false
                                                ?
                                                <Image style={styles.star} source={imageFavEmptyStar} />
                                                :
                                                <Image style={styles.star} source={imageFavStar} />

                                    }
                                </TouchableOpacity>

                                : <TouchableOpacity>
                                </TouchableOpacity>
                        }
                    </Text>

                </View>

                <View style={styles.case}>
                    <Text style={styles.textPrincipal} > Informations Principale</Text>
                    <View style={styles.contentColum}>
                        <Text style={styles.contentPrincipal}> id: #{detailsPokemon.id}</Text>
                        <Text style={styles.contentExperience}> Experience:{detailsPokemon.base_experience}</Text>
                    </View>

                </View>


                <View style={styles.case}>
                    <Text style={styles.textPrincipal} > Autres Informations</Text>
                    <View style={styles.contentColum}>
                        <Text style={styles.contentPrincipal}> Height: {detailsPokemon.height}</Text>
                        <Text style={styles.contentPrincipal}> Weight: {detailsPokemon.weight}</Text>
                    </View>

                </View>


            </View>


        );
    }
}