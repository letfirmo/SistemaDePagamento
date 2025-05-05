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