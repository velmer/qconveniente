import httpStatus from "http-status-codes";
import APIError from "../../util/APIError";
import mongoose, { Document, Model, Schema } from "mongoose";
import constantes from "../../util/constantes";
import mensagensErro from "../../util/mensagensErro";

interface ItemPedido extends Document {
    preco: number;
    quantidade: number;
    observacao: string;
    produto: Schema.Types.ObjectId;
}

/**
 * Document do Pedido.
 */
export interface PedidoDocument extends Document {
    valorTotal: number;
    valorEntrega: number;
    formaPagamento: string;
    troco: number;
    status: string;
    avaliacao: number;
    estabelecimento: Schema.Types.ObjectId;
    usuario: Schema.Types.ObjectId;
    itens: ItemPedido[];
    criadoEm: Date;
    atualizadoEm: Date;
};

interface Pedido extends Model<PedidoDocument> {
    getPorId(id: string): Promise<any>;
}

/**
 * Schema de ItemPedido.
 */
const ItemPedidoSchema = new Schema({
    preco: {
        type: Number,
        min: [constantes.PEDIDO.PRECO_MINIMO_ITEM, mensagensErro.PEDIDO.PRECO_ITEM_INVALIDO],
        required: [true, mensagensErro.PEDIDO.PRECO_ITEM_OBRIGATORIO]
    },
    quantidade: {
        type: Number,
        min: [constantes.PEDIDO.QUANTIDADE_MINIMA_ITEM_PEDIDO, mensagensErro.PEDIDO.QUANTIDADE_MINIMA_ITEM],
        required: [true, mensagensErro.PEDIDO.QUANTIDADE_ITEM_OBRIGATÓRIA]
    },
    observacao: {
        type: String,
        maxlength: [constantes.PEDIDO.OBSERVACAO_ITEM_TAMANHO_MAXIMO, mensagensErro.PEDIDO.OBSERVACAO_ITEM_TAMANHO_MAXIMO],
        trim: true
    },
    produto: {
        type: Schema.Types.ObjectId,
        ref: "Produto",
        required: [true, mensagensErro.PEDIDO.ITEM_VINCULACAO_PRODUTO_OBRIGATORIA],
        autopopulate: true
    },
});

/**
 * Schema de Pedido.
 */
const PedidoSchema = new Schema({
    valorTotal: {
        type: Number,
        min: [constantes.PEDIDO.VALOR_TOTAL_MINIMO, mensagensErro.PEDIDO.VALOR_TOTA_INVALIDO],      
        required: [true, mensagensErro.PEDIDO.VALOR_TOTAL_OBRIGATORIO]
    },
    valorEntrega: {
        type: Number,
        min: [constantes.PEDIDO.VALOR_ENTREGA_MINIMO, mensagensErro.PEDIDO.VALOR_ENTREGA_INVALIDO],
        required: [true, mensagensErro.PEDIDO.VALOR_ENTREGA_OBRIGATORIO]
    },
    formaPagamento: {
        type: String,
        enum: {
            values: constantes.ESTABELECIMENTO.FORMAS_PAGAMENTO,
            message: mensagensErro.PEDIDO.FORMA_PAGAMENTO_INVALIDA
        },
        required: [true, mensagensErro.PEDIDO.FORMA_PAGAMENTO_OBRIGATORIA]
    },
    troco: {
        type: Number,
        min: [constantes.PEDIDO.TROCO_MINIMO, mensagensErro.PEDIDO.TROCO_INVALIDO]
    },
    status: {
        type: String,
        enum: {
            values: Object.values(constantes.PEDIDO.STATUS_PEDIDO),
            message: mensagensErro.PEDIDO.STATUS_INVALIDO
        },
        required: [true, mensagensErro.PEDIDO.STATUS_OBRIGATORIO]
    },
    avaliacao: {
        type: Number,
        min: [constantes.PEDIDO.AVALIACAO_MINIMA, mensagensErro.PEDIDO.AVALIACAO_MINIMA],
        max: [constantes.PEDIDO.AVALIACAO_MAXIMA, mensagensErro.PEDIDO.AVALIACAO_MAXIMA],
    },
    estabelecimento: {
        type: Schema.Types.ObjectId,
        ref: "Estabelecimento",
        required: [true, mensagensErro.PEDIDO.PEDIDO_VINCULACAO_ESTABELECIMENTO_OBRIGATORIA],
        autopopulate: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, mensagensErro.PEDIDO.PEDIDO_VINCULACAO_USUARIO_OBRIGATORIA],
        autopopulate: true
    },
    itens: {
        type: [ItemPedidoSchema],
        required: [true, mensagensErro.PEDIDO.ITENS_OBRIGATORIOS]
    },
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" } });


/**
 * Define como o Pedido será convertido para JSON.
 */
PedidoSchema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.__v;
    }
});

/**
 * Retorna um Pedido dado o ID deste.
 *
 * @param {string} id ID do Pedido a ser buscado.
 * @returns {Promise} Promessa contendo Pedido que possui o ID especificado
 * ou um erro.
 */
PedidoSchema.statics.getPorId = async function (id: string): Promise<any> {
    let pedido;
    try {
        pedido = await this.findById(id);
    } catch(_) {
        throw new APIError(mensagensErro.PEDIDO.ID_INVALIDO, httpStatus.BAD_REQUEST);
    }
    if (!pedido) {
        throw new APIError(mensagensErro.PEDIDO.PEDIDO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
    }
    return pedido;
};

export const Pedido: Pedido = mongoose.model<PedidoDocument, Pedido>("Pedido", PedidoSchema);
