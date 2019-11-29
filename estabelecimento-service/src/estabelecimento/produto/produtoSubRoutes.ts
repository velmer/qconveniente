import express from "express";
import * as produtoSubController from "./produtoSubController";

const produtoSubRoutes = express.Router();

produtoSubRoutes.route("/")
    /** GET /api/estabelecimento/:idEstabelecimento/produtos - Retorna todos os
     *  Produtos de um Estabelecimento */
    .get(produtoSubController.get);

export default produtoSubRoutes;