import bcrypt from "bcrypt";
import constantes from "../../util/constantes";
import httpStatus from "http-status-codes";
import _ from "lodash";
import mensagensErro from "../../util/mensagensErro";
import { Document, Model, model, Schema } from "mongoose";
import APIError from "../../util/APIError";
import SenhaUtil from "../../util/senhaUtil";

/**
 * Document do Usuário.
 */
export interface UsuarioDocument extends Document {
    nomeUsuario: string;
    senha: string;
    criadoEm: Date;
    atualizadoEm: Date;
    comparaSenha(senha: string): boolean;
};

interface Usuario extends Model<UsuarioDocument> {
    getPorId(id: string): Promise<any>;
    getPorNomeUsuario(nomeUsuario: string): Promise<any>;
}

/**
 * Usuário Schema.
 */
const UsuarioSchema = new Schema({
    nomeCompleto: {
        type: String,
        minlength: [constantes.USUARIO.NOME_COMPLETO_TAMANHO_MINIMO, mensagensErro.USUARIO.NOME_COMPLETO_TAMANHO_MINIMO],
        maxlength: [constantes.USUARIO.NOME_COMPLETO_TAMANHO_MAXIMO, mensagensErro.USUARIO.NOME_COMPLETO_TAMANHO_MAXIMO],
        required: [true, mensagensErro.USUARIO.NOME_COMPLETO_OBRIGATORIO],
        trim: true
    },
    email: {
        type: String,
        match: [constantes.REGEX.EMAIL, mensagensErro.USUARIO.EMAIL_INVALIDO],
        required: [true, mensagensErro.USUARIO.EMAIL_OBRIGATORIO],
        unique: true,
        trim: true
    },
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
    cpf: {
        type: String,
        match: [constantes.REGEX.CPF_SEM_PONTUACAO, mensagensErro.USUARIO.CPF_INVALIDO],
        required: [true, mensagensErro.USUARIO.CPF_OBRIGATORIO],
        unique: true,
        trim: true,
    },
    telefone: {
        type: String,
        /* Aceita os formatos XX9XXXXXXXX ou XXXXXXXXXX (Sem máscara e espaços) */
        match: [constantes.REGEX.TELEFONE_SEM_PONTUACAO, mensagensErro.USUARIO.TELEFONE_INVALIDO],
        trim: true,
        required: [true, mensagensErro.USUARIO.TELEFONE_OBRIGATORIO]
    }
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
 * Retorna um Usuário dado o ID deste.
 *
 * @param {string} id Id do Usuário a ser buscado.
 * @returns {Promise} Promise contendo Usuário que possui o ID especificado
 * ou contendo um erro.
 */
UsuarioSchema.statics.getPorId = async function (id: string): Promise<any> {
    return this.findById(id)
        .exec()
        .then((usuario: UsuarioDocument) => {
            if (usuario) {
                return usuario;
            }
            const erro = new APIError(mensagensErro.USUARIO.USUARIO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
            throw erro;
        })
        .catch((erro: any) => {
            if (!(erro instanceof APIError)) {
                erro = new APIError(mensagensErro.USUARIO.ID_INVALIDO, httpStatus.BAD_REQUEST);
            }
            throw erro;
        });
};

/**
 * Retorna um Usuário dado o nome de usuário deste.
 *
 * @param {string} nomeUsuario Nome de usuário do Usuário a ser buscado.
 * @returns {Promise} Promise contendo Usuário que possui o nomeUsuario especificado
 * ou contendo um erro.
 */
UsuarioSchema.statics.getPorNomeUsuario = async function (nomeUsuario: string): Promise<any> {
    return this.findOne({ nomeUsuario })
        .exec()
        .then((usuario: UsuarioDocument) => {
            if (usuario) {
                return usuario;
            }
            const erro = new APIError(mensagensErro.USUARIO.USUARIO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
            throw erro;
        });
};

export const Usuario: Usuario = model<UsuarioDocument, Usuario>("Usuario", UsuarioSchema);