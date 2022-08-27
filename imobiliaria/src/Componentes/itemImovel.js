import React, { Component } from 'react';
import {View,Text, Image, Button} from 'react-native';
import Database from "../database/Database";

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
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center', margin:100, padding:50, backgroundColor:'white'}}>
                <Text> ID: {this.props.idImovel}</Text>
                <Text>Foto: {this.props.fotoimovel}</Text>
                <Image style={{height:70, width:70}} source={{uri:'https://www.plantapronta.com.br/projetos/140/01.jpg'}}/>
                <Text>Endereco: {this.props.endereco}</Text>
                <Text>Finalidade: {this.props.finalidade}</Text>
                <Text>Tipo de Imovel: {this.props.tipoimovel}</Text>
                <Text>Descricao: {this.props.descricao}</Text>
                <Button title='Excluir' onPress={()=> {this.props.exclusao(this.props.id)}}/>
                </View>
            )
    }
}