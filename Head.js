import React from 'react';
import { View, Button, Text, TextInput, AsyncStorage, TouchableOpacity,WebView } from 'react-native';
import { styles } from './assets/css/Styles'
import { Header, Icon } from 'react-native-elements'
import firebase from './Firebase';



export default class Head extends React.Component {

    constructor(props) {
        super(props);
    }

    funcView = this.funcView.bind(this)

    funcView() {
        console.log('test')
        return (
            <WebView
                source={{ uri: 'https://github.com/facebook/react-native' }}
                style={{ marginTop: 20 }}
            />
        )
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
                        {/*  */}
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