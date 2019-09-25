import express from "express";
import authRoutes from "./routes/auth/authRoutes";
import estabelecimentoRoutes from "./routes/estabelecimento/estabelecimentoRoutes";
import gestorRoutes from "./routes/gestor/gestorRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/estabelecimento", estabelecimentoRoutes);
router.use("/gestor", gestorRoutes);

export default router;