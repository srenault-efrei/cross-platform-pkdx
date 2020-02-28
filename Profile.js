import React from 'react';
import { View, Button, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './assets/css/Styles'
import Header from './Head'
import { AsyncStorage } from 'react-native';


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

        }
        this._isMounted = false;
    }
    addWishlist = this.addWishlist.bind(this);

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getDetailsPokemon();
        this._retrieveData();
    }

    componentWillUnmount() {
        this._isMounted = false;
        // this.setState({
        //     name : '',
        //     detailsPokemon:[],
        //     sprites: {},
        //     types: {},
        //     clickFav : false
        // })
    }

    addWishlist() {

        this.setState({
            clickFav: true
        })
        // this.setState({detailsPokemonFav: [...this.state.detailsPokemonFav, this.state.detailsPokemon]})
        this.state.detailsPokemonFav.push(this.state.detailsPokemon)
    }

    getDetailsPokemon() {
        let n = this.state.name
        // console.log(n)
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/${n}`).then((response) => response.json())
                .then((responseDetailsPokemon) => {
                    this._isMounted && this.setState({
                        detailsPokemon: responseDetailsPokemon,
                        sprites: responseDetailsPokemon.sprites,
                        types: responseDetailsPokemon.types

                    })
                })
            // console.log(responseDetailsPokemon)

        }
        catch (error) {
            console.log(error)
        }
    }


    componentDidUpdate() {
        this._storeData();
    }



    _retrieveData = async () => {


        try {
            AsyncStorage.multiGet(["detailsPokemonFav", "user"]).then(response => {

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
            }
            )
        } catch (error) {
            console.log('erreur de récupération')
        }
    };




    _storeData = async () => {
        try {
            const items = [['detailsPokemonFav', JSON.stringify(this.state.detailsPokemonFav)], ['clickFav', JSON.stringify(this.state.clickFav)]]
            AsyncStorage.multiSet(items, () => {
                //to do something
            });

        } catch (error) {
            console.log('erreur de sauvegarde')
        }
    };

    render() {

        const { name, detailsPokemon, sprites, type, detailsPokemonFav,user } = this.state

        const imageFavEmptyStar = require('./assets/img/emptyStar.png');
        const imageFavStar = require('./assets/img/star.png');


        // console.log(this.state.clickFav)
        let image = sprites.front_shiny
        const navigation = this.props.navigation

        console.log(detailsPokemonFav)
        console.log(user.uid)

        return (



            <View style={styles.cont} >
                <Header navigation={navigation}></Header>
                <View style={styles.containerProfile}>


                    <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />



                    <Text style={styles.categorie}>{name}

                        {user.uid != null ? <TouchableOpacity onPress={this.addWishlist}  >{this.state.clickFav == false ? <Image style={styles.star} source={imageFavEmptyStar} /> : <Image style={styles.star} source={imageFavStar} />}</TouchableOpacity>
                                          :  <TouchableOpacity></TouchableOpacity>
                        }
                    </Text>

                </View>

                <View style={styles.case}>
                    <Text style={styles.textPrincipal} > Informations Principale</Text>
                    <View style={styles.contentColum}>
                        <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text>
                        <Text style={styles.contentPrincipal}> Weight:{detailsPokemon.weight}</Text>
                    </View>


                    {/* <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text> */}

                </View>


                <View style={styles.case}>
                    <Text style={styles.textPrincipal} > Attaques principale</Text>
                    <View style={styles.contentColum}>
                        <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text>
                        <Text style={styles.contentPrincipal}> Weight:{detailsPokemon.weight}</Text>
                    </View>

                    {/* <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text> */}

                </View>


                <View style={styles.case}>
                    <Text style={styles.textPrincipal} > Autres Informations</Text>
                    <View style={styles.contentColum}>
                        <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text>
                        <Text style={styles.contentPrincipal}> Weight:{detailsPokemon.weight}</Text>
                    </View>

                    {/* <Text style={styles.contentPrincipal}> Height:{detailsPokemon.height}</Text> */}

                </View>

            </View>







        );
    }
}