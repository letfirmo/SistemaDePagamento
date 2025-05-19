import { Router } from "express";
import { deleteUser, getAllClients, getOneClient, registerClient } from "./cliente/ClientController";
import { registrarPedido, verificarPedido, confirmarPagamento } from "./pedido/OrderController";
import { deletarProduto, getAllProducts, getOneProduct, registrarProduto } from "./produto/ProductController";


const router = Router()

router.get('/', (req, res) => {
    res.send('Servidor Rodando!');
})

// Rotas para Clientes
router.post('/cliente/register', (req, res, next) => {
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

// Rota para os Produtos
router.post('/produtos/register', (req, res, next) => {
    registrarProduto(req, res).catch(next);
});
router.get('/produtos', (req, res, next) => {
  getAllProducts(req,res).catch(next);
})
router.get('/produto', (req, res, next) => {
  getOneProduct(req,res).catch(next);
})
router.delete('/produto', (req, res, next) => {
  deletarProduto(req,res).catch(next);
})

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