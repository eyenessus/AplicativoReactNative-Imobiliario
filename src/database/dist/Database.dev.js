"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Database = void 0;

var _reactNativeSqliteStorage = _interopRequireDefault(require("react-native-sqlite-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_reactNativeSqliteStorage["default"].DEBUG(true);

_reactNativeSqliteStorage["default"].enablePromise(true);

var database_name = "Emerson.db"; // nome do banco de dados

var database_version = "1.0"; // versão do banco de dados

var database_display_name = "Emerson banco de dados"; // nome do banco de dados que sera exibido

var database_size = 200000; //tamanho do banco de dados

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, [{
    key: "Conectar",
    value: function Conectar() {
      var db;
      return new Promise(function (resolve) {
        console.log("Checando a integridade do plugin ...");

        _reactNativeSqliteStorage["default"].echoTest().then(function () {
          console.log("Integridade Ok ...");
          console.log("Abrindo Banco de Dados ...");

          _reactNativeSqliteStorage["default"].openDatabase(database_name, database_version, database_display_name, database_size).then(function (DB) {
            db = DB;
            console.log("Banco de dados Aberto");
            db.executeSql('SELECT 1 FROM Pessoas LIMIT 1').then(function () {
              console.log("O banco de dados esta recebendo conexão");
              console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
            })["catch"](function (error) {
              console.log("Erro Recebido: ", error);
              console.log("O Banco de dados não está pronto ... Criando Dados");
              db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome, descricao, imagem, idade)');
              }).then(function () {
                console.log("Tabela criada com Sucesso");
              })["catch"](function (error) {
                console.log(error);
              });
            });
            resolve(db);
          })["catch"](function (error) {
            console.log(error);
          });
        })["catch"](function (error) {
          console.log("echoTest Falhou - plugin não funcional");
        });
      });
    } //Função para fechar a Conexão com o Banco de dados

  }, {
    key: "Desconectar",
    value: function Desconectar(db) {
      if (db) {
        console.log("Fechando Banco de Dados...");
        db.close().then(function (status) {
          console.log("Banco de dados Desconectado!!");
        })["catch"](function (error) {
          console.log(error);
        });
      } else {
        console.log("A conexão com o banco não está aberta");
      }
    }
  }, {
    key: "MostrarPessoas",
    //OPERAÇÃO CRUDS
    //Função para listar itens da tabela Pessoas
    value: function MostrarPessoas() {
      var _this = this;

      return new Promise(function (resolve) {
        var lista = [];

        _this.Conectar().then(function (db) {
          db.transaction(function (tx) {
            //Query SQL para listar os dados da tabela   
            tx.executeSql('SELECT * FROM Pessoas', []).then(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  tx = _ref2[0],
                  results = _ref2[1];

              console.log("Consulta completa");
              var len = results.rows.length;

              for (var i = 0; i < len; i++) {
                var row = results.rows.item(i);
                console.log("pessoa ID: ".concat(row.id, ", pessoa Nome: ").concat(row.nome));
                var id = row.id,
                    nome = row.nome,
                    descricao = row.descricao,
                    imagem = row.imagem,
                    idade = row.idade;
                lista.push({
                  id: id,
                  nome: nome,
                  descricao: descricao,
                  imagem: imagem,
                  idade: idade
                });
              }

              resolve(lista);
            });
          }).then(function (result) {
            _this.Desconectar(db);
          })["catch"](function (err) {
            console.log(err);
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    } // Função para acrescentar uma nova pessoa na tabela

  }, {
    key: "AdicionarPessoa",
    value: function AdicionarPessoa(pessoa) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.Conectar().then(function (db) {
          db.transaction(function (tx) {
            //Query SQL para inserir uma nova pessoa na tabela Pessoas   
            tx.executeSql('INSERT INTO Pessoas (id,nome, idade, imagem, descricao) VALUES (?, ?, ?, ?, ?)', [pessoa.id, pessoa.nome, pessoa.idade, pessoa.imagem, pessoa.descricao]).then(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  tx = _ref4[0],
                  results = _ref4[1];

              resolve(results);
            });
          }).then(function (result) {
            _this2.Desconectar(db);
          })["catch"](function (err) {
            console.log(err);
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    } //Função para atualizar um dado que já foi escrito anteriormente no banco de dados a partir da sua id

  }, {
    key: "AtualizarPessoa",
    value: function AtualizarPessoa(id, pessoa) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.Conectar().then(function (db) {
          db.transaction(function (tx) {
            //Query SQL para atualizar um dado no banco        
            tx.executeSql('UPDATE Pessoas SET nome = ?, descricao = ?, imagem = ?, idade = ? WHERE id = ?', [pessoa.nome, pessoa.descricao, pessoa.imagem, pessoa.idade, id]).then(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  tx = _ref6[0],
                  results = _ref6[1];

              resolve(results);
            });
          }).then(function (result) {
            _this3.Desconectar(db);
          })["catch"](function (err) {
            console.log(err);
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    } //Função para excluir um dado do banco pela id

  }, {
    key: "DeletarPessoa",
    value: function DeletarPessoa(id) {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.Conectar().then(function (db) {
          db.transaction(function (tx) {
            //Query SQL para deletar um item da base de dados    
            tx.executeSql('DELETE FROM Pessoas WHERE pessoaId = ?', [id]).then(function (_ref7) {
              var _ref8 = _slicedToArray(_ref7, 2),
                  tx = _ref8[0],
                  results = _ref8[1];

              console.log(results);
              resolve(results);
            });
          }).then(function (result) {
            _this4.Desconectar(db);
          })["catch"](function (err) {
            console.log(err);
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    }
  }]);

  return Database;
}();

exports.Database = Database;
;
var _default = Database;
exports["default"] = _default;