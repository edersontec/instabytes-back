import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

// decide como tratar a requisição vinda de routes
export async function listarPosts(req, res) {

    // aciona model para buscar posts
    const posts = await getTodosPosts();

    // retorna resposta (posts)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    
    const novoPost = req.body;

    try {

        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function atualizarNovoPost(req, res) {
    
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    

    try {

        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const novoPost = {
                descricao: descricao,
                imgUrl: urlImagem,
                alt: req.body.alt,
            };

        const postCriado = await atualizarPost(id, novoPost);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function uploadImagem(req, res) {
    
    console.log('req.file.originalName: ' + req.file.originalName);

    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalName,
        alt: ""
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