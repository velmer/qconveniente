import { Request, Response, NextFunction } from "express";
import { PermissaoGestor } from "../models/gestor/Gestor";
import mensagensErro from "../util/mensagensErro";
import APIError from "../util/APIError";
import _ from "lodash";
import * as httpStatus from "http-status-codes";

/**
 * Constroi um middleware para realizar autorização de um Gestor baseado nas
 * permissões especificadas. O gestor deve possuir uma permissão que está
 * presente na lista de permissões para ser autorizado.
 * 
 * @param permissoes Permissões necessárias para acessar um recurso.
 * @return Middleware para realizar autorização de um Gestor.
 */
export const constroiAutorizacaoGestor = (permissoes: string[] = []) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const permissao = req.authGestor.permissao;
        if (permissao != PermissaoGestor.ADMIN && !_.includes(permissoes, permissao)) {
            const err = new APIError(mensagensErro.AUTH.FORBIDDEN, httpStatus.FORBIDDEN);
            return next(err);
        }
        return next();
    };
};

/**
 * Retorna um middleware de autorização para um Gestor que tem permissão de Admin.
 */
export const getAutorizacaoAdmin = () => {
    return constroiAutorizacaoGestor();
};

/**
 * Retorna um middleware de autorização para um Gestor que tem permissão de Gerente.
 */
export const getAutorizacaoGerente = () => {
    return constroiAutorizacaoGestor([PermissaoGestor.GERENTE, PermissaoGestor.FUNCIONARIO]);
};

/**
 * Retorna um middleware de autorização para um Gestor que tem permissão de Gerente.
 */
export const getAutorizacaoFuncionario = () => {
    return constroiAutorizacaoGestor([PermissaoGestor.FUNCIONARIO]);
};