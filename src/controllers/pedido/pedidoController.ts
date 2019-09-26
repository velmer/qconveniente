import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as pedidoService from "../../services/pedido/pedidoService";
import mensagensErro from "../../util/mensagensErro";

const ID_PEDIDO_PARAM_CHAVE = "idPedido";
const PEDIDO_EXCLUIDO_COM_SUCESSO = "Pedido excluído com sucesso!";

/**
 * Retorna uma lista de pedidos que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pedidos = await pedidoService.get(req.query);
        return res.status(httpStatus.OK).json(pedidos);
    } catch (erro) {
        return next(erro || mensagensErro.PEDIDO.BUSCA_PEDIDOS);
    }
};

/**
 * Retorna um pedido dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pedido = await pedidoService
            .getPorId(req.params[ID_PEDIDO_PARAM_CHAVE]);
        return res.status(httpStatus.OK).json(pedido);
    } catch (erro) {
        return next(erro || mensagensErro.PEDIDO.BUSCA_PEDIDO);
    }
};

/**
 * Cria um novo pedido.
 */
export const salva = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const e = await pedidoService.salva(req.body);
        return res.status(httpStatus.CREATED).json(e);
    } catch (erro) {
        return next(erro || mensagensErro.PEDIDO.SALVAMENTO_PEDIDO);
    }
};

/**
 * Atualiza, através de um PATCH, um pedido.
 */
export const atualiza = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pedido = req.body;
        const pedidoAtualizado = await pedidoService.atualiza(pedido);
        return res.status(httpStatus.OK).json(pedidoAtualizado);
    } catch (erro) {
        return next(erro || mensagensErro.PEDIDO.ATUALIZACAO_PEDIDO);
    }
};

/**
 * Exclui um Pedido.
 */
export const exclui = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idPedido = req.params[ID_PEDIDO_PARAM_CHAVE];
        await pedidoService.exclui(idPedido);
        return res.status(httpStatus.OK).json(PEDIDO_EXCLUIDO_COM_SUCESSO);
    } catch (erro) {
        return next(erro || mensagensErro.PEDIDO.EXCLUSAO_PEDIDO);
    }
};