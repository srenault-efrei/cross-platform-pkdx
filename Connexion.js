import React from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Alert,AsyncStorage } from 'react-native';
import { styles } from './assets/css/Styles'
import Firebase from './Firebase';
import Header from './Head'



export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            login: '',
            password: '',
        }
    }


    ConnexionLogin = (email, password) => {
        try {
            Firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    AsyncStorage.setItem('user', JSON.stringify(res.user)); 
                    this.state.navigation.navigate('Pokemons')
                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            //   console.log(error);
            Alert.alert(error)
        }
    };


    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Login'
                    placeholderStye
                    onChangeText={login => this.setState({ login })}
                >
                </TextInput>
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    placeholder='Mot de passe'
                    onChangeText={password => this.setState({ password })}
                >
                </TextInput>

                <TouchableOpacity style={styles.buttonStyle}>
                    <Button title='Se connecter'
                        onPress={() => this.ConnexionLogin(this.state.login, this.state.password)}
                    ></Button>
                </TouchableOpacity>

                <Button
                    title='Créer un compte'
                    onPress={() => navigation.navigate('Inscription')}></Button>
            </View>
        );
    }
}