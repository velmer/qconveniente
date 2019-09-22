import express from "express";
import * as estabelecimentoController from "../../controllers/estabelecimento/estabelecimentoController";

const estabelecimentoRoutes = express.Router();
    
estabelecimentoRoutes.route("/")
    /** GET /api/estabelecimento - Get lista de estabelecimentos */
    .get(estabelecimentoController.consultar)

    /** POST /api/estabelecimento - Cria um novo estabelecimento */
    .post(estabelecimentoController.salvar);

estabelecimentoRoutes.route("/categorias")
    /** GET /api/estabelecimentos/categorias - Retornar os estabelecimentos por categoria */
    .get(estabelecimentoController.getPorCategoria);

estabelecimentoRoutes.route("/:idEstabelecimento")
    /** GET /api/estabelecimento/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId)
    
    /** PATCH /api/estabelecimento/:idEstabelecimento */
    .patch(estabelecimentoController.atualizar);

export default estabelecimentoRoutes;