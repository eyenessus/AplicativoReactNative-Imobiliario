"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pessoas = function Pessoas(id, nome, idade, imagem, descricao) {
  _classCallCheck(this, Pessoas);

  this.id = id;
  this.nome = nome;
  this.idade = idade;
  this.imagem = imagem;
  this.descricao = descricao;
};

exports["default"] = Pessoas;