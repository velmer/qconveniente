import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import routes from "./routes";
import { Request, Response, NextFunction } from "express";
import * as estabelecimentoController from "./controllers/estabelecimentoController";

// Connect to MongoDB
const MongoStore = mongo(session);
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl, { useNewUrlParser: true} ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//app.use("/api", routes);
app.get("/api", (req: Request, res: Response, next: NextFunction) => {
    return res.send("Bem-vindo(a) à API REST do QConveniente!");
});
app.route("/api/estabelecimentos")
    /** GET /api/estabelecimentos - Get lista de estabelecimentos */
    .get(estabelecimentoController.consultarEstabelecimentos)

    /** POST /api/estabelecimentos - Cria um novo estabelecimento */
    .post(estabelecimentoController.salvar);

app.route("/api/estabelecimentos/:idEstabelecimento")
    /** GET /api/estabelecimentos/:idEstabelecimento - Get estabelecimento */
    .get(estabelecimentoController.getPorId);

export default app;
