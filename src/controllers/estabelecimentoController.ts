"use strict";

import { Request, Response, NextFunction } from "express";
import * as estabelecimentoService from "../services/estabelecimentoService";

/**
 * Retorna uma lista de estabelecimentos que satisfizerem os parâmetros
 * especificados na requisição.
 */
export const consultar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimentos = await estabelecimentoService.consultar(req.query);
        return res.json(estabelecimentos);
    } catch (erro) {
        return next(erro);
    }
};

/**
 * Retorna um estabelecimento dado o seu ID.
 */
export const getPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimento = await estabelecimentoService
            .getPorId(req.params["idEstabelecimento"]);
        return res.json(estabelecimento);
    } catch (erro) {
        return next(erro);
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
        const estabelecimentos = await estabelecimentoService.consultar(parametroCategorias);
        return res.json(estabelecimentos);
    } catch (erro) {
        return next(erro);
    }
};

/**
 * Cria um novo estabelecimento, criando também o seu gerente, o qual deve
 * ser enviado na requisição.
 */
export const salvar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const e = await estabelecimentoService.salvar(req.body);
        return res.json(e);
    } catch (erro) {
        return next(erro);
    }
};

/**
 * Atualiza, através de um PATCH, um estabelecimento.
 */
export const atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const estabelecimento = req.body;
        const estabelecimentoAtualizado = await estabelecimentoService.atualizar(estabelecimento);
        return res.json(estabelecimentoAtualizado);
    } catch (erro) {
        return next(erro);
    }
};