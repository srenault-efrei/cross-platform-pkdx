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


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


export default class App extends React.Component {

  pokedexScreen(){
    return (
      
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name='Profile' component={Profile} />
          <Tab.Screen name='Wishlist' component={Wishlist} />
        </Stack.Navigator>
    );
  }

 connexionScreen(){
    return (
      
        <Tab.Navigator >
          <Tab.Screen name="Connexion" component={Connexion} />
          <Stack.Screen name="Inscription" component={Inscription} />
        </Tab.Navigator>
    );
  }

  render(){
    return (

      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Pokedex'>
          <Drawer.Screen name='Pokedex' children={this.pokedexScreen} />
          <Drawer.Screen name='Connexion' children={this.connexionScreen} />
          <Drawer.Screen name='Wishlist' component={Wishlist} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  
}
