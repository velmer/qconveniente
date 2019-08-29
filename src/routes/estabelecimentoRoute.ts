import express from "express";
import * as estabelecimentoController from "../controllers/estabelecimentoController";

const estabelecimentoRouter = express.Router();
    
estabelecimentoRouter.route("/")
    /** GET /api/estabelecimentos - Get lista de estabelecimentos */
    .get(estabelecimentoController.consultarEstabelecimentos)

    /** POST /api/estabelecimentos - Cria um novo estabelecimento */
    .post(estabelecimentoController.salvar);

estabelecimentoRouter.route("/:idEstabelecimento")
    /** GET /api/estabelecimentos/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId);

export default estabelecimentoRouter;