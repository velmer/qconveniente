import express from "express";
import * as core from "express-serve-static-core";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import routes from "./routes";
import * as erroMiddleware from "./middlewares/erroMiddleware";
import { MONGODB_URI } from "./config/secrets";

const SERVER_PORT = process.env.PORT || 8083;

/**
 * Configura conexão com o MongoDB através do Mongoose.
 */
const configuraMongoDB = () => {
    mongoose.Promise = bluebird;
    mongoose.connect(MONGODB_URI, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).catch(err => {
        console.log(`Erro ao se conectar com MongoDB. Verifique se o MongoDB está rodando. ${err}`);
        process.exit(1);
    });
};

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
    app.use("/", routes);
};

configuraMongoDB();
const app = express();
configuraExpressServer(app);
configuraRotas(app);
erroMiddleware.set(app);

export default app;
