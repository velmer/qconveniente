import express from "express";
import * as authController from "./authController";

const authRoutes = express.Router();
    
authRoutes.route("/login")
    /** POST /api/auth/login - Loga no sistema com um Usuário */
    .post(authController.login);

export default authRoutes;