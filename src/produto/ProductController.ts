import { Request, Response } from "express";
import { criarProduto } from "./ProductService";

export async function registrarProduto(req: Request, res: Response) {
    try {
        const { data } = req.body

        if(!data){
            return res.status(500).json({ erro: "Erro na requisição" })
        }

        const produto = await criarProduto(data);
        
    } catch(error) {

    }
}