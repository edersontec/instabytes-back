import { getTodosPosts } from "../models/postsModel.js";

// decide como tratar a requisição vinda de routes
export async function listarPosts(req, res) {

    // aciona model para buscar posts
    const posts = await getTodosPosts();

    // retorna resposta (posts)
    res.status(200).json(posts);
}