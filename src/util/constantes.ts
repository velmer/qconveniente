const ESTABELECIMENTO = {
    NOME_SUBSECAO_TAMANHO_MINIMO: 3,
    NOME_SUBSECAO_TAMANHO_MAXIMO: 30,
    NOME_SECAO_TAMANHO_MINIMO: 3,
    NOME_SECAO_TAMANHO_MAXIMO: 30,
    NOME_TAMANHO_MINIMO: 3,
    NOME_TAMANHO_MAXIMO: 50,
    AVALIACAO_MINIMA: 1,
    AVALIACAO_MAXIMA: 5,
    FORMAS_PAGAMENTO: [
        "Dinheiro",
        "Crédito MasterCard",
        "Crédito VISA",
        "Crédito Elo",
        "Crédito Hipercard",
        "Débito MasterCard",
        "Débito VISA",
        "Débito Elo",
        "Débito Hipercard"
    ],
    CATEGORIAS: {
        AGUA: "Água",
        GAS: "Gás",
        BEBIDA_CONVENIENCIA: "Bebida e Conveniência"
    },
};

const GESTOR = {
    PERMISSOES: {
        ADMIN: "admin",
        GERENTE: "gerente",
        FUNCIONARIO: "funcionario"
    },
    NOME_USUARIO_TAMANHO_MINIMO: 3,
    NOME_USUARIO_TAMANHO_MAXIMO: 30
};

const REGEX = {
    HORA_SEM_PONTUACAO: /^[0-9]{4}$/,
    TELEFONE_SEM_PONTUACAO: /^[1-9]{2}9?[0-9]{8}$/,
    CPF_SEM_PONTUACAO: /^\d{11}$/,
    // https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
    EMAIL: /^[a-zA-Z0-9.!#$%&"*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

const Constantes = Object.freeze({
    ESTABELECIMENTO,
    GESTOR,
    REGEX,

    SENHA_TAMANHO_MINIMO: 6,
    SENHA_TAMANHO_MAXIMO: 20,
});

export default Constantes;