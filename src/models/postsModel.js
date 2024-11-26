import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// conecta ao banco de dados
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
    
    // busca pelo database
    const db = conexao.db('imersao-instalike');

    // busca pela collection
    const colecao = db.collection('posts');

    // realiza a query
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    
    // busca pelo database
    const db = conexao.db('imersao-instalike');

    // busca pela collection
    const colecao = db.collection('posts');

    // criar um post
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    
    // busca pelo database
    const db = conexao.db('imersao-instalike');

    // busca pela collection
    const colecao = db.collection('posts');

    // atualizar um post
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}