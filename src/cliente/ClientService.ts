import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarCliente(nome: string, email: string) {
    const existe = await prisma.cliente.findUnique({
    where: { email }
    });

    if (existe) {
    throw new Error('Email já está em uso');
    }

    return prisma.cliente.create({
    data: {
        nome,
        email,
    }
    });
}

export async function findAllClients() {
    const allClients = await prisma.cliente.findMany();

    return allClients
}

export async function findOneClient(email:string) {
    const client = await prisma.cliente.findUnique({where: { email }})

    return client
}

export async function deleteClient(user:any) {
    const clientDeleted = await prisma.cliente.delete({where: { id: user.id }})

    return clientDeleted
}