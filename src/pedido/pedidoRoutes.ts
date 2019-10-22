import express from "express";
import * as pedidoController from "./pedidoController";

const pedidoRoutes = express.Router();
    
pedidoRoutes.route("/")
    /** GET /api/pedido - Get lista de pedidos */
    .get(pedidoController.get)

    /** POST /api/pedido - Cria um novo pedido */
    .post(pedidoController.salva);

pedidoRoutes.route("/:idPedido")
    /** GET /api/pedido/:idPedido - Get pedido */
    .get(pedidoController.getPorId)
    
    /** PATCH /api/pedido/:idPedido */
    .patch(pedidoController.atualiza)
    
    /** DELETE /api/pedido/:idPedido */
    .delete(pedidoController.exclui);

export default pedidoRoutes;