import express from "express";
import expressjwt from "express-jwt";
import * as estabelecimentoController from "../../controllers/estabelecimento/estabelecimentoController";
import { SESSION_SECRET } from "../../config/secrets";

const estabelecimentoRoutes = express.Router();
    
estabelecimentoRoutes.route("/")
    /** GET /api/estabelecimento - Get lista de estabelecimentos */
    .get(estabelecimentoController.get)

    /** POST /api/estabelecimento - Cria um novo estabelecimento */
    .post(expressjwt({ secret: SESSION_SECRET }), estabelecimentoController.salva);

estabelecimentoRoutes.route("/categoria")
    /** GET /api/estabelecimentos/categorias - Retornar os estabelecimentos por categoria */
    .get(estabelecimentoController.getPorCategoria);

estabelecimentoRoutes.route("/:idEstabelecimento")
    /** GET /api/estabelecimento/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId)
    
    /** PATCH /api/estabelecimento/:idEstabelecimento */
    .patch(expressjwt({ secret: SESSION_SECRET }), estabelecimentoController.atualiza);

export default estabelecimentoRoutes;