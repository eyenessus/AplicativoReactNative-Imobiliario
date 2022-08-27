import React, { Component } from 'react';
import {View,Text, Image, Button,ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Database from "../database/Database";
const imagenzinha = require('../Imagens/praias-de-dubai.jpg');
const ordem = require('../Imagens/01.jpg');
export default class ItemImovel extends Component {
    ExcluirBanco = () => {
        const banco = new Database();
        banco.DeletarImovel(this.props.id);
        banco.MostrarImovel(this.props.id);
    }
    MostrarImovel = () => {
        const banco = new Database();
        banco.MostrarImovel().then(lista => {this.setState({listaPessoas: lista})});
    }
    
    render() {
        return (    
            
            <ScrollView>
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center', padding:50,margin: 10 }}>
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center', padding:10, backgroundColor: 'white',margin: 10 }}>
                <Image style={{height:150, width:270}} source={ordem}/>
                <Text style={{margin: 15}}>Foto: {this.props.fotoimovel}</Text>
                <Text style={{margin: 8}}>Endereco: {this.props.endereco}</Text>
                <Text style={{margin: 8}}>Finalidade: {this.props.finalidade}</Text>
                <Text style={{margin: 8}}>Tipo de Imovel: {this.props.tipoimovel}</Text>
                <Text style={{margin: 8}}>Descricao: {this.props.descricao}</Text>
                <View style={{margin: 10}}>
                </View>
                <Button title='Excluir' onPress={()=> {this.props.exclusao(this.props.id)}}/>
                </View>
                </View>
            </ScrollView>

            )
    }
}