import expressproxy from "express-http-proxy";
import * as core from "express-serve-static-core";

const API_PATH_PREFIX = "/api";
const ESTABELECIMENTO_SERVICE_URL = process.env.ESTABELECIMENTO_SERVICE_URL || "http://localhost:8081/";
const PEDIDO_SERVICE_URL = process.env.PEDIDO_SERVICE_URL || "http://localhost:8082/";
const USUARIO_SERVICE_URL = process.env.USUARIO_SERVICE_URL || "http://localhost:8083/";
const PROXY_CONFIG = { proxyReqPathResolver: (req:any) => req.baseUrl.split(API_PATH_PREFIX)[1] };

const estabelecimentoProxy = expressproxy(ESTABELECIMENTO_SERVICE_URL, PROXY_CONFIG);
const pedidoProxy = expressproxy(PEDIDO_SERVICE_URL, PROXY_CONFIG);
const usuarioProxy = expressproxy(USUARIO_SERVICE_URL, PROXY_CONFIG);

/**
 * Configura o proxy do Gateway.
 * 
 * @param app Aplicação Express.
 */
const configuraProxy =  (app: core.Express) => {
    app.use(`${API_PATH_PREFIX}/estabelecimento`, estabelecimentoProxy);
    app.use(`${API_PATH_PREFIX}/produto`, estabelecimentoProxy);
    app.use(`${API_PATH_PREFIX}/pedido`, pedidoProxy);
    app.use(`${API_PATH_PREFIX}/usuario`, usuarioProxy);
};

/**
 * Configura middlware de tratamento de erro para a Aplicação Express especificada.
 * 
 * @param app Aplicação Express.
 */
export const set = (app: core.Express) => {
    configuraProxy(app);
};