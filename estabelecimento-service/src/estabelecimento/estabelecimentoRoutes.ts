import express from "express";
import expressjwt from "express-jwt";
import * as estabelecimentoController from "./estabelecimentoController";
import * as autorizacaoMiddleware from "../middlewares/autorizacaoMiddleware";
import produtoSubRoutes from "./produto/produtoSubRoutes";
import { SESSION_SECRET } from "../config/secrets";

const estabelecimentoRoutes = express.Router();

const autorizaGerente = autorizacaoMiddleware.getMiddlewareAutorizacaoGerente();
const autorizaAdmin = autorizacaoMiddleware.getMiddlewareAutorizacaoAdmin();
const expressJWTConfig = {
    secret: SESSION_SECRET,
    requestProperty: "usuario",
};

/**
 * Middleware para definir no object Request o ID do Estabelecimento especificado,
 * para os subrecursos poderem acessá-lo. 
 */
const defineIdEstabelecimentoMiddleware = (req:any, _res:any, next: any) => {
    req.idEstabelecimento = req.params["idEstabelecimento"];
    next();
};

estabelecimentoRoutes.route("/")
    /** GET /api/estabelecimento - Get lista de estabelecimentos */
    .get(estabelecimentoController.get)

    /** POST /api/estabelecimento - Cria um novo estabelecimento */
    .post(expressjwt(expressJWTConfig), autorizaAdmin, estabelecimentoController.salva);

estabelecimentoRoutes.route("/categoria")
    /** GET /api/estabelecimentos/categorias - Retornar os estabelecimentos por categoria */
    .get(estabelecimentoController.getPorCategoria);

estabelecimentoRoutes.route("/:idEstabelecimento")
    /** GET /api/estabelecimento/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId)
    
    /** PATCH /api/estabelecimento/:idEstabelecimento */
    .patch(expressjwt(expressJWTConfig), autorizaGerente, estabelecimentoController.atualiza);

estabelecimentoRoutes.use('/:idEstabelecimento/produto', defineIdEstabelecimentoMiddleware, produtoSubRoutes);

export default estabelecimentoRoutes;