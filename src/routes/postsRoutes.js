import express from "express";
import multer from "multer";

import { listarPosts, postarNovoPosts, uploadImagem } from "../controllers/postsController.js";

// Caso não funcione verifique qual é o seu sistema operacional para verificar se é necessário um setar options no multer
const upload = multer({ dest:"./uploads" });

// configura rotas
const routes = (app) => {
    
    // configura express para analisar entradas json e disponiblizar dados em req.body
    app.use(express.json());
    
    // conecta uma rota a um controller especifico

    // listar posts
    app.get("/posts", listarPosts);

    // criar post
    app.post("/posts", postarNovoPosts);

    // fazer upload de arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);


}

// permite este arquivo possa ser importado por outro 
export default routes;