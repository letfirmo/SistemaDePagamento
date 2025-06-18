import { Request, Response } from "express";
import { findOneProduct } from "../produto/ProductService";

export async function verifyItens(req:Request, res:Response) {
    try{
        const data = req.body
        console.log(data)

        const listItens = data.itens

        if(!listItens) {
            res.status(404).json({error: "Lista de Itens Vazia"})
        }

        // Rodar toda a lista verificando se cada produto realmente existe...

    } catch(error){
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}