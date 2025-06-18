import { Request, Response } from 'express';
import { criarCliente, deleteClient, findAllClients, findOneClient } from './ClientService';

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
            console.error(error);
            res.status(500).json({ erro: 'Erro interno' });
        }
    }
}

export async function getAllClients(req:Request, res: Response) {
    try {
        const allClients = await findAllClients();

        res.status(200).json({message: `Aqui estão todos os clientes:`, allClients})
    }catch(error) {
        console.error(error)
        res.status(500).json({erro: "Erro Interno"})
    }
}

export async function getOneClient(req:Request, res: Response) {
    try {
        const {email} = req.body;

        if(!email) {
            res.status(404).json({message: "Email não cadastrado"})
        }

        const client = await findOneClient(email)

        res.status(200).json({message: `Aqui está o cliente:`, client})
    }catch(error) {
        console.error(error)
        res.status(500).json({erro: "Erro Interno"})
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const {email} = req.body;

        if(!email) {
            res.status(404).json({message: "Email não cadastrado"})
        }

        const user = await findOneClient(email)

        if(!user) {
            res.status(404).json({message: "Usuário não encontrado"})
        }

        const userDeleted = await deleteClient(user);

        res.status(200).json({message: "Usuário deletado com sucesso!", userDeleted})

    } catch(error) {
        console.error(error)
        res.status(500).json({erro: "Erro Interno"})
    }
}