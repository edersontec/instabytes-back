import 'dotenv/config';
import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost, deletaPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

// decide como tratar a requisição vinda de routes
export async function listarPosts(req, res) {

    // aciona model para buscar posts
    const posts = await getTodosPosts();

    // retorna resposta (posts)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    
    // {
    //     "descricao": "Descrição da imagem",
    //     "imgUrl" : "",
    //     "alt": "alt opcional"
    // }

    const novoPost = req.body;

    try {

        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function adicionarDadosImagemNoPost(req, res) {
    
    const port = process.env.PORT || 3000;

    const id = req.params.id;
    const urlImagem = `http://localhost:${port}/${id}.png`;
    

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
    
    const id = req.params.id;
    console.log('req.file.originalName: ' + req.file.originalName);

    try {
        
        const imgAtualizada = `uploads/${id}.png`;
        fs.renameSync(req.file.path, imgAtualizada);

        res.status(200).json(imgAtualizada);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function deletarPost(req, res) {
    
    const id = req.params.id;

    try {

        const imgPath = `uploads/${id}.png`;

        //deleta imagem do post
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

        //deleta post
        const postDeletado = await deletaPost(id);
        res.status(200).json(postDeletado);

    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}