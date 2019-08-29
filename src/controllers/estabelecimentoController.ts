"use strict";

import { Request, Response, NextFunction } from "express";
import * as estabelecimentoService from "../services/estabelecimentoService";

export const consultarEstabelecimentos = (req: Request, res: Response, next: NextFunction) => {
    return estabelecimentoService.consultarEstabelecimentos(req.query)
        .then(estabelecimentos => res.json(estabelecimentos))
        .catch(err => next(err));
};

export const getPorId = (req: Request, res: Response, next: NextFunction) => {
    return estabelecimentoService.getPorId(req.params["idEstabelecimento"])
        .then(estabelecimento => res.json(estabelecimento))
        .catch(err => next(err));
};

export const salvar = (req: Request, res: Response, next: NextFunction) => {
    return estabelecimentoService.salvar(req.body)
        .then(e => res.json(e))
        .catch(err => next(err));
};