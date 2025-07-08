import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IProduto{
    preco: number;
    estoque: number;
    nome: string; 
    id: any; 
}

export async function criarProduto(data: IProduto) {

    // const produto = await prisma.produto.findUnique({where: {id: data.id}})

    // if(!produto) throw new Error("Esse produto já existe")

    return prisma.produto.create({
        data: {
            nome: data.nome,
            preco: data.preco,
            estoque: data.estoque,            
        }
    })
}

export async function findAllProducts() {
    const produtos = await prisma.produto.findMany()

    return produtos
}

export async function findOneProduct(nome: string, id: number) {
    const produto = await prisma.produto.findUnique({where: {
        nome, id
    }})

    return produto
}

export async function deleteProduct(produto:any) {
    const product = await prisma.produto.delete({where: { id: produto.id }})

    return product
}