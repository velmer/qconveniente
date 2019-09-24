"use strict";

import { Estabelecimento, EstabelecimentoDocument } from "../../models/estabelecimento/Estabelecimento";

/**
 * Retorna os estabelecimento que satisfazerem as condições dadas nos
 * parâmetros especificados.
 * 
 * @param {Object} params Parâmetros da busca.
 * @return {Promise} Promessa contendo os estabelecimentos ou um erro.
 */
export const get = async (params: object = {}): Promise<EstabelecimentoDocument[]> => {
    const estabelecimentos = await Estabelecimento.find(params);
    return estabelecimentos;
};

/**
 * Retorna um estabelecimento dado o seu ID.
 * 
 * @param {String} id ID do estabelecimento a ser retornado.
 * @return {Promise} Promessa contendo o estabelecimento ou um erro.
 */
export const getPorId = async (id: string): Promise<EstabelecimentoDocument> => {
    const estabelecimento = await Estabelecimento.getById(id);
    return estabelecimento;
};

/**
 * Salva um estabelecimento.
 * 
 * @param {Estabelecimento|Object} estabelecimento Estabelecimento a ser salvo.
 * @return {Promise} Promessa contendo o estabelecimento salvo ou um erro.
 */
export const salva = async (estabelecimentoJSON: JSON): Promise<EstabelecimentoDocument> => {
    const estabelecimento = new Estabelecimento(estabelecimentoJSON);
    return await estabelecimento.save();
};

/**
 * Atualiza um estabelecimento.
 * 
 * @param {Estabelecimento} estabelecimento Estabelecimento a ser atualizado.
 * @return {Promise} Promessa contendo o estabelecimento atualizado ou um erro.
 */
export const atualiza = async (estabelecimento: EstabelecimentoDocument): Promise<EstabelecimentoDocument> => {
    const opcoes = { new: true }; // Deve retornar o estabelecimento atualizado.
    const estabelecimentoAtualizado = Estabelecimento
        .findByIdAndUpdate(estabelecimento._id, estabelecimento, opcoes);
    return estabelecimentoAtualizado;
};