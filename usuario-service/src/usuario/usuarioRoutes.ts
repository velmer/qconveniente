import express from "express";
import * as usuarioController from "./usuarioController";


const usuarioRoutes = express.Router();
    
usuarioRoutes.route("/")
    /** GET /api/usuario - Get lista de usuários */
    .get(usuarioController.get)

    /** POST /api/usuario - Cria um novo usuário */
    .post(usuarioController.salva);

usuarioRoutes.route("/:idUsuario")
    /** GET /api/usuario/:idUsuario - Get usuário */
    .get(usuarioController.getPorId)
    
    /** PATCH /api/usuario/:idUsuario */
    .patch(usuarioController.atualiza)
    
    /** DELETE /api/usuario/:idUsuario */
    .delete(usuarioController.exclui);

export default usuarioRoutes;