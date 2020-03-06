import React from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, Image } from 'react-native';
import { styles } from './assets/css/Styles'
import Header from './Head'
import { ScreenOrientation } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';




export default class Pokemons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            fixePokemons: [],
            imageIcon: false,
            user: [],
        }
    }
    handleChange = this.handleChange.bind(this)
    changeScreenOrientation = this.changeScreenOrientation.bind(this)



    componentDidMount() {
        this.changeScreenOrientation();
        this.allPokemons();
    }

    async changeScreenOrientation() {
        console.log(ScreenOrientation)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    }
    

    handleChange(name) {

        let finalTab = []
        let fixePokemons = this.state.fixePokemons;


        if (name !== '') {
            for (const pokemon of this.state.pokemons) {
                if (pokemon.name.match(name)) {
                    finalTab.push(pokemon)
                }
            }
            this.setState({
                pokemons: finalTab
            })
        }
        else {
            this.setState({
                pokemons: fixePokemons
            })
        }

    }


    allPokemons() {
        try {
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=30').then((response) => response.json())
                .then((pokemons) => {
                    this.setState({
                        pokemons: pokemons.results,
                        fixePokemons: pokemons.results
                    })
                })

        }
        catch (error) {
            console.log(error)
        }
    }


    render() {


        const { pokemons, imageIcon, user } = this.state
        const { navigation, route } = this.props

        return (



            <SafeAreaView style={styles.SafeAreaView}>

                <ScrollView style={styles.scrollView}>
                    <Header navigation={navigation} namePage='Pokedex' ></Header>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, margin: 10, borderRadius: 10, textAlign: 'center' }}
                            placeholder='Name'
                            onChangeText={name => this.handleChange(name)}

                        />
                    </View>

                    {pokemons.map((pokemon, i) => (

                        <View key={i} style={styles.viewPokemons}>

                            <Image style={styles.pokeball} source={require('./assets/img/pokeball.png')} />
                            <Text style={styles.text} onPress={() => navigation.navigate('Profile', { name: pokemon.name })} > {pokemon.name}</Text>

                            {/* {user.uid != null ? <Image style={styles.star} source={require('./assets/img/emptyStar.png')} /> : <Image></Image>} */}
                            <Image></Image>

                        </View>

                    ))}



                </ScrollView>
            </SafeAreaView>
        );
    }
}