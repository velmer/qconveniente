import express from "express";
import * as produtoController from "./produtoController";
import expressjwt from "express-jwt";
import { SESSION_SECRET } from "../config/secrets";


const produtoRoutes = express.Router();
    
produtoRoutes.route("/")
    /** GET /api/produto - Get lista de produtos */
    .get(produtoController.get)

    /** POST /api/produto - Cria um novo produto */
    .post(expressjwt({ secret: SESSION_SECRET }), produtoController.salva);

produtoRoutes.route("/:idProduto")
    /** GET /api/produto/:idProduto - Get produto */
    .get(produtoController.getPorId)
    
    /** PATCH /api/produto/:idProduto */
    .patch(expressjwt({ secret: SESSION_SECRET }), produtoController.atualiza);

export default produtoRoutes;