import { Request, Response } from 'express';
import { criarCliente } from './ClientService';

export async function registerClient(req: Request, res: Response) {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ erro: 'Dados incompletos' });
        }

        const cliente = await criarCliente(nome, email);
        
        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            cliente: {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email
            }
        });
        
    } catch (error) {
        if (error instanceof Error && error.message.includes('Email já está em uso')) {
            res.status(409).json({ erro: error.message });
        } else {
            console.error(error); // Log para debug
            res.status(500).json({ erro: 'Erro interno' });
        }
    }
}