import mongoose, { Document, Schema } from "mongoose";
import Constantes from "../../util/Constantes";

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

/**
 * Schema do Tempo de Entrega.
 */
const TempoEntregaSchema = new Schema({
    minimo: {
        type: Number,
    },
    maximo: {
        type: Number,
    }
});

/**
 * Schema de Turno de Horário de Funcionamento.
 */
const TurnoHorarioFuncionamentoSchema = new Schema({
    inicio: {
        type: String,
        trim: true
    },
    fim: {
        type: String,
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
        trim: true
    }
});

/**
 * Schema de Seção do Cardápio.
 */
const SecaoSchema = new Schema({
    nome: {
        type: String,
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
        minlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO],
        maxlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO],
        required: [true],
        trim: true
    },
    categorias: {
        type: [{
            type: String,
            enum: {
                values: Object.values(Constantes.ESTABELECIMENTO.CATEGORIAS),
            }
        }],
        required: [true]
    },
    formasPagamento: {
        type: [{
            type: String,
            enum: {
                values: Constantes.ESTABELECIMENTO.FORMAS_PAGAMENTO,
            }
        }],
        required: [true]
    },
    telefones: {
        type: [{
            type: String,
            /* Aceita os formatos XX9XXXXXXXX ou XXXXXXXXXX (Sem máscara e espaços) */
            match: [Constantes.REGEX.TELEFONE_SEM_PONTUACAO],
            trim: true
        }],
        required: [true]
    },
    valorEntrega: {
        type: Number,
        required: [true]
    },
    tempoEntrega: {
        type: TempoEntregaSchema,
        required: [true]
    },
    horariosFuncionamento: {
        type: HorarioFuncionamentoSemanaSchema,
        required: [true]
    },
    secoes: {
        type: [SecaoSchema]
    },
    avaliacao: {
        type: Number,
        min: [Constantes.ESTABELECIMENTO.AVALIACAO_MINIMA],
        max: [Constantes.ESTABELECIMENTO.AVALIACAO_MAXIMA],
    },
    inadimplente: {
        type: Boolean,
        default: false
    },
    inativo: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualiadoEm" } });

export const Estabelecimento = mongoose.model<EstabelecimentoDocument>("Estabelecimento", EstabelecimentoSchema);
