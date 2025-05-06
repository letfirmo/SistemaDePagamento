import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarProduto(data: {
    preco: number;
    estoque: number;
    nome: string; id: any; 
}) {

    const produto = await prisma.produto.findUnique({where: {id: data.id}})

    if(!produto) throw new Error("Esse produto já existe")

    return prisma.produto.create({
        data: {
            nome: data.nome,
            preco: data.preco,
            estoque: data.estoque,            
        }
    })
}