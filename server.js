import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

// serve arquivos estáticos da pasta uploads
app.use(express.static('uploads'));

// define rotas para o app
routes(app);

// Inicia app
app.listen( 3000, () => {
    console.log("Servidor escutando...");
});