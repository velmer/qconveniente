import { Request, Response, NextFunction } from "express";
import mensagensErro from "../util/mensagensErro";
import APIError from "../util/APIError";
import _ from "lodash";
import * as httpStatus from "http-status-codes";

/**
 * Constroi um middleware para realizar autorização de um Usuário baseado nas
 * permissões especificadas. O Usuário deve possuir uma permissão que está
 * presente na lista de permissões para ser autorizado.
 * 
 * @param permissoes Permissões necessárias para acessar um recurso.
 * @return Middleware para realizar autorização de um Usuário.
 */
export const constroiMiddlewareAutorizacaoUsuario = (permissoes: string[] = []) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const usuario = req.usuario;
        if (usuario.role != "admin" /*Role.ADMIN*/ && !_.includes(permissoes, usuario.permissao)) {
            const err = new APIError(mensagensErro.AUTH.FORBIDDEN, httpStatus.FORBIDDEN);
            return next(err);
        }
        return next();
    };
};

/**
 * Retorna um middleware de autorização para um Usuário que tem permissão de Admin.
 */
export const getMiddlewareAutorizacaoAdmin = () => {
    return constroiMiddlewareAutorizacaoUsuario();
};

/**
 * Retorna um middleware de autorização para um Usuário que tem permissão de Gerente.
 */
export const getMiddlewareAutorizacaoGerente = () => {
    //return constroiMiddlewareAutorizacaoUsuario([PermissaoVendedor.GERENTE, PermissaoVendedor.FUNCIONARIO]);
    return constroiMiddlewareAutorizacaoUsuario(["gerente", "funcionario"]);
};

/**
 * Retorna um middleware de autorização para um Usuário que tem permissão de Gerente.
 */
export const getMiddlewareAutorizacaoFuncionario = () => {
    // return constroiMiddlewareAutorizacaoUsuario([PermissaoVendedor.FUNCIONARIO]);
    return constroiMiddlewareAutorizacaoUsuario(["funcionario"]);
};