import express from "express";
import * as authController from "../../controllers/auth/authController";

const authRoutes = express.Router();
    
authRoutes.route("/loginGestor")
    /** POST /api/auth/loginGestor - Cria um novo auth */
    .post(authController.loginGestor);

export default authRoutes;