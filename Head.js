import React from 'react';
import { View, Button, Text, TextInput,AsyncStorage } from 'react-native';
import { styles } from './assets/css/Styles'
import { Header, Icon } from 'react-native-elements'



export default class Head extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    
    clearAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {   
            console.error('Error clearing app data.');
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
                    <View style={{ flexDirection :'row'}}>
                        <Icon
                            name='home'
                            color='white'
                            
                            onPress={() => navigation.navigate('Pokedex')}
                        ></Icon>
                        <Icon 
                            name='logout'
                            color='white'
                            type='material-community'
                            onPress={this.clearAsyncStorage}
                        ></Icon>
                    </View>

                }




                centerComponent={{ text: 'POKEDEX', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                containerStyle={{
                    backgroundColor: '#e85050',
                }}
            />
        );
    }
}