import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import Database from '../database/Database';
import {RNCamera} from 'react-native-camera';
import ImovelBaseConstru from '../Models/ImovelBaseConstru';

const imagenzinha = require('../Imagens/negocio.jpeg');
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: 'SEM ENDEREÇO',
      finalidade: 'NÃO REGISTRADO',
      tipoimovel: 'NÃO REGISTRADO',
      fotoimovel: 'NÃO REGISTRADO',
      descricao: 'SEM DESCRICAO NO MOMENTO',
    };
  }

  CadastraBanco = function (
    endereco,
    finalidade,
    tipoimovel,
    fotoimovel,
    descricao,
  ) {
    const banco = new Database();
    const imovelobjet = new ImovelBaseConstru(
      endereco,
      finalidade,
      tipoimovel,
      fotoimovel,
      descricao,
    );
    banco.AdicionarImovel(imovelobjet);
  };

  render() {
    return (
      //endereço,tipofinalidade, tipoimovel, foto imovel, descricao
      <ImageBackground
        source={imagenzinha}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View style={{alignItems: 'center', height: 610}}>
          <View style={styles.container}>
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}>
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View
                    style={{
                      flex: 0,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.takePicture(camera)}
                      style={styles.capture}>
                      <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>
          </View>

          <Text style={{fontSize: 30, color: 'white'}}>
            Formulário para cadastro
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'black',
              borderRadius: 20,
              margin: 7,
            }}
            onChangeText={valor => this.setState({endereco: valor})}
            placeholder="Endereço do imovel"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'black',
              margin: 7,
            }}
            onChangeText={valor => this.setState({finalidade: valor})}
            placeholder="Qual tipo de finalidade (venda ou aluguel)"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'black',
              margin: 7,
            }}
            onChangeText={valor => this.setState({tipoimovel: valor})}
            placeholder="Qual tipo de imovel (casa, apartamento, comercio)"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'black',
              margin: 7,
            }}
            onChangeText={valor => this.setState({fotoimovel: valor})}
            placeholder="Foto do imovel"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'black',
              margin: 7,
            }}
            onChangeText={valor => this.setState({descricao: valor})}
            placeholder="Descricao do imovel"
          />
          <TouchableOpacity
            onPress={() =>
              this.CadastraBanco(
                this.state.endereco,
                this.state.finalidade,
                this.state.tipoimovel,
                this.state.fotoimovel,
                this.state.descricao,
              )
            }>
            <Text
              style={{
                backgroundColor: 'green',
                textAlign: 'center',
                width: '100%',
                justifyContent: 'center',
                color: 'white',
                padding: 10,
                margin: 5,
                borderRadius: 50,
              }}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          <View style={{backgroundColor: 'white'}}>
            <Text>A pessoa sera cadastrado com os seguintes dados</Text>
            <Text>ID: {this.state.id}</Text>
            <Text>Endereco: {this.state.endereco}</Text>
            <Text>Finalidade para o Imovel: {this.state.finalidade} </Text>
            <Text>Tipo do Imovel: {this.state.tipoimovel} </Text>
            <Text>Foto do Imovel: {this.state.fotoimovel} </Text>
            <Text>Descricao: {this.state.descricao} </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
