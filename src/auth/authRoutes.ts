import express from "express";
import * as authController from "./authController";

const authRoutes = express.Router();
    
authRoutes.route("/login")
    /** POST /api/auth/loginUsuario - Loga no sistema com um Gestor */
    .post(authController.loginUsuario);

export default authRoutes;