import { Router } from "express";
import { registerClient } from "./cliente/ClientController";
import { registrarPedido, verificarPedido, confirmarPagamento } from "./pedido/OrderController";


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
router.post('/pedidos', (req, res, next) => {
    registrarPedido(req, res).catch(next);
  });
  
  router.get('/pedidos/:id', (req, res, next) => {
    verificarPedido(req, res).catch(next);
  });
  
  router.post('/pedidos/:id/pagar', (req, res, next) => {
    confirmarPagamento(req, res).catch(next);
  });


export default router;