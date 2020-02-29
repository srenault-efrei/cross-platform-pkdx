import React from 'react';
import { View, Button, Text, TextInput, AsyncStorage } from 'react-native';
import { styles } from './assets/css/Styles'
import { Header, Icon } from 'react-native-elements'
import firebase from './Firebase';



export default class Head extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabuser: [],
        }
    }

    getUser = this.getUser.bind(this)
    componentDidMount() {
        this.getUser();
    }

    clearAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }

    getUser() {
        var user = firebase.auth().currentUser;

        if (user) {
            this.setState({
                tabuser: user
            })

        } else {
            // No user is signed in.
        }

    }



    render() {
        const navigation = this.props.navigation
        return (
            <Header

                leftComponent={<Icon
                    name='menu'
                    color='white'
                    onPress={() => navigation.toggleDrawer()}
                />}
                rightComponent={
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            name='home'
                            color='white'

                            onPress={() => navigation.navigate('Pokemons')}
                        ></Icon>
                    </View>

                }




                centerComponent={{ text: this.props.namePage, style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                containerStyle={{
                    backgroundColor: '#e85050',
                }}
            />
        );
    }
}