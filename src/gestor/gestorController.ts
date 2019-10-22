import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as gestorService from "./gestorService";
import mensagensErro from "../util/mensagensErro";

/**
 * Retorna uma lista de gestores que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gestores = await gestorService.get(req.query);
        return res.status(httpStatus.OK).json(gestores);
    } catch (erro) {
        return next(erro || mensagensErro.GESTOR.BUSCA_GESTORES);
    }
};

/**
 * Retorna um gestor dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gestor = await gestorService
            .getPorId(req.params["idGestor"]);
        return res.status(httpStatus.OK).json(gestor);
    } catch (erro) {
        return next(erro || mensagensErro.GESTOR.BUSCA_GESTOR);
    }
};

/**
 * Cria um novo gestor.
 */
export const salva = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const e = await gestorService.salva(req.body);
        return res.status(httpStatus.CREATED).json(e);
    } catch (erro) {
        return next(erro || mensagensErro.GESTOR.SALVAMENTO_GESTOR);
    }
};

/**
 * Atualiza, através de um PATCH, um gestor.
 */
export const atualiza = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gestor = req.body;
        const gestorAtualizado = await gestorService.atualiza(gestor);
        return res.status(httpStatus.OK).json(gestorAtualizado);
    } catch (erro) {
        return next(erro || mensagensErro.GESTOR.ATUALIZACAO_GESTOR);
    }
};

/**
 * Exclui um Gestor.
 */
export const exclui = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idGestor = req.params["idGestor"];
        await gestorService.exclui(idGestor);
        return res.status(httpStatus.OK).json("Gestor excluído com sucesso!");
    } catch (erro) {
        return next(erro || mensagensErro.GESTOR.EXCLUSAO_GESTOR);
    }
};