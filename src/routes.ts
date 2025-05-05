import { Router } from "express";
import { registerClient } from "./cliente/Clientcontroller";

const router = Router()

router.get('/', (req, res) => {
    res.send('Servidor Rodando!');
})

// Rotas para Clientes
router.post('/clientes', (req, res, next) => {
    registerClient(req, res).catch(next);
});

// Rota para os Produtos


// Rotas para os Pedidos

export default router;