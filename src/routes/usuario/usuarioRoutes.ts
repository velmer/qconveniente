import express from "express";
import * as usuarioController from "../../controllers/usuario/usuarioController";
import expressjwt from "express-jwt";
import { SESSION_SECRET } from "../../config/secrets";


const usuarioRoutes = express.Router();
    
usuarioRoutes.route("/")
    /** GET /api/usuario - Get lista de usuários */
    .get(expressjwt({ secret: SESSION_SECRET }), usuarioController.get)

    /** POST /api/usuario - Cria um novo usuário */
    .post(usuarioController.salva);

usuarioRoutes.route("/:idUsuario")
    /** GET /api/usuario/:idUsuario - Get usuário */
    .get(expressjwt({ secret: SESSION_SECRET }), usuarioController.getPorId)
    
    /** PATCH /api/usuario/:idUsuario */
    .patch(expressjwt({ secret: SESSION_SECRET }), usuarioController.atualiza)
    
    /** DELETE /api/usuario/:idUsuario */
    .delete(expressjwt({ secret: SESSION_SECRET }), usuarioController.exclui);

export default usuarioRoutes;