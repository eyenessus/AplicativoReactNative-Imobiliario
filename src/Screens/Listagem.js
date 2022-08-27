import React, { Component } from "react";
import {View, Text, ImageBackground} from 'react-native';
import Database from "../database/Database";
import ItemImovel from "../Componentes/itemImovel"
import { ScrollView } from "react-native-gesture-handler";
const imagenzinha = require('../Imagens/praias-de-dubai.jpg');
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
      this.MostrarImovel();
    }
    render(){
        return(
          <ImageBackground source={imagenzinha} resizeMode="cover">
<View style={{height:610}}>
              <ScrollView>
              {
                    this.state.listaPessoas.map(item => (
              <Text style={{textAlign: 'center', fontSize:20, fontWeight: 'bold'}}>
                
                <ItemImovel
                id={item.id} 
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
          </ImageBackground>
            
        )
    }
}