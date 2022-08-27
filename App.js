import { NavigationContainer } from '@react-navigation/native';
import React, { Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Listagem from './src/Screens/Listagem';
import Cadastro from './src/Screens/Cadastro';

const Stack = createStackNavigator();

export default class App extends Component  {    

  render(){
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          
          <Stack.Screen name="Listagem" component={Listagem}/>
          <Stack.Screen name="Cadastro" component={Cadastro}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
  } 
}