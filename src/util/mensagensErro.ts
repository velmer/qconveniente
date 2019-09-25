const AUTH = {
    NOME_USUARIO_INCORRETO: "Nome de usuário incorreto.",
    SENHA_INCORRETA: "Senha incorreta",
};

const ESTABELECIMENTO = {
    ESTABELECIMENTO_NAO_ENCONTRADO: "Estabelecimento não encontrado.",
    ID_INVALIDO: "O ID do Estabelecimento é inválido.",
    BUSCA_ESTABELECIMENTO: "Não foi possível encontrar o Estabelecimento.",
    BUSCA_ESTABELECIMENTOS: "Não foi possível encontrar os Estabelecimentos.",
    SALVAMENTO_ESTABELECIMENTO: "Não foi possível salvar o Estabelecimento.",
    ATUALIZACAO_ESTABELECIMENTO: "Não foi possível atualizar o Estabelecimento.",
    EXCLUSAO_ESTABELECIMENTO: "Não foi possível deletar o Estabelecimento.",
    TEMPO_MINIMO_ENTREGA_OBRIGATORIO: "O tempo mínimo da entrega é obrigatório.",
    TEMPO_MAXIMO_ENTREGA_OBRIGATORIO: "O tempo máximo da entrega é obrigatório.",
    INICIO_HORARIO_FUNCIONAMENTO_OBRIGATORIO: "O início do horário de funcionamento é obrigatório.",
    INICIO_HORARIO_FUNCIONAMENTO_INVALIDO: "O início do horário de funcionamento é inválido.",
    FIM_HORARIO_FUNCIONAMENTO_OBRIGATORIO: "O fim do horário de funcionamento é obrigatório.",
    FIM_HORARIO_FUNCIONAMENTO_INVALIDO: "O fim do horário de funcionamento é inválido.",
    NOME_SUBSECAO_TAMANHO_MINIMO: "O nome da subseção do Cardápio deve ter no mínimo 3 caracteres.",
    NOME_SUBSECAO_TAMANHO_MAXIMO: "O nome da subseção do Cardápio deve ter no máximo 30 caracteres.",
    NOME_SUBSECAO_OBRIGATORIO: "O nome da subseção do Cardápio é obrigatório.",
    NOME_SECAO_TAMANHO_MINIMO: "O nome da seção do Cardápio deve ter no mínimo 3 caracteres.",
    NOME_SECAO_TAMANHO_MAXIMO: "O nome da seção do Cardápio deve ter no máximo 30 caracteres.",
    NOME_SECAO_OBRIGATORIO: "O nome da seção do Cardápio é obrigatório.",
    NOME_TAMANHO_MINIMO: "O nome do Estabelecimento deve ter no mínimo 3 caracteres.",
    NOME_TAMANHO_MAXIMO: "O nome do Estabelecimento deve ter no máximo 50 caracteres.",
    NOME_OBRIGATORIO: "O nome do Estabelecimento é obrigatório.",
    CATEGORIA_INVALIDA: "A categoria ({VALUE}) do Estabelecimento é inválida.",
    CATEGORIA_OBRIGATORIA: "O Estabelecimento deve possuir ao menos uma categoria.",
    FORMA_PAGAMENTO_INVALIDA: "A forma de pagamento ({VALUE}) do Estabelecimento é inválida.",
    FORMA_PAGAMENTO_OBRIGATORIA: "O Estabelecimento deve possuir ao menos uma forma de pagamento.",
    TELEFONE_INVALIDO: "O número de telefone ({VALUE}) do Estabelecimento é inválido.",
    TELEFONE_OBRIGATORIO: "O Estabelecimento deve possuir ao menos um telefone.",
    VALOR_ENTREGA_OBRIGATORIO: "O valor da entrega é obrigatório.",
    TEMPO_ENTREGA_OBRIGATORIO: "O tempo mínimo e máximo da entrega são obrigatórios.",
    HORARIO_FUNCIONAMENTO_OBRIGATORIO: "O horário de funcionamento do Estabelecimento é obrigatório.",
    AVALIACAO_MINIMA: "A avaliação mínima para o Estabelecimento é 1.",
    AVALIACAO_MAXIMA: "A avaliação máxima para o Estabelecimento é 5.",
};

const GESTOR = {
    GESTOR_NAO_ENCONTRADO: "Gestor não encontrado.",
    ID_INVALIDO: "O ID do Gestor é inválido.",
    BUSCA_GESTOR: "Não foi possível encontrar o Gestor.",
    BUSCA_GESTORES: "Não foi possível encontrar os Gestores.",
    SALVAMENTO_GESTOR: "Não foi possível salvar o Gestor.",
    ATUALIZACAO_GESTOR: "Não foi possível atualizar o Gestor.",
    EXCLUSAO_GESTOR: "Não foi possível deletar o Gestor.",
    NOME_USUARIO_TAMANHO_MINIMO: "O nome de usuário do Gestor deve ter no mínimo 3 caracteres.",
    NOME_USUARIO_TAMANHO_MAXIMO: "O nome de usuário do Gestor deve ter no máximo 30 caracteres.",
    NOME_USUARIO_OBRIGATORIO: "O nome de usuário do Gestor é obrigatório.",
    SENHA_OBRIGATORIA: "A senha do Gestor é obrigatória.",
    PERMISSAO_OBRIGATORIA: "O Gestor deve possuir uma permissão.",
    PERMISSAO_INVALIDA: "A permissão ({VALUE}) é inválida.",
};

const MensagensErro = Object.freeze({
    AUTH,
    ESTABELECIMENTO,
    GESTOR,

    SENHA_INVALIDA: "A senha deve ser composta de 6 a 20 caracteres.",
});

export default MensagensErro;