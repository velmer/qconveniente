import express from "express";
import * as gestorController from "../../controllers/gestor/gestorController";

const gestorRoutes = express.Router();
    
gestorRoutes.route("/")
    /** GET /api/gestor - Get lista de gestores */
    .get(gestorController.get)

    /** POST /api/gestor - Cria um novo gestor */
    .post(gestorController.salva);

gestorRoutes.route("/:idGestor")
    /** GET /api/gestor/:idGestor - Get gestor */
    .get(gestorController.getPorId)
    
    /** PATCH /api/gestor/:idGestor */
    .patch(gestorController.atualiza)
    
    /** DELETE /api/gestor/:idGestor */
    .delete(gestorController.exclui);

export default gestorRoutes;