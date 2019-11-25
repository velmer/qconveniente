import bcrypt from "bcrypt";
import constantes from "../util/constantes";
import httpStatus from "http-status-codes";
import _ from "lodash";
import mensagensErro from "../util/mensagensErro";
import { Document, Model, model, Schema } from "mongoose";
import APIError from "../util/APIError";
import SenhaUtil from "../util/senhaUtil";

interface EspecificacaoCliente {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
}

interface EspecificacaoVendedor {
    permissao: string;
    estabelecimento: Schema.Types.ObjectId;
}

/**
 * Document do Usuário.
 */
export interface UsuarioDocument extends Document {
    nomeUsuario: string;
    senha: string;
    email: string;
    role: string;
    especificacao: EspecificacaoCliente | EspecificacaoVendedor;
    criadoEm: Date;
    atualizadoEm: Date;
    comparaSenha(senha: string): boolean;
    getInfoToken(): object;
};

interface Usuario extends Model<UsuarioDocument> {
    getPorId(id: string): Promise<any>;
    getPorNomeUsuario(nomeUsuario: string): Promise<any>;
}

export enum Role {
    ADMIN = "admin",
    VENDEDOR = "vendedor",
    CLIENTE = "cliente"
}

export enum PermissaoVendedor {
    GERENTE = "gerente",
    FUNCIONARIO = "funcionario"
};

/**
 * Retorna se o Usuário possui o role especificado.
 */
const hasRole = function(expectedRole: string) {
    return (this.role || this.ownerDocument().role) === expectedRole;
};

/**
 * Indica se o Usuário é um Admin.
 */
const isAdmin = function() {
    return hasRole.call(this, Role.ADMIN);
};

/**
 * Indica se o Usuário é um Vendedor.
 */
const isVendedor = function() {
    return hasRole.call(this, Role.VENDEDOR);
};

/**
 * Indica se o Usuário é um Cliente.
 */
const isCliente = function() {
    return hasRole.call(this, Role.CLIENTE);
};

const EspecificacaoSchema = new Schema({
    nomeCompleto: {
        type: String,
        minlength: [constantes.USUARIO.NOME_COMPLETO_TAMANHO_MINIMO, mensagensErro.USUARIO.NOME_COMPLETO_TAMANHO_MINIMO],
        maxlength: [constantes.USUARIO.NOME_COMPLETO_TAMANHO_MAXIMO, mensagensErro.USUARIO.NOME_COMPLETO_TAMANHO_MAXIMO],
        required: [isCliente, mensagensErro.USUARIO.NOME_COMPLETO_OBRIGATORIO],
        trim: true
    },
    cpf: {
        type: String,
        match: [constantes.REGEX.CPF_SEM_PONTUACAO, mensagensErro.USUARIO.CPF_INVALIDO],
        required: [isCliente, mensagensErro.USUARIO.CPF_OBRIGATORIO],
        unique: true,
        sparse: true,
        trim: true,
    },
    telefone: {
        type: String,
        /* Aceita os formatos XX9XXXXXXXX ou XXXXXXXXXX (Sem máscara e espaços) */
        match: [constantes.REGEX.TELEFONE_SEM_PONTUACAO, mensagensErro.USUARIO.TELEFONE_INVALIDO],
        required: [isCliente, mensagensErro.USUARIO.TELEFONE_OBRIGATORIO],
        trim: true
    },
    permissao: {
        type: String,
        enum: {
            values: Object.values(PermissaoVendedor),
            message: mensagensErro.USUARIO.PERMISSAO_INVALIDA
        },
        required: [isVendedor, mensagensErro.USUARIO.PERMISSAO_OBRIGATORIA]
    },
    estabelecimento: {
        type: Schema.Types.ObjectId,
        ref: "Estabelecimento",
        required: [isVendedor, mensagensErro.USUARIO.VINCULACAO_ESTABELECIMENTO_OBRIGATORIA]
    },
});

/**
 * Usuário Schema.
 */
const UsuarioSchema = new Schema({
    nomeUsuario: {
        type: String,
        minlength: [constantes.USUARIO.NOME_USUARIO_TAMANHO_MINIMO, mensagensErro.USUARIO.NOME_USUARIO_TAMANHO_MINIMO],
        maxlength: [constantes.USUARIO.NOME_USUARIO_TAMANHO_MAXIMO, mensagensErro.USUARIO.NOME_USUARIO_TAMANHO_MAXIMO],
        required: [true, mensagensErro.USUARIO.NOME_USUARIO_OBRIGATORIO],
        unique: true,
        trim: true
    },
    senha: { /**  Outras validações são feitas por {@function validador.validaSenha} */
        type: String,
        required: [true, mensagensErro.USUARIO.SENHA_OBRIGATORIA]
    },
    email: {
        type: String,
        match: [constantes.REGEX.EMAIL, mensagensErro.USUARIO.EMAIL_INVALIDO],
        required: [true, mensagensErro.USUARIO.EMAIL_OBRIGATORIO],
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: Object.values(Role),
            message: mensagensErro.USUARIO.ROLE_INVALIDO
        },
        required: [true, mensagensErro.USUARIO.ROLE_OBRIGATORIO]
    },
    especificacao: EspecificacaoSchema
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualiadoEm" } });


/**
 * Executa ações necessárias antes do salvamento do Usuário.
 *
 * Ações:
 * - Encriptar senha
 */
UsuarioSchema.pre<UsuarioDocument>("save", function(next) {
    /**
     * É necessário validar o documento no pre-save por causa do hash aplicado
     * na senha, pois a mesma será alterada, impedindo que as validações feitas
     * via Schema sejam aplicadas corretamente à senha.
     */
    const mensagemErroSenha = SenhaUtil.validaSenha(this.senha);
    if (!_.isUndefined(mensagemErroSenha)) {
        const erro = new APIError(mensagemErroSenha, httpStatus.BAD_REQUEST, true);
        return next(erro);
    }
    const saltos = 10;
    const senhaHash = bcrypt.hashSync(this.senha, saltos);
    this.senha = senhaHash;
    next();
});

/**
 * Define como o Usuário será convertido para JSON.
 */
UsuarioSchema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.senha;
        delete ret.__v;
    }
});

/**
 * Compara a senha especificada com a senha do Usuário.
 *
 * @param {string} senha Senha a ser comparada.
 * @returns {boolean} True se as senhas forem iguais, false caso contrário.
 */
UsuarioSchema.methods.comparaSenha = function (senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
};

/**
 * Retorna as informações a serem colocadas no token de autenticação de acordo
 * com o role do usuário.
 */
UsuarioSchema.methods.getInfoToken = function () {
    const infoToken = {
        idUsuario: this._id,
        role: this.role,
    } as any;

    if (isVendedor.call(this)) {
        infoToken.permissao = this.especificacao.permissao;
        infoToken.estabelecimento = this.especificacao.estabelecimento;
    }

    return infoToken;
};

/**
 * Retorna um Usuário dado o ID deste.
 *
 * @param {string} id Id do Usuário a ser buscado.
 * @returns {Promise} Promise contendo Usuário que possui o ID especificado
 * ou contendo um erro.
 */
UsuarioSchema.statics.getPorId = async function (id: string): Promise<any> {
    let usuario;
    try {
        usuario = await this.findById(id);
    } catch(_) {
        throw new APIError(mensagensErro.USUARIO.ID_INVALIDO, httpStatus.BAD_REQUEST);
    }
    if (!usuario) {
        throw new APIError(mensagensErro.USUARIO.USUARIO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return usuario;
};

/**
 * Retorna um Usuário dado o nome de usuário deste.
 *
 * @param {string} nomeUsuario Nome de usuário do Usuário a ser buscado.
 * @returns {Promise} Promise contendo Usuário que possui o nomeUsuario especificado
 * ou contendo um erro.
 */
UsuarioSchema.statics.getPorNomeUsuario = async function (nomeUsuario: string): Promise<any> {
    const usuario = await this.findOne({ nomeUsuario });
    if (!usuario) {
        throw new APIError(mensagensErro.USUARIO.USUARIO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return usuario;
};

export const Usuario: Usuario = model<UsuarioDocument, Usuario>("Usuario", UsuarioSchema);