import React from 'react';
import { View, Button, Text, TextInput, Image, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './assets/css/Styles'
import Header from './Head'


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            detailsPokemon: [],
            sprites: {},
            types: {}
        }
        this._isMounted = false;

    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getDetailsPokemon();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getDetailsPokemon() {
        let n = this.state.name
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

    render() {

        const { name, detailsPokemon, sprites, types } = this.state
        let image = sprites.front_shiny
        const navigation = this.props.navigation

        console.log(detailsPokemon)

        return (



            <View style={styles.cont} >
              <Header  style={styles.header} navigation={navigation}></Header>
                <View style={styles.containerProfile}>

                    <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                    <Text style={styles.categorie}>{name}  <Image style={styles.star} source={require('./assets/img/emptyStar.png')} /> </Text>

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