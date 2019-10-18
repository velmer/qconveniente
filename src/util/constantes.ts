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
    NOME_USUARIO_TAMANHO_MINIMO: 3,
    NOME_USUARIO_TAMANHO_MAXIMO: 30
};

const PEDIDO = {
    PRECO_MINIMO_ITEM: 0,
    VALOR_TOTAL_MINIMO: 0,
    VALOR_ENTREGA_MINIMO: 0,
    TROCO_MINIMO: 0,
    AVALIACAO_MINIMA: 1,
    AVALIACAO_MAXIMA: 5,
    QUANTIDADE_MINIMA_ITEM_PEDIDO: 1,
    OBSERVACAO_ITEM_TAMANHO_MAXIMO: 150,
    STATUS_PEDIDO: {
        RASCUNHO: "Rascunho",
        REALIZADO: "Realizado",
        CONFIRMADO: "Confirmado",
        PRONTO: "Pronto",
        SAIU_PARA_ENTREGA: "Saiu para entrega",
        ENTREGUE: "Entregue",
        NAO_ENTREGUE: "Não entregue",
        CANCELADO: "Cancelado",
    },
};

const PRODUTO = {
    NOME_TAMANHO_MINIMO: 3,
    NOME_TAMANHO_MAXIMO: 30,
    PRECO_MINIMO: 0,
    DESCRICAO_TAMANHO_MAXIMO: 150,
    TAMANHO_MAXIMO: 20,
};

const REGEX = {
    HORA_SEM_PONTUACAO: /^[0-9]{4}$/,
    TELEFONE_SEM_PONTUACAO: /^[1-9]{2}9?[0-9]{8}$/,
    CPF_SEM_PONTUACAO: /^\d{11}$/,
    // https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
    EMAIL: /^[a-zA-Z0-9.!#$%&"*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

const USUARIO = {
    NOME_USUARIO_TAMANHO_MINIMO: 3,
    NOME_USUARIO_TAMANHO_MAXIMO: 30,
    NOME_COMPLETO_TAMANHO_MINIMO: 5,
    NOME_COMPLETO_TAMANHO_MAXIMO: 50,
};

const Constantes = Object.freeze({
    ESTABELECIMENTO,
    GESTOR,
    PEDIDO,
    PRODUTO,
    REGEX,
    USUARIO,

    SENHA_TAMANHO_MINIMO: 6,
    SENHA_TAMANHO_MAXIMO: 20,
});

export default Constantes;