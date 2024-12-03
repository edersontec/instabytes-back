import express from "express";
import multer from "multer";
import cors from "cors";

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost, deletarPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus : 200
}

// Caso não funcione verifique qual é o seu sistema operacional para verificar se é necessário um setar options no multer
const upload = multer({ dest:"./uploads" });

// configura rotas
const routes = (app) => {
    
    app.use(cors(corsOptions));

    // configura express para analisar entradas json e disponiblizar dados em req.body
    app.use(express.json());
    
    // conecta uma rota a um controller especifico

    // listar posts
    app.get("/posts", listarPosts);

    // criar post
    app.post("/posts", postarNovoPost);

    // atualizar post
    app.put("/posts/:id", atualizarNovoPost);

    // fazer upload de arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // deletar post
    app.delete("/posts/:id", deletarPost);


}

// permite este arquivo possa ser importado por outro 
export default routes;