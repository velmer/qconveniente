import { Request, Response, NextFunction } from "express";
import APIError from "../util/APIError";
import jwt from "jsonwebtoken";
import * as httpStatus from "http-status-codes";
import * as usuarioService from "../usuario/usuarioService";
import mensagensErro from "../util/mensagensErro";
import { SESSION_SECRET } from "../config/secrets";

const UM_DIA = 86400;

/**
 * Realiza o login de um Usuário caso o nome de usuário e senha providos sejam corretos.
 * 
 * @returns {Object} Token de autenticação.
 */
export const loginUsuario = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const nomeUsuario = req.body.nomeUsuario;
    const senha = req.body.senha;
    let usuario;
    try {
        usuario = await usuarioService.getPorNomeUsuario(nomeUsuario);
    } catch(_) {
        const erro = new APIError(mensagensErro.AUTH.NOME_USUARIO_INCORRETO, httpStatus.UNAUTHORIZED);
        return next(erro);
    };

    try {
        if (!usuario.comparaSenha(senha)) {
            const erro = new APIError(mensagensErro.AUTH.SENHA_INCORRETA, httpStatus.UNAUTHORIZED);
            return next(erro);
        }

        const token = jwt.sign(usuario.getInfoToken(), SESSION_SECRET, { expiresIn: UM_DIA });
        return res.json({ token });
    } catch(_) {
        const erro = new APIError(mensagensErro.AUTH.ERRO_AO_LOGAR, httpStatus.INTERNAL_SERVER_ERROR);
        return next(erro);
    }
};