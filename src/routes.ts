import express from "express";
import authRoutes from "./routes/auth/authRoutes";
import estabelecimentoRoutes from "./routes/estabelecimento/estabelecimentoRoutes";
import gestorRoutes from "./routes/gestor/gestorRoutes";
import pedidoRoutes from "./routes/pedido/pedidoRoutes";
import produtoRoutes from "./routes/produto/produtoRoutes";
import usuarioRoutes from "./routes/usuario/usuarioRoutes";
import expressjwt from "express-jwt";
import { SESSION_SECRET } from "./config/secrets";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/estabelecimento", estabelecimentoRoutes);
router.use("/gestor", gestorRoutes);
router.use("/pedido", expressjwt({ secret: SESSION_SECRET }), pedidoRoutes);
router.use("/produto", produtoRoutes);
router.use("/usuario", usuarioRoutes);

export default router;