import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { styles } from './assets/css/Styles'


export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


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
                    placeholder='Mot de passe'
                >
                </TextInput>

                <Button title='Se connecter'></Button>
                <Button
                    title='Créer un compte'
                    onPress={() => navigation.navigate('Inscription')}></Button>
            </View>
        );
    }
}