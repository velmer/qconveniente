import express from "express";
import pedidoRoutes from "./pedido/pedidoRoutes";

const router = express.Router();

router.use("/pedido", pedidoRoutes);

export default router;