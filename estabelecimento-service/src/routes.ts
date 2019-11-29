import express from "express";
import estabelecimentoRoutes from "./estabelecimento/estabelecimentoRoutes";
import produtoRoutes from "./produto/produtoRoutes";

const router = express.Router();

router.use("/estabelecimento", estabelecimentoRoutes);
router.use("/produto", produtoRoutes);

export default router;