import express from "express";
import { listarPosts } from "../controllers/postsController.js";

// configura rotas
const routes = (app) => {
    
    // configura express para analisar entradas json e disponiblizar dados em req.body
    app.use(express.json());
    
    // conecta uma rota a um controller especifico
    app.get("/posts", listarPosts);
}

// permite este arquivo possa ser importado por outro 
export default routes;