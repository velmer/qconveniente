import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as produtoService from "../../produto/produtoService";
import mensagensErro from "../../util/mensagensErro";

/**
 * Retorna a lista de Produtos do Estabelecimento especificado que satisfizerem
 * os parâmetros especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = { ...req.query, estabelecimento: req.idEstabelecimento };
        const produtos = await produtoService.get(params);
        return res.status(httpStatus.OK).json(produtos);
    } catch (erro) {
        return next(erro || mensagensErro.PRODUTO.BUSCA_PRODUTOS);
    }
};