import httpStatus from "http-status-codes";
import APIError from "../../util/APIError";
import mongoose, { Document, Model, Schema } from "mongoose";
import constantes from "../../util/constantes";
import mensagensErro from "../../util/MensagensErro";

/**
 * Document do Tempo de Entrega.
 */
interface TempoEntregaDocument extends Document {
    minimo: number;
    maximo: number;
}

/**
 * Document de Turno de Horário de Funcionamento.
 */
interface TurnoHorarioFuncionamentoDocument extends Document {
    inicio: string;
    fim: string;
}

/**
 * Document de Horário de Funcionamento Semanal.
 */
interface HorarioFuncionamentoSemanaDocument extends Document {
    segundaFeira: TurnoHorarioFuncionamentoDocument[];
    tercaFeira: TurnoHorarioFuncionamentoDocument[];
    quartaFeira: TurnoHorarioFuncionamentoDocument[];
    quintaFeira: TurnoHorarioFuncionamentoDocument[];
    sextaFeira: TurnoHorarioFuncionamentoDocument[];
    sabado: TurnoHorarioFuncionamentoDocument[];
    domingo: TurnoHorarioFuncionamentoDocument[];
}

/**
 * Document de Subseção de Seção do Cardápio.
 */
interface SubSecaoDocument extends Document {
    nome: string;
}

/**
 * Document de Seção do Cardápio.
 */
interface SecaoDocument extends Document {
    nome: string;
    subSecoes: SubSecaoDocument[];
}

/**
 * Document do Estabelecimento.
 */
export interface EstabelecimentoDocument extends Document {
    nome: string;
    categorias: string[];
    formasPagamento: string[];
    telefones: string[];
    valorEntrega: number;
    tempoEntrega: TempoEntregaDocument;
    horariosFuncionamento: HorarioFuncionamentoSemanaDocument;
    secoes: SecaoDocument[];
    avaliacao: number;
    inadimplente: boolean;
    inativo: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
};

interface Estabelecimento extends Model<EstabelecimentoDocument> {
    getById(id: string): Promise<any>;
}

/**
 * Schema do Tempo de Entrega.
 */
const TempoEntregaSchema = new Schema({
    minimo: {
        type: Number,
        required: [true, mensagensErro.ESTABELECIMENTO.TEMPO_MINIMO_ENTREGA_OBRIGATORIO]
    },
    maximo: {
        type: Number,
        required: [true, mensagensErro.ESTABELECIMENTO.TEMPO_MAXIMO_ENTREGA_OBRIGATORIO]
    }
});

/**
 * Schema de Turno de Horário de Funcionamento.
 */
const TurnoHorarioFuncionamentoSchema = new Schema({
    inicio: {
        type: String,
        required: [true, mensagensErro.ESTABELECIMENTO.INICIO_HORARIO_FUNCIONAMENTO_OBRIGATORIO],
        /* Formato hhMM, para facilitar operações, verificações e aplicação de máscara */
        match: [constantes.REGEX.HORA_SEM_PONTUACAO, mensagensErro.ESTABELECIMENTO.INICIO_HORARIO_FUNCIONAMENTO_INVALIDO],
        trim: true
    },
    fim: {
        type: String,
        required: [true, mensagensErro.ESTABELECIMENTO.FIM_HORARIO_FUNCIONAMENTO_OBRIGATORIO],
        /* Formato hhMM, para facilitar operações, verificações e aplicação de máscara */
        match: [constantes.REGEX.HORA_SEM_PONTUACAO, mensagensErro.ESTABELECIMENTO.FIM_HORARIO_FUNCIONAMENTO_INVALIDO],
        trim: true
    }
});

/**
 * Schema de Horário de Funcionamento Semanal.
 */
const HorarioFuncionamentoSemanaSchema = new Schema({
    segundaFeira: [TurnoHorarioFuncionamentoSchema],
    tercaFeira: [TurnoHorarioFuncionamentoSchema],
    quartaFeira: [TurnoHorarioFuncionamentoSchema],
    quintaFeira: [TurnoHorarioFuncionamentoSchema],
    sextaFeira: [TurnoHorarioFuncionamentoSchema],
    sabado: [TurnoHorarioFuncionamentoSchema],
    domingo: [TurnoHorarioFuncionamentoSchema]
});

/**
 * Schema de Subseção de Seção do Cardápio.
 */
const SubSecaoSchema = new Schema({
    nome: {
        type: String,
        minlength: [constantes.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MINIMO,
            mensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MINIMO],
        maxlength: [constantes.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MAXIMO,
            mensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MAXIMO],
        required: [true, mensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_OBRIGATORIO],
        trim: true
    }
});

/**
 * Schema de Seção do Cardápio.
 */
const SecaoSchema = new Schema({
    nome: {
        type: String,
        minlength: [constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO,
            mensagensErro.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO],
        maxlength: [constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO,
            mensagensErro.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO],
        required: [true, mensagensErro.ESTABELECIMENTO.NOME_SECAO_OBRIGATORIO],
        trim: true
    },
    subSecoes: [SubSecaoSchema]
});

/**
 * Schema do Estabelecimento.
 */
const EstabelecimentoSchema = new Schema({
    nome: {
        type: String,
        minlength: [constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO,
            mensagensErro.ESTABELECIMENTO.NOME_TAMANHO_MINIMO],
        maxlength: [constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO,
            mensagensErro.ESTABELECIMENTO.NOME_TAMANHO_MAXIMO],
        required: [true, mensagensErro.ESTABELECIMENTO.NOME_OBRIGATORIO],
        trim: true
    },
    categorias: {
        type: [{
            type: String,
            enum: {
                values: Object.values(constantes.ESTABELECIMENTO.CATEGORIAS),
                message: mensagensErro.ESTABELECIMENTO.CATEGORIA_INVALIDA
            }
        }],
        required: [true, mensagensErro.ESTABELECIMENTO.CATEGORIA_OBRIGATORIA]
    },
    formasPagamento: {
        type: [{
            type: String,
            enum: {
                values: constantes.ESTABELECIMENTO.FORMAS_PAGAMENTO,
                message: mensagensErro.ESTABELECIMENTO.FORMA_PAGAMENTO_INVALIDA
            }
        }],
        required: [true, mensagensErro.ESTABELECIMENTO.FORMA_PAGAMENTO_OBRIGATORIA]
    },
    telefones: {
        type: [{
            type: String,
            /* Aceita os formatos XX9XXXXXXXX ou XXXXXXXXXX (Sem máscara e espaços) */
            match: [constantes.REGEX.TELEFONE_SEM_PONTUACAO, mensagensErro.ESTABELECIMENTO.TELEFONE_INVALIDO],
            trim: true
        }],
        required: [true, mensagensErro.ESTABELECIMENTO.TELEFONE_OBRIGATORIO]
    },
    valorEntrega: {
        type: Number,
        required: [true, mensagensErro.ESTABELECIMENTO.VALOR_ENTREGA_OBRIGATORIO]
    },
    tempoEntrega: {
        type: TempoEntregaSchema,
        required: [true, mensagensErro.ESTABELECIMENTO.TEMPO_ENTREGA_OBRIGATORIO]
    },
    horariosFuncionamento: {
        type: HorarioFuncionamentoSemanaSchema,
        required: [true, mensagensErro.ESTABELECIMENTO.HORARIO_FUNCIONAMENTO_OBRIGATORIO]
    },
    secoes: {
        type: [SecaoSchema]
    },
    avaliacao: {
        type: Number,
        min: [constantes.ESTABELECIMENTO.AVALIACAO_MINIMA, mensagensErro.ESTABELECIMENTO.AVALIACAO_MINIMA],
        max: [constantes.ESTABELECIMENTO.AVALIACAO_MAXIMA, mensagensErro.ESTABELECIMENTO.AVALIACAO_MAXIMA],
    },
    inadimplente: {
        type: Boolean,
        default: false
    },
    inativo: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" } });

/**
 * Executa ações necessárias antes do salvamento do Estabelecimento.
 *
 * Ações:
 * - Deletar propriedade criadoEm
 * - Deletar propriedade atualizadoEm
 */
EstabelecimentoSchema.pre<EstabelecimentoDocument>("save", function(next) {
    delete this.criadoEm;
    delete this.atualizadoEm;
    next();
});

/**
 * Define como o Estabelecimento será convertido para JSON.
 */
EstabelecimentoSchema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.criadoEm;
        delete ret.atualizadoEm;
        delete ret.__v;
    }
});

/**
 * Retorna um Estabelecimento dado o ID deste.
 *
 * @param {string} id ID do Estabelecimento a ser buscado.
 * @returns {Promise} Promessa contendo Estabelecimento que possui o ID especificado
 * ou um erro.
 */
EstabelecimentoSchema.statics.getById = async function (id: string): Promise<any> {
    return this.findById(id)
        .exec()
        .then((estabelecimento: EstabelecimentoDocument) => {
            if (estabelecimento) {
                return estabelecimento;
            }
            const erro = new APIError(mensagensErro.ESTABELECIMENTO.ESTABELECIMENTO_NAO_ENCONTRADO, httpStatus.NOT_FOUND);
            throw erro;
        })
        .catch((erro: any) => {
            if (!(erro instanceof APIError)) {
                erro = new APIError(mensagensErro.ESTABELECIMENTO.ID_INVALIDO, httpStatus.BAD_REQUEST);
            }
            throw erro;
        });
};

export const Estabelecimento: Estabelecimento = mongoose.model<EstabelecimentoDocument, Estabelecimento>("Estabelecimento", EstabelecimentoSchema);
