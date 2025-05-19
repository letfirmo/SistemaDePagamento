import { Router } from "express";
import { deleteUser, getAllClients, getOneClient, registerClient } from "./cliente/ClientController";
import { registrarPedido, verificarPedido, confirmarPagamento } from "./pedido/OrderController";


const router = Router()

router.get('/', (req, res) => {
    res.send('Servidor Rodando!');
})

// Rotas para Clientes
router.post('/register', (req, res, next) => {
    registerClient(req, res).catch(next);
});
router.get('/clientes', (req, res, next) => {
  getAllClients(req,res).catch(next);
})
router.get('/cliente', (req, res, next) => {
  getOneClient(req,res).catch(next);
})
router.delete('/cliente', (req, res, next) => {
  deleteUser(req,res).catch(next);
})
router.put('/cliente', (req, res, next) => {
  // getOneClient(req,res).catch(next);
})

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