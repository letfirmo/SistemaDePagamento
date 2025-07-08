import { MetodoPagamento, PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";

const prisma = new PrismaClient();

interface IDadosCartao{
    numero: string;
    validade: string;
    cvv:string 
}

export async function criarPedido(
    clienteId: number, 
    itens: string[], 
    total: number, 
    metodo: MetodoPagamento,
    dadosCartao?: IDadosCartao
) {
    let identificadorPagamento: string | undefined

    // Verificação do pedido 
    if (itens.length === 0) {
        throw new Error("É necessário adicionar itens ao pedido.")
    }
    
    // Verificação do método de pagamento
    // Lógica para pagamento pix
    if (metodo === 'PIX') {
        identificadorPagamento = `pix-${randomInt(100000, 999999)}`;

    } 
    // Lógica para pagamento cartao
    else if (metodo === 'CARTAO_CREDITO' || metodo === 'CARTAO_DEBITO'){
        if(!dadosCartao){
            throw new Error("Dados do cartão são obrigatórios para esse método.");
        }
        if (dadosCartao.numero.length !== 16 || !dadosCartao.cvv || !dadosCartao.validade) {
            throw new Error("Dados do cartão inválidos.");
        }


        identificadorPagamento = `autorizado-${randomInt(1000, 9999)}`; // simulando aprovaçao
    }
    else {
        throw new Error("Ainda não existe outro método de pagamento ou método não suportado.")
    }
    const ultimosDigitos = dadosCartao?.numero.slice(-4) // captura os ultimos 4 digitos do cartão

    const pedido = await prisma.pedido.create({
        data: {
            clienteId,
            itens: itens.join(", "),
            total,
            metodo,
            pixKey: metodo === 'PIX'? identificadorPagamento: null,
            ultimosDigitos: ultimosDigitos ?? null
        }
    });
    
    return {pedido, pagamento: identificadorPagamento};
}

export async function buscarPedidoPorId(id: number) {
    return prisma.pedido.findUnique({
        where: { id },
        include: { cliente: true }
    });
}

export async function pagarPedido(id: number) {
    const pedido = await prisma.pedido.findUnique({ where: { id } });

    if (!pedido) throw new Error("Pedido não encontrado.");
    if (pedido.pago === true) throw new Error("Este pedido já foi pago.");

    return prisma.pedido.update({
        where: { id },
        data: { pago: true }
    });
}
