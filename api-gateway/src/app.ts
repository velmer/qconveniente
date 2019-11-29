import express from "express";
import * as core from "express-serve-static-core";
import compression from "compression";
import bodyParser from "body-parser";
import * as erroMiddleware from "./middlewares/erroMiddleware";
import * as proxy from "./config/proxy";

const API_PATH_PREFIX = "/api";
const SERVER_PORT = process.env.PORT || 8080;

/**
 * Configura a Aplicação Express especificada com as propriedades básicas para
 * sua criação.
 * 
 * @param app Aplicação Express.
 */
const configuraExpressServer = (app: core.Express) => {
    app.set("port", SERVER_PORT);
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    return app;
};

/**
 * Configura rotas da Aplicação Express especificada.
 * 
 * @param app Aplicação Express.
 */
const configuraRotas = (app: core.Express) => {
    app.get(API_PATH_PREFIX, (_req: any, res: any) => {
        res.send("Bem-vindo à API do QConveniente!\n");
    });
};

const app = express();
configuraExpressServer(app);
configuraRotas(app);
erroMiddleware.set(app);
proxy.set(app);

export default app;
