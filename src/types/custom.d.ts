declare namespace Express {
    export interface Request {
        authGestor?: {
            idGestor: string,
            idEstabelecimento: string,
            permissao: string
        };
    }
}