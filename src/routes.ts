import express from "express";
import { Request, Response, NextFunction } from "express";
import estabelecimentoRoutes from "./routes/estabelecimentoRoute";

const router = express.Router();

router.get("/"), (req: Request, res: Response, next: NextFunction) => {
    return res.send("/api routes ok");
};
//router.use("/estabelecimentos", estabelecimentoRoutes);

export default router;