"use strict";

import { Estabelecimento, EstabelecimentoDocument } from "../models/Estabelecimento";

export const getPorId = (id: string) => {
    return Estabelecimento.findById(id)
        .then(estabelecimento => estabelecimento)
        .catch(err => err);
};

export const salvar = (e: JSON): Promise<EstabelecimentoDocument> => {
    let estabelecimento = new Estabelecimento(e);
    return estabelecimento.save()
        .then(estabelecimento => estabelecimento)
        .catch(err => err);
};

export const consultarEstabelecimentos = (params = {}): Promise<EstabelecimentoDocument> => {
    return Estabelecimento.find(params)
        .then(estabelecimentos => estabelecimentos)
        .catch(err => err);
};
