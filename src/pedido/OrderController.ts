
import { Request, Response } from "express";
import { criarPedido, buscarPedidoPorId, pagarPedido } from "./OrderService";
import { findOneProduct } from "../produto/ProductService";

export async function criarCarrinho(req:Request, res:Response) {
    try{
        const {clientId, itens, total} = req.body

        if (!clientId) {
            res.status(404).json({error: "Cliente não encontrado"})
        }     

    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export async function registrarPedido(req: Request, res: Response) {
    try {
        const { clienteId, itens, total, metodo, dadosCartao } = req.body;

        if (!clienteId || !itens || !total || !metodo) {
            return res.status(400).json({ erro: "Dados incompletos." });
        }

        const pedido = await criarPedido(clienteId, itens, total, metodo, dadosCartao);

        if(metodo === 'PIX'){
            return res.status(201).json({
            message: "Pedido criado. Aguardando pagamento via PIX.",
            pedido,
            qrCode: `https://fakepix.com/qrcode/${pedido.pagamento}`
          });
        }else if((metodo === 'CARTAO_CREDITO' || metodo === 'CARTAO_DEBITO') && dadosCartao){
            return res.status(201).json({
            message: "Pedido criado e pagamento autorizado via cartão",
            pedido,
            autorizacao: pedido.pagamento
          });
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao registrar pedido." });
    }
}

export async function verificarPedido(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const pedido = await buscarPedidoPorId(id);

        if (!pedido) {
            return res.status(404).json({ erro: "Pedido não encontrado." });
        }

        return res.json(pedido);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar pedido." });
    }
}

export async function confirmarPagamento(req: Request, res: Response) {
    try {
        const { id } = req.body;

        const pedido = await pagarPedido(id);

        return res.json({
            message: "Pagamento via PIX confirmado!",
            pedido
        });
    } catch (err: any) {
        console.error(err);
        if (err.message === "Pedido não encontrado.") {
            return res.status(404).json({ erro: err.message });
        }
        if (err.message === "Este pedido já foi pago.") {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: "Erro ao processar pagamento." });
    }
}
