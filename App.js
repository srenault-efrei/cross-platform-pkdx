import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Connexion from './Connexion';
import Inscription from './Inscription';
import Pokedex from './Pokemons';
import Profile from './Profile';
import Wishlist from './Wishlist';
import firebase from './Firebase';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


export default class App extends React.Component {



  pokedexScreen() {
    return (

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Pokemons" component={Pokedex} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    );
  }


  connexionScreen() {
    return (

      <Stack.Navigator >
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
      </Stack.Navigator>
    );
  }

  render() {
    console.log(firebase.auth().currentUser)
    return (

      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Pokemons'>
          <Drawer.Screen name='Pokemons' children={this.pokedexScreen} />
          <Drawer.Screen name="Connexion" component={this.connexionScreen} />
          <Drawer.Screen name='Wishlist' component={Wishlist} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

}
