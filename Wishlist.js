import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { styles } from './assets/css/Styles'
import { AsyncStorage } from 'react-native';
import Header from './Head'



export default class wishlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsPokemonFav: [],
            user: [],
        }
    }

    componentDidMount() {

        this._retrieveData();
        
       
    }

    componentWillUpdate(){
        this._retrieveData();
        this.forceUpdate();
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
            })
        } catch (error) {
            console.log('erreur de récupération')
        }

    };

    render() {
        const { navigation } = this.props
        const {user} = this.state

        console.log(user)

        // console.log(this.state.detailsPokemonFav)

        // console.log(user)
        return (

            <View>
                <Header navigation={navigation}  ></Header>

                {user.uid != null ?
                    <View>

                        <Text> Wishlist de {user.email}</Text>
                        { this.state.detailsPokemonFav.map(pokemon => (
                            <Text key={pokemon.name}>{pokemon.name}</Text>
                        ))

                        }

                    </View>

                    :

                    <Text> Vous n'etes pas connecté</Text>
                }
                {

                }
            </View>

        );
    }
}