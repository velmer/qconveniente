import express from "express";
import expressjwt from "express-jwt";
import * as gestorController from "../../controllers/gestor/gestorController";
import * as autorizacaoMiddleware from "../middlewares/autorizacaoMiddleware";
import { SESSION_SECRET } from "../config/secrets";

const gestorRoutes = express.Router();

const autorizaGerente = autorizacaoMiddleware.getAutorizacaoGerente();
const autorizaAdmin = autorizacaoMiddleware.getAutorizacaoAdmin();
const expressJWTGestorConfig = {
    secret: SESSION_SECRET,
    requestProperty: "authGestor",
};

gestorRoutes.route("/")
    /** GET /api/gestor - Get lista de gestores */
    .get(expressjwt(expressJWTGestorConfig), autorizaAdmin, gestorController.get)

    /** POST /api/gestor - Cria um novo gestor */
    .post(expressjwt(expressJWTGestorConfig), autorizaGerente, gestorController.salva);

gestorRoutes.route("/:idGestor")
    /** GET /api/gestor/:idGestor - Get gestor */
    .get(expressjwt(expressJWTGestorConfig), gestorController.getPorId)
    
    /** PATCH /api/gestor/:idGestor */
    .patch(expressjwt(expressJWTGestorConfig), autorizaGerente, gestorController.atualiza)
    
    /** DELETE /api/gestor/:idGestor */
    .delete(expressjwt(expressJWTGestorConfig), autorizaGerente, gestorController.exclui);

export default gestorRoutes;