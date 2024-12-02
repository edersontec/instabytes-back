import 'dotenv/config';
import express from "express";
import routes from "./src/routes/postsRoutes.js";

const port = process.env.PORT || 3000;
const app = express();

// serve arquivos estáticos da pasta uploads
app.use(express.static('uploads'));

// define rotas para o app
routes(app);

// Inicia app
app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}...  `);
});