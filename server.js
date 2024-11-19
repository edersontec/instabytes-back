import express from "express";

const posts = [
    {
        id: 0,
        descricao: "Foto teste 0",
        imagem: "https://placehold.co/400"
    },
    {
        id: 1,
        descricao: "Foto teste 1",
        imagem: "https://placehold.co/400"
    },
    {
        id: 2,
        descricao: "Foto teste 2",
        imagem: "https://placehold.co/400"
    },
    {
        id: 3,
        descricao: "Foto teste 3",
        imagem: "https://placehold.co/400"
    },
    {
        id: 4,
        descricao: "Foto teste 4",
        imagem: "https://placehold.co/400"
    }
];

function buscarPostPorID(id) {
    return posts.find((post) => {
        return post.id === Number(id);
    });
}


const app = express();

app.use(express.json());

app.listen( 3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    let post = buscarPostPorID(req.params.id);
    res.status(200).json(post);
});