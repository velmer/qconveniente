import bcrypt from "bcrypt";
import constantes from "../../util/constantes";
import httpStatus from "http-status-codes";
import _ from "lodash";
import mensagensErro from "../../util/mensagensErro";
import { Document, Model, model, Schema } from "mongoose";
import APIError from "../../util/APIError";
import SenhaUtil from "../../util/senhaUtil";

/**
 * Document do Gestor.
 */
export interface GestorDocument extends Document {
    nomeUsuario: string;
    senha: string;
    permissao: string;
    estabelecimento: Schema.Types.ObjectId | Document;
    criadoEm: Date;
    atualizadoEm: Date;
    comparaSenha(senha: string): boolean;
};

interface Gestor extends Model<GestorDocument> {
    getPorId(id: string): Promise<any>;
    getPorNomeUsuario(nomeUsuario: string): Promise<any>;
}

/**
 * Gestor Schema
 */
const GestorSchema = new Schema({
    nomeUsuario: {
        type: String,
        minlength: [constantes.GESTOR.NOME_USUARIO_TAMANHO_MINIMO, mensagensErro.GESTOR.NOME_USUARIO_TAMANHO_MINIMO],
        maxlength: [constantes.GESTOR.NOME_USUARIO_TAMANHO_MAXIMO, mensagensErro.GESTOR.NOME_USUARIO_TAMANHO_MAXIMO],
        required: [true, mensagensErro.GESTOR.NOME_USUARIO_OBRIGATORIO],
        unique: true,
        trim: true
    },
    senha: { //  Outras validações são feitas no hook pre-save. */
        type: String,
        required: [true, mensagensErro.GESTOR.SENHA_OBRIGATORIA]
    },
    permissao: {
        type: String,
        enum: {
            values: Object.values(constantes.GESTOR.PERMISSOES),
            message: mensagensErro.GESTOR.PERMISSAO_INVALIDA
        },
        required: [true, mensagensErro.GESTOR.PERMISSAO_OBRIGATORIA]
    },
    estabelecimento: {
        type: Schema.Types.ObjectId,
        ref: "Estabelecimento",
        autopopulate: true
    },
}, { collection: "gestores", timestamps: { createdAt: "criadoEm", updatedAt: "atualiadoEm" } });

/**
 * Executa ações necessárias antes do salvamento do Gestor.
 *
 * Ações:
 * - Encriptar senha
 */
GestorSchema.pre<GestorDocument>("save", function(next) {
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
 * Define como o Gestor será convertido para JSON.
 */
GestorSchema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.senha;
        delete ret.__v;
    }
});

/**
 * Compara a senha especificada com a senha do Gestor.
 *
 * @param {string} senha Senha a ser comparada.
 * @returns {boolean} True se as senhas forem iguais, false caso contrário.
 */
GestorSchema.methods.comparaSenha = function (senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
};

/**
 * Retorna um Gestor dado o ID deste.
 *
 * @param {string} id Id do Gestor a ser buscado.
 * @returns {Promise} Promise contendo Gestor que possui o ID especificado
 * ou contendo um erro.
 */
GestorSchema.statics.getPorId = async function (id: string): Promise<any> {
    let gestor;
    try {
        gestor = await this.findById(id);
    } catch(_) {
        throw new APIError(mensagensErro.GESTOR.ID_INVALIDO, httpStatus.BAD_REQUEST);
    }
    if (!gestor) {
        throw new APIError(mensagensErro.GESTOR.GESTOR_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return gestor;
};

/**
 * Retorna um Gestor dado o nome de usuário deste.
 *
 * @param {string} nomeUsuario Nome de usuário do Gestor a ser buscado.
 * @returns {Promise} Promise contendo Gestor que possui o nomeUsuario especificado
 * ou contendo um erro.
 */
GestorSchema.statics.getPorNomeUsuario = async function (nomeUsuario: string): Promise<any> {
    const gestor = await this.findOne({ nomeUsuario });
    if (!gestor) {
        throw new APIError(mensagensErro.GESTOR.GESTOR_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return gestor;
};

export const Gestor: Gestor = model<GestorDocument, Gestor>("Gestor", GestorSchema);