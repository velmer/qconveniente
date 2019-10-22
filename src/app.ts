import express, { Request, Response, NextFunction } from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import mongoose from "mongoose";
import * as httpStatus from "http-status-codes";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./config/secrets";
import routes from "./routes";
import APIError from "./util/APIError";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

// Connect to MongoDB
const MongoStore = mongo(session);
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
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

// Routes configuration
app.use("/api", routes);

// if error is not an instanceOf APIError, convert it.
app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
    if (err instanceof mongoose.Error.ValidationError) {
        const errIsPublic = true;
        const messageDefault = "Validation failed";
        const unifiedErrorMessage = Object.keys(err.errors)
            .map(errorKey => err.errors[errorKey].message)
            .filter(message => !message.includes(messageDefault)) // Remove mongoose duplicated messages
            .join(" ");
        const error = new APIError(unifiedErrorMessage, httpStatus.BAD_REQUEST, errIsPublic);
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    const errIsPublic = true;
    const err = new APIError("Recurso não encontrado.", httpStatus.NOT_FOUND, errIsPublic);
    return next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) =>
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus.getStatusText(err.status),
        stack: err.stack
    })
);

export default app;
