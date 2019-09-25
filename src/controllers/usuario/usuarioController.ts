import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as usuarioService from "../../services/usuario/usuarioService";
import mensagensErro from "../../util/mensagensErro";

const ID_USUARIO_PARAM_CHAVE = "idUsuario";
const USUARIO_EXCLUIDO_COM_SUCESSO = "Usuário excluído com sucesso!";

/**
 * Retorna uma lista de usuários que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await usuarioService.get(req.query);
        return res.status(httpStatus.OK).json(usuarios);
    } catch (erro) {
        return next(erro || mensagensErro.USUARIO.BUSCA_USUARIOS);
    }
};

/**
 * Retorna um usuário dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await usuarioService
            .getPorId(req.params[ID_USUARIO_PARAM_CHAVE]);
        return res.status(httpStatus.OK).json(usuario);
    } catch (erro) {
        return next(erro || mensagensErro.USUARIO.BUSCA_USUARIO);
    }
};

/**
 * Cria um novo usuário.
 */
export const salva = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const e = await usuarioService.salva(req.body);
        return res.status(httpStatus.CREATED).json(e);
    } catch (erro) {
        return next(erro || mensagensErro.USUARIO.SALVAMENTO_USUARIO);
    }
};

/**
 * Atualiza, através de um PATCH, um usuário.
 */
export const atualiza = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = req.body;
        const usuarioAtualizado = await usuarioService.atualiza(usuario);
        return res.status(httpStatus.OK).json(usuarioAtualizado);
    } catch (erro) {
        return next(erro || mensagensErro.USUARIO.ATUALIZACAO_USUARIO);
    }
};

/**
 * Exclui um Usuário.
 */
export const exclui = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUsuario = req.params[ID_USUARIO_PARAM_CHAVE];
        await usuarioService.exclui(idUsuario);
        return res.status(httpStatus.OK).json(USUARIO_EXCLUIDO_COM_SUCESSO);
    } catch (erro) {
        return next(erro || mensagensErro.USUARIO.EXCLUSAO_USUARIO);
    }
};