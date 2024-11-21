import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

// decide como tratar a requisição vinda de routes
export async function listarPosts(req, res) {

    // aciona model para buscar posts
    const posts = await getTodosPosts();

    // retorna resposta (posts)
    res.status(200).json(posts);
}

export async function postarNovoPosts(req, res) {
    
    const novoPost = req.body;

    try {

        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function uploadImagem(req, res) {
    
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalName,
        alt: "",

    };

    try {
        
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
    
        fs.renameSync(req.file.path, imgAtualizada);

        res.status(200).json(postCriado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}