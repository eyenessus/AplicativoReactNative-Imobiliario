import React, { Component } from "react";
import {View, Text} from 'react-native';
import Database from "../database/Database";
import ItemImovel from "../Componentes/itemImovel"
import { ScrollView } from "react-native-gesture-handler";
export default class Listagem extends Component{
    constructor(props){
    super(props);
    this.state = {
        listaPessoas: []
    }
    this.MostrarImovel();
  }
    MostrarImovel = () => {
        const banco = new Database();
        banco.MostrarImovel().then(lista => {this.setState({listaPessoas: lista})});
    }
    ExcluirImovel = (id) => {
      const banco = new Database();
      banco.DeletarImovel(id);
    }
    render(){
        return(
            <View style={{backgroundColor: 'gold',height:610}}>
              <ScrollView>
              {
                    this.state.listaPessoas.map(item => (
              <Text style={{textAlign: 'center', fontSize:20, fontWeight: 'bold'}}>
                <ItemImovel
                id={item.idImovel} 
                endereco={item.endereco}
                finalidade={item.finalidade}
                tipoimovel={item.tipoimovel}
                fotoimovel={item.fotoimovel}
                descricao={item.descricao}
                exclusao={this.ExcluirImovel}
                />
              </Text>
            )
          )
        }
              </ScrollView>
           
        </View>
        )
    }
}