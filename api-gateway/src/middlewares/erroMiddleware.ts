import { Request, Response, NextFunction } from "express";
import * as core from "express-serve-static-core";
import mongoose from "mongoose";
import * as httpStatus from "http-status-codes";
import APIError from "../util/APIError";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

process.on("SIGINT", () => {
    mongoose.disconnect((err: any) => {
        process.exit(err ? 1 : 0);
    });
});

/**
 * Configura middleware para converter erros para instâncias de APIError.
 * 
 * @param app Aplicação Express.
 */
const configuraConversorDeErro = (app: core.Express) => {
    app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
        if (err instanceof mongoose.Error.ValidationError) {
            const errIsPublic = true;
            const defaultMessage = "Validation failed";
            const unifiedErrorMessage = Object.keys(err.errors)
                .map(errorKey => err.errors[errorKey].message)
                .filter(message => !message.includes(defaultMessage)) // Remove mongoose duplicated messages
                .join(" ");
            const error = new APIError(unifiedErrorMessage, httpStatus.BAD_REQUEST, errIsPublic);
            return next(error);
        } else if (!(err instanceof APIError)) {
            const apiError = new APIError(err.message, err.status);
            return next(apiError);
        }
        return next(err);
    });
};

/**
 * Configura middleware para tratar requisições a rotas não existentes.
 * 
 * @param app Aplicação Express.
 */
const configuraRecursoNaoEncontrado = (app: core.Express) => {
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        const errIsPublic = true;
        const err = new APIError("Recurso não encontrado.", httpStatus.NOT_FOUND, errIsPublic);
        return next(err);
    });
};

/**
 * Configura envio de erro através da resposta, enviando a mensagem de erro
 * caso o mesmo seja público, caso contrário, envia apenas a descrição HTTP
 * do mesmo.
 * 
 * @param app Aplicação Express.
 */
const configuraEnvioDeErro = (app: core.Express) => {
    app.use((err: any, _req: Request, res: Response) =>
        res.status(err.status).json({
            message: err.isPublic ? err.message : httpStatus.getStatusText(err.status),
            stack: err.stack
        })
    );
};

/**
 * Configura middlware de tratamento de erro para a Aplicação Express especificada.
 * 
 * @param app Aplicação Express.
 */
export const set = (app: core.Express) => {
    configuraConversorDeErro(app);
    configuraRecursoNaoEncontrado(app);
    configuraEnvioDeErro(app);
};