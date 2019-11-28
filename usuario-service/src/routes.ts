import express from "express";
import authRoutes from "./auth/authRoutes";
import usuarioRoutes from "./usuario/usuarioRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/usuario", usuarioRoutes);

export default router;