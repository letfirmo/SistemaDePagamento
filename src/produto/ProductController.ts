import { Request, Response } from "express";
import { criarProduto, deleteProduct, findAllProducts, findOneProduct } from "./ProductService";

export async function registrarProduto(req: Request, res: Response) {
    try {
        const data = req.body
        console.log("Esse é o data:", data)

        if(!data){
            return res.status(500).json({ error: "Nome ou preço não inserido" })
        }

        const produto = await criarProduto(data);

        if(!produto) {
            return res.status(400).json({ error: "Falaha ao criar produto"})
        }

        console.log(`Produto criado com sucesso! ${produto}`)
        return res.status(201).json({
            message: "Produto criado com sucesso!",
            produto
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

export async function getAllProducts(req: Request, res: Response) {
    try{
        const allProducts = await findAllProducts()

        res.status(200).json({message: "Lista com todos os produtos: ", allProducts})
    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export async function getOneProduct(req: Request, res:Response){
    try {
         const {nome, id} = req.body

         if(!nome || !id) {
            res.status(404).json({error: "Nome ou ID incorretos"});
         }

         const produto = await findOneProduct(nome, id)

         res.status(200).json({message: "O produto é esse: ", produto})
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export async function deletarProduto(req: Request, res: Response) {
    try {
        const {nome, id} = req.body;

        if(!nome || !id) {
            res.status(404).json({message: "Nome ou ID não cadastrado"})
        }

        const produto = await findOneProduct(nome, id)

        if(!produto) {
            res.status(404).json({message: "Produto não encontrado"})
        }

        const productDeleted = await deleteProduct(produto);

        res.status(200).json({message: "Produto deletado com sucesso!", productDeleted})

    } catch(error) {
        console.error(error)
        res.status(500).json({erro: "Erro Interno"})
    }
}