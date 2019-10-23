import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Inicia Express Server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "App rodando http://localhost:%d em modo %s",
        app.get("port"),
        app.get("env")
    );
    process.send && process.send("ready");
});

export default server;
