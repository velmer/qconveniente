import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as produtoService from "./produtoService";
import mensagensErro from "../util/mensagensErro";

const ID_PRODUTO_PARAM_CHAVE = "idProduto";

/**
 * Retorna uma lista de produtos que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const produtos = await produtoService.get(req.query);
        return res.status(httpStatus.OK).json(produtos);
    } catch (erro) {
        return next(erro || mensagensErro.PRODUTO.BUSCA_PRODUTOS);
    }
};

/**
 * Retorna um produto dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const produto = await produtoService
            .getPorId(req.params[ID_PRODUTO_PARAM_CHAVE]);
        return res.status(httpStatus.OK).json(produto);
    } catch (erro) {
        return next(erro || mensagensErro.PRODUTO.BUSCA_PRODUTO);
    }
};

/**
 * Cria um novo produto.
 */
export const salva = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const e = await produtoService.salva(req.body);
        return res.status(httpStatus.CREATED).json(e);
    } catch (erro) {
        return next(erro || mensagensErro.PRODUTO.SALVAMENTO_PRODUTO);
    }
};

/**
 * Atualiza, através de um PATCH, um produto.
 */
export const atualiza = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const produto = req.body;
        const produtoAtualizado = await produtoService.atualiza(produto);
        return res.status(httpStatus.OK).json(produtoAtualizado);
    } catch (erro) {
        return next(erro || mensagensErro.PRODUTO.ATUALIZACAO_PRODUTO);
    }
};
