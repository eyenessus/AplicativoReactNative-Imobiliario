import React, { Component} from 'react';
const Stack = createStackNavigator();
import { View, Text, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Home({navigation}){
    return (
      <View style={{alignItems: 'center', backgroundColor: 'gold', height:610, justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight:'bold', alignContent: 'center', color: 'white'}}>Aplicativo Imobiliario</Text>
        
        <TouchableOpacity style={{margin: 50}}>
        <Button title="Pagina Inicial" onPress={() => navigation.navigate("Home")} ></Button>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 50}}>
        <Button title="Cadastrar Imovel" onPress={() => navigation.navigate("Cadastro")}></Button>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 50}}>
        <Button title="Anúncios de Imoveis" onPress={() => navigation.navigate("Listagem")}></Button>
        </TouchableOpacity>
        </View>
    )
  }