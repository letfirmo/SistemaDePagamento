import { MetodoPagamento, PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";


const prisma = new PrismaClient();


export async function criarPedido(clienteId: string, itens: string[], total: number, metodo: MetodoPagamento) {
    // Verificação de qual é o método de pagamento
    if (metodo === 'PIX') {
        const pagamento: string = `pix-${randomInt(100000, 999999)}`;

        const pedido = await prisma.pedido.create({
            data: {
                clienteId,
                itens: itens.join(", "),
                total,
                metodo,
            }
        });
    
        return {pedido, pagamento};
    } else {
        throw new Error("Ainda não existe outro método de pagamento")
    }
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
    if (pedido.pago === true) throw new Error("Este pedido já foi pago.");

    return prisma.pedido.update({
        where: { id },
        data: { pago: true }
    });
}