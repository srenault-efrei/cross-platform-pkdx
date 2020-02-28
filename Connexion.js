import React from 'react';
import { View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './assets/css/Styles'
import Firebase from './Firebase';



export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation : this.props.navigation
        }
    }


    ConnexionLogin = (email, password) => {
        try {
          Firebase
             .auth()
             .signInWithEmailAndPassword(email, password)
             .then(res => {
                 console.log(res.user.email);
                 if(res.user.email !=null){
                    this.state.navigation.navigate('Pokedex')
                 }
          });
         
    } catch (error) {
          console.log(error);
          alert('Erreur connexion')
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
                >
                </TextInput>
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    placeholder='Mot de passe'
                >
                </TextInput>

                <TouchableOpacity style={styles.buttonStyle}>
                    <Button title='Se connecter'
                    onPress={() => this.ConnexionLogin('srenaultd@gmail.com', '123456')}
                    ></Button>
                </TouchableOpacity>

                <Button
                    title='Créer un compte'
                    onPress={() => navigation.navigate('Inscription')}></Button>
            </View>
        );
    }
}