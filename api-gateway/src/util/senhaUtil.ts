import constantes from "./constantes";
import _ from "lodash";
import mensagensErro from "./mensagensErro";

export default class SenhaUtil {

    /**
     * Valida a senha especificada, retornando uma mensagem de erro caso a
     * mesma não seja válida.
     * 
     * A senha deve ser uma String e possuir de 6 a 20 carecteres após serem
     * removidos, se existirem, espaços do início e fim.
     * 
     * @param {string} senha Senha a ser validada.
     * @returns {string | undefined} {@property mensagensErro.AUTH.SENHA_INVALIDA} em caso de
     * erro na senha, undefined caso contrário.
     */
    public static validaSenha = (senha: string): (string | undefined) => {
        senha = _.isString(senha) ? senha.trim() : senha;
        const isSenhaInvalida = !_.isString(senha)
            || senha.length < constantes.USUARIO.SENHA_TAMANHO_MINIMO
            || senha.length > constantes.USUARIO.SENHA_TAMANHO_MAXIMO;
        return isSenhaInvalida ? mensagensErro.AUTH.SENHA_INVALIDA : undefined;
    };
}