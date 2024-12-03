import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// conecta ao banco de dados
const conexao = await conectarAoBanco(process.env.MONGODB_STRING_CONEXAO);

// parametros do banco de dados
const database = process.env.MONGODB_NOME_DATABASE;
const collection = process.env.MONGODB_NOME_COLLECTION;

export async function getTodosPosts(){
    
    // busca pelo database
    const db = conexao.db(database);

    // busca pela collection
    const colecao = db.collection(collection);

    // realiza a query
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    
    // busca pelo database
    const db = conexao.db(database);

    // busca pela collection
    const colecao = db.collection(collection);

    // criar um post
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    
    // busca pelo database
    const db = conexao.db(database);

    // busca pela collection
    const colecao = db.collection(collection);

    // atualizar um post
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}

export async function deletaPost(id){
    
    // busca pelo database
    const db = conexao.db(database);

    // busca pela collection
    const colecao = db.collection(collection);

    // deletar um post
    const objID = ObjectId.createFromHexString(id);
    return colecao.deleteOne({_id: new ObjectId(objID)});
}