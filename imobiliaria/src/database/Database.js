import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "Emerson.db"; // nome do banco de dados
const database_version = "1.0"; // versão do banco de dados
const database_display_name = "Emerson banco de dados"; // nome do banco de dados que sera exibido
const database_size = 200000; //tamanho do banco de dados
export class Database {
    Conectar(){
        let db; 
        return new Promise((resolve) => {
           
            SQLite.echoTest().then(() => {
        
                SQLite.openDatabase(database_name, database_version, database_display_name, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Imovel LIMIT 1').then(() => {     
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                         db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Imovel (id INTEGER PRIMARY KEY AUTOINCREMENT, endereco, finalidade,tipoimovel,fotoimovel,descricao)');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional"); 
            });
        });
    }
  //Função para fechar a Conexão com o Banco de dados
  Desconectar(db) {  
    if (db) {    
        console.log("Fechando Banco de Dados...");    
        db.close().then(status => {        
            console.log("Banco de dados Desconectado!!");      
        }).catch(error => {        
            console.log(error);      
        });  
    } else {    
        console.log("A conexão com o banco não está aberta");  
    } 
};
//OPERAÇÃO CRUDS

//Função para listar itens da tabela Pessoas
MostrarImovel() {  
    return new Promise((resolve) => {    
        const lista = [];    
        this.Conectar().then((db) => {      
            db.transaction((tx) => {     
                //Query SQL para listar os dados da tabela   
                tx.executeSql('SELECT * FROM Imovel', []).then(([tx,results]) => {                    
                var len = results.rows.length;          
                for (let i = 0; i < len; i++) {            
                    let row = results.rows.item(i);
                    //id, endereço, finalidade,tipoimovel,fotoimovel,descricao                     
                    const {id, endereco, finalidade,tipoimovel,fotoimovel,descricao} = row;
                    lista.push({id, endereco, finalidade,tipoimovel,fotoimovel,descricao });
                }
                resolve(lista);
            });
        }).then((result) => {
            this.Desconectar(db);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
})}
// Função para acrescentar uma nova pessoa na tabela
AdicionarImovel(imovel) {  
    return new Promise((resolve) => {    
        this.Conectar().then((db) => {      
            db.transaction((tx) => {     
                //id, endereço, finalidade,tipoimovel,fotoimove,descricao
                //Query SQL para inserir uma nova pessoa na tabela Pessoas   
                tx.executeSql('INSERT INTO Imovel ( endereco, finalidade, tipoimovel, fotoimovel, descricao) VALUES (?,?,?,?,?)', [imovel.endereco, imovel.finalidade, imovel.tipoimovel,imovel.fotoimovel,imovel.descricao]).then(([tx, results]) => { 
                    resolve(results);        
                });      
            }).then((result) => {        
                this.Desconectar(db);      
            }).catch((err) => {        
                console.log(err);      
            });    
        }).catch((err) => {      
            console.log(err);    
        });  
    });  
}

//Função para atualizar um dado que já foi escrito anteriormente no banco de dados a partir da sua id
AtualizarImovel(id, imovel) {  
    return new Promise((resolve) => {    
        this.Conectar().then((db) => {      
            db.transaction((tx) => {
                //id, endereço, finalidade,tipoimovel,fotoimovel,descricao
                //Query SQL para atualizar um dado no banco        
                tx.executeSql('UPDATE Imovel SET endereco = ?, finalidade = ?, tipoimovel = ?, fotoimovel = ?, descricao = ? WHERE id = ?', [imovel.endereco, imovel.finalidade, imovel.tipoimovel, imovel.fotoimovel, imovel.descricao, id]).then(([tx, results]) => {          
                resolve(results);        
            });      
        }).then((result) => {        
              this.Desconectar(db);      
            }).catch((err) => {        
              console.log(err);      
            });    
        }).catch((err) => {     
            console.log(err);    
        });  
    });  
}
 //Função para excluir um dado do banco pela id
 DeletarImovel(id) {  
    return new Promise((resolve) => {    
        this.Conectar().then((db) => {      
            db.transaction((tx) => {    
                //Query SQL para deletar um item da base de dados    
                tx.executeSql('DELETE FROM Imovel WHERE idImovel = ?', [id]).then(([tx, results]) => {          
                    console.log(results);          
                    resolve(results);        
                });      
            }).then((result) => {        
                this.Desconectar(db);      
            }).catch((err) => {        
                console.log(err);      
            });    
        }).catch((err) => {      
            console.log(err);    
        });  
    });  
}
}
export default Database;