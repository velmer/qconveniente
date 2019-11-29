import express from "express";
import * as core from "express-serve-static-core";
import expressproxy from "express-http-proxy";
import compression from "compression";
import bodyParser from "body-parser";
import * as erroMiddleware from "./middlewares/erroMiddleware";
import * as proxy from "./config/proxy";

const API_PATH_PREFIX = "/api";
const SERVER_PORT = process.env.PORT || 8080;
const ESTABELECIMENTO_SERVICE_URL = process.env.ESTABELECIMENTO_SERVICE_URL || "http://localhost:8081/";
const PEDIDO_SERVICE_URL = process.env.PEDIDO_SERVICE_URL || "http://localhost:8082/";
const USUARIO_SERVICE_URL = process.env.USUARIO_SERVICE_URL || "http://localhost:8083/";
const PROXY_CONFIG = { proxyReqPathResolver: (req:any) => req.originalUrl.split(API_PATH_PREFIX)[1] };

const estabelecimentoProxy = expressproxy(ESTABELECIMENTO_SERVICE_URL, PROXY_CONFIG);
const pedidoProxy = expressproxy(PEDIDO_SERVICE_URL, PROXY_CONFIG);
const usuarioProxy = expressproxy(USUARIO_SERVICE_URL, PROXY_CONFIG);

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

    app.use(`${API_PATH_PREFIX}/estabelecimento`, estabelecimentoProxy);
    app.use(`${API_PATH_PREFIX}/produto`, estabelecimentoProxy);
    app.use(`${API_PATH_PREFIX}/pedido`, pedidoProxy);
    app.use(`${API_PATH_PREFIX}/usuario`, usuarioProxy);
};

const app = express();
configuraExpressServer(app);
configuraRotas(app);
erroMiddleware.set(app);
// proxy.set(app);

export default app;
