declare namespace Express {
    export interface Request {
        idEstabelecimento?: string,
        usuario?: {
            idUsuario: string,
            role: string,
            idEstabelecimento: string,
            permissao: string
        };
    }
}