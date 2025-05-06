import { Request, Response } from "express";
import { criarProduto } from "./ProductService";

export async function registrarProduto(req: Request, res: Response) {
    try {
        const { data } = req.body

        if(!data){
            return res.status(500).json({ error: "Erro na requisição" })
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