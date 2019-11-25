declare namespace Express {
    export interface Request {
        usuario?: {
            idUsuario: string,
            role: string,
            idEstabelecimento: string,
            permissao: string
        };
    }
}