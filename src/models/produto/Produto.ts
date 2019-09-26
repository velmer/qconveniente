import httpStatus from "http-status-codes";
import APIError from "../../util/APIError";
import mongoose, { Document, Model, Schema } from "mongoose";
import constantes from "../../util/constantes";
import mensagensErro from "../../util/mensagensErro";

/**
 * Document do Produto.
 */
export interface ProdutoDocument extends Document {
    nome: string;
    preco: number;
    descricao: string;
    tamanho: string;
    ativo: boolean;
    estabelecimento: Schema.Types.ObjectId;
    idSecao: Schema.Types.ObjectId;
    idSubSecao: Schema.Types.ObjectId;
    criadoEm: Date;
    atualizadoEm: Date;
};

interface Produto extends Model<ProdutoDocument> {
    getPorId(id: string): Promise<any>;
}

/**
 * Schema de Produto.
 */
const ProdutoSchema = new Schema({
    nome: {
        type: String,
        minlength: [constantes.PRODUTO.NOME_TAMANHO_MINIMO, mensagensErro.PRODUTO.NOME_TAMANHO_MINIMO],
        maxlength: [constantes.PRODUTO.NOME_TAMANHO_MAXIMO, mensagensErro.PRODUTO.NOME_TAMANHO_MAXIMO],
        required: [true, mensagensErro.PRODUTO.NOME_OBRIGATORIO],
        trim: true
    },
    preco: {
        type: Number,
        min: [constantes.PRODUTO.PRECO_MINIMO, mensagensErro.PRODUTO.PRECO_INVALIDO],
        required: [true, mensagensErro.PRODUTO.PRECO_OBRIGATORIO]
    },
    descricao: {
        type: String,
        maxlength: [constantes.PRODUTO.DESCRICAO_TAMANHO_MAXIMO, mensagensErro.PRODUTO.DESCRICAO_TAMANHO_MAXIMO],
        trim: true
    },
    tamanho: {
        type: String,
        maxlength: [constantes.PRODUTO.TAMANHO_MAXIMO, mensagensErro.PRODUTO.TAMANHO_MAXIMO],
        trim: true
    },
    ativo: {
        type: Boolean,
        default: true
    },
    estabelecimento: {
        type: Schema.Types.ObjectId,
        ref: "Estabelecimento",
        required: [true, mensagensErro.PRODUTO.VINCULACAO_ESTABELECIMENTO_OBRIGATORIA],
        autopopulate: true
    },
    /*
     * Não conseguimos  referenciar seções e subseções  porque elas não são modelos
     * de coleções do MongoDB, apenas sub-documentos de Estabelecimento. Além disso,
     * não é possível popular esses campos através da query do MongoDB. Dessa forma,
     * nós utilizaremos campos do tipo Schema.Types.ObjectId, mas sem referência.
     *
     * Mais detalhes em: https://github.com/Automattic/mongoose/issues/2772
     * @author Vélmer Oliveira 08/10/2018
     */
    idSecao: {
        type: Schema.Types.ObjectId
    },
    idSubSecao: {
        type: Schema.Types.ObjectId
    }
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" } });

/**
 * Define como o Produto será convertido para JSON.
 */
ProdutoSchema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.__v;
    }
});

/**
 * Retorna um Produto dado o ID deste.
 *
 * @param {string} id ID do Produto a ser buscado.
 * @returns {Promise} Promessa contendo Produto que possui o ID especificado
 * ou um erro.
 */
ProdutoSchema.statics.getPorId = async function (id: string): Promise<any> {
    let produto;
    try {
        produto = await this.findById(id);
    } catch(_) {
        throw new APIError(mensagensErro.PRODUTO.ID_INVALIDO, httpStatus.BAD_REQUEST);
    }
    if (!produto) {
        throw new APIError(mensagensErro.PRODUTO.PRODUTO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return produto;
};

export const Produto: Produto = mongoose.model<ProdutoDocument, Produto>("Produto", ProdutoSchema);
