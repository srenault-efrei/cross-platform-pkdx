import React from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './assets/css/Styles'
import Firebase from './Firebase'
import Header from './Head'



export default class Inscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            login: '',
            password: '',
        }
    }

    SignUp = (email, password) => {
        try {
            Firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                    this.state.navigation.navigate('Connexion')
                    Alert.alert('inscription reussi')
                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            console.log(error.toString(error));
        }
    };



    render() {
        const { navigation } = this.props

        return (
       
            
                <View style={styles.container}>
                    <TextInput
                        onChangeText={login => this.setState({ login })}
                        style={styles.inputStyle}
                        placeholder='Login'
                        placeholderStye
                    >
                    </TextInput>
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        placeholder='Mot de passe'
                    >
                    </TextInput>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Button title="S'inscrire" onPress={() => this.SignUp(this.state.login, this.state.password)} ></Button>
                    </TouchableOpacity>

                    <Button title="Deja un compte"
                        onPress={() => navigation.navigate('Connexion')}
                    ></Button>

                </View>
          
        );
    }
}