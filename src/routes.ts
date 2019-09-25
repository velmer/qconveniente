import express from "express";
import authRoutes from "./routes/auth/authRoutes";
import estabelecimentoRoutes from "./routes/estabelecimento/estabelecimentoRoutes";
import gestorRoutes from "./routes/gestor/gestorRoutes";
import usuarioRoutes from "./routes/usuario/usuarioRoutes";
import expressjwt from "express-jwt";
import { SESSION_SECRET } from "./config/secrets";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/estabelecimento", estabelecimentoRoutes);
router.use("/gestor", expressjwt({ secret: SESSION_SECRET }), gestorRoutes);
router.use("/usuario", usuarioRoutes);

export default router;