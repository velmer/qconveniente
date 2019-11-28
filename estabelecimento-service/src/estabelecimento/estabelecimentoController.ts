"use strict";

import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status-codes";
import * as estabelecimentoService from "./estabelecimentoService";
import mensagensErro from "../util/mensagensErro";

/**
 * Retorna uma lista de estabelecimentos que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimentos = await estabelecimentoService.get(req.query);
        return res.status(httpStatus.OK).json(estabelecimentos);
    } catch (erro) {
        return next(erro || mensagensErro.ESTABELECIMENTO.BUSCA_ESTABELECIMENTOS);
    }
};

/**
 * Retorna todos os estabelecimentos que possuírem a(s) categoria(s)
 * especificada(s) na query da requisição. Caso nenhuma categoria
 * seja especificada, nenhum estabelecimento será retornado.
 */
export const getPorCategoria = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mapCategoriaSemAcento: { [key: string]: string } = {
            "Agua": "Água",
            "Gas": "Gás",
            "Bebida e Conveniencia": "Bebida e Conveniência"
        };
        let { categorias } = req.query;
        categorias = categorias.map((categoria: string) => mapCategoriaSemAcento[categoria] || categoria);
        const parametroCategorias = { "categorias": { $all: categorias } };
        const estabelecimentos = await estabelecimentoService.get(parametroCategorias);
        return res.status(httpStatus.OK).json(estabelecimentos);
    } catch (erro) {
        return next(erro || mensagensErro.ESTABELECIMENTO.BUSCA_ESTABELECIMENTOS);
    }
};

/**
 * Retorna um estabelecimento dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimento = await estabelecimentoService
            .getPorId(req.params["idEstabelecimento"]);
        return res.status(httpStatus.OK).json(estabelecimento);
    } catch (erro) {
        return next(erro || mensagensErro.ESTABELECIMENTO.BUSCA_ESTABELECIMENTO);
    }
};

/**
 * Cria um novo estabelecimento, criando também o seu gerente, o qual deve
 * ser enviado na requisição.
 */
export const salva = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { estabelecimento, usuario } = req.body;
        const estabelecimentoSalvo = await estabelecimentoService.salva(estabelecimento, usuario);
        return res.status(httpStatus.CREATED).json(estabelecimentoSalvo);
    } catch (erro) {
        return next(erro || mensagensErro.ESTABELECIMENTO.SALVAMENTO_ESTABELECIMENTO);
    }
};

/**
 * Atualiza, através de um PATCH, um estabelecimento.
 */
export const atualiza = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimento = req.body;
        const estabelecimentoAtualizado = await estabelecimentoService.atualiza(estabelecimento);
        return res.status(httpStatus.OK).json(estabelecimentoAtualizado);
    } catch (erro) {
        return next(erro || mensagensErro.ESTABELECIMENTO.ATUALIZACAO_ESTABELECIMENTO);
    }
};