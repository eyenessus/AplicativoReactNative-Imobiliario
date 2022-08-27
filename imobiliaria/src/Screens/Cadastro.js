import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Database from '../database/Database';
import ImovelBaseConstru from '../Models/ImovelBaseConstru';
export default class Cadastro extends Component {
    constructor(props){
        super(props);
        this.state = {
            endereco: 'SEM ENDEREÇO',
            finalidade: 'NÃO REGISTRADO',
            tipoimovel: 'NÃO REGISTRADO',
            fotoimovel: 'NÃO REGISTRADO',
            descricao: 'SEM DESCRICAO NO MOMENTO',        
        }
        }
    CadastraBanco = function(endereco, finalidade,tipoimovel,fotoimovel,descricao){
        const banco = new Database();
        const imovelobjet = new ImovelBaseConstru(endereco,finalidade,tipoimovel,fotoimovel,descricao);
        banco.AdicionarImovel(imovelobjet);
      };
    render() {
        return (
            //endereço,tipofinalidade, tipoimovel, foto imovel, descricao
            <View style={{alignItems: 'center', backgroundColor: 'gold', height:610}}>
                <Text style={{fontSize:30}}>Formulário para cadastro</Text>
                <TextInput style={{alignItems: 'center', backgroundColor: 'gold', borderColor:'red'}} onChangeText={(valor)=>this.setState({endereco:valor})} placeholder="Endereço do imovel"/>
                <TextInput onChangeText={(valor)=>this.setState({finalidade:valor})} placeholder="Qual tipo de finalidade (venda ou aluguel)"/>
                <TextInput onChangeText={(valor)=>this.setState({tipoimovel:valor})} placeholder="Qual tipo de imovel (casa, apartamento, comercio)"/>
                <TextInput onChangeText={(valor)=>this.setState({fotoimovel:valor})} placeholder="Foto do imovel"/>
                <TextInput onChangeText={(valor)=>this.setState({descricao:valor})} placeholder="Descricao do imovel"/>
                <TouchableOpacity onPress={() => this.CadastraBanco(this.state.endereco, this.state.finalidade,this.state.tipoimovel, this.state.fotoimovel,this.state.descricao)}>
                    <Text style={{backgroundColor: 'green', textAlign: 'center', width: '100%', justifyContent: 'center', color: 'white', padding: 10, margin: 5, borderRadius: 50}}>Cadastrar</Text>
                </TouchableOpacity>
            <Text>A pessoa sera cadastrado com os seguintes dados</Text>
            <Text>Endereco: {this.state.endereco}</Text>
            <Text>Finalidade para o Imovel: {this.state.finalidade} </Text>
            <Text>Tipo do Imovel: {this.state.tipoimovel} </Text>
            <Text>Foto do Imovel: {this.state.fotoimovel} </Text>
            <Text>Descricao: {this.state.descricao} </Text>
            </View>  
            )
            
}
}