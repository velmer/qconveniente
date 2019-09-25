import { Request, Response, NextFunction } from "express";
import APIError from "../../util/APIError";
import jwt from "jsonwebtoken";
import * as httpStatus from "http-status-codes";
import * as gestorService from "../../services/gestor/gestorService";
import mensagensErro from "../../util/mensagensErro";
import { SESSION_SECRET } from "../../config/secrets";

const UM_DIA = 86400;

/**
 * Realiza o login de um Gestor caso o nome de usuário e senha providos sejam corretos.
 * 
 * @returns {Object} Token de autenticação.
 */
export const loginGestor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const nomeUsuario = req.body.nomeUsuario;
    const senha = req.body.senha;
    let gestor;
    try {
        gestor = await gestorService.getPorNomeUsuario(nomeUsuario);
    } catch(_) {
        const erro = new APIError(mensagensErro.AUTH.NOME_USUARIO_INCORRETO, httpStatus.UNAUTHORIZED);
        return next(erro);
    };

    if (!gestor.comparaSenha(senha)) {
        const erro = new APIError(mensagensErro.AUTH.SENHA_INCORRETA, httpStatus.UNAUTHORIZED);
        return next(erro);
    }

    const token = jwt.sign({
        idGestor: gestor._id,
        idEstabelecimento: gestor.estabelecimento,
        permissao: gestor.permissao
    }, SESSION_SECRET, { expiresIn: UM_DIA });
    return res.json({ token });
};