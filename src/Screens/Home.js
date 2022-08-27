import React, { Component} from 'react';
const Stack = createStackNavigator();
import { View, Text, Button, ImageBackground} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
const imagenzinha = require('../Imagens/casaaapape.jpeg');
export default function Home({navigation}){
    return (
      <View>
        <ImageBackground source={imagenzinha} resizeMode="cover" style={{height: '100%'}}>
        <Text style={{fontSize: 20, fontWeight:'bold', alignContent: 'center', color: 'white', textAlign: 'center'}}>Aplicativo Imobiliario</Text>
        
        <TouchableOpacity style={{margin: 50}}>
        <Button title="Pagina Inicial" onPress={() => navigation.navigate("Home")}></Button>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 50}}>
        <Button title="Cadastrar Imovel" onPress={() => navigation.navigate("Cadastro")}></Button>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 50}}>
        <Button title="Anúncios de Imoveis" onPress={() => navigation.navigate("Listagem")}></Button>
        </TouchableOpacity>
        </ImageBackground>
        
        </View>
    )
  }