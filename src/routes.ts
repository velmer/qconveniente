import express from "express";
import estabelecimentoRoutes from "./routes/estabelecimentoRoutes";

const router = express.Router();

router.use("/estabelecimento", estabelecimentoRoutes);

export default router;