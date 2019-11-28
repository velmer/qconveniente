import express from "express";
import expressjwt from "express-jwt";
import * as estabelecimentoController from "./estabelecimentoController";
import * as autorizacaoMiddleware from "../middlewares/autorizacaoMiddleware";
import { SESSION_SECRET } from "../config/secrets";

const estabelecimentoRoutes = express.Router();

const autorizaGerente = autorizacaoMiddleware.getMiddlewareAutorizacaoGerente();
const autorizaAdmin = autorizacaoMiddleware.getMiddlewareAutorizacaoAdmin();
const expressJWTConfig = {
    secret: SESSION_SECRET,
    requestProperty: "usuario",
};

estabelecimentoRoutes.route("/")
    /** GET /api/estabelecimento - Get lista de estabelecimentos */
    .get(estabelecimentoController.get)

    /** POST /api/estabelecimento - Cria um novo estabelecimento */
    .post(/*expressjwt(expressJWTConfig), autorizaAdmin,*/ estabelecimentoController.salva);

estabelecimentoRoutes.route("/categoria")
    /** GET /api/estabelecimentos/categorias - Retornar os estabelecimentos por categoria */
    .get(estabelecimentoController.getPorCategoria);

estabelecimentoRoutes.route("/:idEstabelecimento")
    /** GET /api/estabelecimento/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId)
    
    /** PATCH /api/estabelecimento/:idEstabelecimento */
    .patch(/*expressjwt(expressJWTConfig), autorizaGerente,*/ estabelecimentoController.atualiza);

export default estabelecimentoRoutes;