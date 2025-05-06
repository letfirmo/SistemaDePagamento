import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";


const prisma = new PrismaClient();


export async function criarPedido(clienteId: string, itens: string[], total: number) {
    const pixKey : string = `pix-${randomInt(100000, 999999)}`;

    const pedido = await prisma.pedido.create({
        data: {
            clienteId,
            itens: itens.join(", "),
            total,
            pixKey,
        }
    });

    return pedido;
}

export async function buscarPedidoPorId(id: string) {
    return prisma.pedido.findUnique({
        where: { id },
        include: { cliente: true }
    });
}

export async function pagarPedido(id: string) {
    const pedido = await prisma.pedido.findUnique({ where: { id } });

    if (!pedido) throw new Error("Pedido não encontrado.");
    if (pedido.status === "paid") throw new Error("Este pedido já foi pago.");

    return prisma.pedido.update({
        where: { id },
        data: { status: "paid" }
    });
}