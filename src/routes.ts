import express from "express";
import estabelecimentoRoutes from "./routes/estabelecimento/estabelecimentoRoutes";
import gestorRoutes from "./routes/gestor/gestorRoutes";

const router = express.Router();

router.use("/estabelecimento", estabelecimentoRoutes);
router.use("/gestor", gestorRoutes);

export default router;