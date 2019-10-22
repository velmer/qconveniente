import express from "express";
import authRoutes from "./routes/auth/authRoutes";
import estabelecimentoRoutes from "./estabelecimento/estabelecimentoRoutes";
import gestorRoutes from "./gestor/gestorRoutes";
import pedidoRoutes from "./pedido/pedidoRoutes";
import produtoRoutes from "./produto/produtoRoutes";
import usuarioRoutes from "./usuario/usuarioRoutes";
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