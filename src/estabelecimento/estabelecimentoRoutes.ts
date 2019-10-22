import express from "express";
import expressjwt from "express-jwt";
import * as estabelecimentoController from "./estabelecimentoController";
import * as autorizacaoMiddleware from "../middlewares/autorizacaoMiddleware";
import { SESSION_SECRET } from "../config/secrets";

const estabelecimentoRoutes = express.Router();

const autorizaGerente = autorizacaoMiddleware.getAutorizacaoGerente();
const autorizaAdmin = autorizacaoMiddleware.getAutorizacaoAdmin();
const expressJWTGestorConfig = {
    secret: SESSION_SECRET,
    requestProperty: "authGestor",
};

estabelecimentoRoutes.route("/")
    /** GET /api/estabelecimento - Get lista de estabelecimentos */
    .get(estabelecimentoController.get)

    /** POST /api/estabelecimento - Cria um novo estabelecimento */
    .post(expressjwt(expressJWTGestorConfig), autorizaAdmin, estabelecimentoController.salva);

estabelecimentoRoutes.route("/categoria")
    /** GET /api/estabelecimentos/categorias - Retornar os estabelecimentos por categoria */
    .get(estabelecimentoController.getPorCategoria);

estabelecimentoRoutes.route("/:idEstabelecimento")
    /** GET /api/estabelecimento/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId)
    
    /** PATCH /api/estabelecimento/:idEstabelecimento */
    .patch(expressjwt(expressJWTGestorConfig), autorizaGerente, estabelecimentoController.atualiza);

export default estabelecimentoRoutes;